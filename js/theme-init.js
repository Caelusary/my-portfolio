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
