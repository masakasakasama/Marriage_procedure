# Marriage_procedure 🇯🇵💍🇩🇪

ドイツ人パートナーと日本で結婚するための、ふたり用バイリンガル・タスクリスト。
Zweisprachige To-do-Liste für die Heirat in Japan mit einer deutschen Partnerin.

`index.html` の1ファイルだけで動きます（ビルド不要）。チェック・追加タスク・書類の有効期限を、
**登録もトークンも不要**で2人の端末間で自動同期します。

## 使い方 / Nutzung

### 1. リンクを共有する（GitHub Pages）
1. GitHub の **Settings → Pages** を開く
2. Source を `Deploy from a branch` にして、このブランチ（または `main`）／`/ (root)` を選ぶ
3. 数分後に出る `https://<user>.github.io/marriage_procedure/` を開く

### 2. 自動同期（設定ゼロ）/ Auto-Sync (ohne Einrichtung)
- 最初に開いた瞬間、アプリが自動で保存場所を作り、アドレスバーのURLが「共有リンク」になります。
- ページ上部 **⚙️ 共有・同期** を開くと、その共有リンクをコピーできます。
- **彼女にそのリンクを送るだけ。** 彼女が開けば、チェック・追加タスク・有効期限が約20秒ごとに自動で双方向同期されます。
- トークン・ログイン・パスワードは一切不要です。

> Auf Deutsch: Beim ersten Öffnen erstellt die App automatisch einen Speicher; die URL wird zum
> gemeinsamen Link. Diesen Link teilen — danach synchronisiert alles automatisch. Kein Token, kein Login.

## 同期の仕組み / Wie es funktioniert
- データは無料・登録不要のJSON保存サービス **jsonblob.com** に置かれ、共有リンクにはそのランダムIDだけが入ります。
- 端末ごとにフルコピーをローカル保存（オフラインでも編集可、復帰時に項目単位でマージ）。
- ⚠️ **リンクを知っている人は内容を閲覧・編集できます。** 第三者には渡さないでください。
- サービス側の不調や長期未使用でデータが消える可能性があるため、重要な情報は別途控えておくと安心です。

## 機能 / Features
- 7ステップの手順＋各リードタイム、進捗リング、完了で紙吹雪
- 必要書類チェック（日本人側／ドイツ人側）と**書類ごとの有効期限管理**（残り日数・期限切れ警告）
- 自分たちでタスクを追加／削除（日本語・ドイツ語・リードタイム・有効期限つき）
- 日本語・ドイツ語の併記／言語切り替え
