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
  patternName: '偽の緊急性（False Urgency）／ 偽の希少性（False Scarcity）',
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
  onMount(root) {
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
  mock: `
    <div class="m-trial">
      <h3 class="m-trial__h">学び放題プラン</h3>
      <p class="m-trial__lead">3,000本の講座が、まずは無料で。</p>
      <button class="m-trial__cta" data-trap="dark" data-label="目立つのは入口だけ">1ヶ月無料で試す</button>
      <p class="m-trial__sub">クレジットカードの登録が必要です</p>
      <p class="m-trial__fine" data-trap="dark" data-label="出口の条件がここに畳まれている">※体験期間の終了後、自動的に月額9,800円の有料プランへ移行します。解約は次回更新日の10日前までに電話窓口（平日10:00〜11:00のみ受付）にて承ります。書面・Webでの解約手続きは承っておりません。</p>
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
  patternName: 'ゴキブリの罠（Roach Motel）／ 隠されたコスト（Hidden Costs）',
  psychology: '選択的注意 — 目立つものに視線が奪われ、周囲が見えなくなる',
  explanation:
    '入るのは1クリック、出るのは平日の1時間だけ受け付ける電話窓口。入口と出口の労力が極端に非対称に設計されています。人は視覚的に強い要素に注意を吸い取られるため、その真下にある小さな灰色の文字はほとんど読まれません。読ませないために小さくしているのであって、読めるように書いてあるわけではありません。',
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
  patternName: '段階的な価格開示（Drip Pricing）',
  psychology: 'サンクコスト効果 — 使った時間や手間を惜しんで、不利な選択を続けてしまう',
  explanation:
    '最初に安い数字を見せて手続きを始めさせ、引き返しにくくなった最後の画面で費用を足していく手法です。個人情報の入力を終えた段階で人はほとんど引き返しません。「〜円から」という表記は、その条件を満たす席が1つでもあれば成立してしまいます。',
  checks: [
    '「〜円から」の表示は、最安条件の1席の価格だと考える',
    '決済直前の合計額と内訳を必ず開く',
    '比較するときは、最初の表示価格ではなく総額どうしで並べる'
  ]
},

/* ---------- 4 ---------- */
{
  no: 4,
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
  patternName: '勝手にカートへ（Sneak into Basket）／ 事前選択（Preselection）',
  psychology: 'デフォルト効果 — 初期状態のまま変更しない傾向',
  explanation:
    '人は初期設定を「推奨された標準」と受け取り、そのまま進みます。判断していないのに、同意した記録だけが残るのがこの手法の核心です。今日の請求額を変えないことで、確認の目をすり抜けます。',
  checks: [
    'チェックボックスは「最初から入っているもの＝疑うもの」として見る',
    '合計金額だけでなく、翌月以降に発生する費用がないか探す',
    '注文確定ボタンの周囲は、意図的に情報が置かれる場所だと知っておく'
  ]
},

/* ---------- 5 ---------- */
{
  no: 5,
  title: '会員登録の分かれ道',
  category: '視覚誘導',
  verdict: 'dark',
  url: 'lumipic.example/signup/plan',
  mock: `
    <div class="m-plan">
      <h3 class="m-plan__h">プランを選んでください</h3>
      <button class="m-plan__paid" data-trap="dark" data-label="押させたい方だけ目立たせる">
        プレミアム会員に登録する
        <span class="m-plan__paidSub">月額1,200円 / 広告なし</span>
      </button>
      <div class="m-plan__row">
        <span class="m-plan__ghost" data-trap="dark" data-label="背景と同化させた出口">無料のまま続ける</span>
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
  patternName: '視覚的干渉（Visual Interference）',
  psychology: '色と大きさによる誘導 — 人は文字より先に、形と色で「進む方向」を決める',
  explanation:
    'ボタンの見た目は本来「重要さ」を伝える手がかりですが、それを事業者に都合のよい側へ割り当てると、誤操作が起こります。嘘は一切書かれていません。にもかかわらず、多くの人が意図しない方を押します。',
  checks: [
    '色や大きさではなく、書かれている文字を読んでから押す',
    '「進む側」が2つあるように見えたら、それぞれが何をする操作か確認する',
    '目立たない選択肢が意図的に隠されていないか、画面の隅まで見る'
  ]
},

/* ---------- 6 （ホワイト） ---------- */
{
  no: 6,
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
    'ステージ1のタイマーは在庫の実体を持たず、ユーザーを急がせるためだけに動いていました。こちらは実際に座席が押さえられており、時間は他の購入希望者のために確保を解放する仕組みです。リロードしても時間は戻らず、サーバー側で数え続けられている点が決定的な違いです。',
  checks: [
    'リロードで時間が戻らないなら、サーバー側で管理された本物',
    '「何のための制限か」が説明されているかを見る',
    '時間切れで失うものが具体的（この座席）なら、実体がある可能性が高い'
  ],
  demo: {
    label: 'この検体をリロードしてみる',
    result: 'タイマーは戻りませんでした。残り時間はサーバー側で数えられているため、画面を開き直しても続きから表示されます。ステージ1との決定的な違いがここです。'
  },
  onMount(root) {
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

/* ---------- 7 ---------- */
{
  no: 7,
  title: 'クーポンを断るとき',
  category: '感情操作',
  verdict: 'dark',
  url: 'modeclip.example/campaign',
  mock: `
    <div class="m-shame">
      <div class="m-shame__card">
        <p class="m-shame__h">初回限定 1,000円OFF</p>
        <button class="m-shame__yes">今すぐ1,000円オフで購入する</button>
        <p class="m-shame__no" data-trap="dark" data-label="断る側に恥を持たせている">いいえ、私は損をして高額な買い物を楽しみます</p>
      </div>
    </div>`,
  question: 'この文言を見たとき、あなたならどう感じ、どう行動しますか？',
  choices: [
    { text: '「損をするのは嫌だ」と感じ、クーポンを使って購入する', score: 0,
      feedback: '嫌な気分を避けるための購入で、商品が必要かどうかは判断していません。' },
    { text: '煽られているだけだと理解し、不要なら断る', score: 10,
      feedback: '正解です。文言に含まれる感情を切り離して、必要かどうかだけで決められています。' },
    { text: '自分は愚かな選択をしていると反省する', score: 0,
      feedback: 'その気分こそが設計された結果です。断ることは愚かではありません。' }
  ],
  patternName: '罪悪感の利用（Confirmshaming）',
  psychology: '自己否定の回避 — 恥ずかしさを感じる選択肢を人は選びたがらない',
  explanation:
    '断るという操作そのものに、自分を否定する言葉を紐づける手法です。「いいえ」と押すだけで、自分が損をする愚かな人間だと宣言させられる。内容ではなく、操作に貼られた感情の値札で判断を曲げています。',
  checks: [
    '拒否ボタンの文言が感情的なら、それは判断材料ではなく演出',
    '「その商品が自分に必要か」だけを基準に戻す',
    '断りにくさを感じたら、それ自体が設計された感覚だと気づく'
  ]
},

/* ---------- 8 ---------- */
{
  no: 8,
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
    { text: 'すぐ売り切れるので、確認せず即決済する', score: 0,
      feedback: '安さが注意力を奪い、説明の最下部に書かれた一文が読まれないまま決済されます。' },
    { text: '商品タイトルだけでなく、詳細と注意事項を最後まで読む', score: 10,
      feedback: '正解です。この出品では、注記に「本体は含まれません」と書かれていました。' },
    { text: '写真が本物に見えるので信用する', score: 0,
      feedback: '写真は本体のものでした。写真と商品が一致している保証はどこにもありません。' }
  ],
  patternName: 'おとりとすり替え（Bait and Switch）',
  psychology: 'アンカリング効果 — 最初に見た数字が基準になり、以降の確認が甘くなる',
  explanation:
    'あり得ない安さを最初に見せることで、その一点に注意が集まり、細部の確認が省略されます。注記は嘘ではなく、読まれない場所に置かれているだけ。だからこそ「書いてあった」と言い返されます。',
  checks: [
    '相場から大きく外れた価格には理由があると考える',
    '商品説明は最下部まで読む。特に「※」で始まる行',
    '写真ではなく、仕様欄に何が含まれるかを確認する'
  ]
},

/* ---------- 9 ---------- */
{
  no: 9,
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
    { text: '画面を閉じれば自動的に解約されると判断する', score: 0,
      feedback: '途中で閉じた手続きは無効です。契約は継続したまま、次の請求日を迎えます。' }
  ],
  patternName: '障害物競走（Obstacle Course）／ 摩擦の増大',
  psychology: '意思決定の疲労 — 手順が増えるほど、人は途中で諦める',
  explanation:
    '一つひとつの画面はどれも「確認」や「アンケート」という名目を持っており、単体では問題があるように見えません。5回重ねることで諦めさせるのが目的です。登録が1クリックで、解約が5画面という非対称そのものが手法です。',
  checks: [
    '「解約が完了しました」の表示が出るまでブラウザを閉じない',
    '完了メールが届いたかを必ず確認し、画面のスクリーンショットを残す',
    '次回請求日を確認し、請求が止まったかを翌月に照合する'
  ],
  onMount(root) {
    const steps = [
      { h: '本当に解約しますか？', t: 'これまでに保存した128件のデータが利用できなくなります。' },
      { h: 'サービス改善のためのアンケート', t: '解約の理由をお聞かせください（所要時間およそ5分）。' },
      { h: '特別なご案内', t: '今なら3ヶ月間、半額でご継続いただけます。' },
      { h: 'ご利用状況の確認', t: '先月は12回ご利用いただきました。本当によろしいですか？' },
      { h: '最終確認', t: '解約を確定するには、下のボタンをもう一度押してください。' }
    ];
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

/* ---------- 10 （ホワイト） ---------- */
{
  no: 10,
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
    'ステージ1の「残り1個」は在庫と無関係な固定表示でした。こちらは日付を変えれば表示も変わり、他の予約サイトと照合しても一致します。判断の基準は言葉づかいではなく、その数字が何と連動しているかです。',
  checks: [
    '条件（日付・人数）を変えたときに、数字も変わるかを見る',
    '別の予約サイトや公式サイトと照合する',
    '在庫が減る様子が不自然に速い場合だけを疑う'
  ]
},

/* ---------- 11 ---------- */
{
  no: 11,
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
    { text: '連絡先を取られても害はないので気にしない', score: 0,
      feedback: '渡されるのは自分の情報だけではありません。連絡先に登録された他人の情報も一緒に渡ります。' }
  ],
  patternName: '過剰な情報収集（Privacy Zuckering）／ 権限のしつこい要求',
  psychology: '目的のすり替え — 使いたい気持ちを利用し、機能と無関係な情報を差し出させる',
  explanation:
    '「友達と共有するため」という説明は、連絡先の読み取りが必要な理由になっていません。共有はリンクを送るだけで足ります。そして拒否しても繰り返し表示することで、いつか押させることを狙っています。自分だけでなく、連絡先に入っている人たちの情報を渡す点も重要です。',
  checks: [
    'その権限が、アプリの機能に本当に必要かを考える（電卓に位置情報は不要）',
    '拒否した後も繰り返し要求されるアプリは、収集自体が目的だと考える',
    '連絡先・写真・位置情報は、渡すと取り消しにくい情報として扱う'
  ]
},

/* ---------- 12 ---------- */
{
  no: 12,
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
  patternName: '偽の社会的証明（Fake Social Proof）',
  psychology: 'バンドワゴン効果 — 多くの人が支持しているものを、無条件に正しいと感じる',
  explanation:
    '「1位」は、調査対象・期間・母数を自社で決めればいくらでも作れます。日本では合理的な根拠のない優良誤認表示は景品表示法の規制対象ですが、規制があることと、表示が正しいこととは別です。注記のない数値は、根拠の提示を省いた表示だと考えるのが安全です。',
  checks: [
    '数値やバッジの近くに、調査期間・対象人数・調査機関の注記があるか探す',
    'レビューの投稿日が特定の日に集中していないか見る',
    '文章の言い回しが揃いすぎているレビュー群は、出所を疑う'
  ]
}

];
