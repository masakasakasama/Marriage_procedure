# Marriage_procedure 🇯🇵💍🇩🇪

ドイツ人パートナーと日本で結婚するための、ふたり用バイリンガル・タスクリスト。
Zweisprachige To-do-Liste für die Heirat in Japan mit einer deutschen Partnerin.

`index.html` の1ファイル＋`firebase-config.js` で動きます（ビルド不要）。
チェック・追加タスク・書類の有効期限を、**Firebase Firestore でリアルタイム自動同期**します
（割り勘トラッカーと同じ仕組み：匿名ログイン＋`onSnapshot`）。データはあなたの Firebase（Google）に
永続保存されるので消えません。共有リンクはこのページの**素のURLそのまま**です。

## セットアップ（最初の1回だけ）

### 1. Firebase 側
1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成（既存のものを使ってもOK）
2. **Build → Authentication → Sign-in method** で **「匿名」** を有効化
3. **Build → Firestore Database** を作成（任意リージョン）
4. **Authentication → Settings → Authorized domains** に `masakasakasama.github.io` を追加
5. Firestore のルールに以下を追加:
   ```txt
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /checklists/{docId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

### 2. このリポジトリ側
1. **プロジェクト設定 → 全般 → マイアプリ（Web）** の SDK 構成（apiKey 等6項目）を `firebase-config.js` に貼り付け
   - ※ apiKey 等はクライアント公開用の情報で秘密鍵ではありません（コミットしてOK）
2. **Settings → Pages** で Source を `Deploy from a branch` にしてこのブランチ（または `main`）／`/(root)` を公開
3. 公開URL `https://masakasakasama.github.io/Marriage_procedure/` を2人で共有

## 使い方 / Nutzung
- 2人がそれぞれ上記の素のURLを開くだけ。トークン入力や追加設定は不要。
- 片方がチェック／追加／有効期限を変更すると、数秒でもう片方の画面に反映されます（リアルタイム双方向同期）。
- オフラインでも編集可（端末にローカル保存）。オンライン復帰時に項目単位でマージ（後勝ち）。
- `GROUP_KEY`（`firebase-config.js` 内）を同じにしている2人が同じリストを共有します。別リストにしたい時は鍵を変えるだけ。

## 機能 / Features
- 7ステップの手順＋各リードタイム、進捗リング、完了で紙吹雪
- 必要書類チェック（日本人側／ドイツ人側）と**書類ごとの有効期限管理**（残り日数・期限切れ警告）
- 自分たちでタスクを追加／削除（日本語・ドイツ語・リードタイム・有効期限つき）
- 日本語・ドイツ語の併記／言語切り替え

> Auf Deutsch: Einmalige Einrichtung in Firebase (Projekt, anonyme Anmeldung, Firestore, Authorized
> Domain, Regel), dann die 6 Konfigurationswerte in `firebase-config.js` einfügen und über GitHub Pages
> veröffentlichen. Danach öffnen beide einfach die normale URL — alles synchronisiert in Echtzeit.
