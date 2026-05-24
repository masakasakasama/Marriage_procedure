// firebase-config.js
// あなたの Firebase プロジェクトの「Web アプリ」SDK 構成をここに貼り付けてください。
// （割り勘トラッカーと同じ仕組み。apiKey 等はクライアント公開用の情報で、秘密鍵ではありません。
//  保護は Firestore セキュリティルールと Authorized domains で行います。）
//
// Firebase Console → プロジェクト設定 → 全般 → 「マイアプリ」→ Web アプリ の構成値:
export const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE",
};

// 2人で同じこの鍵を使うと、同じチェックリストに同期されます（変えると別リストになります）。
// このページの素のURLを共有するだけでOK（URLにパラメータを付ける必要はありません）。
export const GROUP_KEY = "marriage-procedure-2f9d4c7a8e";
