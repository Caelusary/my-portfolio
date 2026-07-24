/* =========================================================
   CONFIG
   ========================================================= */
// EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'V-b5rP4yFb6ZoE5xE';
const EMAILJS_SERVICE_ID = 'service_lvv2185';
const EMAILJS_TEMPLATE_ID = 'template_5hyd0k3';

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
  // Run each feature independently: if one throws, it must not take the
  // rest of the page down with it.
  [
    initGsapReveal, // runs first: reveal must never depend on anything else succeeding
    initHeroShader,
    initHeroNameShine,
    initHeroParallax,
    initCodeParticles,
    initCustomCursor,
    initCardTilt,
    initScrollProgress,
    initEmailJS,
    initDarkMode,
    initLanguageToggle,
    initNavScrollEffect,
    initMobileMenu,
    initScrollSpy,
    initSmoothScroll,
    initProjectBackgroundChange,
    initModals,
    initContactForm,
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
   PROJECT TITLE CLICK -> PORTFOLIO BACKGROUND COLOR CHANGE
   ========================================================= */
function initProjectBackgroundChange() {
  const portfolioSection = document.getElementById('portfolio');
  const projectTitles = document.querySelectorAll('.project-card-title');
  let activeTitle = null;

  projectTitles.forEach((title) => {
    const trigger = () => {
      if (activeTitle === title) {
        // Second click on the already-active title: back to the section's
        // default background instead of re-applying the same tint.
        portfolioSection.style.backgroundColor = '';
        activeTitle = null;
      } else {
        portfolioSection.style.backgroundColor = title.dataset.color;
        activeTitle = title;
      }
    };

    title.addEventListener('click', trigger);
    title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
  });
}

/* =========================================================
   PROJECT MODALS (custom, vanilla JS — no Bootstrap JS dependency)
   ========================================================= */
function initModals() {
  const modals = document.querySelectorAll('.modal');
  if (!modals.length) return;

  let lastFocused = null;

  function openModal(modal) {
    lastFocused = document.activeElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusTarget = modal.querySelector('.modal-close-btn');
    if (focusTarget) focusTarget.focus();
  }

  function closeModal(modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.modalTarget);
      if (modal) openModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.querySelectorAll('[data-modal-close]').forEach((closer) => {
      closer.addEventListener('click', () => closeModal(modal));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    modals.forEach((modal) => {
      if (!modal.classList.contains('hidden')) closeModal(modal);
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
  // <style> tag on its own schedule). Two independent deferral mechanisms
  // so this can't silently fail if one of them doesn't fire: a double-rAF
  // (waits for a real layout/paint cycle) and a setTimeout fallback.
  let sized = false;
  const doInitialResize = () => {
    if (sized) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      sized = true;
      resize(rect.width, rect.height);
    }
  };
  requestAnimationFrame(() => requestAnimationFrame(doInitialResize));
  setTimeout(doInitialResize, 300);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
   HERO PARALLAX (photo tilt + cursor-follow glow)
   Desktop-only (fine pointer, hover-capable), skipped entirely
   under prefers-reduced-motion.
   ========================================================= */
function initHeroParallax() {
  const heroSection = document.getElementById('home');
  const photo = document.getElementById('heroPhoto');
  const glow = document.getElementById('heroMouseGlow');
  if (!heroSection) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  heroSection.addEventListener('pointermove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (glow) {
      glow.style.setProperty('--mx', `${x * 100}%`);
      glow.style.setProperty('--my', `${y * 100}%`);
    }

    if (photo) {
      const rotateY = (x - 0.5) * 14;
      const rotateX = (0.5 - y) * 10;
      photo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });

  heroSection.addEventListener('pointerleave', () => {
    if (photo) photo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
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
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverSelector = 'a, button, [role="button"], input, textarea, .project-card-title';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest && e.target.closest(hoverSelector)) ring.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest(hoverSelector)) ring.classList.remove('cursor-hover');
  });
}

/* =========================================================
   PROJECT CARD 3D TILT
   Mouse-follow tilt on the portfolio cards. Desktop only (fine
   pointer, hover-capable); skipped under prefers-reduced-motion.
   ========================================================= */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 10;
      card.style.transition = 'none';
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
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
