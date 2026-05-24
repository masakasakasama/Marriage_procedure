// Client-side Firebase configuration already used by the owner's shared apps.
// These values identify the public web app; do not store private information in tasks.
export const firebaseConfig = {
  apiKey: "AIzaSyDBBD1W-zneFDNi1eZCtYqvyoXyJcmdk0k",
  authDomain: "warikan-app-120fd.firebaseapp.com",
  databaseURL: "https://warikan-app-120fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "warikan-app-120fd",
  storageBucket: "warikan-app-120fd.firebasestorage.app",
  messagingSenderId: "43289931875",
  appId: "1:43289931875:web:ca26551e40da813b9e4856",
};

// 婚姻チェックリストのデータ保存先（他アプリのデータとは分離）。
export const DATA_PATH = "marriage-procedure/v1";
// 2人で同じこの鍵を使うと同じリストに同期されます（変えると別リスト）。
export const GROUP_KEY = "marriage-procedure-2f9d4c7a8e";
