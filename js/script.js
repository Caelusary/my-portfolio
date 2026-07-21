/* =========================================================
   CONFIG
   ========================================================= */
// EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'V-b5rP4yFb6ZoE5xE';
const EMAILJS_SERVICE_ID = 'service_lvv2185';
const EMAILJS_TEMPLATE_ID = 'template_5hyd0k3';

document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  initDarkMode();
  initNavScrollEffect();
  initScrollSpy();
  initSmoothScroll();
  initProjectBackgroundChange();
  initContactForm();
  initBackToTop();
  initCopyrightYear();
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
   DARK MODE (persisted via localStorage)
   ========================================================= */
function initDarkMode() {
  const toggleBtn = document.getElementById('darkModeToggle');
  const icon = document.getElementById('darkModeIcon');
  const storedTheme = localStorage.getItem('theme');

  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    icon.textContent = isDark ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-pressed', String(isDark));
  };

  applyTheme(storedTheme === 'dark');

  toggleBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
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
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });
}

/* =========================================================
   PROJECT TITLE CLICK -> PORTFOLIO BACKGROUND COLOR CHANGE
   ========================================================= */
function initProjectBackgroundChange() {
  const portfolioSection = document.getElementById('portfolio');
  const projectTitles = document.querySelectorAll('.project-title');

  projectTitles.forEach((title) => {
    const trigger = () => {
      const color = title.dataset.color;
      portfolioSection.style.backgroundColor = color;
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
   CONTACT FORM: VALIDATION + EMAILJS SUBMISSION
   ========================================================= */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendMessageBtn');
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
    successMsg.classList.add('d-none');
    errorMsg.classList.add('d-none');

    if (!validateAll()) {
      form.classList.add('was-validated');
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

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
        sendBtn.textContent = '📤 Send Message';
      });
  });

  function showSuccess() {
    successMsg.classList.remove('d-none');
    form.reset();
    fields.forEach((field) => field.classList.remove('is-valid', 'is-invalid'));
    form.classList.remove('was-validated');
    fadeAfterDelay(successMsg);
  }

  function showError() {
    errorMsg.classList.remove('d-none');
    fadeAfterDelay(errorMsg);
  }

  function fadeAfterDelay(el) {
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease';
      el.style.opacity = '0';
      setTimeout(() => {
        el.classList.add('d-none');
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
