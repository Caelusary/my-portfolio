/** @type {import('tailwindcss').Config} */
module.exports = {
  // JS is scanned too: script.js toggles utility classes such as hidden/flex.
  content: ['./*.html', './js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif']
      },
      colors: {
        herobase: '#0A0A1A'
      }
    }
  }
};
