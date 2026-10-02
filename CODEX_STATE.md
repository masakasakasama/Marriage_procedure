# CODEX_STATE

Status: in_progress
Goal: 日独婚姻チェックリストの未送信変更を接続復帰時にも安全に同期する。

## Done
- Firebase接続済みの保存失敗後、dirtyの未送信変更がonline/visible復帰で再送されない経路を修正。
- cleanな状態では共有データを書き直さず、未接続なら接続処理を再試行する。
- online/visible/hidden/clean/unconnectedの回復回帰テスト3件を追加。

## Current
- 独立ローカルfixtureでFirebase通信を止めて表示・チェック保存/再読込・ドイツ語切替を確認。修正後もJSエラーなし。

## Next
- Firebase Emulatorまたは隔離DBで、保存失敗→接続復帰→再送、同時編集3方向マージ、未保存データの再起動復元を検証する。
- 現行生データや法的手続きの完了状態をテスト操作で変更しない。最新公式手続きの内容確認は別途出典を読み直す。

## Blockers
- 本番Firebaseでの同期試験は未実施。利用者の共有データをテストで書き換えていない。
- ブラウザの端末保存容量超過と競合同期の全経路は未検証。

## Verification
- node --test scripts/sync-recovery.test.mjs: 3/3 passed
- 全inline script node --check: passed
- agent-browser隔離fixture: 表示/checkbox再読込保持/ドイツ語切替成功、修正後errors=[]
- git diff --check: passed

Updated at: 2026-10-02T10:53:14.680818+00:00
