/* ===========================================================
   クリック心理ラボ — 進行
   =========================================================== */
(function () {
  'use strict';

  var S = window.STAGES;
  var MAX = 10;                    // 1検体あたりの満点
  var TOTAL = S.length * MAX;

  var state = { i: 0, results: [], cleanup: null };

  var $ = function (id) { return document.getElementById(id); };

  var el = {
    title:   $('screen-title'),
    stage:   $('screen-stage'),
    result:  $('screen-result'),
    progress:$('progress'),
    count:   $('bar-count'),
    score:   $('bar-score'),
    no:      $('stage-no'),
    stTitle: $('stage-title'),
    specimen:$('specimen'),
    url:     $('specimen-url'),
    mock:    $('mock'),
    demoBtn: $('btn-demo'),
    demoRes: $('demo-result'),
    question:$('question'),
    choices: $('choices'),
    reveal:  $('reveal'),
    verdict: $('reveal-verdict'),
    feedback:$('reveal-feedback'),
    pattern: $('reveal-pattern'),
    psych:   $('reveal-psych'),
    explain: $('reveal-explain'),
    checks:  $('reveal-checks')
  };

  /* ---------- 画面切り替え ---------- */
  function show(name) {
    el.title.hidden  = name !== 'title';
    el.stage.hidden  = name !== 'stage';
    el.result.hidden = name !== 'result';
    window.scrollTo(0, 0);
  }

  /* ---------- 進捗の目盛り ---------- */
  function paintProgress() {
    el.progress.innerHTML = '';
    for (var n = 0; n < S.length; n++) {
      var i = document.createElement('i');
      var r = state.results[n];
      if (r) {
        i.className = r.score >= MAX ? 'is-hit' : (r.score > 0 ? 'is-part' : 'is-miss');
      } else if (n === state.i) {
        i.className = 'is-now';
      }
      el.progress.appendChild(i);
    }
    var sum = state.results.reduce(function (a, r) { return a + r.score; }, 0);
    el.count.textContent = '検体 ' + (state.i + 1) + ' / ' + S.length;
    el.score.textContent = sum + ' 点';
  }

  /* ---------- 検体を1枚出す ---------- */
  function renderStage() {
    var st = S[state.i];

    if (state.cleanup) { state.cleanup(); state.cleanup = null; }

    paintProgress();

    el.no.textContent = String(st.no).padStart(2, '0');
    el.stTitle.textContent = st.title;
    el.url.textContent = st.url;

    el.specimen.classList.remove('is-marked');
    el.mock.innerHTML = st.mock;

    if (typeof st.onMount === 'function') {
      state.cleanup = st.onMount(el.mock) || null;
    }

    /* 実演ボタン */
    if (st.demo) {
      el.demoBtn.hidden = false;
      el.demoBtn.textContent = st.demo.label;
      el.demoBtn.disabled = true;
      el.demoBtn.style.opacity = '.35';
    } else {
      el.demoBtn.hidden = true;
    }
    el.demoRes.hidden = true;

    /* 設問 */
    el.question.textContent = st.question;
    el.choices.innerHTML = '';
    st.choices.forEach(function (c, n) {
      var b = document.createElement('button');
      b.className = 'choice';
      b.innerHTML = '<span class="choice__k">' + 'ABC'[n] + '</span><span>' + c.text + '</span>';
      b.addEventListener('click', function () { answer(n); });
      el.choices.appendChild(b);
    });

    el.reveal.hidden = true;
  }

  /* ---------- 回答 ---------- */
  function answer(n) {
    var st = S[state.i];
    var picked = st.choices[n];
    var best = st.choices.reduce(function (a, c, k) {
      return c.score > st.choices[a].score ? k : a;
    }, 0);

    state.results[state.i] = {
      no: st.no, title: st.title, category: st.category,
      score: picked.score, pattern: st.patternName, verdict: st.verdict
    };

    /* 選択肢の表示を確定させる */
    Array.prototype.forEach.call(el.choices.children, function (b, k) {
      b.disabled = true;
      if (k === n) b.classList.add('is-picked');
      if (k === best) b.classList.add('is-best');
    });

    /* 検体に印を付ける */
    el.specimen.classList.add('is-marked');

    /* 実演ボタンを解放 */
    if (st.demo) {
      el.demoBtn.disabled = false;
      el.demoBtn.style.opacity = '1';
    }

    /* 種明かし */
    var isClear = st.verdict === 'white';
    el.verdict.textContent = isClear
      ? '正当な設計 — 疑う必要のなかった検体'
      : '仕掛けあり — ' + st.category;
    el.verdict.classList.toggle('is-clear', isClear);

    el.feedback.textContent = picked.feedback;
    el.pattern.textContent  = st.patternName;
    el.psych.textContent    = st.psychology;
    el.explain.textContent  = st.explanation;

    el.checks.innerHTML = '';
    st.checks.forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      el.checks.appendChild(li);
    });

    el.reveal.hidden = false;
    paintProgress();

    var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.reveal.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  }

  /* ---------- 実演 ---------- */
  el.demoBtn.addEventListener('click', function () {
    var st = S[state.i];
    if (!st.demo) return;
    el.mock.dispatchEvent(new CustomEvent('lab:demo'));
    el.demoRes.textContent = st.demo.result;
    el.demoRes.hidden = false;
    el.specimen.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---------- 次へ ---------- */
  $('btn-next').addEventListener('click', function () {
    if (state.i < S.length - 1) {
      state.i++;
      renderStage();
      window.scrollTo(0, 0);
    } else {
      renderResult();
    }
  });

  /* ---------- 結果 ---------- */
  function renderResult() {
    if (state.cleanup) { state.cleanup(); state.cleanup = null; }

    var sum = state.results.reduce(function (a, r) { return a + r.score; }, 0);
    $('result-score').textContent = sum;

    var rank, lead;
    if (sum >= 110) {
      rank = '見抜く目がある';
      lead = '仕掛けを見抜くだけでなく、正当な表示を正当だと判定できています。この2つは別の能力で、後者のほうが難しいものです。';
    } else if (sum >= 85) {
      rank = 'おおむね見抜けている';
      lead = '多くの手法に気づけています。落とした分野が、あなたが実際に反応しやすい心理です。下の内訳を見てください。';
    } else if (sum >= 55) {
      rank = '反応してしまう場面がある';
      lead = '知識の問題ではなく、その場の感情に判断を持っていかれた検体があります。急かされたときに一度離れる癖をつけるだけで、かなり変わります。';
    } else {
      rank = '設計どおりに動かされやすい';
      lead = '落ち込む必要はありません。これらは、そう反応するように作られたものです。仕組みを知った今は、同じ画面の見え方が変わっているはずです。';
    }
    $('result-rank').textContent = rank;
    $('result-lead').textContent = lead;

    /* 分野別 */
    var cats = {};
    state.results.forEach(function (r) {
      if (!cats[r.category]) cats[r.category] = { got: 0, max: 0 };
      cats[r.category].got += r.score;
      cats[r.category].max += MAX;
    });

    var box = $('result-cats');
    box.innerHTML = '';
    Object.keys(cats).forEach(function (k) {
      var c = cats[k];
      var pct = Math.round(c.got / c.max * 100);
      var row = document.createElement('div');
      row.className = 'cat';
      row.innerHTML =
        '<span>' + k + '</span>' +
        '<span class="cat__bar' + (pct < 60 ? ' is-weak' : '') + '"><i style="width:' + pct + '%"></i></span>' +
        '<span class="cat__val">' + pct + '%</span>';
      box.appendChild(row);
    });

    /* 落とした検体 */
    var missed = state.results.filter(function (r) { return r.score < MAX; });
    var mb = $('result-missed');
    mb.innerHTML = '';
    if (missed.length) {
      var h = document.createElement('h3');
      h.textContent = '取りこぼした検体';
      mb.appendChild(h);
      missed.forEach(function (r) {
        var d = document.createElement('div');
        d.className = 'miss';
        d.innerHTML = '<b>' + String(r.no).padStart(2, '0') + '　' + r.title + '</b>' + r.pattern;
        mb.appendChild(d);
      });
    }

    show('result');
  }

  /* ---------- 開始・やり直し ---------- */
  $('btn-start').addEventListener('click', function () {
    state.i = 0;
    state.results = [];
    renderStage();
    show('stage');
  });

  $('btn-retry').addEventListener('click', function () {
    state.i = 0;
    state.results = [];
    renderStage();
    show('stage');
  });

})();
