# 🧩 CommitMate

**CommitMate** は、Conventional Commits に準拠したコミットメッセージを  
快適に作成できるデスクトップアプリです。  
Tauri（Rust + TypeScript）で構築され、軽量かつクロスプラットフォームに動作します。

---

## 🚀 特徴

- 🧠 **Conventional Commitsガイド対応**  
  - type / scope / subject / body / footer の入力支援  
  - `breaking change` のトグルサポート  
  - subject 長・形式の自動バリデーション  

- ⚙️ **Git統合**  
  - ステージ済み／未ステージ／未追跡ファイルの一覧表示  
  - ファイルのステージ／アンステージ操作  
  - `git commit` 実行・結果通知  

- 👀 **リアルタイムプレビュー**  
  - 入力内容から即座に整形済みメッセージを生成  
  - breaking・footer もリアルタイム反映  

- 💾 **設定と履歴**  
  - 絵文字有無・折返し桁数・デフォルト type などを保存  
  - 直近のコミットを参照・再利用  

---

## 🧰 技術スタック

| 項目 | 使用技術 |
|------|-----------|
| フレームワーク | [Tauri v2](https://tauri.app/v2/) |
| フロントエンド | React + TypeScript |
| スタイル | Tailwind CSS + shadcn/ui |
| バックエンド | Rust + `tauri-plugin-shell` |
| データ保存 | `tauri-plugin-store`（M0） → SQLite（M1以降） |

---

## 📦 インストール / 開発手順

### 1️⃣ プロジェクト作成

```bash
npm create tauri-app@latest commitmate -- --template react-ts
cd commitmate
npm install
```

### 2️⃣ 開発サーバ起動

```bash
npm run tauri dev
```

### 3️⃣ ビルド（配布用）

```bash
npm run tauri build
```

ビルド成果物は `/src-tauri/target/release/` に生成されます。

---

## 🧩 機能ロードマップ

| フェーズ | 機能概要 | 状態 |
|-----------|-----------|------|
| **M0** | コミットメッセージ作成・Git連携・プレビュー | 🟢 進行中 |
| **M1** | 差分プレビュー / 絵文字マッピング / Issue連携 | ⚪ 計画中 |
| **M2** | チーム設定共有・Hook支援・多言語対応 | ⚪ 予定 |

---

## 🧪 実装タスク（M0）

全15項目のIssueを [📋 GitHub Issues](../../issues) に登録済みです。

主要項目：
- [x] プロジェクト初期化とTauri設定  
- [x] Gitパス検出・ステータス取得  
- [ ] 入力フォームとプレビュー連携  
- [ ] コミット実行・履歴パネル  
- [ ] 設定ダイアログ・ショートカット実装  

> 詳細は [M0 Milestone](../../milestone/1) を参照。

---

## 🧑‍💻 開発ガイドライン

- **型安全最優先**：Zodでスキーマ検証（M1導入予定）  
- **最小権限の原則**：Tauri permission設定を最小に抑える  
- **UI即応性**：入力150ms以内にプレビュー更新  
- **ログ透明性**：Gitコマンド出力をすべて内部ログへ記録  

---

## 🧭 コントリビュート

Pull Request は歓迎です！  
特に以下の領域を募集中です：
- UI改善（shadcn/uiベース）
- 国際化（英語翻訳）
- Git操作モジュールの抽象化

ガイドラインは `.github/CONTRIBUTING.md` に記載予定。

---

## 📄 ライセンス

MIT License © 2025 [YourName]

---

## 🌟 クレジット

- Inspired by [Conventional Commits](https://www.conventionalcommits.org/)  
- Built with [Tauri](https://tauri.app/) + [React](https://react.dev/)  
- Designed for developers who care about **clean commits** 🧹
