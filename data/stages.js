/* ===========================================================
   ステージデータ
   -----------------------------------------------------------
   1ステージ = 1オブジェクト。
   mock 内の要素に data-trap を付けると、回答後に自動で印が付く。
     data-trap="dark"  … 赤い枠（ダークパターン）
     data-trap="clear" … 緑の枠（正当な表示）
     data-label="…"    … 枠の横に出る短いラベル
   onMount(root) は検体が画面に出た直後に呼ばれる。戻り値は後片付け関数。
   =========================================================== */

window.STAGES = [

/* ---------- 1 ---------- */
{
  no: 1,
  title: '本日限定のカウントダウン',
  category: '緊急性',
  verdict: 'dark',
  url: 'ai-programming-master.example/lp',
  mock: `
    <div class="m-sale">
      <div class="m-sale__banner" data-trap="dark" data-label="根拠のない値引き">
        <span class="m-sale__badge">本日限定</span>
        AI生成プログラミング完全攻略講座
        <span class="m-sale__price"><s>50,000円</s> → <b>980円</b></span>
      </div>
      <div class="m-sale__timer" data-trap="dark" data-label="リロードで戻るタイマー">
        <span class="m-sale__timerLabel">販売終了まで</span>
        <span class="m-sale__clock" data-clock>00:04:59</span>
      </div>
      <div class="m-sale__stock" data-trap="dark" data-label="固定表示の在庫と閲覧者数">
        残り枠：あと <b>1</b> 個
        <span class="m-sale__viewers">現在 <b data-viewers>14</b> 名がこのページを閲覧中</span>
      </div>
      <button class="m-sale__cta">【残り1個】特別価格で即座に購入する</button>
      <p class="m-sale__note">※お申し込みはお一人様1回限りとさせていただきます。</p>
    </div>`,
  question: 'カウントダウンが残り1分を切りました。画面には「残り1個」と表示されています。あなたならどうしますか？',
  choices: [
    { text: '手遅れになる前に、急いで「特別価格で購入する」をクリックする', score: 0,
      feedback: '最も多くの人が選ぶ行動です。焦りが判断を飛ばした状態で、狙いどおりに動かされています。' },
    { text: '別のタブを開き、サービス名や運営会社を検索して調べる', score: 10,
      feedback: '最も確実です。一度ページから離れるだけで、焦りの効果はかなり弱まります。' },
    { text: 'ページを一度リロードしてみる', score: 8,
      feedback: 'その場で真偽が分かる、コストの低い検証です。ただし相手の素性は分からないままです。' }
  ],
  patternName: '偽の緊急性（Fake urgency）／偽の希少性（Fake scarcity）',
  psychology: 'FOMO — 取り残されることへの恐怖',
  explanation:
    '人は「今買わないと損をする」と感じると、じっくり考えるための働きが鈍り、直感で動きやすくなります。タイマーや「残り1個」の多くは在庫と連動しておらず、ページを開くたびに同じ数字から始まる固定の演出です。閲覧者数も、実際のアクセス数ではなく乱数で動いているだけのことがあります。',
  checks: [
    'リロードする。タイマーが最初の数字に戻れば、ほぼ確実に偽物',
    'シークレットウィンドウや別のブラウザで開いて、同じ数字から始まらないか見る',
    '「あと◯分」で急かされたときこそ、一度ページを閉じて評判を検索する'
  ],
  demo: {
    label: 'この検体をリロードしてみる',
    result: 'タイマーが 00:04:59 に戻りました。閲覧者数も再び14名です。この数字はサーバー上の在庫ではなく、ページを開いた瞬間から動き出すだけのものでした。'
  },
  onMount(root, st) {
    const clock = root.querySelector('[data-clock]');
    const viewers = root.querySelector('[data-viewers]');
    let left = 299;
    const paint = () => {
      const m = String(Math.floor(left / 60)).padStart(2, '0');
      const s = String(left % 60).padStart(2, '0');
      clock.textContent = `00:${m}:${s}`;
      clock.classList.toggle('is-hot', left <= 60);
    };
    paint();
    const t = setInterval(() => { left = left > 0 ? left - 1 : 0; paint(); }, 1000);
    const v = setInterval(() => {
      viewers.textContent = 12 + Math.floor(Math.random() * 6);
    }, 2600);
    root.addEventListener('lab:demo', () => { left = 299; paint(); viewers.textContent = 14; });
    return () => { clearInterval(t); clearInterval(v); };
  }
},

/* ---------- 2 ---------- */
{
  no: 2,
  title: '無料体験の入り口',
  category: '継続課金',
  verdict: 'dark',
  url: 'studyflow.example/trial',
  tall: true,
  mock: `
    <div class="m-lp">
      <div class="m-lp__nav">
        <span class="m-lp__logo">StudyFlow</span>
        <span class="m-lp__navlinks">講座一覧　料金　法人向け　ログイン</span>
      </div>
      <div class="m-lp__hero">
        <p class="m-lp__eyebrow">オンライン学習プラットフォーム</p>
        <p class="m-lp__h">3,000本の講座が、いつでもどこでも</p>
        <p class="m-lp__sub">動画・演習・添削まで、ひとつのアプリで完結します。</p>
        <button class="m-lp__cta" data-trap="dark" data-label="目立つのは入口だけ">1ヶ月無料で試す</button>
        <p class="m-lp__ctasub">クレジットカードの登録が必要です</p>
      </div>
      <div class="m-lp__stats">
        <span><b>3,204</b>講座</span><span><b>18万</b>受講者</span><span><b>4.6</b>平均評価</span>
      </div>
      <div class="m-lp__sec">
        <p class="m-lp__sech">できること</p>
        <div class="m-lp__feat"><b>動画で学ぶ</b>1本10分。移動時間でも進められます。</div>
        <div class="m-lp__feat"><b>手を動かす</b>章ごとの演習で、その場で定着を確認。</div>
        <div class="m-lp__feat"><b>添削を受ける</b>提出した課題に講師がコメントします。</div>
      </div>
      <div class="m-lp__sec">
        <p class="m-lp__sech">受講者の声</p>
        <p class="m-lp__voice">通勤の30分だけで、半年後に転職できました<span>28歳・会社員</span></p>
        <p class="m-lp__voice">わからない所をすぐ聞けるのが良かったです<span>34歳・デザイナー</span></p>
      </div>
      <div class="m-lp__sec">
        <p class="m-lp__sech">よくあるご質問</p>
        <p class="m-lp__faq"><b>スマートフォンでも受講できますか</b>はい。専用アプリをご用意しています。</p>
        <p class="m-lp__faq"><b>講座は増えますか</b>毎月20本前後を追加しています。</p>
      </div>
      <button class="m-lp__cta m-lp__cta--again">1ヶ月無料で試す</button>
      <div class="m-lp__foot">
        <p class="m-lp__footlinks">運営会社　利用規約　プライバシーポリシー　特定商取引法に基づく表記　お問い合わせ</p>
        <p class="m-lp__fine" data-trap="dark" data-label="出口の条件はここに畳まれている">※体験期間の終了後、自動的に月額9,800円の有料プランへ移行します。解約は次回更新日の10日前までに電話窓口（平日10:00〜11:00のみ受付）にて承ります。書面・Webでの解約手続きは承っておりません。</p>
        <p class="m-lp__copy">© StudyFlow</p>
      </div>
    </div>`,
  question: '「1ヶ月無料で試す」を押して登録しようとしています。次にどうしますか？',
  choices: [
    { text: 'そのままボタンを押して登録を進める', score: 0,
      feedback: '無料という言葉と巨大なボタンに視線が固定され、その下の条件が読まれないまま契約が成立します。' },
    { text: 'ボタンの下の小さい文字を読む', score: 8,
      feedback: '正しい行動です。ここに移行後の金額と解約条件が書かれていました。' },
    { text: '契約する前に、解約方法をFAQや規約で先に調べる', score: 10,
      feedback: '最も強い防御です。「入る前に出口を確認する」は、あらゆる継続課金に効きます。' }
  ],
  patternName: '隠れた継続課金（Hidden subscription）／解約させない設計（Hard to cancel）',
  psychology: '選択的注意 — 目立つものに視線が奪われ、周囲が見えなくなる',
  explanation:
    '入るのは1クリック、出るのは平日の1時間だけ受け付ける電話窓口。入口と出口の労力が極端に非対称に設計されています。人は視覚的に強い要素に注意を吸い取られるため、その真下にある小さな灰色の文字はほとんど読まれません。読ませないために小さくしているのであって、読めるように書いてあるわけではありません。この「入るのは簡単、出るのは困難」という構造は、入れても出られない捕獲器になぞらえて Roach Motel とも呼ばれてきました。現在は Hard to cancel という呼び方が一般的です。',
  checks: [
    '大きな「無料」ボタンの直下と、ページ最下部の注記を必ず読む',
    '契約前に「解約」で検索し、Web上で完結するかを確認する',
    '解約手段が電話のみ・受付時間が極端に短い場合は、契約しない判断も選択肢'
  ]
},

/* ---------- 3 ---------- */
{
  no: 3,
  title: '最終確認画面の金額',
  category: '価格表示',
  verdict: 'dark',
  url: 'sorabito-travel.example/booking/confirm',
  mock: `
    <div class="m-price">
      <div class="m-price__hero" data-trap="dark" data-label="最初に見せる価格">国内航空券 <b>5,000</b>円〜</div>
      <div class="m-price__step">4/4 お支払い内容の確認</div>
      <table class="m-price__table">
        <tr><td>航空券本体</td><td>5,000円</td></tr>
        <tr data-trap="dark" data-label="後から足されたもの"><td>システム手数料</td><td>2,000円</td></tr>
        <tr data-trap="dark" data-label="外せるかもしれない"><td>座席指定料</td><td>1,500円</td></tr>
        <tr data-trap="dark" data-label="外せるかもしれない"><td>発券手数料</td><td>1,000円</td></tr>
        <tr class="m-price__total"><td>お支払い合計</td><td>9,500円</td></tr>
      </table>
      <button class="m-price__cta">この内容で購入を確定する</button>
    </div>`,
  question: '5,000円のつもりで進めていたら、最終画面で9,500円になっていました。どう対応しますか？',
  choices: [
    { text: 'ここまで入力した時間が惜しいので、そのまま購入する', score: 0,
      feedback: '費やした時間が判断を歪めています。これから払う4,500円と、すでに使った10分は本来無関係です。' },
    { text: '追加されたオプションのチェックを外し、内訳を確認してから考え直す', score: 10,
      feedback: '正解です。座席指定料などは外せる場合があり、外せないなら「実質9,500円の商品」として比較し直せます。' },
    { text: 'どのサイトでも最終的にこうなるので、気にしない', score: 2,
      feedback: '総額を最初から表示する事業者も存在します。「どこも同じ」と思わされること自体が、この手法の効果です。' }
  ],
  patternName: '隠れコスト（Hidden costs）',
  psychology: 'サンクコスト効果 — 使った時間や手間を惜しんで、不利な選択を続けてしまう',
  explanation:
    '最初に安い数字を見せて手続きを始めさせ、引き返しにくくなった最後の画面で費用を足していく手法です。個人情報の入力を終えた段階で人はほとんど引き返しません。「〜円から」という表記は、その条件を満たす席が1つでもあれば成立してしまいます。',
  checks: [
    '「〜円から」の表示は、最安条件の1席の価格だと考える',
    '決済直前の合計額と内訳を必ず開く',
    '比較するときは、最初の表示価格ではなく総額どうしで並べる'
  ]
},

/* ---------- 4 （詐欺） ---------- */
{
  no: 4,
  title: '突然出てきた警告',
  category: '詐欺の手口',
  verdict: 'dark',
  url: 'news-digest.example/article/4471',
  mock: `
    <div class="m-scare">
      <div class="m-scare__page">
        <p class="m-scare__ptitle">今週のテクノロジー動向</p>
        <p class="m-scare__ptext">先週発表された新しい規格について、業界関係者の受け止めは分かれている。……</p>
      </div>
      <div class="m-scare__modal">
        <div class="m-scare__bar" data-trap="dark" data-label="システムの表示に似せている">⚠　セキュリティ警告</div>
        <div class="m-scare__body">
          <p class="m-scare__h">お使いの端末で <b>3件</b> の脅威が検出されました</p>
          <ul class="m-scare__list">
            <li>Trojan.Win32.Generic</li>
            <li>Adware.Tracking.Cookie</li>
            <li>PUP.Optional.Bundler</li>
          </ul>
          <p class="m-scare__timer" data-trap="dark" data-label="考える時間を奪う">駆除の受付終了まで <b>04:58</b></p>
          <button class="m-scare__cta">今すぐ駆除する</button>
          <p class="m-scare__tel" data-trap="dark" data-label="ここに電話させるのが目的">お電話でのサポート　0120-000-000（24時間受付）</p>
        </div>
      </div>
    </div>`,
  question: '記事を読んでいたら、この画面が突然表示されました。どうしますか？',
  choices: [
    { text: '表示された番号に電話して、状況を確認する', score: 0,
      feedback: 'この番号こそが目的地です。遠隔操作ソフトの導入や、サポート料金の請求につながります。' },
    { text: 'タブを閉じる。閉じられなければブラウザ自体を終了する', score: 10,
      feedback: '正解です。この画面はWebページの一部でしかないので、閉じれば何も残りません。' },
    { text: '念のため、自分のセキュリティソフトでスキャンする', score: 6,
      feedback: '害はありませんし、慎重な判断です。ただ実際には何も検出されません。この画面が広告だと気づくほうが早く済みます。' }
  ],
  patternName: '偽の警告（Scareware）',
  psychology: '恐怖による思考の停止 — 危険だと感じた瞬間、人は指示に従いやすくなる',
  explanation:
    'Webページは、あなたの端末の中を調べることができません。つまり感染を検出することも原理的に不可能です。それでも本物らしく見えるのは、システムの警告に似た配色と、意味のありそうなウイルス名と、カウントダウンが揃っているからです。狙いは駆除ではなく、電話をかけさせて遠隔操作を許可させることにあります。',
  checks: [
    'ブラウザの中に出た警告は、端末の警告ではない',
    'ウイルス対策の通知に電話番号が載ることはまずない',
    '閉じられないときは、ブラウザごと終了する（タスクを切る）'
  ]
},

/* ---------- 5 ---------- */
{
  no: 5,
  title: '注文確定の直前',
  category: '初期設定',
  verdict: 'dark',
  url: 'bookdrop.example/cart/checkout',
  mock: `
    <div class="m-cart">
      <div class="m-cart__item">
        <span>電子書籍『はじめてのUXリサーチ』</span><b>1,800円</b>
      </div>
      <label class="m-cart__opt" data-trap="dark" data-label="最初から入っている">
        <input type="checkbox" checked>
        <span>安心の保証パック（月額500円・初月無料）</span>
      </label>
      <label class="m-cart__opt" data-trap="dark" data-label="最初から入っている">
        <input type="checkbox" checked>
        <span>お得な情報をメールで受け取る</span>
      </label>
      <div class="m-cart__sum">お支払い合計 <b>1,800円</b><span class="m-cart__sumNote">（保証パックは翌月より課金）</span></div>
      <button class="m-cart__cta">注文を確定する</button>
    </div>`,
  question: '「注文を確定する」を押す前に、確認すべきポイントはどこですか？',
  choices: [
    { text: '支払う合計金額が合っているかだけ見ればよい', score: 2,
      feedback: '合計は1,800円のままです。翌月から始まる課金は、今日の合計には現れません。' },
    { text: '最初からチェックが入っているオプションがないか確認する', score: 10,
      feedback: '正解です。この画面では2つとも既に入っており、外さない限り同意したことになります。' },
    { text: 'メルマガは後から解除できるので気にしない', score: 3,
      feedback: 'メール1つならそうかもしれません。ただ同じ場所に、月額課金のチェックも並んでいました。' }
  ],
  patternName: '事前選択（Preselection）／忍び込ませ（Sneaking）',
  psychology: 'デフォルト効果 — 初期状態のまま変更しない傾向',
  explanation:
    '人は初期設定を「推奨された標準」と受け取り、そのまま進みます。判断していないのに、同意した記録だけが残るのがこの手法の核心です。今日の請求額を変えないことで、確認の目をすり抜けます。',
  checks: [
    'チェックボックスは「最初から入っているもの＝疑うもの」として見る',
    '合計金額だけでなく、翌月以降に発生する費用がないか探す',
    '注文確定ボタンの周囲は、意図的に情報が置かれる場所だと知っておく'
  ]
},

/* ---------- 6 ---------- */
{
  no: 6,
  title: '会員登録の分かれ道',
  category: '視覚誘導',
  verdict: 'dark',
  url: 'lumipic.example/signup/plan',
  tall: true,
  mock: `
    <div class="m-plan2">
      <div class="m-lp__nav">
        <span class="m-lp__logo">Lumipic</span>
        <span class="m-lp__navlinks">ヘルプ</span>
      </div>
      <div class="m-plan2__body">
        <p class="m-plan2__step">あと1ステップで完了します</p>
        <p class="m-plan2__h">プランを選んでください</p>
        <div class="m-plan2__card">
          <p class="m-plan2__badge">おすすめ</p>
          <p class="m-plan2__name">プレミアム</p>
          <p class="m-plan2__price">月額 <b>1,200</b>円</p>
          <ul class="m-plan2__list">
            <li>広告なしで閲覧できます</li>
            <li>写真を無制限に保存できます</li>
            <li>高画質でダウンロードできます</li>
            <li>サポートに優先的につながります</li>
          </ul>
          <button class="m-plan2__paid" data-trap="dark" data-label="押させたい方だけ目立たせる">プレミアム会員に登録する</button>
          <p class="m-plan2__note">いつでも解約できます</p>
        </div>
        <div class="m-plan2__row">
          <span class="m-plan2__ghost" data-trap="dark" data-label="背景と同化させた出口">無料のまま続ける</span>
        </div>
      </div>
      <div class="m-lp__foot">
        <p class="m-lp__footlinks">運営会社　利用規約　プライバシーポリシー　お問い合わせ</p>
        <p class="m-lp__copy">© Lumipic</p>
      </div>
    </div>`,
  question: 'お金をかけず無料で使いたい場合、どうしますか？',
  choices: [
    { text: '目立っている大きなボタンを押す', score: 0,
      feedback: '文字は「プレミアム会員に登録する」でした。色と大きさだけで進行方向を判断すると、こうなります。' },
    { text: '画面下の薄い灰色の文字を押す', score: 10,
      feedback: '正解です。目立たない側が、実は求めていた選択肢でした。' },
    { text: '一度戻って、無料プランの案内ページを探す', score: 5,
      feedback: '慎重ですが、この画面には無料の選択肢がすでにあります。見つけにくくされているだけです。' }
  ],
  patternName: '視覚的干渉（Visual interference）',
  psychology: '色と大きさによる誘導 — 人は文字より先に、形と色で「進む方向」を決める',
  explanation:
    'ボタンの見た目は本来「重要さ」を伝える手がかりですが、それを事業者に都合のよい側へ割り当てると、誤操作が起こります。嘘は一切書かれていません。にもかかわらず、多くの人が意図しない方を押します。',
  checks: [
    '色や大きさではなく、書かれている文字を読んでから押す',
    '「進む側」が2つあるように見えたら、それぞれが何をする操作か確認する',
    '目立たない選択肢が意図的に隠されていないか、画面の隅まで見る'
  ]
},

/* ---------- 7 （ホワイト） ---------- */
{
  no: 7,
  title: 'チケット予約のタイマー',
  category: '正当性の判別',
  verdict: 'white',
  url: 'ticket-gate.example/seat/hold',
  mock: `
    <div class="m-hold">
      <div class="m-hold__seat" data-trap="clear" data-label="確保済みの実体がある">
        座席を確保しました　<b>1階 J列 12・13番</b>
      </div>
      <div class="m-hold__timer" data-trap="clear" data-label="サーバー側で管理された時間">
        決済完了まで <span class="m-hold__clock" data-clock>10:00</span>
      </div>
      <p class="m-hold__note">時間内に決済が完了しない場合、確保は自動的に解除され、他のお客様が購入できる状態に戻ります。</p>
      <button class="m-hold__cta">決済に進む</button>
    </div>`,
  question: 'このタイマーはダークパターンでしょうか？',
  choices: [
    { text: 'ダークパターンだ。タイマーで焦らせて買わせようとしている', score: 2,
      feedback: '疑う姿勢は大切ですが、これは焦らせるための演出ではありません。何でも疑うことは、見抜く力とは違います。' },
    { text: 'ダークパターンではない。他の購入希望者のための、正当なセッション管理', score: 10,
      feedback: '正解です。確保された座席という実体があり、時間はそれを解放するために存在しています。' },
    { text: '画面を更新してタイマーを止めれば安全になる', score: 0,
      feedback: 'サーバー側で管理されているため止まりません。むしろ二重操作として確保が解除される場合があります。' }
  ],
  patternName: '正当なセッション管理（ホワイト）',
  psychology: '同じ「制限時間」でも、守っている対象が違う',
  explanation:
    '検体1のタイマーは在庫の実体を持たず、ユーザーを急がせるためだけに動いていました。こちらは実際に座席が押さえられており、時間は他の購入希望者のために確保を解放する仕組みです。リロードしても時間は戻らず、サーバー側で数え続けられている点が決定的な違いです。',
  checks: [
    'リロードで時間が戻らないなら、サーバー側で管理された本物',
    '「何のための制限か」が説明されているかを見る',
    '時間切れで失うものが具体的（この座席）なら、実体がある可能性が高い'
  ],
  demo: {
    label: 'この検体をリロードしてみる',
    result: 'タイマーは戻りませんでした。残り時間はサーバー側で数えられているため、画面を開き直しても続きから表示されます。検体1との決定的な違いがここです。'
  },
  onMount(root, st) {
    const clock = root.querySelector('[data-clock]');
    let left = 600;
    const paint = () => {
      clock.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    };
    paint();
    const t = setInterval(() => { left = left > 0 ? left - 1 : 0; paint(); }, 1000);
    root.addEventListener('lab:demo', () => { paint(); });
    return () => clearInterval(t);
  }
},

/* ---------- 8 ---------- */
{
  no: 8,
  title: 'クーポンを断るとき',
  category: '感情操作',
  verdict: 'dark',
  url: 'modeclip.example/campaign',
  mock: `
    <div class="m-shame">
      <div class="m-shame__card">
        <p class="m-shame__h">初回限定 1,000円OFF</p>
        <button class="m-shame__yes">はい、キレイになりたい</button>
        <p class="m-shame__no" data-trap="dark" data-label="断る側に恥を持たせている">いいえ、今のままの自分で十分です</p>
      </div>
    </div>`,
  question: 'この文言を見たとき、あなたならどう感じ、どう行動しますか？',
  choices: [
    { text: '割引が出ているうちに買っておく', score: 0,
      feedback: '嫌な気分を避けるための購入で、商品が必要かどうかは判断していません。' },
    { text: '煽られているだけだと理解し、不要なら断る', score: 10,
      feedback: '正解です。文言に含まれる感情を切り離して、必要かどうかだけで決められています。' },
    { text: '文言は不快だが割引自体は本物なので、必要なら使う', score: 6,
      feedback: '筋は通っています。ただ「必要なら」の判断が、この一文を読んだ後でも揺らいでいないかは確かめる価値があります。' }
  ],
  patternName: '罪悪感の利用（Confirmshaming）',
  psychology: '自己否定の回避 — 恥ずかしさを感じる選択肢を人は選びたがらない',
  explanation:
    '断るという操作そのものに、自分についての宣言を紐づける手法です。一見すると穏やかな一文ですが、押そうとすると引っかかる。「今のままで十分」と言い切れる人は多くないからです。商品が必要かどうかではなく、自分をどう思っているかを問われています。',
  checks: [
    '拒否ボタンの文言が感情的なら、それは判断材料ではなく演出',
    '「その商品が自分に必要か」だけを基準に戻す',
    '断りにくさを感じたら、それ自体が設計された感覚だと気づく'
  ]
},

/* ---------- 9 ---------- */
{
  no: 9,
  title: '相場よりかなり安い出品',
  category: '情報の真偽',
  verdict: 'dark',
  url: 'marketnest.example/item/8842190',
  mock: `
    <div class="m-bait">
      <div class="m-bait__title">【新品未開封】次世代ゲーム機 本体</div>
      <div class="m-bait__price" data-trap="dark" data-label="注意を奪う数字">特別価格 <b>19,800</b>円 <s>希望小売価格 49,800円</s></div>
      <div class="m-bait__img">商品画像（本体の写真）</div>
      <div class="m-bait__spec">
        <p>・すぐに発送します</p>
        <p>・送料無料</p>
        <p class="m-bait__hidden" data-trap="dark" data-label="ここに本当の商品が書いてある">※本商品はゲーム機本体を模したプラスチック製の収納ケースです。ゲーム機本体は含まれません。</p>
      </div>
      <button class="m-bait__cta">カートに入れる</button>
    </div>`,
  question: '相場より極端に安い商品を見つけたとき、最初に確認すべきことは？',
  choices: [
    { text: '万一違っても返品できるはずなので、まず買って確かめる', score: 2,
      feedback: '返品には期限と条件があります。この出品は「説明に書いてあった」と反論できる状態なので、争いになると出品者が強い。' },
    { text: '商品タイトルだけでなく、詳細と注意事項を最後まで読む', score: 10,
      feedback: '正解です。この出品では、注記に「本体は含まれません」と書かれていました。' },
    { text: '出品者の評価が高く件数も多いので信用する', score: 3,
      feedback: 'その評価は別の商品で積み上げたものかもしれません。出品者の実績と、この一件の中身は別に見る必要があります。' }
  ],
  patternName: '誤解を招く表記（Trick wording）',
  psychology: 'アンカリング効果 — 最初に見た数字が基準になり、以降の確認が甘くなる',
  explanation:
    'あり得ない安さを最初に見せることで、その一点に注意が集まり、細部の確認が省略されます。注記は嘘ではなく、読まれない場所に置かれているだけ。だからこそ「書いてあった」と言い返されます。安い商品で客を引き寄せて別のものを渡すという点で、いわゆる「おとり商法」に近い手口です。',
  checks: [
    '相場から大きく外れた価格には理由があると考える',
    '商品説明は最下部まで読む。特に「※」で始まる行',
    '写真ではなく、仕様欄に何が含まれるかを確認する'
  ]
},

/* ---------- 10 （詐欺） ---------- */
{
  no: 10,
  title: '不在通知のメッセージ',
  category: '詐欺の手口',
  verdict: 'dark',
  url: 'SMS（差出人：+81 90-0000-0000）',
  mock: `
    <div class="m-sms">
      <div class="m-sms__head">
        <span class="m-sms__from" data-trap="dark" data-label="登録のない番号">+81 90-0000-0000</span>
        <span class="m-sms__time">今日 14:32</span>
      </div>
      <div class="m-sms__bubble">
        <p>お荷物のお届けにあがりましたが、ご不在のため持ち帰りました。</p>
        <p>ご確認は下記より　<span class="m-sms__link" data-trap="dark" data-label="公式ではない住所">https://jp-delivery-check.xyz/re</span></p>
        <p class="m-sms__sign">※本日中にご確認ください</p>
      </div>
      <div class="m-sms__prev">
        <p class="m-sms__old">［前日］定期便の発送が完了しました</p>
      </div>
    </div>`,
  question: '注文した荷物を待っています。そこにこのメッセージが届きました。',
  choices: [
    { text: 'リンクを開いて、再配達を依頼する', score: 0,
      feedback: '内容は嘘でも、荷物を待っている状況は本当です。そのかみ合いが疑いを消します。' },
    { text: 'リンクは開かず、公式アプリか伝票番号で自分から確認する', score: 10,
      feedback: '正解です。届いたものから辿らず、自分の知っている入口から確認するのが原則です。' },
    { text: 'リンクを開いて、住所が正しいか確かめてから入力する', score: 3,
      feedback: '順番が逆です。住所の確認は開く前にするもので、開いた時点で読み込みは終わっています。' }
  ],
  patternName: 'フィッシング（Phishing）',
  psychology: '状況との一致 — 内容が嘘でも、置かれている状況が本当なら疑いは消える',
  explanation:
    'この手口が強いのは、多くの人がいつも何かの荷物を待っているからです。無差別に送っても、一定の割合で「ちょうど待っていた人」に当たります。住所は公式によく似せてありますが、末尾が違います。急がせる一文が添えられているのは、確認する時間を与えないためです。',
  checks: [
    '配送業者を名乗るメッセージでも、リンクからは辿らない',
    '伝票番号を自分で公式サイトに入力して確認する',
    '見慣れない末尾（.xyz .top など）や短縮された住所は特に警戒する'
  ]
},

/* ---------- 11 ---------- */
{
  no: 11,
  title: '解約手続きの道のり',
  category: '継続課金',
  verdict: 'dark',
  url: 'flowbox.example/account/cancel',
  mock: `
    <div class="m-maze" data-trap="dark" data-label="出口までの摩擦を増やしている">
      <div class="m-maze__bar"><span data-maze-step>1</span> / 5</div>
      <div class="m-maze__body" data-maze-body>
        <p class="m-maze__h">本当に解約しますか？</p>
        <p class="m-maze__t">これまでに保存した128件のデータが利用できなくなります。</p>
      </div>
      <div class="m-maze__btns">
        <button class="m-maze__stay">プランを継続する</button>
        <button class="m-maze__go" data-maze-next>解約を続ける</button>
      </div>
    </div>`,
  question: '解約の途中で引き止め画面が何度も出た場合、正しい対処はどれですか？',
  choices: [
    { text: '面倒になったので、翌月また試すことにして離脱する', score: 0,
      feedback: 'それがこの設計の目的です。翌月も同じ画面が待っており、その間の課金は続きます。' },
    { text: '「解約を続ける」を選び、完了画面が出るまで進める', score: 10,
      feedback: '正解です。完了画面と完了メールの両方を確認するまで、解約は成立していません。' },
    { text: 'サポート窓口に連絡して、代わりに解約してもらう', score: 5,
      feedback: '有効な場合もありますが、連絡してから完了するまでの間も課金は続きます。目の前の手続きを終えるほうが早く確実です。' }
  ],
  patternName: '妨害（Obstruction）／解約させない設計（Hard to cancel）',
  psychology: '意思決定の疲労 — 手順が増えるほど、人は途中で諦める',
  explanation:
    '一つひとつの画面はどれも「確認」や「アンケート」という名目を持っており、単体では問題があるように見えません。5回重ねることで諦めさせるのが目的です。登録が1クリックで、解約が5画面という非対称そのものが手法です。',
  checks: [
    '「解約が完了しました」の表示が出るまでブラウザを閉じない',
    '完了メールが届いたかを必ず確認し、画面のスクリーンショットを残す',
    '次回請求日を確認し、請求が止まったかを翌月に照合する'
  ],
  mazeSteps: [
    { h: '本当に解約しますか？', t: 'これまでに保存した128件のデータが利用できなくなります。' },
    { h: 'サービス改善のためのアンケート', t: '解約の理由をお聞かせください（所要時間およそ5分）。' },
    { h: '特別なご案内', t: '今なら3ヶ月間、半額でご継続いただけます。' },
    { h: 'ご利用状況の確認', t: '先月は12回ご利用いただきました。本当によろしいですか？' },
    { h: '最終確認', t: '解約を確定するには、下のボタンをもう一度押してください。' }
  ],
  onMount(root, st) {
    const steps = st.mazeSteps;
    let i = 0;
    const body = root.querySelector('[data-maze-body]');
    const num = root.querySelector('[data-maze-step]');
    const next = root.querySelector('[data-maze-next]');
    next.addEventListener('click', () => {
      i = Math.min(i + 1, steps.length - 1);
      num.textContent = i + 1;
      body.innerHTML = `<p class="m-maze__h">${steps[i].h}</p><p class="m-maze__t">${steps[i].t}</p>`;
      body.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160 });
    });
  }
},

/* ---------- 12 （ホワイト） ---------- */
{
  no: 12,
  title: 'ホテルの残室表示',
  category: '正当性の判別',
  verdict: 'white',
  url: 'stayfinder.example/hotel/kyoto-1024',
  mock: `
    <div class="m-stay">
      <div class="m-stay__name">京都・四条 ホテル鴨川ステイ</div>
      <div class="m-stay__room">
        <span>スタンダードツイン（禁煙・24㎡）</span>
        <span class="m-stay__left" data-trap="clear" data-label="在庫と連動した事実">この客室は残り2室です</span>
      </div>
      <div class="m-stay__row">10月12日（土）1泊2名　<b>18,400円</b></div>
      <div class="m-stay__cal" data-trap="clear" data-label="他の日付では表示が変わる">
        <span>10/11 空室あり</span><span>10/12 残り2室</span><span>10/13 満室</span>
      </div>
      <button class="m-stay__cta">この客室を予約する</button>
    </div>`,
  question: 'この「残り2室」という表示はダークパターンでしょうか？',
  choices: [
    { text: 'ダークパターンだ。「残り」と書いて不安にさせている', score: 2,
      feedback: '言葉は似ていますが、こちらは実在の在庫を伝えています。表現だけで判定すると誤ります。' },
    { text: 'ダークパターンではない。実際の在庫と連動した事実の共有', score: 10,
      feedback: '正解です。他の日付では表示が変わり、他サイトと照合しても一致します。' },
    { text: '予約サイトの「残り◯個」はすべて嘘である', score: 0,
      feedback: 'すべてを嘘と決めつけると、本当に残り2室のときに部屋を取り逃します。' }
  ],
  patternName: '真実の在庫表示（ホワイト）',
  psychology: '同じ表現でも、裏にデータがあるかどうかで意味が変わる',
  explanation:
    '検体1の「残り1個」は在庫と無関係な固定表示でした。こちらは日付を変えれば表示も変わり、他の予約サイトと照合しても一致します。判断の基準は言葉づかいではなく、その数字が何と連動しているかです。',
  checks: [
    '条件（日付・人数）を変えたときに、数字も変わるかを見る',
    '別の予約サイトや公式サイトと照合する',
    '在庫が減る様子が不自然に速い場合だけを疑う'
  ]
},

/* ---------- 13 ---------- */
{
  no: 13,
  title: '診断アプリの権限要求',
  category: '個人情報',
  verdict: 'dark',
  url: 'app: 性格まるわかり診断',
  mock: `
    <div class="m-perm">
      <div class="m-perm__app">性格まるわかり診断</div>
      <div class="m-perm__dialog" data-trap="dark" data-label="機能と無関係な権限">
        <p class="m-perm__t">友達と結果を共有するために、連絡先へのアクセスを許可してください</p>
        <div class="m-perm__btns">
          <span class="m-perm__deny" data-trap="dark" data-label="拒否しても繰り返し出る">許可しない</span>
          <span class="m-perm__allow">許可</span>
        </div>
      </div>
    </div>`,
  question: '心理テスト風のアプリで連絡先の権限を求められました。どうしますか？',
  choices: [
    { text: 'アプリを動かすのに必要そうなので許可する', score: 0,
      feedback: '診断結果の表示に連絡先は不要です。必要そうに見える文言が添えられているだけです。' },
    { text: '診断に不要な権限なので許可せず、繰り返し出るならアプリを削除する', score: 10,
      feedback: '正解です。拒否した後もしつこく求めてくること自体が、収集が目的である証拠になります。' },
    { text: '一度許可してから、あとで設定で権限を切る', score: 5,
      feedback: '有効な対処ですが、許可した瞬間に読み取りが終わっていることがあります。切っても、渡した分は戻りません。' }
  ],
  patternName: '強制的な同意（Forced action）／しつこい要求（Nagging）',
  psychology: '目的のすり替え — 使いたい気持ちを利用し、機能と無関係な情報を差し出させる',
  explanation:
    '「友達と共有するため」という説明は、連絡先の読み取りが必要な理由になっていません。共有はリンクを送るだけで足ります。そして拒否しても繰り返し表示することで、いつか押させることを狙っています。自分だけでなく、連絡先に入っている人たちの情報を渡す点も重要です。',
  checks: [
    'その権限が、アプリの機能に本当に必要かを考える（電卓に位置情報は不要）',
    '拒否した後も繰り返し要求されるアプリは、収集自体が目的だと考える',
    '連絡先・写真・位置情報は、渡すと取り消しにくい情報として扱う'
  ]
},

/* ---------- 14 ---------- */
{
  no: 14,
  title: 'ランキング1位のバッジ',
  category: '情報の真偽',
  verdict: 'dark',
  url: 'glowcare.example/product/serum',
  mock: `
    <div class="m-proof">
      <div class="m-proof__badges" data-trap="dark" data-label="根拠の注記がない">
        <span>満足度 99.8%</span><span>ランキング 1位</span><span>雑誌掲載多数</span>
      </div>
      <div class="m-proof__name">グロウケア モイストセラム</div>
      <div class="m-proof__stars">★★★★★ 4.9（1,284件）</div>
      <div class="m-proof__reviews" data-trap="dark" data-label="投稿日が同日に集中">
        <p>使って3日で変わりました！ <span>2026/08/12</span></p>
        <p>もう手放せません。友人にも勧めました <span>2026/08/12</span></p>
        <p>期待以上でした。リピート確定です <span>2026/08/12</span></p>
      </div>
      <button class="m-proof__cta">今すぐ購入する</button>
    </div>`,
  question: 'このランキング1位や高評価の表示を、どう受け止めるべきですか？',
  choices: [
    { text: '大きく書かれているので、間違いなく評判の良い商品だ', score: 0,
      feedback: '表示の大きさは、根拠の強さとは無関係です。' },
    { text: '調査機関や時期の記載がないため、自社基準の可能性を考える', score: 10,
      feedback: '正解です。あわせてレビューの投稿日が同じ日に集中している点も手がかりになります。' },
    { text: '1位と書けば法律で罰せられるので、嘘のわけがない', score: 3,
      feedback: '確かに景品表示法の対象ですが、摘発は事後で、根拠の曖昧な表示は今も広く残っています。' }
  ],
  patternName: '偽の社会的証明（Fake social proof）',
  psychology: 'バンドワゴン効果 — 多くの人が支持しているものを、無条件に正しいと感じる',
  explanation:
    '「1位」は、調査対象・期間・母数を自社で決めればいくらでも作れます。日本では合理的な根拠のない優良誤認表示は景品表示法の規制対象ですが、規制があることと、表示が正しいこととは別です。注記のない数値は、根拠の提示を省いた表示だと考えるのが安全です。',
  checks: [
    '数値やバッジの近くに、調査期間・対象人数・調査機関の注記があるか探す',
    'レビューの投稿日が特定の日に集中していないか見る',
    '文章の言い回しが揃いすぎているレビュー群は、出所を疑う'
  ]
},

/* ---------- 15 ---------- */
{
  no: 15,
  title: '正直レビューという記事',
  category: '情報の真偽',
  verdict: 'dark',
  url: 'kurashi-note.example/review/serum',
  mock: `
    <div class="m-stealth">
      <div class="m-stealth__meta">くらしノート ／ 2026.08.28</div>
      <h4 class="m-stealth__h" data-trap="dark" data-label="第三者の体験談を装う">【正直レビュー】評判の美容液を3ヶ月使ってみた結果</h4>
      <p class="m-stealth__lead">こんにちは、ライターの佐藤です。今回は自腹で購入した…</p>
      <p class="m-stealth__body">正直あまり期待していなかったのですが、1ヶ月を過ぎたあたりから明らかに変化を感じました。もう手放せません。</p>
      <a class="m-stealth__cta" data-trap="dark" data-label="広告表記がどこにもない">公式サイトで詳しく見る →</a>
      <div class="m-stealth__foot">カテゴリ：スキンケア　｜　この記事をシェア</div>
    </div>`,
  question: 'この記事を読んで、商品を買おうとしています。次にどうしますか？',
  choices: [
    { text: '実際に使った人の感想なので、信頼して購入する', score: 0,
      feedback: '第三者の感想だと思った時点で、警戒が下がります。それがこの形式の目的です。' },
    { text: 'ページ全体に「PR」「広告」「提供」の表記がないか確認する', score: 10,
      feedback: '正解です。表記が見つからない場合、広告である可能性を前提に読み直せます。' },
    { text: '他のサイトでも同じ商品が高評価か、いくつか見て回る', score: 6,
      feedback: '有効ですが、同じ広告主が複数の媒体に出稿していることがあります。まずこの記事に表記があるかを見るほうが早い。' }
  ],
  patternName: '偽装広告（Disguised ads）',
  psychology: '第三者の意見だと思うと、誇張を差し引いて読む警戒が働かなくなる',
  explanation:
    '広告だと分かっていれば、人は「良いところしか書いていないだろう」と割り引いて読みます。その警戒を外すために、個人の記事に見せかける手法です。日本では2023年10月1日から、広告であることを隠した表示は景品表示法の不当表示（いわゆるステマ規制）にあたります。処分を受けるのは投稿した個人ではなく、広告主である事業者です。',
  checks: [
    '記事の冒頭と末尾に「PR」「広告」「提供」の表記がないか探す',
    '商品リンクにアフィリエイトの識別子が付いていないか見る',
    '同じ商品を同じ時期に絶賛する記事が大量にないか検索する'
  ]
},

/* ---------- 16 （詐欺） ---------- */
{
  no: 16,
  title: '共有ファイルを開こうとしたら',
  category: '詐欺の手口',
  verdict: 'dark',
  url: 'メールのリンクから開いた画面',
  mock: `
    <div class="m-phish">
      <div class="m-phish__urlbar" data-trap="dark" data-label="よく見ると綴りが違う">
        <span class="m-phish__lock">🔒</span> https://d0cbox-share.com/login
      </div>
      <div class="m-phish__body">
        <p class="m-phish__logo">DocBox</p>
        <p class="m-phish__lead" data-trap="dark" data-label="開く理由を先に用意している">共有されたファイルを表示するには、サインインしてください</p>
        <p class="m-phish__file">📄 2026年度_予算案_最終.xlsx</p>
        <input class="m-phish__in" placeholder="メールアドレス" readonly>
        <input class="m-phish__in" placeholder="パスワード" type="password" readonly>
        <button class="m-phish__cta">サインイン</button>
        <p class="m-phish__or">または</p>
        <button class="m-phish__sso">別のアカウントでサインイン</button>
        <p class="m-phish__foot">プライバシー　利用規約　ヘルプ</p>
      </div>
    </div>`,
  question: '同僚から共有リンクが届き、開いたらこの画面が出ました。',
  choices: [
    { text: 'いつも使っているサービスなので、メールとパスワードを入力する', score: 0,
      feedback: '見た目は本物です。ただし住所の「o」が数字の「0」になっていました。入力した情報は相手に届きます。' },
    { text: '住所を確かめる。少しでも違えば入力せず、公式サイトから開き直す', score: 10,
      feedback: '正解です。ファイルが本当に共有されているなら、公式サイトにログインすれば見えるはずです。' },
    { text: 'パスワードを打たずに「別のアカウントでサインイン」を選ぶ', score: 2,
      feedback: '一見安全ですが、この画面が偽物なら、その先に出るのも偽の認証画面です。判断すべきはボタンではなく住所です。' }
  ],
  patternName: '認証情報の窃取（Credential harvesting）',
  psychology: '文脈の先回り — 「なぜログインが要るのか」の理由が先に用意されている',
  explanation:
    '見た目を似せることは難しくありません。決め手になるのは住所だけです。ここでは o が数字の 0 に置き換えられています。ファイル名が具体的で、社内で扱いそうな名前になっているのも意図的です。中身が気になるほど、住所の確認は後回しになります。',
  checks: [
    'ログイン画面が出たら、まず住所を最後まで読む',
    'メールやメッセージのリンクからではなく、自分でブックマークや検索から開き直す',
    'パスワード管理ソフトが自動入力しない時点で、住所が違うと疑う'
  ]
},

/* ---------- 17 ---------- */
{
  no: 17,
  title: 'ゲーム内通貨での買い物',
  category: '価格表示',
  verdict: 'dark',
  url: 'app: スターリング・サーガ',
  mock: `
    <div class="m-coin">
      <div class="m-coin__bar">所持 <b>3,000</b> G</div>
      <div class="m-coin__item">
        <div class="m-coin__thumb">限定スキン</div>
        <div class="m-coin__info">
          <p class="m-coin__name">星辰の外套（期間限定）</p>
          <p class="m-coin__price" data-trap="dark" data-label="円ではない単位">1,200 G</p>
        </div>
      </div>
      <button class="m-coin__cta">購入する</button>
      <p class="m-coin__rate" data-trap="dark" data-label="レートはここにだけ">※Gは有償通貨です。1,000G＝1,200円（1,000G未満の単位ではご購入いただけません）</p>
    </div>`,
  question: 'この1,200Gのアイテムを買うと、実際にはいくら払うことになりますか？',
  choices: [
    { text: '1,200円', score: 0,
      feedback: '1G＝1円だと感じたなら、それがこの表示の狙いどおりです。実際は1,440円です。' },
    { text: '日本円に換算してから、買うかどうか決める', score: 10,
      feedback: '正解です。1,200Gは1,440円。さらに1,000G単位でしか買えないため、端数が残ります。' },
    { text: '手持ちの3,000Gで足りるので、追加の出費はない', score: 4,
      feedback: '今回は追加課金なしで買えます。ただしそのGは現金で買ったもので、残る1,800Gも1,000G単位でしか補充できません。' }
  ],
  patternName: '通貨の混同（Currency Confusion）',
  psychology: '実際の金額から単位が一段離れると、支出の痛みが薄れる',
  explanation:
    '1,200Gは1,440円ですが、Gという単位を挟むだけで金額の実感が薄れます。さらに1,000G単位でしか購入できないため、買い物のたびに使い切れない端数が残り、それを使うために追加購入が必要になります。端数が残ること自体が設計です。',
  checks: [
    '購入前に、必ず日本円に換算する',
    '通貨パックの単価を比べる（大口が割安なら、小口は割高ということ）',
    '残高が半端に余る単位設定になっていないか見る'
  ]
},

/* ---------- 18 ---------- */
{
  no: 18,
  title: '3つのプランの料金表',
  category: '価格表示',
  verdict: 'dark',
  url: 'workflow-hub.example/pricing',
  mock: `
    <div class="m-cmp">
      <div class="m-cmp__col">
        <p class="m-cmp__n">ライト</p>
        <p class="m-cmp__p" data-trap="dark" data-label="単位がばらばら">1日あたり<b>33</b>円</p>
        <p class="m-cmp__f">・基本機能<br>・メールサポート</p>
      </div>
      <div class="m-cmp__col is-rec">
        <p class="m-cmp__n">スタンダード</p>
        <p class="m-cmp__p">月額<b>1,480</b>円</p>
        <p class="m-cmp__f" data-trap="dark" data-label="機能名が揃っていない">・充実のサポート体制<br>・高度な分析</p>
      </div>
      <div class="m-cmp__col">
        <p class="m-cmp__n">プロ</p>
        <p class="m-cmp__p">年額<b>14,800</b>円</p>
        <p class="m-cmp__f">・すべての機能<br>・優先対応</p>
      </div>
    </div>`,
  question: 'どのプランが一番安いか比べようとしています。どうしますか？',
  choices: [
    { text: '「1日あたり33円」が一番安いので、ライトを選ぶ', score: 0,
      feedback: '1日33円は月額約1,000円です。年額14,800円は月額換算で約1,233円。順序は見た目の印象と違います。' },
    { text: 'すべて同じ単位（月額）に直してから比べる', score: 10,
      feedback: '正解です。揃えると、ライト約1,000円／スタンダード1,480円／プロ約1,233円。真ん中が最も高いと分かります。' },
    { text: '真ん中が無難そうなので、スタンダードを選ぶ', score: 2,
      feedback: '3つ並ぶと真ん中が選ばれやすく、そこに一番高いものを置くのは定番の配置です。' }
  ],
  patternName: '比較の妨害（Comparison prevention）',
  psychology: '単位が揃っていないと、人は計算をやめて印象で決める',
  explanation:
    '嘘は書かれていません。ただ単位を揃えないだけで、比較にかかる手間が跳ね上がります。人は面倒になると計算をやめ、目立つ位置にあるものを選びます。機能欄の言葉も各プランで揃っておらず、何が増えるのかが分からない作りになっています。',
  checks: [
    '価格を必ず同じ期間（月額など）に直してから並べる',
    '機能欄の言葉が各プランで揃っているかを見る',
    '比較表は事業者が作ったものだと意識する'
  ]
},

/* ---------- 19 ---------- */
{
  no: 19,
  title: '解約手続きの最後',
  category: '継続課金',
  verdict: 'dark',
  url: 'flowbox.example/account/cancel/done',
  mock: `
    <div class="m-fakedone">
      <div class="m-fakedone__mark">✓</div>
      <p class="m-fakedone__h" data-trap="dark" data-label="完了していないのに完了と書く">解約手続きが完了しました</p>
      <p class="m-fakedone__sub">ご利用ありがとうございました。</p>
      <p class="m-fakedone__fine" data-trap="dark" data-label="本当の条件はここ">※まだ手続きは完了しておりません。下記よりアンケートにご回答いただいた時点で解約が確定します。</p>
      <button class="m-fakedone__cta">アンケートへ進む</button>
    </div>`,
  question: 'この画面が表示されました。どうしますか？',
  choices: [
    { text: '完了と書いてあるので、画面を閉じる', score: 0,
      feedback: '解約は成立しておらず、翌月も課金が続きます。安心させて閉じさせることが目的の画面です。' },
    { text: '完了表示の下に条件が書かれていないか確認し、最後まで進める', score: 10,
      feedback: '正解です。大きい文字ではなく、小さい文字のほうに本当の状態が書かれていました。' },
    { text: '念のため、解約手続きを最初からやり直す', score: 4,
      feedback: '慎重ですが、同じ画面に戻るだけです。まず注記を読むほうが早く解決します。' }
  ],
  patternName: '誤解を招く表記（Trick wording）／解約させない設計（Hard to cancel）',
  psychology: '人は大きい文字を結論として読み、小さい文字は装飾として飛ばす',
  explanation:
    '完了していないのに完了と書く。表示の中でも特に悪質な部類です。ユーザーは安心して画面を閉じ、課金だけが続きます。日本では2022年6月施行の改正特定商取引法で、解約の妨害にあたる行為に罰則が設けられました。誤認させる表示によって申し込んだ場合には、取消権も認められています。',
  checks: [
    '「完了」の表示を見たら、その下に注記がないか必ず確認する',
    '解約完了メールが届いたかを確認し、画面を保存しておく',
    '翌月の請求が実際に止まったかを照合する'
  ]
},

/* ---------- 20 ---------- */
{
  no: 20,
  title: '連続記録が途切れます',
  category: '時間の搾取',
  verdict: 'dark',
  url: 'app: デイリーリーフ',
  mock: `
    <div class="m-streak">
      <div class="m-streak__flame" data-trap="dark" data-label="積み上げを人質にする">
        <span class="m-streak__num">7</span>
        <span class="m-streak__lab">日連続</span>
      </div>
      <p class="m-streak__warn" data-trap="dark" data-label="失うことを強調">あと <b>2時間14分</b> で記録が途切れます</p>
      <div class="m-streak__feed" data-trap="dark" data-label="終わりのない一覧">
        <p>おすすめの投稿</p><p>おすすめの投稿</p><p>おすすめの投稿</p>
        <p class="m-streak__more">読み込み中…</p>
      </div>
    </div>`,
  question: '記録が途切れると表示されています。どうしますか？',
  choices: [
    { text: '記録を切らしたくないので、アプリを開いて操作する', score: 0,
      feedback: 'その連続日数は、あなたが決めた目標ではなく、事業者が設定した指標です。' },
    { text: '連続記録は事業者の指標で、自分の目的とは別だと切り分ける', score: 10,
      feedback: '正解です。何のために使っているのかに戻れば、記録が途切れても失うものはありません。' },
    { text: '通知を切り、使いたいときだけ開くようにする', score: 8,
      feedback: '有効な対処です。ただし開いたときに同じ表示が待っているので、切り分けもあわせて必要です。' }
  ],
  patternName: '依存させる設計（Addictive Design）',
  psychology: '損失回避 — 積み上げたものを失うことへの抵抗は、得ることの喜びより強い',
  explanation:
    '連続記録、期限つきの報酬、終わりのないフィード。どれも「やめどき」を作らないための仕組みです。ここで失われるのはお金ではなく時間なので、被害として自覚されにくく、本人も納得して使い続けます。積み上げが長いほど手放しにくくなる点も、意図された効果です。',
  checks: [
    '連続記録は事業者の指標であって、自分の目的ではないと切り分ける',
    '終わりのある画面（一覧・ページ送り）に切り替えられないか探す',
    '通知と自動再生を切る'
  ]
},

/* ---------- 21 （詐欺） ---------- */
{
  no: 21,
  title: '更新が必要だという案内',
  category: '詐欺の手口',
  verdict: 'dark',
  url: 'free-movie-stream.example/watch',
  mock: `
    <div class="m-fakeup">
      <div class="m-fakeup__page">
        <p class="m-fakeup__ptitle">動画を再生できませんでした</p>
      </div>
      <div class="m-fakeup__dialog" data-trap="dark" data-label="ページの中に出ている">
        <p class="m-fakeup__h">システムアップデートが必要です</p>
        <p class="m-fakeup__t">再生に必要なコンポーネントが古くなっています。セキュリティ上の重要な更新を含みます。</p>
        <div class="m-fakeup__meta" data-trap="dark" data-label="提供元が書かれていない">バージョン 118.0.2 ／ 12.4 MB</div>
        <div class="m-fakeup__btns">
          <button class="m-fakeup__later">あとで</button>
          <button class="m-fakeup__now">今すぐ更新</button>
        </div>
      </div>
    </div>`,
  question: 'サイトを見ていたら、この案内が出ました。どうしますか？',
  choices: [
    { text: 'セキュリティの更新と書かれているので、今すぐ押す', score: 0,
      feedback: '押した先で配布されるのは更新ファイルではありません。実行した時点で端末側に入られます。' },
    { text: 'この案内は閉じ、更新が要るかどうかは端末の設定画面で確かめる', score: 10,
      feedback: '正解です。本物の更新は、Webページからではなく端末の設定から行うものです。' },
    { text: '「あとで」を押して、時間があるときに確認する', score: 7,
      feedback: '妥当な判断です。ただし「あとで」も相手が用意したボタンなので、タブごと閉じるほうが確実です。' }
  ],
  patternName: 'なりすまし更新（Fake update）',
  psychology: '習慣の悪用 — システムからの通知は疑わない、という慣れ',
  explanation:
    '見分ける手がかりは文言ではなく、どこに表示されているかです。端末やブラウザの更新通知が、Webページの中に出ることはありません。ページの中に出ている時点で、それは広告か、実行ファイルへの誘導です。提供元が書かれていないことも手がかりになります。',
  checks: [
    '更新の案内がWebページの中に出ていたら、それは端末の通知ではない',
    '更新は必ず端末の設定画面、または公式サイトから行う',
    '再生や閲覧のために追加のソフトを求められたら、そのサイトを離れる'
  ]
},

/* ---------- 22 （ホワイト） ---------- */
{
  no: 22,
  title: 'ご一緒にいかがですか',
  category: '正当性の判別',
  verdict: 'white',
  url: 'gadget-lane.example/cart',
  mock: `
    <div class="m-cross">
      <div class="m-cross__main">スマートフォン 本体　<b>98,000円</b></div>
      <p class="m-cross__h">ご一緒にいかがですか</p>
      <label class="m-cross__opt" data-trap="clear" data-label="チェックは外れている">
        <input type="checkbox"><span>保護フィルム　1,000円</span>
      </label>
      <label class="m-cross__opt" data-trap="clear" data-label="チェックは外れている">
        <input type="checkbox"><span>専用ケース　2,000円</span>
      </label>
      <div class="m-cross__sum" data-trap="clear" data-label="合計に含まれていない">お支払い合計　<b>98,000円</b></div>
      <button class="m-cross__cta">レジに進む</button>
    </div>`,
  question: 'この追加提案はダークパターンでしょうか？',
  choices: [
    { text: 'ダークパターンだ。買わせようとする追加提案は避けるべき', score: 2,
      feedback: '提案すること自体は問題ではありません。判断の基準は提案の有無ではなく、初期状態です。' },
    { text: 'ダークパターンではない。選ぶかどうかがユーザーに残されている', score: 10,
      feedback: '正解です。チェックは外れ、合計にも入っていない。自分で入れない限り何も起きません。' },
    { text: 'チェックが外れていても、提案すること自体が押し売りだ', score: 0,
      feedback: 'それでは関連商品を並べることすべてが禁じられます。判断の線はそこにありません。' }
  ],
  patternName: '正当なクロスセル（ホワイト）',
  psychology: '提案と同意の既成事実化を分けるのは、初期状態がどちらに倒れているか',
  explanation:
    '検体5とよく似た画面ですが、決定的に違うのは初期状態です。あちらはチェックが入っていて、外さない限り同意したことになりました。こちらは外れていて、合計にも含まれていない。関連商品を並べること自体は、探す手間を省く親切な設計です。',
  checks: [
    'チェックが最初から入っているかどうかを見る',
    '提案されたものが合計金額に含まれていないか確認する',
    '「提案」と「同意の既成事実化」は別物だと考える'
  ]
},

/* ---------- 23 ---------- */
{
  no: 23,
  title: '月額500円の見放題',
  category: '継続課金',
  verdict: 'dark',
  url: 'moviegate.example/join',
  mock: `
    <div class="m-lock">
      <p class="m-lock__h" data-trap="dark" data-label="小さい数字だけを見せる">月額 <b>500</b>円 で見放題</p>
      <p class="m-lock__sub">40,000本以上の作品が追加料金なし</p>
      <button class="m-lock__cta">この内容で申し込む</button>
      <p class="m-lock__terms" data-trap="dark" data-label="縛りは規約の奥に">お申し込みをもって<u>利用規約（全52条）</u>に同意したものとみなします</p>
      <p class="m-lock__ex">第45条（契約期間）本サービスの最低契約期間は24ヶ月とし、期間内に解約する場合は解約金20,000円を申し受けます。</p>
    </div>`,
  question: '申し込む前に、確認すべきことは何でしょうか？',
  choices: [
    { text: '月額500円と書いてあるので、いつでもやめられると考える', score: 0,
      feedback: '月額の表示は、契約の長さについて何も語っていません。' },
    { text: '最低契約期間と中途解約金の有無を、申し込む前に確認する', score: 10,
      feedback: '正解です。24ヶ月の縛りがあるので、実質12,000円の契約でした。' },
    { text: '規約は長いので、FAQで要点だけ確認する', score: 5,
      feedback: '現実的な方法です。ただしFAQに書かれていない条件もあります。規約内を「解約金」で検索するほうが確実です。' }
  ],
  patternName: '隠れた継続課金（Hidden subscription）',
  psychology: '月額という小さな数字が、契約全体の大きさを覆い隠す',
  explanation:
    '月額500円でも、24ヶ月の縛りがあれば実質12,000円の契約です。重要な不利益は規約の奥ではなく申込画面に書く必要があります。2022年6月施行の改正特定商取引法では、最終確認画面で契約期間や解約条件を表示することが義務づけられました。',
  checks: [
    '月額表示を見たら、最低契約期間を掛けて総額を出す',
    '規約内を「解約金」「違約金」「最低利用期間」で検索する',
    '最終確認画面に契約期間の記載があるかを見る'
  ]
},

/* ---------- 24 （ホワイト） ---------- */
{
  no: 24,
  title: '去ろうとしたときの案内',
  category: '正当性の判別',
  verdict: 'white',
  url: 'aoyama-roast.example/cart',
  mock: `
    <div class="m-exit">
      <div class="m-exit__card">
        <p class="m-exit__h">ご検討中ですか</p>
        <p class="m-exit__t">10%オフのクーポンを保存しておけます。</p>
        <div class="m-exit__btns" data-trap="clear" data-label="断る側も同じ大きさ">
          <button class="m-exit__no">閉じる</button>
          <button class="m-exit__yes">クーポンを受け取る</button>
        </div>
        <p class="m-exit__note" data-trap="clear" data-label="回数を明示している">この案内は1回のみ表示されます</p>
      </div>
    </div>`,
  question: 'ページを離れようとしたら、この案内が出ました。判定は？',
  choices: [
    { text: 'ポップアップはすべて閲覧を邪魔するダークパターンだ', score: 2,
      feedback: '形式だけで判定すると、正当な案内まで拒むことになります。基準は形式ではありません。' },
    { text: '去ろうとした瞬間に1度だけ、断る選択肢も同等に示されているので問題ない', score: 10,
      feedback: '正解です。タイミング・回数・断りやすさの3つが揃っています。' },
    { text: '閉じるボタンがある時点で、押し売りではない', score: 4,
      feedback: '閉じるボタンの有無だけでは足りません。灰色の極小文字なら、あっても機能しません。' }
  ],
  patternName: '正当な離脱防止（ホワイト）',
  psychology: '同じ機能でも、タイミングと選択肢の対等さで意味が変わる',
  explanation:
    'ポップアップという形式そのものが悪いわけではありません。判断の基準は3つです。出るタイミングが去ろうとした瞬間か、表示が1度だけか、断る選択肢が同じ強さで示されているか。これがサイトを開いた瞬間に全画面で出て、閉じるボタンが灰色の極小文字なら、同じ機能でもダークパターンになります。',
  checks: [
    '出るタイミングを見る（開いた瞬間ではなく、去ろうとした時か）',
    '断る選択肢が同じ大きさで示されているか',
    '何度も繰り返し表示されないか'
  ]
}

];