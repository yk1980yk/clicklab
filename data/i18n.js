/* ===========================================================
   UIの文言（検体とケースの中身は stages.en.js / cases.en.js）
   HTML側は data-i18n="キー" で対応づける
   =========================================================== */
window.I18N = {

ja: {
  htmlLang: 'ja',
  docTitle: 'クリック心理ラボ — なぜ、人は思わず行動してしまうのか',
  langSwitch: 'English',
  langSwitchLabel: '言語を切り替える',

  /* タイトル */
  over: 'クリック心理ラボ',
  h1: 'なぜ、人は思わず<br>行動してしまうのか',
  lead1: '商品を売るためのマーケティングのクリックと、フィッシング詐欺のクリック。この2つには共通していることがあります。人間の心理に働きかける、という点です。',
  lead2: '「残り1個」「あと5分」「このまま放置しては危険です」。どれも、一度は見たことがあるはずです。こうした表示は、あなたの判断にではなく、あなたの心理に向けて設計されています。ここは、その設計を見破る側と作る側の両方から体験する場所です。',

  chipBadge: 'タイムセール中',
  chipCta: '無料ではじめる',
  chipFine: '※ご解約はお電話でのみ承ります（平日10時〜11時）',
  chipSocial: 'いま 328人が見ています',
  chipShame: 'いいえ、今のままで十分です',
  nameBadge: '偽の希少性',
  nameTimer: '偽の緊急性',
  nameCta: '視覚的干渉',
  nameFine: '解約の妨害',
  nameSocial: '偽の社会的証明',
  nameShame: '罪悪感の利用',
  scatterHint: '触れると、何が仕掛けられているか出ます',

  primerH: 'ダークパターンとは',
  primerT1: '利用者が意図しない行動を取るように仕向けるUI設計のこと。たとえばタイムセールのカウントダウン。翌日もう一度そのページを開くと、また同じ時間から始まっていることがあります。在庫でも期限でもなく、ページを開いた瞬間から動き出すだけの数字です。',
  primerT2: '同じ仕組みは詐欺の側でも使われます。「ウイルスに感染しました。今すぐ対処してください」という偽の警告画面が急がせるのも、タイムセールの残り時間が急がせるのも、働きかけている心理は同じものです。違うのは、その先にあるのが商品なのか、詐取なのかという点だけです。',
  colorH: '色にも仕掛けがある',
  colorT1: '上に散らばっているうち、緑のボタンを最初に目で追いませんでしたか。赤は危険と停止、緑は安全と進行。多くの人がそう学習しています。だから押させたい選択肢を緑にし、避けさせたい選択肢を背景に近い灰色にするだけで、文章を一切変えずに人の動きを変えられます。',
  colorT2: '嘘は書かれていません。それでも多くの人が、意図しないほうを押します。',
  noteReg: '欧州や米国では規制の対象として扱われるようになり、日本でも解約のしにくさや定期購入の表示をめぐって問題になる場面が増えました。ここに出てくるのは架空のサービスですが、同じ設計は、あなたが普段使っている通販や宅配の追跡、銀行のページにもあります。売りたい、続けさせたい、騙したい。動機は違っても、使われている仕組みは同じものです。',

  modeDetectTag: '見破る',
  modeDetectH: '検査モード',
  modeDetectT: '一度は見たことがあるはずのWebページ、アプリの画面、届いたメッセージ。その24枚を検査台に載せ、何が仕掛けられているかを見抜きます。マーケティングの手口も、詐欺の入り口もあります。ただし4枚はまったく正当なもので、すべてを疑う人はそこで点を落とします。',
  modeDetectMeta: '24検体 / 約16分',
  modeStart: 'はじめる',
  modeDesignTag: '作る',
  modeDesignH: '設計モード',
  modeDesignT: '実際にありそうな8つの場面で、あなたがマーケターとして施策を選びます。数字は上がります。ただし選んだ結果はその月では終わりません。翌月まで見てから判定されます。',
  modeDesignMeta: '8ケース / 約11分',

  fictional: '登場する企業・サービス・商品はすべて架空のものです。',
  sourceNote: '手法の名称は {link} の分類に準拠しています。',
  creditT: '身近なWebサイトには、いろいろな意図がちりばめられています。自衛の参考に、そして制作する時の参考に。',
  creditName: '株式会社Ark',
  privacy: 'Cookieは使っていません。記録しているのは、どこまで進んだかという数字だけです。',

  /* 検査モード */

  /* もし引っかかってしまったら */
  helpLink: 'ダークパターンや詐欺の被害にあったときの対応例',
  helpBack: '入口に戻る',
  helpOver: '被害にあったときの対応例',
  helpH: 'まず、その画面を<br>保存してください',
  helpLead: 'これは検査の結果とは関係なく、実際に被害にあったときのためのページです。多くの人は、気づいた直後にまず事業者へ連絡しようとします。そのあいだに表示が変わり、手がかりが消えることがあります。順番として、記録を残すのが先です。ここに書いたのは、誰にでも当てはまる一般的な手順だけです。',
  helpSections: [
    { h: '1　記録を残す', items: [
      '申込画面、価格の表示、小さな注記、最終確認画面をスクリーンショットで撮る',
      '確認メール、申込日時、注文番号を残す',
      '事業者名、連絡先、ページのURLを控える',
      'ページは予告なく書き換えられます。あとで食い違ったとき、手元の記録だけが手がかりになります'
    ]},
    { h: '2　何をしたかで、危険度は変わる', items: [
      'リンクを押してページが開いただけなら、多くの場合そこで止まっています。過度に心配する必要はありません',
      '「許可」を押した、ファイルを開いた、アプリや拡張機能を入れた場合は、その設定やファイルを確認して元に戻す',
      'ID・パスワードを入力した場合は、そのパスワードを変え、同じものを使い回している他のサービスも変える',
      'カード番号や口座情報を入力した場合は、カード会社や銀行の窓口に連絡する',
      '押してしまった直後は、実際より大きく捉えて動揺しがちです。何をしたかを落ち着いて数えるところから始めてください'
    ]},

    { h: '3　いま何の契約になっているか確かめる', items: [
      '単発の購入か、継続の契約か',
      '次の請求日はいつか',
      '解約の窓口はどこで、受付の条件は何か',
      '解約したつもりなら、完了画面と完了メールの両方が残っているか'
    ]},
    { h: '4　ひとりで抱えない', mark: true, items: [
      '消費者ホットライン　188（いやや）',
      '全国共通の番号で、最寄りの消費生活センターにつながります。年末年始（12月29日〜1月3日）を除き、原則毎日利用できます。相談は無料です（通話料はかかります）。',
      '相談員が話を聞いて助言するほか、事業者との交渉を手伝ったり、弁護士など専門の窓口を紹介したりします。',
      '海外の事業者との取引は、国民生活センターの越境消費者センター（CCJ）が窓口です。'
    ]},
    { h: '5　知っておくと役に立つこと', items: [
      'ダークパターンは、聞いたことのない怪しい業者だけのものではありません。日常的に使う通販、宅配の追跡、銀行やカード会社のページにも、解約しにくい導線や事前にチェックの入った同意欄は存在します。',
      '大手だから安全、という判断は成り立ちません。担当者に悪意がなくても、数字を求められた結果として同じ設計が生まれます。見るべきは会社の名前ではなく、目の前の画面です。',
      'ネット通販に、法律上のクーリング・オフはありません。訪問販売などとは扱いが違います。返品できるかどうかは、各サイトの返品特約によります。',
      'ただし返品特約の表示がない場合は、商品を受け取った日から8日以内なら返品できるとされています（送料は自己負担）。',
      '2022年6月に施行された改正特定商取引法では、定期購入であることや解約条件について誤認させる表示があった場合、申し込みを取り消せることがあります。当てはまるかどうかは個別の事情によります。',
      'カード決済なら、カード会社にも相談窓口があります。手続きや条件は会社ごとに違います。'
    ]}
  ],
  helpNote: '引っかかったのは、あなたの不注意ではありません。そう反応するように設計された画面です。だからこそ、恥ずかしさから連絡をためらうより、早く記録して早く相談するほうが結果はよくなります。',
  helpDisclaimer: 'ここに書いたのは一般的な情報です。実際にどう扱われるかは、契約の内容や経緯によって変わります。判断は消費生活センターなどの窓口にご相談ください。このサイトは法律の専門機関ではなく、個別の事案に回答することはできません。',


  /* 実際に届くメッセージの型（すべて架空） */
  smsH: '実際には、こんな形で届きます',
  smsLead: 'いずれも架空の名前です。共通しているのは、心当たりのある用件で、住所を踏ませようとする点。差出人の名前ではなく、住所と、その用件に心当たりがあるかで判断します。',
  smsHint: '触れると、見分けどころが出ます',
  smsOpen: '4通の例を見る',
  smsClose: '閉じる',
  smsItems: [
    { from: '+81 90-0000-0000', time: '今日 12:32',
      body: '【みなと信用銀行】お客様がご利用の口座が不正利用されている可能性があります。口座一時利用停止：',
      link: 'https://minato-bk.secure-check.xyz/',
      tell: '銀行が住所を短縮しない' },
    { from: '+81 70-0000-0000', time: '金曜日 13:59',
      body: '本日、お荷物をお届けしましたがご不在のため持ち帰りました。ご確認はこちら：',
      link: 'https://jp-parcel.re-check.top/',
      tell: '差出人が業者名になっていない' },
    { from: '0120-000-000', time: '昨日 20:14',
      body: '【カードサービス】通常と異なるご利用を検知しました。24時間以内にご確認いただけない場合、カードのご利用を停止します：',
      link: 'https://card-safety-confirm.info/',
      tell: '期限を切って考えさせない' },
    { from: '+81 80-0000-0000', time: '今日 09:05',
      body: 'ご注文の商品について、住所情報に不備がありました。再入力をお願いします：',
      link: 'https://order-fix-support.click/',
      tell: '何の注文かが書かれていない' }
  ],

  backTop: '入口に戻る',
  backNote: '進み具合は消えません',
  toTop: '入口へ戻る',
  resumeHint: '途中から再開できます',
  scrollHint: 'この検体は続きがあります。枠の中をスクロールできます',
  specimen: '検体',
  points: '点',
  patternLabel: '手法の名前',
  psychLabel: '働いている心理',
  checksH: '次に出会ったときの確かめ方',
  nextStage: '次の検体へ',
  verdictWhite: '正当な設計 — 疑う必要のなかった検体',
  verdictDark: '仕掛けあり — ',

  /* 設計モード */
  caseWord: 'ケース',
  scoreLine: '成果 {cv} ／ 信頼 {tr}',
  boardNow: '今月の数字',
  boardTrust: '信頼',
  laterBtn: '翌月の数字を見る',
  boardLater: '翌月',
  nextCase: '次のケースへ',
  kindDark: '仕掛けに寄った選択',
  kindGood: '正当な改善',
  kindNull: '効かない施策',

  /* 結果 */
  resultOver: '検査終了',
  catsH: '分野ごとの結果',
  missedH: '取りこぼした検体',
  retry: 'もう一度検査する',
  toDesign: '設計モードをやってみる',
  toDetect: '検査モードをやってみる',
  cvLabel: '成果',
  trLabel: '信頼',
  picksH: '選んだ内訳',
  retryCase: 'もう一度やる',

  rank: [
    { min: 92, t: '見抜く目がある', d: '仕掛けを見抜くだけでなく、正当な表示を正当だと判定できています。この2つは別の能力で、後者のほうが難しいものです。' },
    { min: 71, t: 'おおむね見抜けている', d: '多くの手法に気づけています。落とした分野が、あなたが実際に反応しやすい心理です。' },
    { min: 46, t: '反応してしまう場面がある', d: '知識の問題ではなく、その場の感情に判断を持っていかれた検体があります。急かされたときに一度離れる癖をつけるだけで、かなり変わります。' },
    { min: -1, t: '設計どおりに動かされやすい', d: '落ち込む必要はありません。これらは、そう反応するように作られたものです。仕組みを知った今は、同じ画面の見え方が変わっているはずです。' }
  ],
  crank: [
    { min: 15, t: '信頼を積みながら伸ばした', d: '成果はダークな選択を続けた場合に届きません。ただしこの伸び方は翌月も残り、積み上がっていきます。事業として見たとき、どちらが速いかは自明ではありません。' },
    { min: 0, t: 'おおむね健全', d: '大きく踏み外してはいません。効かない施策を選んだ場面があれば、そこは「原因に触れていたか」を見直す価値があります。' },
    { min: -30, t: '短期の数字を優先した場面がある', d: '選んだ瞬間は正しく見えたはずです。数字が出るまで時間差があるため、現場では気づきにくい。翌月の欄に出た項目が、その代償です。' },
    { min: -9999, t: '今月は勝った', d: 'どの施策も、その月の数字だけを見れば大成功です。実際、この選び方をした担当者は社内で評価されます。問題は、返金と解約とサポート費用が別の部署の数字として現れることです。' }
  ]
},

en: {
  htmlLang: 'en',
  docTitle: 'Click Psychology Lab — Why we act before we think',
  langSwitch: '日本語',
  langSwitchLabel: 'Switch language',

  over: 'Click Psychology Lab',
  h1: 'Why we act<br>before we think',
  lead1: 'A click that sells a product, and a click that hands your password to a stranger. The two have something in common: both are aimed at your psychology, not your judgement.',
  lead2: '“Only 1 left.” “5 minutes remaining.” “Your device is at risk.” You have seen every one of these. Screens like these are not built to inform you. This is a place to practise both sides of that design — spotting it, and building it.',

  chipBadge: 'FLASH SALE',
  chipCta: 'Start for free',
  chipFine: '* Cancellation by phone only (weekdays 10–11am)',
  chipSocial: '328 people viewing now',
  chipShame: "No thanks, I'm fine the way I am",
  nameBadge: 'Fake scarcity',
  nameTimer: 'Fake urgency',
  nameCta: 'Visual interference',
  nameFine: 'Hard to cancel',
  nameSocial: 'Fake social proof',
  nameShame: 'Confirmshaming',
  scatterHint: 'Tap any of them to see what is at work',

  primerH: 'What is a deceptive pattern',
  primerT1: 'An interface designed to make people do something they did not intend. Take the countdown on a sale page. Open the same page tomorrow and it often starts again from exactly the same number. It tracks no stock and no deadline — it simply starts running the moment the page loads.',
  primerT2: 'The same machinery drives outright fraud. A fake warning that says your device is infected and needs fixing right now works on precisely the psychology that a sale countdown works on. The only difference is what waits at the end: a product, or a theft.',
  colorH: 'Colour is part of the trick',
  colorT1: 'Among the fragments above, did your eye go to the green button first? Red means danger and stop; green means safe and go. Because almost everyone has learned this, making the preferred option green and the unwanted one a grey that melts into the background changes behaviour without changing a single word.',
  colorT2: 'Nothing written there is false. People still press the option they did not mean to press.',
  noteReg: 'Regulators in Europe and the United States now treat these designs as an enforcement matter, and complaints about hard cancellations and hidden subscriptions keep rising elsewhere. The services shown here are invented, but the same designs sit in the shop you buy from weekly, the courier tracking page and your bank. To sell you something. To keep you paying. To rob you. The motives differ; the machinery does not.',

  modeDetectTag: 'Spot it',
  modeDetectH: 'Inspection',
  modeDetectT: 'Web pages, app screens and messages that arrived — all of them things you have seen before. Twenty-four go onto the examination table, and you find what has been built into them. Marketing tricks, and the opening moves of outright fraud. Four are completely legitimate, so anyone who distrusts everything loses points there.',
  modeDetectMeta: '24 specimens / ~16 min',
  modeStart: 'Start',
  modeDesignTag: 'Build it',
  modeDesignH: 'Design',
  modeDesignT: 'Eight situations you could plausibly find yourself in, with you as the marketer choosing what to ship. The numbers will go up. But the choice does not end with this month — you are judged after next month\u2019s numbers come in.',
  modeDesignMeta: '8 cases / ~11 min',

  fictional: 'Every company, service and product shown here is fictional.',
  sourceNote: 'Pattern names follow the taxonomy at {link}.',
  creditT: 'The sites you use every day are full of intent. Something to defend yourself with, and something to build with.',
  creditName: 'Ark Inc.',
  privacy: 'No cookies. The only thing recorded is how far people get.',


  /* もし引っかかってしまったら（英語版は制度が国ごとに違うため一般論のみ） */
  helpLink: 'What to do if a deceptive pattern or scam has caught you',
  helpBack: 'Back to the start',
  helpOver: 'What to do about it',
  helpH: 'First, save<br>the screen',
  helpLead: 'This page has nothing to do with your score. It is for cases where something has actually happened. Most people\u2019s first instinct is to contact the company. Pages get changed while that is happening, and the evidence disappears. Records come first. What follows is general guidance only.',
  helpSections: [
    { h: '1　Keep a record', items: [
      'Screenshot the sign-up screen, the price display, the small print and the final confirmation',
      'Save the confirmation email, the date and time, and any order number',
      'Note the company name, contact details and the page URL',
      'Pages get rewritten without notice. If accounts differ later, your own records may be the only thing left'
    ]},
    { h: '2　What you did decides how bad this is', items: [
      'If a link merely opened a page, it very often stops there. This is not the moment to panic',
      'If you pressed Allow, opened a file, or installed an app or extension — go and check that setting or file, and undo it',
      'If you typed an ID and password, change that password, and change it anywhere else you reused it',
      'If you entered card or bank details, contact your card issuer or bank',
      'People routinely assume the worst in the first few minutes. Start by calmly counting what you actually did'
    ]},

    { h: '3　Establish what you are actually in', items: [
      'A one-off purchase, or a recurring contract',
      'When the next charge is due',
      'Where cancellation is handled, and under what conditions',
      'If you believe you cancelled — do you have both the completion screen and the confirmation email'
    ]},
    { h: '4　Do not handle it alone', mark: true, items: [
      'Contact your national or regional consumer protection body',
      'Most countries have a public body that handles exactly this kind of dispute, usually free of charge. They can advise, and in many cases contact the company on your behalf.',
      'If your card was charged, your card issuer will also have a disputes process. Terms differ between issuers.',
      'For a purchase from a company in another country, look for a cross-border consumer centre — many regions operate one.'
    ]},
    { h: '5　Worth knowing', items: [
      'Deceptive patterns are not confined to obscure operators. The retailer you buy from every week, the courier tracking page, your bank and your card provider all run interfaces with hard cancellations and pre-ticked consent boxes.',
      'A familiar brand is not a safety check. Even without any malice, the same designs appear wherever someone is under pressure to move a number. Judge the screen in front of you, not the name on it.',
      'Cooling-off rights vary widely between countries, and online purchases are often treated differently from doorstep sales.',
      'Where a return right does exist, it usually has a short deadline that starts when the goods arrive. Check quickly rather than later.',
      'Several jurisdictions have introduced rules specifically about subscriptions that were signed up for under a misleading display. Whether your case qualifies depends on the details.',
      'None of this is uniform. The body in point 3 will know which of it applies where you are.'
    ]}
  ],
  helpNote: 'Being caught by one of these is not carelessness. The screen was built to produce that reaction. Which is why acting quickly matters more than feeling embarrassed about it.',
  helpDisclaimer: 'This is general information. How any particular case is treated depends on the contract and the circumstances. Take the judgement to a consumer protection body. This site is not a legal service and cannot advise on individual cases.',


  /* Message formats people actually receive (all invented) */
  smsH: 'This is the shape they arrive in',
  smsLead: 'Every name here is invented. What they share: a subject you plausibly have business with, and a link to press. Judge by the address and whether you were expecting this — not by the name at the top.',
  smsHint: 'Tap one to see what gives it away',
  smsOpen: 'See four examples',
  smsClose: 'Close',
  smsItems: [
    { from: '+1 555-000-0000', time: 'Today 12:32',
      body: '[Harbour Trust Bank] We have detected possible unauthorised use of your account. Suspend account access here:',
      link: 'https://harbour-tr.secure-check.xyz/',
      tell: 'A bank does not shorten its own address' },
    { from: '+1 555-000-0001', time: 'Friday 13:59',
      body: 'We attempted delivery today but nobody was available. The parcel has been returned to the depot:',
      link: 'https://parcel-jp.re-check.top/',
      tell: 'The sender is a number, not the courier' },
    { from: '+1 555-000-0002', time: 'Yesterday 20:14',
      body: '[Card Services] Unusual activity detected. Your card will be suspended unless confirmed within 24 hours:',
      link: 'https://card-safety-confirm.info/',
      tell: 'A deadline, so you do not stop to think' },
    { from: '+1 555-000-0003', time: 'Today 09:05',
      body: 'There is a problem with the delivery address on your order. Please re-enter your details:',
      link: 'https://order-fix-support.click/',
      tell: 'It never says which order' }
  ],

  backTop: 'Back to the start',
  backNote: 'Your progress is kept',
  toTop: 'Back to the start',
  resumeHint: 'You can pick up where you left off',
  scrollHint: 'This specimen continues below. Scroll inside the frame',
  specimen: 'Specimen',
  points: 'pts',
  patternLabel: 'Pattern name',
  psychLabel: 'Psychology at work',
  checksH: 'How to check next time',
  nextStage: 'Next specimen',
  verdictWhite: 'Legitimate — nothing here needed suspicion',
  verdictDark: 'Something is at work — ',

  caseWord: 'Case',
  scoreLine: 'Result {cv} / Trust {tr}',
  boardNow: 'This month',
  boardTrust: 'Trust',
  laterBtn: 'See next month',
  boardLater: 'Next month',
  nextCase: 'Next case',
  kindDark: 'Leaning on the trick',
  kindGood: 'A legitimate improvement',
  kindNull: 'Does nothing',

  resultOver: 'Inspection complete',
  catsH: 'By area',
  missedH: 'Specimens you missed',
  retry: 'Run the inspection again',
  toDesign: 'Try the design mode',
  toDetect: 'Try the inspection mode',
  cvLabel: 'Result',
  trLabel: 'Trust',
  picksH: 'What you chose',
  retryCase: 'Play again',

  rank: [
    { min: 92, t: 'You see it coming', d: 'You caught the tricks and — harder than it sounds — you also recognised the legitimate screens as legitimate. Those are two separate skills, and the second one is the rarer of the two.' },
    { min: 71, t: 'Mostly catching it', d: 'You spotted most of the methods. The areas you dropped points in are the ones you actually react to.' },
    { min: 46, t: 'It gets you sometimes', d: 'This is not a knowledge problem. On some specimens the feeling of the moment carried the decision. Simply stepping away once when a screen rushes you changes a great deal.' },
    { min: -1, t: 'Working as designed', d: 'No reason to feel bad. These screens are built to produce exactly that reaction. Now that you have seen the machinery, the same pages should look different.' }
  ],
  crank: [
    { min: 15, t: 'Grew without spending trust', d: 'The raw result does not match what the deceptive choices would have produced. But this growth survives into next month and compounds. Which route is actually faster is not obvious.' },
    { min: 0, t: 'Broadly sound', d: 'Nothing badly off course. Where you picked an option that did nothing, it is worth asking whether it addressed the real reason people were leaving.' },
    { min: -30, t: 'Short-term numbers won a few times', d: 'Each choice looked right at the moment you made it. The cost arrives on a delay, which is exactly why it is hard to notice in practice. The next-month rows are that cost.' },
    { min: -9999, t: 'You won this month', d: 'Judged on this month alone, every one of those was a success — and in most companies the person who ships them gets praised. The catch is that the refunds, the cancellations and the support load land on someone else\u2019s number.' }
  ]
}

};