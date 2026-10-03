# Zachary Scott — Portfolio

A cinematic personal portfolio for Zachary Scott (Full-Stack Developer & Creative Thinker), built with HTML, Tailwind CSS, custom CSS, and vanilla JavaScript. It showcases six real projects (Trip Planner, Weather Dashboard, Twogether, Shelf Help, Budgy, Ambag) on a home page that features three of them and a dedicated projects page with all six, an About section with skills, CV, and certifications, and a working contact form powered by EmailJS.

## Features

- **Purple/cyan design system** (`#6C63FF` → `#00D2FF`) with a full dark theme (default) and light theme, both fully re-themed via CSS custom properties — persisted in `localStorage`. The hero section re-themes too: its WebGL aurora shader carries a second light-mode color palette that crossfades on toggle.
- **Hero section** with a real alpha-channel cutout photo composited over an animated WebGL "aurora" background (Three.js), a cursor-reactive glow, floating code-snippet particles, and a scroll-replayable name "shine" animation.
- **Custom cursor** (dot + trailing ring) that grows/glows over interactive elements — desktop only (fine pointer + hover-capable), automatically disabled on touch devices and under `prefers-reduced-motion`.
- **Click ripple effect** — a small glowing ring pulses outward from every click and fades, skipped under `prefers-reduced-motion`.
- **Responsive navigation bar** with a glassmorphism blurred background, a "ZS" monogram logo, sliding underline link-hover effect, scrollspy (active link highlighting via `IntersectionObserver`), and smooth scrolling to in-page sections.
- **Scroll-reveal animations** (GSAP + ScrollTrigger) on section headings, project cards, and the contact card — fade/rise into view, with a `prefers-reduced-motion` override that disables all of it.
- **Scroll progress bar** showing how far down the page you are.
- **EN / Filipino language toggle** with a full translation dictionary (`js/translations.js`), persisted in `localStorage`, falling back to English for any untranslated string.
- **Portfolio section** featuring three projects (Trip Planner, Twogether, Ambag) as one full-width glass banner cut into three diagonal slices, one screenshot per project. The seams glow in the accent gradient, a light sweep crosses the glass on hover, and hovering a slice dims the other two. Each slice links straight to that project on the projects page, which opens already scrolled to it, and a **View All Projects** button links to the full list.
- **Projects page** (`projects.html`) listing all six projects as alternating case-study rows: a screenshot gallery (thumbnails swap the main image), role and duration, description, feature list, tech badges, and Live Demo / GitHub links. Filter chips narrow the list to Full Stack, Frontend, or In Progress.
- **About section** with a bio, a real skills badge row, View/Download CV buttons (linking to an actual PDF résumé), and a Certifications area listing completed certificates (with links to the real certificate PDFs where available) plus certifications currently in progress.
- **Contact form** ("Get In Touch") with real-time client-side validation (valid/invalid field styling as you type or blur) and submission via the [EmailJS](https://www.emailjs.com/) browser SDK (`emailjs.sendForm`). Success and error alerts are shown after submission attempts.
- **Footer** with social links (Facebook, GitHub, Instagram, phone) and quick navigation.
- **Back-to-top button** that appears after scrolling and smooth-scrolls back to the top.
- **Auto-updating copyright year** in the footer.
- **Accessibility touches**: a skip-to-content link, visible focus outlines, `aria-*` attributes on interactive elements, lazy-loaded below-the-fold images, and every motion-heavy feature (cursor, banner light sweep, cursor glow, particles, shader animation, click ripple) gracefully skipped under `prefers-reduced-motion` or on touch devices.

## Tech stack

- HTML5
- [Tailwind CSS 3.4](https://tailwindcss.com/) for layout and utility classes, prebuilt to `css/tailwind.css`
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
├── index.html              # Home page: nav, hero, featured projects, about/CV/certs, contact form, footer
├── projects.html           # All projects: filterable case-study rows with screenshot galleries
├── css/
│   ├── style.css           # Theming (dark/light), hero shader/photo/particles, glassmorphism, slice banner, cursor, scroll-reveal
│   ├── tailwind.input.css  # Tailwind entry point
│   └── tailwind.css        # Generated by `npm run css`; committed, since Vercel runs no build
├── js/
│   ├── theme-init.js       # Sets the dark/light class before first paint (no theme flash)
│   ├── script.js           # All feature init functions (cursor, shader, particles, cursor glow, forms, toggles, project filter, etc.)
│   └── translations.js     # EN/Filipino translation dictionary
├── scripts/
│   └── sync-chrome.mjs     # Copies the shared nav and footer from index.html into projects.html
├── tailwind.config.js      # Tailwind theme (fonts, colors) and the files it scans for classes
├── vercel.json             # /projects rewrite and security headers (CSP, frame, sniffing, referrer)
├── images/                 # Hero photo (real alpha-channel cutout)
├── project-screenshots/    # Real screenshots used in the project cards and galleries
└── about-me/                # Real CV and certification PDFs linked from the About section
```

## Installation / running locally

This is a static site: Vercel serves the files as committed and runs no build. To view it locally, serve the folder with any static file server so that relative asset paths resolve correctly, for example:

```bash
# Python 3
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser. Opening `index.html` directly via `file://` should also work for basic viewing, though some browsers restrict certain features (like `fetch`/module behavior) under `file://`.

### Editing

Two generated files are committed, so regenerate them before committing a change that affects them (needs Node and `npm install` once):

```bash
npm run css    # after adding or removing Tailwind classes in any HTML or JS file
npm run sync   # after editing the nav or footer, which live in index.html between the shared:nav / shared:footer markers
```

Any new external script, stylesheet, font, or API the page loads must also be added to the `Content-Security-Policy` in `vercel.json`, or the browser will block it on the live site.

## Contact form setup (EmailJS)

The contact form in `js/script.js` is wired up with an EmailJS **public key**, **service ID**, and **template ID**. These are safe to expose client-side (that's how EmailJS's browser SDK is designed to work), but they are tied to a specific EmailJS account:

```js
const EMAILJS_PUBLIC_KEY = 'V-b5rP4yFb6ZoE5xE';
const EMAILJS_SERVICE_ID = 'service_lvv2185';
const EMAILJS_TEMPLATE_ID = 'template_5hyd0k3';
```

To use the form with your own EmailJS account, replace these three values with your own public key, service ID, and template ID from your [EmailJS dashboard](https://dashboard.emailjs.com/).

## Live site

Deployed on Vercel: [zacharyscott.vercel.app](https://zacharyscott.vercel.app/) — auto-redeploys on every push to `main`.

## License

TODO: no license file is currently present in this repository.
