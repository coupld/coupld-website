/* coupld — nav state, hero rotator, parallax, reveal, tabs, lanes */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = window.requestAnimationFrame.bind(window);

  /* ---------- hero wordmark: retire the intro so hover cannot replay it ---------- */
  var wordmark = document.querySelector('.wordmark');
  if (wordmark) {
    if (reduced) { wordmark.classList.add('is-ready'); }
    else { window.setTimeout(function () { wordmark.classList.add('is-ready'); }, 1400); }
  }

  /* ---------- hero rotator ----------
     "for those who want" is fixed; the phrase after it cycles one at a time */
  var rotItems = Array.prototype.slice.call(document.querySelectorAll('.rot-item'));
  var rotRule = document.querySelector('.rot-rule');

  function sizeRule(item) {
    if (rotRule && item) { rotRule.style.width = Math.round(item.getBoundingClientRect().width) + 'px'; }
  }

  if (rotItems.length) {
    sizeRule(rotItems[0]);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { sizeRule(document.querySelector('.rot-item.is-on')); });
    }
    window.addEventListener('resize', function () { sizeRule(document.querySelector('.rot-item.is-on')); });
  }

  if (rotItems.length > 1 && !reduced) {
    var rotIdx = 0;
    window.setInterval(function () {
      var current = rotItems[rotIdx];
      rotIdx = (rotIdx + 1) % rotItems.length;
      var next = rotItems[rotIdx];
      current.classList.remove('is-on');
      current.classList.add('is-out');
      next.classList.remove('is-out');
      // force a reflow so the incoming item animates up from below
      void next.offsetWidth;
      next.classList.add('is-on');
      sizeRule(next);
      window.setTimeout(function () { current.classList.remove('is-out'); }, 420);
    }, 1700);
  }

  /* ---------- scroll: progress, nav shrink, parallax ---------- */
  var rail = document.querySelector('.scroll-rail i');
  var nav = document.getElementById('nav');
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  function onScroll() { if (!ticking) { ticking = true; raf(update); } }

  // scrollHeight / offsetHeight are layout reads; cache them instead of
  // asking for them on every frame
  var docMax = 0;
  function measureDoc() { docMax = document.documentElement.scrollHeight - window.innerHeight; }

  function update() {
    ticking = false;
    var y = window.pageYOffset;
    var vh = window.innerHeight;
    var i, el, r;

    /* ---- read phase ----
       Every measurement happens before any mutation. Interleaving them forces
       a synchronous layout per element, which is what makes a scroll handler
       like this stutter. */
    var sceneTops = [];
    if (scenes && scenesPinned && scenesPinned.matches) {
      for (i = 0; i < scenes.length; i++) {
        sceneTops[i] = scenes[i].el.getBoundingClientRect().top;
      }
    }
    var pxShift = [];
    if (!reduced) {
      for (i = 0; i < parallaxEls.length; i++) {
        el = parallaxEls[i];
        r = el.getBoundingClientRect();
        pxShift[i] = (r.bottom < -200 || r.top > vh + 200)
          ? null
          : ((r.top + r.height / 2) - vh / 2) * (parseFloat(el.getAttribute('data-parallax')) || 0);
      }
    }

    /* ---- write phase ---- */
    if (rail) { rail.style.width = (docMax > 0 ? (y / docMax) * 100 : 0) + '%'; }
    if (nav) { nav.classList.toggle('shrunk', y > 40); }

    applyScenes(sceneTops);

    if (!reduced) {
      for (i = 0; i < parallaxEls.length; i++) {
        if (pxShift[i] === null) { continue; }
        parallaxEls[i].style.transform = 'translate3d(0,' + pxShift[i].toFixed(1) + 'px,0)';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // first paint happens after the scenes are built, further down

  /* ---------- scrollspy: colour the current section in the nav ---------- */
  var spySections = Array.prototype.slice.call(document.querySelectorAll('.spy'));
  var spyLinks = {};
  Array.prototype.forEach.call(document.querySelectorAll('[data-spy]'), function (a) {
    spyLinks[a.getAttribute('data-spy')] = a;
  });

  function setCurrent(id) {
    Object.keys(spyLinks).forEach(function (k) {
      spyLinks[k].classList.toggle('is-current', k === id);
    });
  }

  if (spySections.length && 'IntersectionObserver' in window) {
    var visible = {};
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.intersectionRatio; });
      // the section occupying most of the viewport wins
      var best = null, bestRatio = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > bestRatio) { bestRatio = visible[id]; best = id; }
      });
      if (best && bestRatio > 0.04) { setCurrent(best); }
    }, { threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1], rootMargin: '-15% 0px -35% 0px' });
    spySections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ---------- scroll reveal ---------- */
  var revealTargets = document.querySelectorAll('.reveal, .reveal-lines');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(revealTargets, function (t) { io.observe(t); });
  } else {
    Array.prototype.forEach.call(revealTargets, function (t) { t.classList.add('in'); });
  }

  /* ---------- pinned scroll scenes ----------
     Each .scene is a tall block containing a sticky stage. Progress through
     the scene drives three things at once:
       1 the band holds still (it simply never moves inside the stage)
       2 the heading collapses away
       3 the deck swaps one card for the next
  */
  var scenes = Array.prototype.slice.call(document.querySelectorAll('[data-scene]')).map(function (el) {
    return {
      el: el,
      stage: el.querySelector('.scene-stage'),
      head: el.querySelector('.scene-head'),
      cards: Array.prototype.slice.call(el.querySelectorAll('.deck-card')),
      steps: Array.prototype.slice.call(el.querySelectorAll('.steps i')),
      tabs: Array.prototype.slice.call(el.querySelectorAll('.tab')),
      ink: el.querySelector('.tab-ink'),
      headH: 0,
      index: -1
    };
  });

  function measureScenes() {
    scenes.forEach(function (sc) {
      if (!sc.head) { sc.travel = 0; return; }
      sc.head.style.maxHeight = '';
      sc.head.style.paddingTop = '';
      sc.headPad = parseFloat(getComputedStyle(sc.head).paddingTop) || 0;
      sc.headH = sc.head.scrollHeight;
      sc.lastMh = -1;
    });
    scenes.forEach(function (sc) {
      sc.lastPct = sc.cards.map(function () { return null; });
      sc.cards.forEach(function (c, i) { c.style.zIndex = String(i + 1); });
    });
    scenes.forEach(function (sc) {
      sc.travel = sc.el.offsetHeight - sc.stage.offsetHeight;   // cached, not per frame
    });
    measureDoc();
  }

  function moveInk(sc) {
    if (!sc.ink) { return; }
    var active = sc.tabs[sc.index < 0 ? 0 : sc.index];
    if (!active) { return; }
    sc.ink.style.left = active.offsetLeft + 'px';
    sc.ink.style.width = active.offsetWidth + 'px';
  }

  function showCard(sc, idx) {
    if (idx === sc.index) { return; }
    sc.index = idx;
    sc.cards.forEach(function (c, i) { c.classList.toggle('is-on', i === idx); });
    sc.steps.forEach(function (d, i) { d.classList.toggle('is-on', i === idx); });
    sc.tabs.forEach(function (t, i) {
      t.classList.toggle('is-active', i === idx);
      t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
    moveInk(sc);
  }

  // the heading collapses over the first slice of the scene, the deck swaps
  // across the rest
  var HEAD_END = 0.16;

  var scenesPinned = window.matchMedia('(min-width: 821px)');

  // write-only: it is handed the rects that update() already read
  function applyScenes(tops) {
    if (!scenes || !scenes.length || !tops) { return; }
    if (!scenesPinned.matches) {
      for (var u = 0; u < scenes.length; u++) {
        var su = scenes[u];
        if (su.head && su.headSet) {
          su.head.style.maxHeight = ''; su.head.style.paddingTop = ''; su.head.style.opacity = '';
          su.headSet = false;
        }
        su.cards.forEach(function (c, ci) { c.style.transform = ''; su.lastPct[ci] = null; });
      }
      return;
    }
    for (var s2 = 0; s2 < scenes.length; s2++) {
      var sc = scenes[s2];
      if (sc.travel <= 0) { continue; }
      var p = Math.max(0, Math.min(1, -tops[s2] / sc.travel));

      // 2 — collapse the heading
      if (sc.head) {
        var hp = reduced ? 0 : Math.max(0, Math.min(1, p / HEAD_END));
        var mh = Math.round(sc.headH * (1 - hp));
        if (mh !== sc.lastMh) {              // skip redundant layout invalidation
          sc.head.style.maxHeight = mh + 'px';
          sc.head.style.paddingTop = Math.round(sc.headPad * (1 - hp)) + 'px';
          sc.head.style.opacity = (1 - hp).toFixed(2);
          sc.lastMh = mh;
          sc.headSet = true;
        }
      }

      // 3 — the deck: each card slides up from the bottom over the one before
      var n = sc.cards.length;
      if (n) {
        var cp = Math.max(0, Math.min(0.9999, (p - HEAD_END) / (1 - HEAD_END))) * n;
        for (var c = 0; c < n; c++) {
          // 100% = parked below the deck, 0% = fully in place. Cards already
          // passed stay at 0 and get covered by the next one.
          var pct = Math.max(0, Math.min(100, (c - cp) * 100));
          if (pct !== sc.lastPct[c]) {
            sc.cards[c].style.transform = 'translate3d(0,' + pct.toFixed(2) + '%,0)';
            sc.lastPct[c] = pct;
          }
        }
        showCard(sc, Math.min(n - 1, Math.floor(cp)));
      }
    }
  }

  function updateScenes() { update(); }

  measureScenes();
  update();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { measureScenes(); updateScenes(); });
  }
  window.addEventListener('resize', function () { measureScenes(); updateScenes(); });
  if (scenesPinned.addEventListener) {
    scenesPinned.addEventListener('change', function () { measureScenes(); updateScenes(); });
  }

  // clicking a tab scrolls to that card's slice of the scene
  scenes.forEach(function (sc) {
    sc.tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        var travel = sc.el.offsetHeight - sc.stage.offsetHeight;
        var sceneTop = sc.el.getBoundingClientRect().top + window.pageYOffset;
        // Land at the START of this card's slice, not the middle. A card's
        // offset is max(0, index - progress), so at the middle of slice i the
        // next card is already half risen and covers half of the card you
        // asked for. At the start of the slice card i sits at 0 and card i+1
        // is still fully parked below. The 2px nudge keeps Math.floor on the
        // right side of the boundary when the scroll lands a fraction short.
        var target = sceneTop
          + travel * (HEAD_END + (1 - HEAD_END) * (i / sc.tabs.length))
          + 2;
        window.scrollTo({ top: target, behavior: 'smooth' });
      });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var next = (i + (e.key === 'ArrowRight' ? 1 : -1) + sc.tabs.length) % sc.tabs.length;
          sc.tabs[next].focus();
          sc.tabs[next].click();
        }
      });
    });
  });

  /* ---------- lanes ----------
     The copy is revealed on hover in CSS. Touch has no hover, so there a tap
     toggles the same state; keyboard users get Enter and Space everywhere. */
  var lanes = Array.prototype.slice.call(document.querySelectorAll('.lane'));
  function toggleLane(lane) {
    var open = lane.classList.contains('is-open');
    lanes.forEach(function (l) {
      l.classList.remove('is-open');
      l.setAttribute('aria-expanded', 'false');
    });
    if (!open) {
      lane.classList.add('is-open');
      lane.setAttribute('aria-expanded', 'true');
    }
  }
  var canHover = window.matchMedia('(hover:hover)').matches;
  lanes.forEach(function (lane) {
    if (!canHover) {
      lane.addEventListener('click', function () { toggleLane(lane); });
    }
    lane.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLane(lane); }
    });
  });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- waitlist form (front end only) ---------- */
  var form = document.getElementById('wlForm');
  var msg = document.getElementById('wlMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('wlEmail');
      var val = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      msg.textContent = "You're on the list. We'll be in touch.";
      form.reset();
    });
  }
})();
