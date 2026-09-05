# クリック心理ラボ

人を動かす設計を、**見破る側**と**作る側**の両方から練習する静的サイト。
ビルド不要。`index.html` をブラウザで開けばそのまま動く。

```
.
├── index.html      画面の器
├── style.css       シェルと、検体・数字パネルの見た目
├── app.js          2モードの進行・採点・言語切替
└── data/
    ├── i18n.js     UI文言の日英辞書
    ├── stages.js   検査モードの問題（20件・日本語が原本）
    ├── stages.en.js 検体の英語版（no をキーに上書き）
    ├── cases.js    設計モードの問題（8件・日本語が原本）
    └── cases.en.js ケースの英語版（no をキーに上書き）
```

外部依存はGoogle Fontsのみ。オフラインでも代替フォントで動く。

---

## 2つのモード

**検査モード** — 偽のLPを検体として観察し、仕掛けを見抜く。
回答すると該当箇所に赤い枠とラベルが自動で出る。12件中2件は正当な事例で、
そこを疑うと減点される。すべてを疑う戦略では満点が取れない。

**設計モード** — 自分がマーケターとして施策を選ぶ。
A（効くが代償がある）／ B（正当）／ C（効かない）の3択。
選ぶと今月の数字が出て、次に翌月の数字が出る。
成果と信頼の2軸で集計され、片方だけを追うと結果に表れる。

---

## 検査モードの問題を増やす

`data/stages.js` の配列に1オブジェクト足すだけ。他のファイルは触らない。

```js
{
  no: 13,
  title: '一覧に出す見出し',
  category: '緊急性',          // 結果画面の分野別集計に使う
  verdict: 'dark',             // 'dark' か 'white'
  url: 'example.com/lp',       // 検体のアドレスバーに出る文字

  mock: `<div class="m-xxx"> … </div>`,

  question: '設問',
  choices: [
    { text: '選択肢A', score: 0,  feedback: '選んだ人への一言' },
    { text: '選択肢B', score: 10, feedback: '…' },   // 満点は必ず1つ
    { text: '選択肢C', score: 5,  feedback: '…' }
  ],

  patternName: '手法の名前',
  psychology:  '働いている心理',
  explanation: '種明かしの本文',
  checks: ['確かめ方1', '確かめ方2', '確かめ方3']
}
```

### 罠に印を付ける

`mock` の中の要素に属性を2つ足すと、回答後に自動で枠とラベルが出る。JSは不要。

```html
<div data-trap="dark"  data-label="リロードで戻るタイマー">…</div>   赤い枠
<div data-trap="clear" data-label="在庫と連動した事実">…</div>       緑の枠
```

### 検体を動かす（任意）

```js
onMount(root) {
  const t = setInterval(…);
  return () => clearInterval(t);   // 戻り値は後片付け。次へ進むとき呼ばれる
}
```

### 「実際に試してみる」ボタン（任意）

```js
demo: { label: 'この検体をリロードしてみる', result: '押した後に出る説明文' }
```

押されると検体に `lab:demo` イベントが飛ぶので、`onMount` の中で受けて状態を戻す。
検体1（戻る）と6（戻らない）が、この仕組みで対になっている。

---

## 設計モードの問題を増やす

`data/cases.js` に足す。3択は `dark` / `good` / `null` を1つずつ。

```js
{
  no: 5,
  title: '一覧に出す見出し',
  field: 'EC / 獲得',              // 小さく出る分類
  brief: '状況の説明',
  metric: '登録率',                // 今月の数字の左側ラベル
  question: '設問',
  options: [
    {
      kind: 'dark',                // 'dark' / 'good' / 'null'
      text: '選択肢の本文',
      now:   { cv: 45, trust: -80 },        // 今月の数字
      later: [                               // 翌月の行
        { label: '解約率', v: '+62%', bad: true }
      ],
      verdict: '手法の名前',
      explain: '解説',
      laterText: '翌月パネルの見出し一行'
    },
    …
  ],
  lesson: '3択を並べて初めて見える一文'
}
```

`null`（効かない施策）は**もっともらしく見える案**にすること。
明らかな悪手を置くと選ばれず、選択肢として死ぬ。
実務でよく提案されるが原因に触れていない案（ボタンの色、割引率のパーセント表記など）が良い。

### 検体の見た目

`style.css` の末尾「ここから下は検体の見た目」に `.m-***` として追記する。
シェル側の変数（`--ink` など）は使わず、実際のWebらしい色をそのまま書いてよい。
シェルとの落差が、検体を本物らしく見せている。

---

## 言語の追加・翻訳

日本語版が原本。英語版は**文字列だけを上書きする差分**として持つ。
`onMount` などのコードと `score` / `kind` / `now` の数値は日本語版のものが使われるため、
英語版には書かなくてよい。

```js
window.STAGES_EN = {
  1: {
    title: '…', category: '…', url: '…',
    mock: `…`,                       // class と data-trap / data-label の構造は原本と揃える
    question: '…',
    choices: [ { text:'…', feedback:'…' }, … ],   // 並び順を原本と揃える。score は不要
    patternName: '…', psychology: '…', explanation: '…',
    checks: ['…','…','…'],
    demo: { label:'…', result:'…' }   // 原本にある検体のみ
  }
};
```

UIの文言は `data/i18n.js` に足し、HTML側で `data-i18n="キー"` を付ける。
`data-i18n-html` は改行タグを含む場合、`data-i18n-attr="data-name:キー"` は属性を訳す場合。

第3の言語を足すときは `I18N` にブロックを1つ、`STAGES_XX` / `CASES_XX` を作り、
`app.js` の `tr()` が参照する先を言語コードで切り替える。

言語は初回のみブラウザ設定から判定し、以降は選択を保存する。
切り替えても進行状況と点数は保たれる。

---

## 公開する

静的ファイルだけなのでどこでも置ける。

```bash
git init
git add .
git commit -m "初期リリース：検査20件 / 設計8件 / 日英対応"
git remote add origin git@github.com:USER/REPO.git
git push -u origin main
```

Vercelでリポジトリを選び、フレームワークは「Other」、ビルドコマンドは空のまま。
以降は `git push` で反映される。GitHub Pagesでも同じ。

サーバー処理も保存領域もないため、改ざんの経路は実質リポジトリだけ。
2要素認証をかけておけば十分。

---

## 決めごと

- 登場する企業・サービス・商品はすべて架空にする。実在の名前は出さない。
- 罠だけを並べない。検査モードには正当な事例を必ず混ぜる。
  すべてを疑う人が満点を取れる設計にすると、教材として意味を失う。
- 種明かしは手法名の暗記ではなく、「なぜ自分が反応したのか」に着地させる。
- 手法の英語名は deceptive.design の現行18分類に合わせる。
  （Forced action / Sneaking / Hard to cancel / Preselection / Obstruction /
   Hidden subscription / Hidden costs / Trick wording / Visual interference /
   Fake social proof / Fake urgency / Nagging / Confirmshaming / Fake scarcity /
   Disguised ads / Comparison prevention / Addictive Design / Currency Confusion）
  Roach Motel や Bait and Switch のような古い呼称は、解説の中で触れるだけにする。
- 設計モードでは、ダークな選択を倫理ではなく**事業の損得**で否定する。
  説教にすると、実際に数字を求められている人には届かない。

---

## この先の候補

- 検体ごとの正答率を集計して、「多くの人が引っかかる順」を出す
- 結果を1枚の画像にして共有できるようにする
- 1問だけの短い版を作り、SNSからの入り口にする
- 手法ごとの解説ページを単体で読める形にする（ニュースから来た人向け）
- 設計モードのケースを業種別に増やし、企業研修向けのセットにする