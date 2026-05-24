// Client-side Firebase configuration for the marriage checklist.
// These values identify the public web app; do not store private information in tasks.
export const firebaseConfig = {
  apiKey: "AIzaSyCf3Bz-LZmvcmpIPftpCWGe1VyYtMdW3Qg",
  authDomain: "warikan-codex.firebaseapp.com",
  // ↓ Realtime Database を作成すると発行される URL。作成後にここへ貼り付けてください。
  // 例: https://warikan-codex-default-rtdb.asia-southeast1.firebasedatabase.app
  databaseURL: "PASTE_RTDB_URL_HERE",
  projectId: "warikan-codex",
  storageBucket: "warikan-codex.firebasestorage.app",
  messagingSenderId: "180979686648",
  appId: "1:180979686648:web:9e98cac0c5377a0a1e6f0d",
  measurementId: "G-LS1H8BR1QC",
};

// 婚姻チェックリストのデータ保存先（他アプリのデータとは分離）。
export const DATA_PATH = "marriage-procedure/v1";
// 2人で同じこの鍵を使うと同じリストに同期されます（変えると別リスト）。
export const GROUP_KEY = "marriage-procedure-2f9d4c7a8e";
