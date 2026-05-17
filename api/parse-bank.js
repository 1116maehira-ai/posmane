// =========================================================
// Vercel Serverless Function: 銀行明細PDF解析プロキシ
// =========================================================
// 沖銀・琉銀のPDF明細を解析して、JSONで返します。
// 銀行は自動判別します。
// =========================================================

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'API key not configured. Vercelの環境変数に ANTHROPIC_API_KEY を設定してください。'
    });
  }

  try {
    const { pdfBase64 } = req.body;

    if (!pdfBase64) {
      return res.status(400).json({ error: 'pdfBase64 は必須です' });
    }

    const prompt = `添付したPDFは銀行の入出金明細です。中身を読み取って、次のJSONフォーマット**だけ**で返してください。前後に説明や\`\`\`jsonなどは一切付けないでください。

{
  "bank": "okigin" または "ryugin"（沖縄銀行=okigin / 琉球銀行=ryugin / それ以外なら "other"）,
  "accountName": "口座名義（例：株式会社TENOHIRA）",
  "accountNumber": "口座番号（あれば）",
  "branch": "支店名（あれば）",
  "periodFrom": "明細期間の開始日 YYYY-MM-DD",
  "periodTo": "明細期間の終了日 YYYY-MM-DD",
  "transactions": [
    {
      "date": "取引日 YYYY-MM-DD",
      "time": "時刻 HH:MM（あれば、なければ空文字）",
      "direction": "in" または "out"（入金=in / 出金=out）,
      "amount": 金額(円・整数),
      "counterparty": "相手先・取引先名（明細名のまま）",
      "description": "摘要・取引内容",
      "balance": 残高(円・整数、あれば),
      "is_fee": true または false（手数料の行なら true）,
      "raw": "元のPDFに書かれていた1行をそのまま"
    }
  ]
}

【重要なルール】
- transactionsは取引明細の各行を1オブジェクトずつ抽出。
- 「手数料」「振込手数料」「ATM手数料」「支払機 手数料」「カワセテスウリヨウ」「BIZネット手数料」など、手数料っぽい行は is_fee: true とする。
- 沖銀PDFの場合：「出金」「入金」の文字で direction を判別。
- 琉銀PDFの場合：「引出し金額」に数字があれば direction="out"、「預入れ金額」に数字があれば direction="in"。
- amount は税抜・税込関係なく、書かれている金額そのまま。マイナス符号は付けない（directionで表現）。
- 金額のカンマや円マークは除去して純粋な数字に。
- 日付は YYYY-MM-DD 形式（2026/05/13 → 2026-05-13）。
- counterparty は半角/全角カナそのまま保持（後で照合するため）。
- 残高情報がない行は balance を 0 にする。
- ヘッダー行（カラム名）や、口座情報、合計行は transactions に含めない。
- 取引が無い場合は transactions: [] を返す。
- JSON以外は何も書かないこと。`;

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: pdfBase64
              }
            },
            { type: 'text', text: prompt }
          ]
        }]
      })
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      return res.status(anthropicRes.status).json({
        error: data.error?.message || 'Anthropic API error',
        details: data
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('Bank parser error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
