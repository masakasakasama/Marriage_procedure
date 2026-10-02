# CODEX_STATE

Status: blocked
Goal: 日独婚姻チェックリストの未送信変更を接続復帰時にも安全に同期する。

## Done
- Firebase接続済みの保存失敗後、dirtyの未送信変更がonline/visible復帰で再送されない経路を修正。
- cleanな状態では共有データを書き直さず、未接続なら接続処理を再試行する。
- online/visible/hidden/clean/unconnectedの回復回帰テスト3件を追加。

- 同期表示のHTML欠落を修正。保存ACK前・dirty時は同期中、ACK成功後に同期済を表示。
- Firebase SDK 10.7.0 + Playwrightのlocalhost専用Emulator検証を追加。保存拒否→再送、二端末オフライン編集のマージ、未保存変更の再起動復元を実証。

- 端末容量超過を日独で表示。再保存・変更JSON書き出しを追加し、クラウドも失敗した時に端末保存済みと誤表示しない。
- 同一項目/同時刻競合の端末不一致と同時刻custom削除の復活を回帰で再現・修正。決定的tie-breakと削除tombstone優先、より新しい明示復元を保持。

## Current
- ローカルunit 5件・実SDK/ブラウザEmulatorの保存拒否/再送/競合/再起動/容量失敗/export/再保存が成功。
- 実利用者の共有DBは変更していない。コードと隔離検証完了、実端末/実アカウント受入はblocked。

## Next
- 実利用者の二端末で同期・保存容量復帰・画面中断/再起動を確認する。isolated emulatorの合格を実端末合格に置き換えない。
- 法的手続きの内容更新が必要になった時は最新公式出典と指定資料を再確認し、実際の完了状態をテストで変更しない。

## Blockers
- Galaxy等の利用者端末と実アカウント同期の受入結果がなく、最終完了にはできない。

## Verification
- npm test: 5/5 passed
- npm run test:emulator: full sync/restart/quota/offline/export/retry passed; JS errors=[]; production requests=0
- all inline scripts node --check passed; git diff --check passed

Updated at: 2026-10-02T19:33:10.616417+00:00
