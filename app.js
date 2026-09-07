/* ===========================================================
   クリック心理ラボ — 進行
   検査モード（見破る） / 設計モード（作る）の2本立て
   =========================================================== */
(function () {
  'use strict';

  var S = window.STAGES;
  var C = window.CASES;
  var MAX = 10;

  /* ---------- 言語 ---------- */
  var LANG = (function () {
    try { var v = localStorage.getItem('lab-lang'); if (v === 'ja' || v === 'en') return v; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en';
  })();

  function T(k) { return window.I18N[LANG][k]; }

  /* 日本語版に英語版を重ねる。構造とonMountは日本語版のものを使う */
  function tr(base, over) {
    if (LANG === 'ja' || !over) return base;
    var o = {};
    Object.keys(base).forEach(function (k) { o[k] = base[k]; });
    Object.keys(over).forEach(function (k) { o[k] = over[k]; });
    if (over.choices) {
      o.choices = base.choices.map(function (c, i) {
        var e = over.choices[i] || {};
        return { text: e.text || c.text, feedback: e.feedback || c.feedback, score: c.score };
      });
    }
    if (over.options) {
      o.options = base.options.map(function (op, i) {
        var e = over.options[i] || {};
        var later = (e.later || op.later).map(function (r, j) {
          return { label: r.label, v: r.v, bad: op.later[j] ? op.later[j].bad : r.bad };
        });
        return {
          kind: op.kind, now: op.now, later: later,
          text: e.text || op.text, verdict: e.verdict || op.verdict,
          explain: e.explain || op.explain, laterText: e.laterText || op.laterText
        };
      });
    }
    return o;
  }

  function stage(i) { return tr(S[i], (window.STAGES_EN || {})[S[i].no]); }
  function kase(i)  { return tr(C[i], (window.CASES_EN  || {})[C[i].no]); }

  var $ = function (id) { return document.getElementById(id); };
  var screens = ['title', 'stage', 'case', 'result', 'cresult', 'help'];

  function show(name) {
    screens.forEach(function (s) {
      var node = $(s === 'title' ? 'screen-title' :
                  s === 'stage' ? 'screen-stage' :
                  s === 'case' ? 'screen-case' :
                  s === 'result' ? 'screen-result' :
                  s === 'help' ? 'screen-help' : 'screen-cresult');
      node.hidden = (s !== name);
    });
    window.scrollTo(0, 0);
  }

  function smooth() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function bring(node) {
    node.scrollIntoView({ behavior: smooth() ? 'smooth' : 'auto', block: 'start' });
  }
  function sign(n, unit) {
    unit = unit || '%';
    if (n === 0) return '±0' + unit;
    return (n > 0 ? '+' : '−') + Math.abs(n) + unit;
  }

  /* ===========================================================
     検査モード
     =========================================================== */
  var D = { i: 0, results: [], picked: [], done: false, cleanup: null };

  var el = {
    progress: $('progress'), count: $('bar-count'), score: $('bar-score'),
    no: $('stage-no'), title: $('stage-title'),
    specimen: $('specimen'), url: $('specimen-url'), mock: $('mock'),
    demoBtn: $('btn-demo'), demoRes: $('demo-result'),
    question: $('question'), choices: $('choices'),
    reveal: $('reveal'), verdict: $('reveal-verdict'), feedback: $('reveal-feedback'),
    pattern: $('reveal-pattern'), psych: $('reveal-psych'),
    explain: $('reveal-explain'), checks: $('reveal-checks')
  };

  function dProgress() {
    el.progress.innerHTML = '';
    for (var n = 0; n < S.length; n++) {
      var i = document.createElement('i');
      var r = D.results[n];
      if (r) i.className = r.score >= MAX ? 'is-hit' : (r.score > 0 ? 'is-part' : 'is-miss');
      else if (n === D.i) i.className = 'is-now';
      el.progress.appendChild(i);
    }
    var sum = D.results.reduce(function (a, r) { return a + r.score; }, 0);
    el.count.textContent = T('specimen') + ' ' + (D.i + 1) + ' / ' + S.length;
    el.score.textContent = sum + ' ' + T('points');
  }

  function dRender() {
    var st = stage(D.i);
    if (D.cleanup) { D.cleanup(); D.cleanup = null; }
    dProgress();

    el.no.textContent = String(st.no).padStart(2, '0');
    el.title.textContent = st.title;
    el.url.textContent = st.url;
    el.specimen.classList.remove('is-marked');
    el.specimen.classList.toggle('is-tall', !!st.tall);
    $('scroll-hint').hidden = !st.tall;
    el.mock.innerHTML = st.mock;
    el.mock.scrollTop = 0;

    if (typeof st.onMount === 'function') D.cleanup = st.onMount(el.mock, st) || null;

    if (st.demo) {
      el.demoBtn.hidden = false;
      el.demoBtn.textContent = st.demo.label;
      el.demoBtn.disabled = true;
      el.demoBtn.style.opacity = '.35';
    } else {
      el.demoBtn.hidden = true;
    }
    el.demoRes.hidden = true;

    el.question.textContent = st.question;
    el.choices.innerHTML = '';
    st.choices.forEach(function (c, n) {
      var b = document.createElement('button');
      b.className = 'choice';
      b.innerHTML = '<span class="choice__k">' + 'ABC'[n] + '</span><span>' + c.text + '</span>';
      b.addEventListener('click', function () { dAnswer(n); });
      el.choices.appendChild(b);
    });
    el.reveal.hidden = true;
  }

  function dAnswer(n) {
    var st = stage(D.i), picked = st.choices[n];
    var best = st.choices.reduce(function (a, c, k) {
      return c.score > st.choices[a].score ? k : a;
    }, 0);

    D.picked[D.i] = n;
    D.results[D.i] = {
      no: st.no, title: st.title, category: st.category,
      score: picked.score, pattern: st.patternName
    };

    Array.prototype.forEach.call(el.choices.children, function (b, k) {
      b.disabled = true;
      if (k === n) b.classList.add('is-picked');
      if (k === best) b.classList.add('is-best');
    });

    el.specimen.classList.add('is-marked');
    if (st.tall) $('scroll-hint').hidden = true;   /* 開いたので案内は不要 */
    if (st.demo) { el.demoBtn.disabled = false; el.demoBtn.style.opacity = '1'; }

    var isClear = st.verdict === 'white';
    el.verdict.textContent = isClear ? T('verdictWhite') : T('verdictDark') + st.category;
    el.verdict.classList.toggle('is-clear', isClear);

    el.feedback.textContent = picked.feedback;
    el.pattern.textContent = st.patternName;
    el.psych.textContent = st.psychology;
    el.explain.textContent = st.explanation;

    el.checks.innerHTML = '';
    st.checks.forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      el.checks.appendChild(li);
    });

    el.reveal.hidden = false;
    dProgress();
    bring(el.reveal);
  }

  el.demoBtn.addEventListener('click', function () {
    var st = stage(D.i);
    if (!st.demo) return;
    el.mock.dispatchEvent(new CustomEvent('lab:demo'));
    el.demoRes.textContent = st.demo.result;
    el.demoRes.hidden = false;
    el.specimen.scrollIntoView({ behavior: smooth() ? 'smooth' : 'auto', block: 'center' });
  });

  $('btn-next').addEventListener('click', function () {
    if (D.i < S.length - 1) { D.i++; dRender(); window.scrollTo(0, 0); }
    else dResult();
  });

  function dResult() {
    if (D.cleanup) { D.cleanup(); D.cleanup = null; }
    D.done = true;
    logDone();
    var sum = D.results.reduce(function (a, r) { return a + r.score; }, 0);
    var full = S.length * MAX;
    $('result-score').textContent = sum;
    if ($('result-max')) $('result-max').textContent = full;
    var pct = sum / full * 100;

    var r = T('rank').filter(function (x) { return pct >= x.min; })[0];
    var rank = r.t, lead = r.d;
    $('result-rank').textContent = rank;
    $('result-lead').textContent = lead;

    var cats = {};
    D.results.forEach(function (r) {
      if (!cats[r.category]) cats[r.category] = { got: 0, max: 0 };
      cats[r.category].got += r.score;
      cats[r.category].max += MAX;
    });
    var box = $('result-cats');
    box.innerHTML = '';
    Object.keys(cats).forEach(function (k) {
      var c = cats[k], pct = Math.round(c.got / c.max * 100);
      var row = document.createElement('div');
      row.className = 'cat';
      row.innerHTML = '<span>' + k + '</span>' +
        '<span class="cat__bar' + (pct < 60 ? ' is-weak' : '') + '"><i style="width:' + pct + '%"></i></span>' +
        '<span class="cat__val">' + pct + '%</span>';
      box.appendChild(row);
    });

    var missed = D.results.filter(function (r) { return r.score < MAX; });
    var mb = $('result-missed');
    mb.innerHTML = '';
    if (missed.length) {
      var h = document.createElement('h3');
      h.textContent = T('missedH');
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

  /* ===========================================================
     設計モード
     =========================================================== */
  var G = { i: 0, picks: [], pickedIdx: [], done: false, cv: 0, trust: 0 };

  var ce = {
    progress: $('c-progress'), count: $('c-count'), score: $('c-score'),
    no: $('c-no'), title: $('c-title'), field: $('c-field'), brief: $('c-brief'),
    question: $('c-question'), choices: $('c-choices'),
    now: $('c-now'), cv: $('c-cv'), cvLab: $('c-cv-lab'), tr: $('c-tr'),
    laterBtn: $('btn-later'), later: $('c-later'),
    laterText: $('c-later-text'), laterRows: $('c-later-rows'),
    reveal: $('c-reveal'), verdict: $('c-verdict'),
    explain: $('c-explain'), lesson: $('c-lesson')
  };

  var KIND_CLASS = { good: 'is-hit', 'null': 'is-part', dark: 'is-miss' };

  function gProgress() {
    ce.progress.innerHTML = '';
    for (var n = 0; n < C.length; n++) {
      var i = document.createElement('i');
      var p = G.picks[n];
      if (p) i.className = KIND_CLASS[p.kind];
      else if (n === G.i) i.className = 'is-now';
      ce.progress.appendChild(i);
    }
    ce.count.textContent = T('caseWord') + ' ' + (G.i + 1) + ' / ' + C.length;
    ce.score.textContent = T('scoreLine').replace('{cv}', sign(G.cv, '')).replace('{tr}', sign(G.trust, ''));
  }

  function gRender() {
    var cs = kase(G.i);
    gProgress();
    ce.no.textContent = String(cs.no).padStart(2, '0');
    ce.title.textContent = cs.title;
    ce.field.textContent = cs.field;
    ce.brief.textContent = cs.brief;
    ce.question.textContent = cs.question;

    ce.choices.innerHTML = '';
    cs.options.forEach(function (o, n) {
      var b = document.createElement('button');
      b.className = 'choice';
      b.innerHTML = '<span class="choice__k">' + 'ABC'[n] + '</span><span>' + o.text + '</span>';
      b.addEventListener('click', function () { gPick(n); });
      ce.choices.appendChild(b);
    });

    ce.now.hidden = true;
    ce.later.hidden = true;
    ce.reveal.hidden = true;
  }

  function gPick(n) {
    var cs = kase(G.i), o = cs.options[n];

    if (G.pickedIdx[G.i] != null) {           /* 選び直し・言語切替のときは前回分を戻す */
      var prev = cs.options[G.pickedIdx[G.i]];
      G.cv -= prev.now.cv; G.trust -= prev.now.trust;
    }
    G.pickedIdx[G.i] = n;
    G.picks[G.i] = { kind: o.kind, title: cs.title, text: o.text, verdict: o.verdict };
    G.cv += o.now.cv;
    G.trust += o.now.trust;

    Array.prototype.forEach.call(ce.choices.children, function (b, k) {
      b.disabled = true;
      if (k === n) b.classList.add('is-picked');
    });

    ce.cvLab.textContent = cs.metric;
    ce.cv.textContent = sign(o.now.cv);
    ce.tr.textContent = sign(o.now.trust);
    ce.cv.className = 'board__num ' + (o.now.cv > 0 ? 'is-up' : o.now.cv < 0 ? 'is-down' : 'is-flat');
    ce.tr.className = 'board__num ' + (o.now.trust > 0 ? 'is-up' : o.now.trust < 0 ? 'is-down' : 'is-flat');

    ce.now.hidden = false;
    ce.later.hidden = true;
    ce.reveal.hidden = true;
    ce.laterBtn.disabled = false;

    gProgress();
    bring(ce.now);
  }

  ce.laterBtn.addEventListener('click', function () {
    var cs = kase(G.i), p = G.picks[G.i];
    var o = cs.options.filter(function (x) { return x.text === p.text; })[0];

    ce.laterText.textContent = o.laterText;
    ce.laterRows.innerHTML = '';
    o.later.forEach(function (r) {
      var d = document.createElement('div');
      d.className = 'lrow' + (r.bad ? ' is-bad' : ' is-good');
      d.innerHTML = '<span>' + r.label + '</span><b>' + r.v + '</b>';
      ce.laterRows.appendChild(d);
    });

    var kindLabel = { dark: T('kindDark'), good: T('kindGood'), 'null': T('kindNull') };
    ce.verdict.textContent = kindLabel[o.kind] + ' — ' + o.verdict;
    ce.verdict.classList.toggle('is-clear', o.kind === 'good');
    ce.verdict.classList.toggle('is-flatv', o.kind === 'null');
    ce.explain.textContent = o.explain;
    ce.lesson.textContent = cs.lesson;

    ce.later.hidden = false;
    ce.reveal.hidden = false;
    ce.laterBtn.disabled = true;
    bring(ce.later);
  });

  $('c-next').addEventListener('click', function () {
    if (G.i < C.length - 1) { G.i++; gRender(); window.scrollTo(0, 0); }
    else gResult();
  });

  function gResult() {
    G.done = true;
    logDone();
    $('cr-cv').textContent = sign(G.cv, '');
    $('cr-tr').textContent = sign(G.trust, '');

    var avg = G.trust / C.length;
    var r = T('crank').filter(function (x) { return avg >= x.min; })[0];
    var rank = r.t, lead = r.d;
    $('cr-rank').textContent = rank;
    $('cr-lead').textContent = lead;

    var list = $('cr-list');
    list.innerHTML = '';
    G.picks.forEach(function (p, n) {
      var d = document.createElement('div');
      d.className = 'pick pick--' + p.kind;
      d.innerHTML = '<b>' + String(n + 1).padStart(2, '0') + '　' + p.title + '</b>' +
                    '<span>' + p.verdict + '</span>';
      list.appendChild(d);
    });
    show('cresult');
  }

  /* ===========================================================
     入口に散らした見本
     =========================================================== */
  (function scatter() {
    var chips = document.querySelectorAll('.chip');
    if (!chips.length) return;

    Array.prototype.forEach.call(chips, function (c) {
      c.setAttribute('aria-label', c.textContent.trim() + '（' + c.dataset.name + '）');
      c.addEventListener('click', function () {
        var wasOpen = c.classList.contains('is-open');
        Array.prototype.forEach.call(chips, function (o) { o.classList.remove('is-open'); });
        if (!wasOpen) c.classList.add('is-open');
      });
    });

    /* 見本のタイマー。放っておくと勝手に最初へ戻る */
    var clock = document.querySelector('[data-sc-clock]');
    if (!clock) return;
    var START = 180, left = START, elapsed = 0;

    setInterval(function () {
      left--; elapsed++;
      if (elapsed >= 18) {          // 18秒で何事もなかったように戻す
        left = START; elapsed = 0;
      }
      if (left < 0) left = START;
      clock.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' +
                          String(left % 60).padStart(2, '0');
    }, 1000);
  })();

  /* ===========================================================
     どこまで進んだかの記録
     -----------------------------------------------------------
     送るのは「モード」「離脱か完走か」「何枚目まで」「言語」だけ。
     誰が来たかを示す情報は送っていない。
     LOG_URL を空にすれば、この仕組みは丸ごと止まる。
     =========================================================== */
  var LOG_URL = '';   // ← Apps Script のデプロイURLをここに貼る

  var logged = false;

  function sendLog(kind) {
    if (!LOG_URL || logged) return;

    var mode = null, at = 0, of_ = 0;
    if (!$('screen-stage').hidden || (!$('screen-result').hidden && D.picked.length)) {
      mode = 'detect'; at = D.i + 1; of_ = S.length;
    } else if (!$('screen-case').hidden || (!$('screen-cresult').hidden && G.pickedIdx.length)) {
      mode = 'design'; at = G.i + 1; of_ = C.length;
    }
    if (!mode) return;                       /* 入口を見ただけなら送らない */
    if (kind === 'done') at = of_;

    logged = true;
    var body = JSON.stringify({ mode: mode, kind: kind, at: at, of: of_, lang: LANG });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(LOG_URL, new Blob([body], { type: 'text/plain' }));
      } else {
        fetch(LOG_URL, { method: 'POST', body: body, keepalive: true, mode: 'no-cors' });
      }
    } catch (e) {}
  }

  /* 完走したとき */
  function logDone() { logged = false; sendLog('done'); logged = true; }

  /* ページを閉じる・タブを離れるとき */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') sendLog('left');
  });
  window.addEventListener('pagehide', function () { sendLog('left'); });

  /* ===========================================================
     文言の差し替えと言語の切り替え
     =========================================================== */
  function applyI18n() {
    document.documentElement.lang = T('htmlLang');
    document.title = T('docTitle');

    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      n.textContent = T(n.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (n) {
      n.innerHTML = T(n.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (n) {
      n.dataset.i18nAttr.split(',').forEach(function (pair) {
        var kv = pair.split(':');
        n.setAttribute(kv[0].trim(), T(kv[1].trim()));
      });
    });

    var sn = $('source-note');
    if (sn) {
      var parts = T('sourceNote').split('{link}');
      sn.innerHTML = parts[0] +
        '<a href="https://deceptive.design/types" target="_blank" rel="noopener">Deceptive Patterns</a>' +
        (parts[1] || '');
    }

    if ($('resume-detect')) {
      $('resume-detect').textContent = T('resumeHint');
      $('resume-design').textContent = T('resumeHint');
    }

    /* 対処のページを組み直す */
    var hb = $('help-body');
    if (hb) {
      hb.innerHTML = '';
      T('helpSections').forEach(function (sec) {
        var d = document.createElement('div');
        d.className = 'hsec' + (sec.mark ? ' hsec--mark' : '');
        var h = document.createElement('p');
        h.className = 'hsec__h';
        h.textContent = sec.h;
        d.appendChild(h);
        var ul = document.createElement('ul');
        sec.items.forEach(function (t) {
          var li = document.createElement('li');
          li.textContent = t;
          ul.appendChild(li);
        });
        d.appendChild(ul);
        hb.appendChild(d);
      });
    }

    /* 実際に届くメッセージの見本を組み立てる */
    document.querySelectorAll('[data-sms]').forEach(function (box) {
      box.innerHTML = '';
      T('smsItems').forEach(function (m) {
        var d = document.createElement('button');
        d.className = 'sms';
        d.setAttribute('data-name', m.tell);
        d.innerHTML =
          '<span class="sms__head"><span class="sms__from">' + m.from + '</span>' +
          '<span class="sms__time">' + m.time + '</span></span>' +
          '<span class="sms__bubble">' + m.body +
          '<span class="sms__link">' + m.link + '</span></span>';
        d.addEventListener('click', function () {
          var was = d.classList.contains('is-open');
          box.querySelectorAll('.sms').forEach(function (o) { o.classList.remove('is-open'); });
          if (!was) d.classList.add('is-open');
        });
        box.appendChild(d);
      });
    });

    /* 開閉の見出し。閉じているものが開くと分かる形にしておく */
    document.querySelectorAll('[data-sms-toggle]').forEach(function (btn) {
      var box = btn.closest('.smsbox');
      var body = box.querySelector('[data-sms-body]');
      var label = btn.querySelector('[data-sms-label]');
      var open = btn.getAttribute('aria-expanded') === 'true';
      label.textContent = open ? T('smsClose') : T('smsOpen');
      if (btn.dataset.wired) return;
      btn.dataset.wired = '1';
      btn.addEventListener('click', function () {
        var now = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(now));
        body.hidden = !now;
        label.textContent = now ? T('smsClose') : T('smsOpen');
      });
    });

    var lb = $('btn-lang');
    lb.textContent = T('langSwitch');
    lb.setAttribute('aria-label', T('langSwitchLabel'));

    /* 見本のラベルは data-name を読むので、開いていれば付け替える */
    document.querySelectorAll('.chip').forEach(function (c) {
      c.setAttribute('aria-label', (c.textContent || '').trim() + ' — ' + c.dataset.name);
    });
  }

  $('btn-lang').addEventListener('click', function () {
    LANG = (LANG === 'ja') ? 'en' : 'ja';
    try { localStorage.setItem('lab-lang', LANG); } catch (e) {}
    applyI18n();

    /* 表示中の画面を、進行状況を保ったまま組み直す */
    if (!$('screen-stage').hidden) {
      dRender();
      if (D.picked[D.i] != null) dAnswer(D.picked[D.i]);
      window.scrollTo(0, 0);
    } else if (!$('screen-case').hidden) {
      gRender();
      if (G.pickedIdx[G.i] != null) {
        var keep = G.pickedIdx[G.i];
        gPick(keep);
        ce.laterBtn.click();
      }
      window.scrollTo(0, 0);
    } else if (!$('screen-result').hidden) {
      dResult();
    } else if (!$('screen-cresult').hidden) {
      gResult();
    }
  });

  applyI18n();

  /* ===========================================================
     入口
     =========================================================== */
  function startDetect() {
    D.i = 0; D.results = []; D.picked = []; D.done = false;
    dRender(); show('stage');
  }
  function startDesign() {
    G.i = 0; G.picks = []; G.pickedIdx = []; G.cv = 0; G.trust = 0; G.done = false;
    gRender(); show('case');
  }

  /* 途中で入口に戻っていた場合は、そこから続ける */
  function enterDetect() {
    if (!D.done && D.picked.length) { show('stage'); } else { startDetect(); }
  }
  function enterDesign() {
    if (!G.done && G.pickedIdx.length) { show('case'); } else { startDesign(); }
  }

  /* 入口に戻ったとき、続きがあることを知らせる */
  function markResume() {
    var d = $('resume-detect'), g = $('resume-design');
    d.hidden = !(!D.done && D.picked.length);
    g.hidden = !(!G.done && G.pickedIdx.length);
    d.textContent = T('resumeHint');
    g.textContent = T('resumeHint');
  }

  function goHome() {
    if (D.cleanup) { D.cleanup(); D.cleanup = null; }
    markResume();
    show('title');
  }

  Array.prototype.forEach.call(document.querySelectorAll('.mode'), function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.mode === 'detect') enterDetect(); else enterDesign();
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.exit__btn, [data-home]'), function (b) {
    b.addEventListener('click', goHome);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-help]'), function (b) {
    b.addEventListener('click', function () { show('help'); });
  });

  $('btn-retry').addEventListener('click', startDetect);
  $('cr-retry').addEventListener('click', startDesign);
  $('btn-to-design').addEventListener('click', startDesign);
  $('btn-to-detect').addEventListener('click', startDetect);

})();