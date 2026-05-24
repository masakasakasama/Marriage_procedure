# Marriage_procedure 🇯🇵💍🇩🇪

ドイツ人パートナーと日本で結婚するための、ふたり用バイリンガル・タスクリスト。
Zweisprachige To-do-Liste für die Heirat in Japan mit einer deutschen Partnerin.

`index.html` 1ファイルだけで動きます（ビルド不要）。チェック・追加タスクは
GitHub 上の `data/state.json` に保存され、同じリンクを開いた2人の間で自動同期されます。

## 使い方 / Nutzung

### 1. リンクを共有する（GitHub Pages）
1. GitHub の **Settings → Pages** を開く
2. Source を `Deploy from a branch` にして、このブランチ（または `main`）／`/ (root)` を選ぶ
3. 数分後に出る `https://<user>.github.io/marriage_procedure/` を2人で共有

### 2. 自動同期をオンにする / Auto-Sync aktivieren
1. ページ上部の **⚙️ 共有・同期 / Teilen & Sync** を開く
2. GitHub → Settings → Developer settings → **Fine-grained tokens** で、
   このリポジトリに対し **Contents: Read and write** を許可したトークンを作成
3. トークンを貼り付けて **保存して同期**
4. 同じトークンを彼女にも渡し、彼女の端末でも同じ手順で入力

これで、どちらかがチェックを付けると約12秒ごとに相手の画面にも反映されます。
トークンは各自のブラウザ（localStorage）にのみ保存され、リポジトリやリンクには含まれません。

> 注意 / Hinweis: 公開リポジトリ + 公開 Pages の場合、リンクを知る人はチェック内容を閲覧できます
> （書き込みにはトークンが必要）。気になる場合はプライベートリポジトリでの運用を検討してください。
