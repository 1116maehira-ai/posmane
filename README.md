# ポスマネ（PosMane）公式LP

沖縄本島276施設のパンフレット流通管理サービス「ポスマネ」のランディングページです。

🌐 **公開URL**: https://{username}.github.io/posmane/ （GitHub Pages）

---

## 概要

- **サービス名**: ポスマネ（PosMane / POSTING MANAGER）
- **運営**: 株式会社TENOHIRA
- **ターゲット**: 沖縄に集客したい観光業界の企業
- **主訴求**: 1日¥16,000〜のお試しプラン

---

## 技術スタック

- **HTML / CSS / JS** 単一ファイル構成
- **Tailwind CSS** (CDN)
- **Google Fonts**: Noto Serif JP / Noto Sans JP / Inter
- **ホスティング**: GitHub Pages

将来的にNext.jsへ移行する想定でディレクトリを切っているが、現状は単一HTMLで運用。

---

## ディレクトリ構成

```
posmane/
├── index.html              LP本体（全コード単一ファイル）
├── images/                 画像素材
│   ├── logo.png            透過PNGロゴ（メイン）
│   ├── hero.png            パンフラック写真
│   ├── solution.png        276施設マップ・ダッシュボード合成
│   ├── differentiation.png ダッシュボード詳細
│   ├── empathy.png         チェックリスト
│   ├── pricing.png         料金プラン
│   └── closing.png         クロージング（沖縄の海）
├── videos/                 動画素材（届き次第投入）
├── .gitignore
├── .nojekyll               GitHub PagesでJekyll処理を無効化
└── README.md
```

---

## 編集ワークフロー（GitHubウェブUI）

1. リポジトリページで `index.html` を開く
2. 右上の **鉛筆アイコン（Edit this file）** をクリック
3. コードを編集
4. 下の **Commit changes** で `main` に直接コミット
5. 数分後にGitHub Pagesに反映

### ショートカット
- リポジトリページで **`.`（ピリオドキー）** を押すと、ブラウザ上で github.dev エディタ（VSCode風）が開く
- 複数ファイル編集や検索置換が必要なときに便利

---

## 動画ファイルの追加

ヒーローセクションのキャラクター動画は `videos/` フォルダに配置します。

### 動画ファイル投入後の差し替え箇所

`index.html` 内の以下のブロック：

```html
<div class="video-placeholder">
  <div class="character-silhouette"></div>
  <div class="video-placeholder-inner">
    <!-- プレースホルダー内容 -->
  </div>
</div>
```

これを以下に差し替え：

```html
<div class="video-placeholder">
  <video autoplay muted loop playsinline
         class="w-full h-full object-cover"
         poster="./images/hero.png">
    <source src="./videos/character.mp4" type="video/mp4">
    <source src="./videos/character.webm" type="video/webm">
  </video>
</div>
```

### 動画サイズの注意
- GitHub の 1ファイル上限は **100MB**（推奨は50MB以下）
- 超える場合は **Cloudflare R2 / Cloudinary / Vimeo** などの外部ホスティングを検討
- アスペクト比 **9:13** が現在のデザイン想定（縦長）

---

## GitHub Pages 公開設定

1. リポジトリの **Settings → Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `/ (root)`
4. **Save**
5. 数分後、上部に公開URLが表示される

独自ドメインを設定する場合は、`CNAME` ファイルをルートに置く（例：`posmane.jp` の1行のみ）。

---

## カラーパレット

| 用途 | 色 | HEX |
|------|----|----|
| メイン（沖縄の海） | ティールブルー | `#0891b2` |
| ディープティール | | `#0e7490` |
| インクティール | | `#083344` |
| アクセント1（沖縄の太陽） | コーラル | `#f97316` |
| アクセント2（実績・信頼） | ゴールド | `#fbbf24` |
| ベース1 | サンド | `#fdfaf5` |
| ベース2 | クリーム | `#fefcf7` |

---

## 主要セクション

1. **HERO** - キャラクター動画 + 吹き出し（MONBRAN構図）
2. **MEGA COPY** - 「配ってまいりまーす！」斜めゴシック
3. **PROBLEM** - 配布のグレーゾーン5つ
4. **SOLUTION** - 3つの価値（ネットワーク・可視化・データ提案）
5. **WHY** - 差別化4項目 + 数字パネル
6. **SYSTEM** - ダッシュボード詳細
7. **PRICING** - 1日プラン ¥16,000
8. **PROCESS** - 5ステップタイムライン
9. **FAQ** - 8項目アコーディオン
10. **CONTACT** - フォーム + 連絡先
11. **FOOTER** - 会社情報

---

## TODO

- [ ] キャラクター動画の投入
- [ ] お問い合わせフォームの送信先設定（Formspree / Google Forms / 自前API）
- [ ] 電話番号・メールアドレスの実値差し替え
- [ ] 会社住所の正式表記確認
- [ ] OGP画像の最適化（1200×630推奨）
- [ ] ファビコン追加
- [ ] Google Analytics 設置
- [ ] プライバシーポリシー / 利用規約ページ作成
- [ ] 独自ドメイン（posmane.jp）取得検討

---

## ライセンス

© 2026 株式会社TENOHIRA. All Rights Reserved.

このリポジトリはPublicですが、コンテンツ（画像・コピーライト・ロゴ）の無断転用は禁止します。

---

## 連絡

- 運営: 株式会社TENOHIRA
- 代表: 前平 雄一朗
- 拠点: 沖縄県
