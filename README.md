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

## Dossenheim / Ehefaehigkeitszeugnis

- ドイツ側の申請先は、彼女の担当である `Standesamt / Friedhofsverwaltung Dossenheim`, Rathausplatz 1, 69221 Dossenheim（担当電話 `+49 (0)6221 8651-331`, `-332`）を前提に更新しました。
- 指定DOCX原本でチェックされている Dossenheim 申請用書類（彼女側の出生登録簿謄本、あなた側の戸籍/婚姻状況証明＋アポスティーユ＋翻訳、日本住所の住民票/登録証明＋翻訳、双方の認証済みパスポートコピー、外国語書類のドイツ宣誓翻訳者による認証翻訳）をチェック項目化しました。
- 指定PDF原本の `Antrag auf Ausstellung eines Ehefähigkeitszeugnisses` は、Dossenheim / Vorgang Nr. 4/26 の申請書として扱います。個人住所・メール等は公開ページには載せません。
- 台東区への希望提出日を基準に、指定DOCX/PDFに基づく各書類の担当・やること・所要時間と、Dossenheim への申請、証明書のアポスティーユ取得、日本への発送、台東区提出までを、スマホ向けの一本の縦型工程グラフで表示します。
- Baden-Württemberg の公式案内では `Ehefaehigkeitszeugnis` は発行日から6か月有効で、処理期間は個別事情によります。表示する週数は公式締切ではなく、父親経由と海外配送を含めた計画用の余裕です。
- 台東区提出用の和訳は本人訳＋自署でOKですが、Dossenheim 用DOCXでは外国語書類について、ドイツで裁判所認定/宣誓翻訳者が作成し、原本と翻訳を固定・封印する条件がチェックされています。台東区用とDossenheim用で翻訳条件を分けて表示します。

## Official Sources

- [駐日ドイツ大使館: 日本での婚姻](https://japan.diplo.de/ja-de/service/eheschliessung-in-japan-1032018)
- [台東区: 婚姻届](https://www.city.taito.lg.jp/kurashi/todokede/koseki/kosekitodokede/konin.html)
- [台東区: 日本人と外国人に関する届出](https://www.city.taito.lg.jp/kurashi/todokede/gaikokujin/nihonjintodokede.html)
- [台東区: 戸籍に関する届出一覧（窓口・夜間休日の取扱い）](https://www.city.taito.lg.jp/kurashi/todokede/koseki/kosekitodokede/todokede.html)
- [Dossenheim: Standesamt / Friedhofsverwaltung](https://buergerservice.dossenheim.de/kontakt-info/organigramm/6004215/standesamt)
- [Serviceportal Baden-Württemberg: Ehefaehigkeitszeugnis - Ausstellung beantragen](https://www.service-bw.de/zufi/leistungen/1822)
- [港区: 外国籍の方が関わる婚姻の必要書類例](https://www.city.minato.tokyo.jp/easyjp/moving/residentregistration/familyregistrysystem.html)
- [港区: 婚姻届（戸籍証明書等の添付は原則不要）](https://www.city.minato.tokyo.jp/shibakoseki/kuse/kocho/faq/todokede/038.html)
- [出入国在留管理庁: 在留資格「日本人の配偶者等」](https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese01.html)
