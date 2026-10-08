// Applies the dark/light theme class before first paint, matching the
// localStorage-persisted choice initDarkMode() (js/script.js) reads later.
// Loaded synchronously and first in <head> so the page never flashes the
// light-theme CSS defaults. A file rather than inline so the CSP needs no
// script hash.
(function () {
  var stored = localStorage.getItem('theme');
  var isDark = stored ? stored === 'dark' : true;
  if (isDark) document.documentElement.classList.add('dark');
})();

// Arriving on a section link (index.html#contact, projects.html#ambag) would
// otherwise paint the top of the page first and jump a moment later, once
// script.js runs at the end of <body>. Hide the page until initHashLanding()
// has pinned the target; the timeout is a safety net if script.js fails.
(function () {
  if (location.hash.length < 2) return;
  var root = document.documentElement;
  root.classList.add('hash-landing');
  setTimeout(function () { root.classList.remove('hash-landing'); }, 1500);
})();
