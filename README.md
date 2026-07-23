# Zachary Scott — Portfolio

A cinematic, single-page personal portfolio for Zachary Scott (Full-Stack Developer & Creative Thinker), built with HTML, Tailwind CSS, custom CSS, and vanilla JavaScript. It showcases three real projects (Trip Planner, Weather Dashboard, Twogether) via cards and detail modals, an About section with skills, CV, and certifications, and a working contact form powered by EmailJS.

## Features

- **Purple/cyan design system** (`#6C63FF` → `#00D2FF`) with a full dark theme (default) and light theme, both fully re-themed via CSS custom properties — persisted in `localStorage`.
- **Hero section** with a photo blended seamlessly into an animated WebGL "aurora" background (Three.js) using `mix-blend-mode: lighten`, a cursor-reactive glow, subtle mouse-tilt parallax on the photo, floating code-snippet particles, and a scroll-replayable name "shine" animation. The hero itself stays a fixed dark cinematic band in both themes.
- **Custom cursor** (dot + trailing ring) that grows/glows over interactive elements — desktop only (fine pointer + hover-capable), automatically disabled on touch devices and under `prefers-reduced-motion`.
- **Responsive navigation bar** with a glassmorphism blurred background, a "ZS" monogram logo, sliding underline link-hover effect, scrollspy (active link highlighting via `IntersectionObserver`), and smooth scrolling to in-page sections.
- **Scroll-reveal animations** (GSAP + ScrollTrigger) on section headings, project cards, and the contact card — fade/rise into view, with a `prefers-reduced-motion` override that disables all of it.
- **Scroll progress bar** showing how far down the page you are.
- **EN / Filipino language toggle** with a full translation dictionary (`js/translations.js`), persisted in `localStorage`, falling back to English for any untranslated string.
- **Portfolio section** with three glassmorphism project cards (Trip Planner, Weather Dashboard, Twogether), each with a mouse-follow 3D tilt effect, real tech-stack badges, and a real screenshot. Clicking/activating a project title tints the portfolio section's background (`data-color` attributes per project) and opens a modal with screenshots, a technology badge list, a feature list, and duration/role metadata.
- **About section** with a bio, a real skills badge row, View/Download CV buttons (linking to an actual PDF résumé), and a Certifications area listing completed certificates (with links to the real certificate PDFs where available) plus certifications currently in progress.
- **Contact form** ("Get In Touch") with real-time client-side validation (valid/invalid field styling as you type or blur) and submission via the [EmailJS](https://www.emailjs.com/) browser SDK (`emailjs.sendForm`). Success and error alerts are shown after submission attempts.
- **Footer** with social links (Facebook, GitHub, Instagram, phone) and quick navigation.
- **Back-to-top button** that appears after scrolling and smooth-scrolls back to the top.
- **Auto-updating copyright year** in the footer.
- **Accessibility touches**: a skip-to-content link, visible focus outlines, `aria-*` attributes on interactive elements, lazy-loaded below-the-fold images, keyboard support (Enter/Space) for the project-title color interaction, and every motion-heavy feature (cursor, tilt, parallax, particles, shader animation) gracefully skipped under `prefers-reduced-motion` or on touch devices.

## Tech stack

- HTML5
- [Tailwind CSS](https://tailwindcss.com/) (CDN/Play build) for layout and utility classes
- Custom CSS with CSS custom properties for theming/dark-light mode, glassmorphism, and animations (`css/style.css`)
- Vanilla JavaScript, no build step or framework (`js/script.js`)
- [Three.js](https://threejs.org/) (via CDN) for the hero's animated WebGL shader background
- [GSAP](https://gsap.com/) + ScrollTrigger (via CDN) for scroll-reveal animations
- [Font Awesome 6.5.2](https://fontawesome.com/) (via CDN) for icons
- [Google Fonts](https://fonts.google.com/) — Space Grotesk (headings) + Inter (body)
- [EmailJS Browser SDK 4.x](https://www.emailjs.com/) (via CDN) for sending the contact form without a backend

There is no backend/server code in this project — form submissions are sent directly from the browser to EmailJS.

## Project structure

```
portfolio/
├── index.html              # Page markup: nav, hero, portfolio cards, about/CV/certs, project modals, contact form, footer
├── css/
│   └── style.css           # Theming (dark/light), hero shader/photo/particles, glassmorphism, cursor, tilt, scroll-reveal
├── js/
│   ├── script.js           # All feature init functions (cursor, shader, particles, tilt, parallax, forms, toggles, etc.)
│   └── translations.js     # EN/Filipino translation dictionary
├── images/                 # Hero photo variants
├── project-screenshots/    # Real screenshots used in the project cards/modals
└── about-me/                # Real CV and certification PDFs linked from the About section
```

## Installation / running locally

This is a static site with no build step or dependencies to install. To view it locally, serve the folder with any static file server so that relative asset paths resolve correctly, for example:

```bash
# Python 3
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser. Opening `index.html` directly via `file://` should also work for basic viewing, though some browsers restrict certain features (like `fetch`/module behavior) under `file://`.

## Contact form setup (EmailJS)

The contact form in `js/script.js` is wired up with an EmailJS **public key**, **service ID**, and **template ID**. These are safe to expose client-side (that's how EmailJS's browser SDK is designed to work), but they are tied to a specific EmailJS account:

```js
const EMAILJS_PUBLIC_KEY = 'V-b5rP4yFb6ZoE5xE';
const EMAILJS_SERVICE_ID = 'service_lvv2185';
const EMAILJS_TEMPLATE_ID = 'template_5hyd0k3';
```

To use the form with your own EmailJS account, replace these three values with your own public key, service ID, and template ID from your [EmailJS dashboard](https://dashboard.emailjs.com/).

## Known placeholders

The following content is currently placeholder/sample data and will need to be filled in before this is fully "production-real":

- Per-project GitHub/Live Demo links in the modals — currently `#`.
- Some listed certifications (e.g. the Junior Philippine Computer Society certificates) don't yet have a PDF on hand, so they're listed without a "View Certificate" link.
- TODO: live deployment URL (not yet deployed anywhere as far as this repository shows).

## License

TODO: no license file is currently present in this repository.
