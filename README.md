# Marriage_procedure

ドイツ人パートナーと日本で婚姻届を提出するための、ふたり用の日独バイリンガル・チェックリストです。
Eine zweisprachige Checkliste fuer ein deutsch-japanisches Paar, das in Japan heiraten moechte.

公開 URL: <https://masakasakasama.github.io/Marriage_procedure/>

## Features

- 日本語・ドイツ語の併記と表示切替
- 手続きの順番、計画用リードタイム、必要書類、有効期限管理
- 提出予定の市区町村と希望日をふたりで共有
- 自分たちのタスクを日本語・ドイツ語・期限つきで追加
- Firebase Realtime Database による端末間のリアルタイム自動同期
- 台東区役所へ提出する場合の専用チェック欄と連絡先

## Synchronization

`firebase-config.js` は、オーナーの既存 Firebase Web アプリ設定を利用します。婚姻チェックリストのデータは
`marriage-procedure/v1/marriage-procedure-2f9d4c7a8e` に保存され、既存アプリのデータ領域とは分離されています。
同じ公開 URL を開けば、チェック、追加タスク、予定日、書類期限が同期されます。

このページはリンクを開ける人が編集できます。パスポート番号、住所、在留カード番号などの個人情報は入力しないでください。

## Publication

静的ファイルのみで動作します。GitHub Pages の source を `main` / `/(root)` に設定すると、同じ公開 URL で配信できます。

## Procedure Notes

- 提出書類と受付運用は、婚姻届を出す市区町村へ必ず事前確認してください。
- ドイツ人パートナーの `Ehefaehigkeitszeugnis`（婚姻要件具備証明書）は発行から6か月有効で、取得に時間を要し得ます。
- 日本人側の戸籍証明書は、2024年3月1日以降、婚姻届への添付が原則不要です。
- 日本で有効に成立した婚姻は通常ドイツでも有効で、ドイツ婚姻登録簿への追完登録は義務ではありません。
- 「日本人の配偶者等」への在留資格変更は、希望する場合に別途申請する手続きです。

## Taito Ward Notes

- 台東区で婚姻届を提出する場合、受付窓口は台東区役所本庁1階の戸籍住民サービス課です。区民事務所・分室・地区センターでは受理できません。
- 所在地: 〒110-8615 東京都台東区東上野4丁目5番6号
- 戸籍住民サービス課届出担当: `03-5246-1162`
- 外国籍側は、婚姻要件具備証明書、パスポート原本、外国語証明書の日本語訳（訳者署名つき）が台東区の案内に記載されています。ドイツ国籍に応じた追加書類は提出前に同課へ確認してください。
- 夜間・土日祝日・年末年始の提出は受付のみで、後日に審査され、要件を満たせば提出日に遡って受理されます。届書には昼間連絡のつく電話番号が必要です。

情報確認日: 2026年5月24日。これは計画補助であり、法的助言ではありません。

## Official Sources

- [駐日ドイツ大使館: 日本での婚姻](https://japan.diplo.de/ja-de/service/eheschliessung-in-japan-1032018)
- [台東区: 婚姻届](https://www.city.taito.lg.jp/kurashi/todokede/koseki/kosekitodokede/konin.html)
- [台東区: 日本人と外国人に関する届出](https://www.city.taito.lg.jp/kurashi/todokede/gaikokujin/nihonjintodokede.html)
- [台東区: 戸籍に関する届出一覧（窓口・夜間休日の取扱い）](https://www.city.taito.lg.jp/kurashi/todokede/koseki/kosekitodokede/todokede.html)
- [港区: 外国籍の方が関わる婚姻の必要書類例](https://www.city.minato.tokyo.jp/easyjp/moving/residentregistration/familyregistrysystem.html)
- [港区: 婚姻届（戸籍証明書等の添付は原則不要）](https://www.city.minato.tokyo.jp/shibakoseki/kuse/kocho/faq/todokede/038.html)
- [出入国在留管理庁: 在留資格「日本人の配偶者等」](https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese01.html)
