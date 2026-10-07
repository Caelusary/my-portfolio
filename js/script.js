/* =========================================================
   CONFIG
   ========================================================= */
// EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'V-b5rP4yFb6ZoE5xE';
const EMAILJS_SERVICE_ID = 'service_lvv2185';
const EMAILJS_TEMPLATE_ID = 'template_5hyd0k3';

// Feedback widget: Supabase project URL and its publishable (anon) key. The
// key can only insert into portfolio_feedback (see supabase/feedback.sql);
// nobody but the project owner can read the rows. Left empty, the widget
// stays hidden.
const FEEDBACK_SUPABASE_URL = 'https://btxzksfrjzhrsykjdhil.supabase.co';
const FEEDBACK_SUPABASE_KEY = 'sb_publishable_li7KizdC9USPXekPgWzl_Q_bwhXZzyC';

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
  // Run each feature independently: if one throws, it must not take the
  // rest of the page down with it.
  [
    initHashLanding, // before the reveal, so a linked-to row never fades in
    initBackLink,
    initGsapReveal, // runs first: reveal must never depend on anything else succeeding
    initHeroShader,
    initHeroNameShine,
    initHeroCursorGlow,
    initCodeParticles,
    initCustomCursor,
    initClickRipple,
    initScrollProgress,
    initEmailJS,
    initFeedback, // before the language toggle, so its text gets translated
    initDarkMode,
    initLanguageToggle,
    initNavScrollEffect,
    initMobileMenu,
    initScrollSpy,
    initSmoothScroll,
    initShowcaseShine,
    initShowcaseVideos,
    initProjectFilter,
    initCaseGallery,
    initContactForm,
    initCertStack,
    initBackToTop,
    initCopyrightYear
  ].forEach((fn) => {
    try {
      fn();
    } catch (err) {
      console.error(`${fn.name} failed:`, err);
    }
  });
});

/* =========================================================
   EMAILJS INIT
   ========================================================= */
function initEmailJS() {
  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
}

/* =========================================================
   DARK MODE (Tailwind class strategy, persisted via localStorage)
   ========================================================= */
function initDarkMode() {
  const toggleBtn = document.getElementById('darkModeToggle');
  const icon = document.getElementById('darkModeIcon');
  const storedTheme = localStorage.getItem('theme');

  const applyTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
    icon.textContent = isDark ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-pressed', String(isDark));
  };

  // Dark is the default identity for this design; light is opt-in.
  applyTheme(storedTheme ? storedTheme === 'dark' : true);

  toggleBtn.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* =========================================================
   LANGUAGE TOGGLE (EN / FIL, persisted via localStorage)
   ========================================================= */
function getTranslation(key) {
  const entry = translations[key];
  if (!entry) return key;
  return entry[currentLang] || entry.en || key;
}

function applyTranslations(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = getTranslation(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = getTranslation(el.dataset.i18nPlaceholder);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    el.setAttribute('aria-label', getTranslation(el.dataset.i18nAriaLabel));
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = getTranslation(el.dataset.i18nTitle);
  });
}

function initLanguageToggle() {
  const buttons = document.querySelectorAll('.lang-btn');
  const storedLang = localStorage.getItem('lang') || 'en';

  const setLang = (lang) => {
    applyTranslations(lang);
    buttons.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    localStorage.setItem('lang', lang);
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  setLang(storedLang);
}

/* =========================================================
   NAVBAR SCROLL EFFECT (transparent -> solid)
   ========================================================= */
function initNavScrollEffect() {
  const nav = document.getElementById('mainNav');

  const updateNav = () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 40);
  };

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
}

/* =========================================================
   MOBILE NAV MENU TOGGLE (hamburger, no Bootstrap dependency)
   ========================================================= */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navLinks');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const willOpen = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    toggle.setAttribute('aria-expanded', String(willOpen));
  });
}

/* =========================================================
   SCROLL SPY (active nav link highlighting)
   ========================================================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id], header[id]');
  const navLinks = document.querySelectorAll('#navLinks .nav-link');

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* =========================================================
   SMOOTH SCROLL FOR NAV LINKS
   ========================================================= */
function initSmoothScroll() {
  const navLinksMenu = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Close mobile menu if open
      if (navLinksMenu && !navLinksMenu.classList.contains('hidden') && window.innerWidth < 768) {
        navLinksMenu.classList.add('hidden');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* =========================================================
   HOME: BANNER LIGHT SWEEP ON SCROLL-IN
   Plays once when the banner comes into view.
   ========================================================= */
function initShowcaseShine() {
  const showcase = document.querySelector('.showcase');
  if (!showcase || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    showcase.classList.add('is-shining');
    observer.disconnect();
  }, { threshold: 0.6 });

  showcase.addEventListener('animationend', () => showcase.classList.remove('is-shining'));
  observer.observe(showcase);
}

/* =========================================================
   HOME: PANEL RECORDINGS
   One panel plays at a time, from the start, full-bleed (.is-playing).
   Laptops: resting the mouse on a panel for HOVER_DELAY; leaving stops it.
   Touch screens: holding a finger on a panel for HOLD_DELAY (a ring fills
   around the hint while you hold), or a panel resting mostly on screen for
   DWELL_DELAY. Scrolling it away stops it. A hold never also opens the link.
   Reduced motion: hover and dwell never play; a deliberate hold still does.
   ========================================================= */
const HOVER_DELAY = 700;
const HOLD_DELAY = 450;
const DWELL_DELAY = 2500;

function initShowcaseVideos() {
  const panels = [...document.querySelectorAll('.panel')].filter((p) => p.querySelector('video'));
  if (!panels.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverable = window.matchMedia('(hover: hover) and (min-width: 768px)');

  const stop = (panel) => {
    const video = panel.querySelector('video');
    clearTimeout(panel._dwell);
    panel.classList.remove('is-playing', 'is-holding');
    video.pause();
    video.currentTime = 0;
  };
  const play = (panel) => {
    panels.forEach((other) => other !== panel && other.classList.contains('is-playing') && stop(other));
    const video = panel.querySelector('video');
    video.preload = 'auto';
    panel.classList.add('is-playing');
    video.play().catch(() => {});
  };

  panels.forEach((panel) => {
    const video = panel.querySelector('video');
    panel.style.setProperty('--hold-time', `${HOLD_DELAY}ms`);

    // Laptops: hover.
    let hoverTimer;
    panel.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || !hoverable.matches || reduce.matches) return;
      video.preload = 'auto'; // start fetching during the delay
      hoverTimer = setTimeout(() => play(panel), HOVER_DELAY);
    });
    panel.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(hoverTimer);
      stop(panel);
    });

    // Touch: press and hold.
    let holdTimer;
    let held = false;
    let start = null;
    const cancelHold = () => {
      clearTimeout(holdTimer);
      panel.classList.remove('is-holding');
      start = null;
    };
    panel.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      held = false;
      start = { x: e.clientX, y: e.clientY };
      video.preload = 'auto';
      panel.classList.add('is-holding');
      holdTimer = setTimeout(() => {
        held = true;
        panel.classList.remove('is-holding');
        play(panel);
      }, HOLD_DELAY);
    });
    panel.addEventListener('pointermove', (e) => {
      // A swipe or scroll isn't a hold.
      if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) cancelHold();
    });
    ['pointerup', 'pointercancel'].forEach((type) => panel.addEventListener(type, cancelHold));
    panel.addEventListener('click', (e) => {
      if (!held) return;
      e.preventDefault(); // the hold was to watch, not to open the project
      held = false;
    });
    // A long press would otherwise open the browser's link menu.
    panel.addEventListener('contextmenu', (e) => {
      if (!hoverable.matches) e.preventDefault();
    });
  });

  // Touch: a panel that rests mostly on screen plays after a moment; one that
  // leaves stops.
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target: panel, isIntersecting }) => {
      clearTimeout(panel._dwell);
      if (!isIntersecting) {
        if (panel.classList.contains('is-playing')) stop(panel);
        return;
      }
      if (hoverable.matches || reduce.matches) return;
      panel._dwell = setTimeout(() => play(panel), DWELL_DELAY);
    });
  }, { threshold: 0.75 });
  panels.forEach((panel) => observer.observe(panel));
}

/* =========================================================
   LAND DIRECTLY ON A LINKED SECTION
   Arriving via projects.html#ambag or index.html#contact should show that
   spot at once. The site's smooth scrolling would otherwise animate down
   from the top (or lose the jump while the page loads), so it's pinned
   instantly. A linked project row also skips its scroll-reveal fade.
   ========================================================= */
function initHashLanding() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;

  if (target.classList.contains('case-row')) target.classList.remove('reveal');
  const root = document.documentElement;
  root.style.scrollBehavior = 'auto';
  target.scrollIntoView({ block: 'start' });
  // Images above the row may still be loading; re-pin once they have.
  window.addEventListener('load', () => {
    target.scrollIntoView({ block: 'start' });
    root.style.scrollBehavior = '';
  }, { once: true });
}

/* =========================================================
   CERTIFICATE STACK
   Rotates every CERT_INTERVAL: the front card fades out and the rest move up
   one place. Pauses while hovered, focused, off screen, or in a background
   tab, and never auto-rotates with reduced motion. Prev/next buttons, dots,
   arrow keys and horizontal swipes move it by hand.
   ========================================================= */
const CERT_INTERVAL = 4000;

function initCertStack() {
  const stack = document.querySelector('[data-cert-stack]');
  if (!stack) return;
  const slides = [...stack.querySelectorAll('.cert-slide')];
  const dots = [...stack.querySelectorAll('.cert-dot')];
  const n = slides.length;
  if (!n) return;

  let current = 0;
  let outTimer;
  const render = (leaving) => {
    slides.forEach((slide, i) => {
      const pos = (i - current + n) % n;
      const isOut = i === leaving;
      slide.dataset.pos = isOut ? 'out' : pos <= 2 ? String(pos) : 'hidden';
      const front = pos === 0 && !isOut;
      slide.inert = !front;
      slide.setAttribute('aria-hidden', String(!front));
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
  };
  const go = (next) => {
    const leaving = current;
    current = (next + n) % n;
    if (current === leaving) return;
    render(leaving);
    clearTimeout(outTimer);
    // Once the fade has finished, the old front card joins the back of the queue.
    outTimer = setTimeout(() => render(), 650);
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  let hovered = false;
  let focused = false;
  let visible = false;
  const schedule = () => {
    clearInterval(timer);
    if (reduce.matches || hovered || focused || !visible || document.hidden) return;
    timer = setInterval(() => go(current + 1), CERT_INTERVAL);
  };

  stack.querySelector('[data-cert-prev]').addEventListener('click', () => { go(current - 1); schedule(); });
  stack.querySelector('[data-cert-next]').addEventListener('click', () => { go(current + 1); schedule(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { go(i); schedule(); }));
  stack.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(current - 1);
    else if (e.key === 'ArrowRight') go(current + 1);
  });

  let startX = null;
  const cards = stack.querySelector('.cert-stack-cards');
  cards.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  cards.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) { go(current + (dx < 0 ? 1 : -1)); schedule(); }
  });

  stack.addEventListener('pointerenter', () => { hovered = true; schedule(); });
  stack.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  stack.addEventListener('focusin', () => { focused = true; schedule(); });
  stack.addEventListener('focusout', (e) => {
    if (!stack.contains(e.relatedTarget)) { focused = false; schedule(); }
  });
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: 0.4 }).observe(stack);
  }

  render();
}

/* =========================================================
   FEEDBACK WIDGET
   A "Feedback" pill pinned bottom-left on every page opens a small panel:
   a 1-5 star rating, a comment, and an optional name. Rows go straight to
   Supabase's REST API as insert-only, so visitors can send but never read.
   ========================================================= */
function initFeedback() {
  if (!FEEDBACK_SUPABASE_URL || !FEEDBACK_SUPABASE_KEY) return;

  const stars = [1, 2, 3, 4, 5].map((n) => `
          <input type="radio" name="rating" id="fbStar${n}" value="${n}">
          <label for="fbStar${n}" aria-label="${n} / 5"><i class="fa-solid fa-star" aria-hidden="true"></i></label>`).join('');

  const root = document.createElement('div');
  root.className = 'feedback';
  root.innerHTML = `
    <button type="button" class="feedback-toggle" aria-expanded="false" aria-controls="feedbackPanel">
      <i class="fa-solid fa-star" aria-hidden="true"></i>
      <span data-i18n="feedback.open">Feedback</span>
    </button>
    <form class="feedback-panel" id="feedbackPanel" role="dialog" aria-labelledby="feedbackTitle" hidden novalidate>
      <div class="feedback-head">
        <div>
          <h2 class="feedback-title" id="feedbackTitle" data-i18n="feedback.title">Rate this portfolio</h2>
          <p class="feedback-sub" data-i18n="feedback.subtitle">Only I can see what you send.</p>
        </div>
        <button type="button" class="feedback-close" data-i18n-aria-label="feedback.close" aria-label="Close">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
      <fieldset class="feedback-stars">
        <legend class="sr-only" data-i18n="feedback.rating">Your rating</legend>
        <div class="feedback-stars-row">${stars}
        </div>
      </fieldset>
      <label class="feedback-label" for="fbComment" data-i18n="feedback.comment">Opinions or suggestions</label>
      <textarea class="form-control feedback-comment" id="fbComment" name="comment" rows="4" maxlength="1000"
        data-i18n-placeholder="feedback.commentPlaceholder"></textarea>
      <label class="feedback-label" for="fbName" data-i18n="feedback.name">Name (optional)</label>
      <input class="form-control" id="fbName" name="name" type="text" maxlength="60" autocomplete="name">
      <input class="feedback-hp" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p class="feedback-status" role="status"></p>
      <button type="submit" class="btn-view-details feedback-send"><span data-i18n="feedback.send">Send feedback</span></button>
    </form>`;
  document.body.appendChild(root);

  const toggle = root.querySelector('.feedback-toggle');
  const panel = root.querySelector('.feedback-panel');
  const status = root.querySelector('.feedback-status');
  const sendBtn = root.querySelector('.feedback-send');

  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-open', open);
    if (open) panel.querySelector('input[name="rating"]').focus();
  };
  const close = () => {
    setOpen(false);
    toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(panel.hidden));
  root.querySelector('.feedback-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });
  document.addEventListener('pointerdown', (e) => {
    if (!panel.hidden && !root.contains(e.target)) setOpen(false);
  });

  const setStatus = (key, state = '') => {
    status.textContent = getTranslation(key);
    status.dataset.state = state;
  };

  panel.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(panel);
    if (data.get('website')) return; // honeypot: bots fill every field
    const rating = Number(data.get('rating'));
    if (!rating) {
      setStatus('feedback.needRating', 'error');
      return;
    }

    sendBtn.disabled = true;
    setStatus('feedback.sending');
    try {
      const res = await fetch(`${FEEDBACK_SUPABASE_URL}/rest/v1/portfolio_feedback`, {
        method: 'POST',
        headers: {
          apikey: FEEDBACK_SUPABASE_KEY,
          Authorization: `Bearer ${FEEDBACK_SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal' // insert-only: the key can't read the row back
        },
        body: JSON.stringify({
          rating,
          comment: String(data.get('comment') || '').trim() || null,
          name: String(data.get('name') || '').trim() || null,
          page: location.pathname
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      panel.reset();
      setStatus('feedback.thanks', 'success');
    } catch (err) {
      console.error('Feedback failed:', err);
      setStatus('feedback.error', 'error');
    } finally {
      sendBtn.disabled = false;
    }
  });
}

/* =========================================================
   PROJECTS PAGE: BACK LINK
   Goes back to whichever page of this site you came from, at the spot you
   left it. Opened directly (no same-site history), it keeps its href.
   ========================================================= */
function initBackLink() {
  const back = document.querySelector('.projects-back');
  if (!back) return;

  back.addEventListener('click', (e) => {
    let sameSite = false;
    try {
      sameSite = new URL(document.referrer).origin === location.origin;
    } catch (err) {
      // No referrer: fall through to the link's own href.
    }
    if (!sameSite || history.length < 2) return;
    e.preventDefault();
    history.back();
  });
}

/* =========================================================
   PROJECTS PAGE: FILTER CHIPS
   Rows carry space-separated data-tags; a chip shows the rows that
   include its tag ("all" shows everything).
   ========================================================= */
function initProjectFilter() {
  const chips = document.querySelectorAll('.filter-chip');
  const rows = document.querySelectorAll('.case-row');
  if (!chips.length || !rows.length) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      rows.forEach((row) => {
        const tags = row.dataset.tags.split(' ');
        row.hidden = filter !== 'all' && !tags.includes(filter);
      });
      // Hidden rows shift everything below them, so scroll-reveal
      // trigger positions have to be recalculated.
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  });
}

/* =========================================================
   PROJECTS PAGE: SCREENSHOT GALLERY (thumbnail swaps main image)
   ========================================================= */
function initCaseGallery() {
  document.querySelectorAll('.case-gallery').forEach((gallery) => {
    const mainImg = gallery.querySelector('.case-main-img');
    const caption = gallery.querySelector('.case-caption');
    const thumbs = gallery.querySelectorAll('.case-thumb');

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        mainImg.src = thumb.dataset.src;
        mainImg.alt = thumb.dataset.alt;
        // Keep data-i18n in sync so a later language switch translates
        // the caption that is currently showing.
        caption.dataset.i18n = thumb.dataset.caption;
        caption.textContent = getTranslation(thumb.dataset.caption);
        thumbs.forEach((t) => t.setAttribute('aria-pressed', String(t === thumb)));
      });
    });
  });
}

/* =========================================================
   CONTACT FORM: VALIDATION + EMAILJS SUBMISSION
   ========================================================= */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendMessageBtn');
  const sendBtnText = document.getElementById('sendBtnText');
  const successMsg = document.getElementById('formSuccessMsg');
  const errorMsg = document.getElementById('formErrorMsg');
  if (!form) return;
  const fields = form.querySelectorAll('input[required], textarea[required]');

  // Real-time validation: toggle green/red borders as the user types
  fields.forEach((field) => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('blur', () => validateField(field));
  });

  function validateField(field) {
    const isValid = field.checkValidity();
    field.classList.toggle('is-valid', isValid);
    field.classList.toggle('is-invalid', !isValid);
    return isValid;
  }

  function validateAll() {
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });
    return allValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    if (!validateAll()) return;

    sendBtn.disabled = true;
    sendBtnText.textContent = getTranslation('contact.sending');

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        showSuccess();
      })
      .catch((err) => {
        console.error('EmailJS send failed:', err);
        showError();
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtnText.textContent = getTranslation('contact.sendBtn');
      });
  });

  function showSuccess() {
    successMsg.classList.remove('hidden');
    form.reset();
    fields.forEach((field) => field.classList.remove('is-valid', 'is-invalid'));
    fadeAfterDelay(successMsg);
  }

  function showError() {
    errorMsg.classList.remove('hidden');
    fadeAfterDelay(errorMsg);
  }

  function fadeAfterDelay(el) {
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease';
      el.style.opacity = '0';
      setTimeout(() => {
        el.classList.add('hidden');
        el.style.opacity = '1';
        el.style.transition = '';
      }, 600);
    }, 5000);
  }
}

/* =========================================================
   BACK TO TOP BUTTON
   ========================================================= */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================================
   AUTO-UPDATE COPYRIGHT YEAR
   ========================================================= */
function initCopyrightYear() {
  document.getElementById('copyrightYear').textContent = new Date().getFullYear();
}

/* =========================================================
   GSAP SCROLL REVEAL
   Progressive enhancement: gsap.from() only ever runs inside the
   matchMedia callback below, so if GSAP fails to load, or the user
   prefers reduced motion, elements simply keep their natural
   (fully visible) state — content can never get stuck hidden.
   ========================================================= */
function initGsapReveal() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll('.reveal').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  });
}

/* =========================================================
   HERO WEBGL SHADER BACKGROUND (Three.js)
   Animated gradient-mesh "aurora" effect in the existing
   blue/teal/gold palette. Transform-free: only a uTime uniform
   updates per frame, GPU does all the work. Pauses when the hero
   scrolls offscreen, and renders a single static frame instead of
   animating for prefers-reduced-motion.
   ========================================================= */
function initHeroShader() {
  const canvas = document.getElementById('heroCanvas');
  const heroSection = document.getElementById('home');
  if (!canvas || !heroSection || typeof THREE === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
  } catch (err) {
    console.error('WebGL unavailable, hero shader skipped:', err);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  };

  // The hero stays dark in both themes (it's built around a dark photo), so
  // the shader always uses its dark palette. The renderer is opaque, so any
  // pixel it hasn't drawn yet (e.g. mid-resize) shows the hero's base color
  // instead of pure black, which would read as a seam.
  renderer.setClearColor(0x0a0a1a, 1);

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec3 palette(float t) {
        vec3 c1 = vec3(0.039, 0.039, 0.102);
        vec3 c2 = vec3(0.424, 0.388, 1.0);
        vec3 c3 = vec3(0.0, 0.824, 1.0);
        vec3 c4 = vec3(0.894, 0.882, 1.0);
        vec3 col = mix(c1, c2, smoothstep(0.0, 0.4, t));
        col = mix(col, c3, smoothstep(0.35, 0.7, t));
        col = mix(col, c4, smoothstep(0.65, 1.0, t) * 0.5);
        return col;
      }

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 5; i++) {
          v += amp * noise(p);
          p *= 2.0;
          amp *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        uv.x *= uResolution.x / uResolution.y;
        vec2 mouseOffset = (uMouse - 0.5) * 0.35;
        vec2 p = uv * 2.2 + mouseOffset;
        float t = uTime * 0.05;
        float n = fbm(p + vec2(t, -t * 0.7));
        n += fbm(p * 1.6 - vec2(t * 0.6, t * 0.3)) * 0.5;
        vec3 color = palette(n);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  function resize(w, h) {
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    uniforms.uResolution.value.set(w, h);
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  // ResizeObserver (not a one-shot clientWidth read) so the canvas's drawing
  // buffer always matches its actual laid-out size, even if the first
  // measurement happens before Tailwind's injected styles settle layout.
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      resize(width, height);
    }
  });
  resizeObserver.observe(canvas);

  // Defer the first sizing pass: this script runs synchronously during
  // DOMContentLoaded, which can race ahead of the Tailwind CDN script's
  // async CSS injection (it adds utility classes like w-full/h-full via a
  // <style> tag on its own schedule). Several independent deferral
  // mechanisms so this can't silently get stuck on a stale size if one of
  // them doesn't fire: a double-rAF (waits for a real layout/paint cycle),
  // a setTimeout fallback, a re-check once web fonts finish loading (font
  // swaps can reflow the header's height after the first paint), and a
  // plain window resize listener for anything else. Unlike the earlier
  // version, this always re-measures — never gates itself behind a
  // "sized" flag — so the canvas's drawing buffer can't permanently drift
  // out of sync with its displayed size.
  const remeasure = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      resize(rect.width, rect.height);
    }
  };
  requestAnimationFrame(() => requestAnimationFrame(remeasure));
  setTimeout(remeasure, 300);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(remeasure).catch(() => {});
  }
  window.addEventListener('resize', remeasure, { passive: true });

  if (prefersReducedMotion) {
    renderer.render(scene, camera);
    return;
  }

  let clock = 0;
  let rafId = null;
  let targetMouse = { x: 0.5, y: 0.5 };

  heroSection.addEventListener('pointermove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    targetMouse.x = (e.clientX - rect.left) / rect.width;
    targetMouse.y = 1 - (e.clientY - rect.top) / rect.height;
  });

  function animate() {
    clock += 0.016;
    uniforms.uTime.value = clock;
    // Lerp toward the pointer target so the shader drifts smoothly instead
    // of snapping every mousemove event.
    uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.04;
    uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.04;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  }

  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (rafId === null) animate();
      } else if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
  }, { threshold: 0 });

  visibilityObserver.observe(heroSection);
}

/* =========================================================
   HERO NAME SHINE
   Replays the name's fade-in + light-sweep every time the hero
   section scrolls back into view, unlike the one-shot .reveal
   animations elsewhere on the page.
   ========================================================= */
function initHeroNameShine() {
  const nameEl = document.getElementById('heroName');
  const heroSection = document.getElementById('home');
  if (!nameEl || !heroSection) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      nameEl.classList.remove('shine-in');
      void nameEl.offsetWidth; // force reflow so the animation can restart
      nameEl.classList.add('shine-ready', 'shine-in');
    });
  }, { threshold: 0.6 });

  observer.observe(heroSection);
}

/* =========================================================
   HERO CURSOR GLOW
   Moves a soft glow behind the photo to follow the cursor. Desktop-only
   (fine pointer, hover-capable), skipped under prefers-reduced-motion.
   ========================================================= */
function initHeroCursorGlow() {
  const heroSection = document.getElementById('home');
  const glow = document.getElementById('heroMouseGlow');
  if (!heroSection || !glow) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  heroSection.addEventListener('pointermove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    glow.style.setProperty('--mx', `${x * 100}%`);
    glow.style.setProperty('--my', `${y * 100}%`);
  });
}

/* =========================================================
   FLOATING CODE-SNIPPET PARTICLES
   A handful of drifting code fragments in the hero — pure CSS
   animation once created, paused via IntersectionObserver when
   the hero scrolls offscreen so it never costs anything outside
   the viewport. Skipped entirely under prefers-reduced-motion.
   ========================================================= */
function initCodeParticles() {
  const container = document.getElementById('codeParticles');
  const heroSection = document.getElementById('home');
  if (!container || !heroSection) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const snippets = [
    'const x = 42;', '() => {}', 'if (true) {', 'npm run build', '<Component />',
    'return data;', 'git commit -m', 'async/await', 'useState()', 'SELECT * FROM',
    'docker up -d', 'class App {}', 'export default', '</> '
  ];

  snippets.forEach((snippet, i) => {
    const el = document.createElement('span');
    el.className = 'code-particle';
    el.textContent = snippet;
    el.style.left = `${(i / snippets.length) * 92 + Math.random() * 6}%`;
    const duration = 16 + Math.random() * 10;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${Math.random() * duration}s`;
    container.appendChild(el);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      container.classList.toggle('particles-paused', !entry.isIntersecting);
    });
  }, { threshold: 0 });

  observer.observe(heroSection);
}

/* =========================================================
   CUSTOM CURSOR
   Small dot tracks the pointer exactly; a larger ring trails it
   with easing and grows/glows over interactive elements. Desktop
   only (fine pointer, hover-capable); skipped under
   prefers-reduced-motion. Native cursor is only hidden once this
   confirms it can actually run (see .custom-cursor-active).
   ========================================================= */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  document.body.classList.add('custom-cursor-active');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.4;
    ringY += (mouseY - ringY) * 0.4;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverSelector = 'a, button, [role="button"], input, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest && e.target.closest(hoverSelector)) ring.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest(hoverSelector)) ring.classList.remove('cursor-hover');
  });
}

/* =========================================================
   CLICK RIPPLE ("cyber water droplet")
   Spawns a .click-ripple ring at every click point and lets its own
   CSS animation expand/fade it, then removes the element once the
   animation ends. Runs everywhere (including on buttons/links) —
   skipped under prefers-reduced-motion like the rest of the site's
   motion.
   ========================================================= */
function initClickRipple() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.addEventListener('animationend', () => ripple.remove());
    document.body.appendChild(ripple);
  });
}

/* =========================================================
   SCROLL PROGRESS BAR
   ========================================================= */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = `${progress}%`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
}
