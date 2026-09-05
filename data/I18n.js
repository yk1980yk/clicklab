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
  lead2: '「残り1個」「あと5分」「このまま放置しては危険です」。こうした表示は、あなたの判断にではなく、あなたの心理に向けて設計されています。ここは、その設計を見破る側と作る側の両方から体験する場所です。',

  chipBadge: 'タイムセール中',
  chipCta: '無料ではじめる',
  chipFine: '※ご解約はお電話でのみ承ります（平日10時〜11時）',
  chipSocial: 'いま 328人が見ています',
  chipShame: 'けっこうです、損をします',
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
  colorT1: '上に散らばっているうち、緑のボタンを最初に目で追いませんでしたか。赤は危険と停止、緑は安全と進行。多くの人がそう学習しているため、押させたい選択肢を緑にし、避けさせたい選択肢を背景に近い灰色にするだけで、文章を一切変えずに人の動きを変えられます。',
  colorT2: '嘘は書かれていません。それでも多くの人が、意図しないほうを押します。',
  noteReg: '欧州や米国では規制の対象として扱われるようになり、日本でも解約のしにくさや定期購入の表示をめぐって問題になる場面が増えました。悪意からではなく、数字を求められた結果として使ってしまう事業者も少なくありません。',

  modeDetectTag: '見破る',
  modeDetectH: '検査モード',
  modeDetectT: '20枚のページを検査台に載せ、仕掛けを見抜きます。ただし4枚だけ、まったく正当なページが混ざっています。すべてを疑う人は、そこで点を落とします。',
  modeDetectMeta: '20検体 / 約13分',
  modeDesignTag: '作る',
  modeDesignH: '設計モード',
  modeDesignT: 'あなたがマーケターとして施策を選びます。数字は上がります。ただし選んだ結果はその月では終わりません。翌月まで見てから判定されます。',
  modeDesignMeta: '8ケース / 約11分',

  fictional: '登場する企業・サービス・商品はすべて架空のものです。',
  sourceNote: '手法の名称は {link} の分類に準拠しています。',
  creditT: 'Webサイトを作る側として、同じ心理を悪用せずに成果を出す方法を考えるために作りました。',
  creditName: '株式会社Ark',

  /* 検査モード */
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
  lead2: '"Only 1 left." “5 minutes remaining.” “Your device is at risk.” Screens like these are not built to inform you. This is a place to practise both sides of that design — spotting it, and building it.',

  chipBadge: 'FLASH SALE',
  chipCta: 'Start for free',
  chipFine: '* Cancellation by phone only (weekdays 10–11am)',
  chipSocial: '328 people viewing now',
  chipShame: 'No thanks, I like losing money',
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
  noteReg: 'Regulators in Europe and the United States now treat these designs as an enforcement matter, and complaints about hard cancellations and hidden subscriptions keep rising elsewhere. Many of the companies using them are not malicious — they are under pressure to move a number.',

  modeDetectTag: 'Spot it',
  modeDetectH: 'Inspection',
  modeDetectT: 'Twenty pages go onto the examination table. Find what has been built into them. Four of the twenty are completely legitimate, so anyone who distrusts everything loses points there.',
  modeDetectMeta: '20 specimens / ~13 min',
  modeDesignTag: 'Build it',
  modeDesignH: 'Design',
  modeDesignT: 'You are the marketer choosing what to ship. The numbers will go up. But the choice does not end with this month — you are judged after next month\u2019s numbers come in.',
  modeDesignMeta: '8 cases / ~11 min',

  fictional: 'Every company, service and product shown here is fictional.',
  sourceNote: 'Pattern names follow the taxonomy at {link}.',
  creditT: 'Built by people who make websites, to work out how to succeed without exploiting the same psychology.',
  creditName: 'Ark Inc.',

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