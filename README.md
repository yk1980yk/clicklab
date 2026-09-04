# クリック心理ラボ

偽のランディングページを検体として観察し、自分がどの心理に反応したのかを確かめる練習場。
ビルド不要の静的サイト。`index.html` をブラウザで開けばそのまま動く。

```
darkpattern-lab/
├── index.html      画面の器（タイトル / 検査 / 結果）
├── style.css       検査台のシェルと、12種類の偽LPの見た目
├── app.js          進行・採点・集計
└── data/
    └── stages.js   問題データ。増やすのはここだけ
```

外部依存はGoogle Fontsのみ。オフラインでも代替フォントで動作する。

---

## 問題を1つ増やす

`data/stages.js` の配列に1オブジェクト足すだけ。HTMLもCSSもJSも触らなくていい。

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

`mock` の中の要素に属性を2つ足すと、回答後に自動で枠とラベルが出る。
JS側の処理は不要。

```html
<div data-trap="dark"  data-label="リロードで戻るタイマー">…</div>   赤い枠
<div data-trap="clear" data-label="在庫と連動した事実">…</div>       緑の枠
```

### 検体を動かす（任意）

```js
onMount(root) {
  // root は検体のDOM。ここでタイマーなどを動かす
  const t = setInterval(…);
  return () => clearInterval(t);   // 戻り値は後片付け。次の検体へ進むとき呼ばれる
}
```

### 「実際に試してみる」ボタン（任意）

```js
demo: {
  label:  'この検体をリロードしてみる',
  result: '押した後に出る説明文'
}
```

押されると検体に `lab:demo` イベントが飛ぶので、`onMount` の中で受けて状態を戻す。
ステージ1（戻る）と6（戻らない）が、この仕組みで対になっている。

### 見た目

`style.css` の末尾「ここから下は検体の見た目」に、`.m-***` として追記する。
シェル側の変数（`--ink` など）は使わず、実際のWebらしい色をそのまま書いてよい。
むしろシェルとの落差が、検体を本物らしく見せている。

---

## 公開する

静的ファイルだけなので、どこでも置ける。

```bash
git init
git add .
git commit -m "初期リリース：12検体"
git remote add origin git@github.com:USER/darkpattern-lab.git
git push -u origin main
```

Vercelでリポジトリを選び、フレームワークは「Other」、ビルドコマンドは空のまま。
以降は `git push` で反映される。GitHub Pagesでも同じように動く。

サーバー処理も保存領域もないため、改ざんの経路は実質リポジトリだけになる。
2要素認証をかけておけば十分。

---

## 決めごと

- 登場する企業・サービス・商品はすべて架空にする。実在の名前は出さない。
- 罠だけを並べない。正当な事例（`verdict: 'white'`）を必ず混ぜる。
  すべてを疑う人が満点を取れる設計にすると、教材として意味を失う。
- 種明かしは手法名の暗記ではなく、「なぜ自分が反応したのか」に着地させる。

---

## この先の候補

- 検体ごとの正答率を集計して、「多くの人が引っかかる順」を出す
- 結果を1枚の画像にして共有できるようにする
- 1問だけの短い版を作り、SNSからの入り口にする
- 手法ごとの解説ページを単体で読める形にする（ニュースから来た人向け）
