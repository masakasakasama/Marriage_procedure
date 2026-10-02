# CODEX_STATE

Status: in_progress
Goal: 日独婚姻チェックリストの未送信変更を接続復帰時にも安全に同期する。

## Done
- Firebase接続済みの保存失敗後、dirtyの未送信変更がonline/visible復帰で再送されない経路を修正。
- cleanな状態では共有データを書き直さず、未接続なら接続処理を再試行する。
- online/visible/hidden/clean/unconnectedの回復回帰テスト3件を追加。

- 同期表示のHTML欠落を修正。保存ACK前・dirty時は同期中、ACK成功後に同期済を表示。
- Firebase SDK 10.7.0 + Playwrightのlocalhost専用Emulator検証を追加。保存拒否→再送、二端末オフライン編集のマージ、未保存変更の再起動復元を実証。

## Current
- 本番データを操作せず、固有demo namespaceを毎回作成・削除する実SDK/browser検証が成功。

## Next
- 端末保存容量超過時のpersistLocal失敗を利用者に表示し、ローカル保存失敗を保存済と誤表示しない経路を回帰検証する。
- 同一項目・同時刻の競合規則とcustom削除tombstoneをfixtureで検証。法的手続きは公式出典を再確認し実際の完了状態を変更しない。

## Blockers
- 本番Firebase/利用者の実端末での同期試験は未実施。isolated emulatorの結果を本番合格に置き換えない。
- ストレージ容量超過は未検証。

## Verification
- npm test: 3/3 passed
- npm run test:emulator: permission failure/retry, concurrent offline merge/reload, unsaved restart recovery, pending status passed; production requests=0; JS errors=[]
- git diff --check passed

Updated at: 2026-10-02T18:01:59.473725+00:00
