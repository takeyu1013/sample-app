# sample-app

## 概要

本アプリはRailsチュートリアルのアプリをNext.jsなどのTypeScriptの技術で作成したもの。

## 使い方

1. <https://sample-app-tawny.vercel.app/>にアクセス
2. メニューの"Log in"を選択
3. テスト用アカウントでログインする

   - テスト用一般ユーザーアカウント

     | Email           | Password  |
     | --------------- | --------- |
     | foo@example.com | sampleapp |

   - テスト用管理者アカウント（ユーザー削除が可能）

     | Email             | Password  |
     | ----------------- | --------- |
     | admin@example.com | sampleapp |

4. メニューから"Home"を選択
5. テキストエリアにポストを入力して投稿する
6. メニューから"User"を選択し、ユーザーの一覧を確認する
7. メニューから"Account"->"Settings"を選択し、プロフィールを変更する
8. メニューから"Account"->"Log out"を選択し、ログアウトする

## API 仕様

- Sample App API仕様: <https://sample-app-tawny.vercel.app/api>
- Better Auth API仕様: <https://sample-app-tawny.vercel.app/api/auth/reference>
- アプリにログインしている状態であればTest Request可能
  - 自動的にCookieが読み込まれる

## 技術構成

- フロントエンド
  - フレームワーク: Next.js(App Router)
  - UI ライブラリ: Mantine
  - その他: Conform, nuqs, date-fns
- バックエンド
  - 認証: Better Auth
  - API: oRPC(via Next.js API Routes)
  - データベース: Drizzle ORM(SQLite)
  - その他: Zod, Scalar
- インフラ
  - ホスティング: Vercel
  - データベース: Turso
- 開発ツール
  - リンター兼フォーマッター: Biome.js
  - パッケージ管理: Bun
  - その他: VSCode, Dev Container

## 開発のポイント

- Next.js Dynamic IO及びPPR活用
  - 動的なデータを表示する部分以外は静的レンダリング
- Better Authの活用
  - Drizzle ORMと連携することでDBスキーマを自動生成
  - プライグインによる管理者権限管理
  - プライグインによるOpenAPI仕様出力
- oRPC によるOpenAPI仕様の自動生成
  - Zodによるスキーマ定義及びバリデーション
  - サーバーコンポーネントやサーバーアクションではAPIに対応する関数を直接呼び出す
- nuqsによるサーバーコンポーネントのレンダリング制御
  - ページネーションなどでクエリパラメーターを操作してデータを取得

## 今後の課題

- ユーザーフォロー機能
- 画像アップロード機能
- メール送信（認証用）
- 自動テスト
