# Zachary Scott — Portfolio

A cinematic personal portfolio for Zachary Scott (Full-Stack Developer & Creative Thinker), built with HTML, Tailwind CSS, custom CSS, and vanilla JavaScript. It showcases seven real projects (Loadout, Budgy, Cloudbase, Ambag, Trip Planner, Twogether, Shelf Help) on a home page that features the first three and a dedicated projects page with all seven, an About section with skills, CV, and certifications, and a working contact form powered by EmailJS.

## Features

- **Purple/cyan design system** (`#6C63FF` → `#00D2FF`) with a full dark theme (default) and light theme, both fully re-themed via CSS custom properties — persisted in `localStorage`. The nav and the hero stay dark in both themes, since the hero is built around a dark photo.
- **Hero section** with a full-bleed portrait whose dark foliage dissolves into the page: it fills the right side on wide screens (and phones held sideways) and the whole hero on phones, with the name, tagline, and actions grouped on the dark side. Behind it runs a faint animated WebGL "aurora" (Three.js), plus a cursor-reactive glow, floating code-snippet particles, and a scroll-replayable name "shine" animation. The page width grows with the screen up to 1440px.
- **Custom cursor** (dot + trailing ring) that grows/glows over interactive elements — desktop only (fine pointer + hover-capable), automatically disabled on touch devices and under `prefers-reduced-motion`.
- **Click ripple effect** — a small glowing ring pulses outward from every click and fades, skipped under `prefers-reduced-motion`.
- **Responsive navigation bar**: a "ZS" monogram logo plus one glass pill holding the links, language switch, and theme toggle, aligned to the page width; on phones the same group opens as a dropdown from a hamburger button. Includes scrollspy (active link highlighting via `IntersectionObserver`), and smooth scrolling to in-page sections.
- **Scroll-reveal animations** (GSAP + ScrollTrigger) on section headings, project cards, and the contact card — fade/rise into view, with a `prefers-reduced-motion` override that disables all of it.
- **Scroll progress bar** showing how far down the page you are.
- **EN / Filipino language toggle** with a full translation dictionary (`js/translations.js`), persisted in `localStorage`, falling back to English for any untranslated string.
- **Portfolio section** featuring three projects (Loadout, Budgy, Cloudbase) as one full-width glass row of expanding panels, each on its app's brand colors with its logo. A light sweep crosses the row once when it scrolls into view. Each panel shows its logo, its number and title, and a hint modelled on Loadout's "Drag to turn": a pulsing hand icon with "Hover to preview" on laptops or "Hold to preview" on phones. On laptops, hovering a panel widens it and dims the other two, and resting on it for 0.7s plays a short recording of the app full-bleed (`project-videos/`); leaving stops and rewinds it. On touch screens the panels match the laptop look (phones get a swipeable row): holding a finger on one fills a ring around the hint and plays its recording after 0.45s without opening the link, and a panel that rests fully on screen for 2.5s plays on its own until it's swiped away. One recording plays at a time, and under `prefers-reduced-motion` only a deliberate hold plays one. Each panel links straight to that project on the projects page, which opens already scrolled to it, and a **View all projects** button beside the heading links to the full list.
- **Projects page** (`projects.html`) listing all seven projects as alternating case-study rows, in the same order as the home page: a screenshot gallery (thumbnails swap the main image), role and duration, description, feature list, tech badges, and Live Demo / GitHub links. Filter chips narrow the list to Full Stack or Frontend (one swipeable row on phones), and a closing "Like what you see?" call to action links to the contact form. Its **Back** link returns to whichever page of the site you came from, at the spot you left it.
- **About section** with a portrait tinted in the site palette beside the bio (stacked on phones), a real skills badge row, View/Download CV buttons (linking to an actual PDF résumé), and a Certifications area: completed certificates sit in a stack (newest first, the next two peeking out behind) that cross-fades to the next card every 4 seconds, pauses on hover, focus or when off screen, never auto-rotates under `prefers-reduced-motion`, and has prev/next buttons, dots, arrow keys and swipe. Each links to its real PDF. Certifications in progress are listed below it.
- **Contact form** ("Get In Touch") with real-time client-side validation (valid/invalid field styling as you type or blur) and submission via the [EmailJS](https://www.emailjs.com/) browser SDK (`emailjs.sendForm`). Success and error alerts are shown after submission attempts.
- **Footer** with social links (Facebook, GitHub, Instagram, WordPress, phone) and quick navigation.
- **Back-to-top button** that appears after scrolling and smooth-scrolls back to the top.
- **Feedback widget**: a "Feedback" pill pinned bottom-left on both pages opens a panel with a 1-5 star rating, an opinions/suggestions box, and an optional name. Entries go straight into a Supabase table that visitors can insert into but never read; only the project owner sees them, in the Supabase dashboard.
- **Page transitions**: moving between the home and projects pages cross-fades with a slight rise while the nav stays put (cross-document view transitions; browsers without them switch instantly). Links to a section, like `index.html#contact`, land on it directly.
- **Auto-updating copyright year** in the footer.
- **Accessibility touches**: a skip-to-content link, visible focus outlines, `aria-*` attributes on interactive elements, lazy-loaded below-the-fold images, and every motion-heavy feature (cursor, banner light sweep, project recordings, cursor glow, particles, shader animation, click ripple) gracefully skipped under `prefers-reduced-motion` or on touch devices.

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
│   ├── style.css           # Theming (dark/light), hero shader/photo/particles, glassmorphism, project panels, cursor, scroll-reveal
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
├── images/                 # Hero and About portraits (WebP, two sizes each), link preview images, favicon
├── project-screenshots/    # Real screenshots used in the project cards and galleries
├── project-videos/         # Short app recordings (MP4 + poster) played in the home page panels
├── supabase/
│   └── feedback.sql        # Insert-only feedback table and its row-level security policy
├── .github/workflows/
│   └── keep-supabase-awake.yml  # Pings the Supabase project every 3 days so the free tier doesn't pause it
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

## Feedback widget setup (Supabase)

The widget posts to Supabase's REST API with a project URL and **publishable** key, set at the top of `js/script.js`:

```js
const FEEDBACK_SUPABASE_URL = 'https://btxzksfrjzhrsykjdhil.supabase.co';
const FEEDBACK_SUPABASE_KEY = 'sb_publishable_...';
```

The table lives in the same Supabase project as Trip Planner. The publishable key is meant to be public: `supabase/feedback.sql` creates `portfolio_feedback` with row-level security that lets that key insert rows and nothing else, so it can't read, edit, or delete feedback. Read entries in the Supabase dashboard under Table Editor, `portfolio_feedback`. To use your own project, run `supabase/feedback.sql` in its SQL Editor, swap in its URL and publishable key, and update the URL in `.github/workflows/keep-supabase-awake.yml`. Leaving either value empty hides the widget.

Free Supabase projects pause after about a week without activity, so the GitHub Action makes one tiny read every 3 days. GitHub disables scheduled workflows in repositories with no commits for 60 days; re-enable it under the repository's Actions tab if that happens.

## Live site

Deployed on Vercel: [zacharyscott.vercel.app](https://zacharyscott.vercel.app/) — auto-redeploys on every push to `main`.

## License

TODO: no license file is currently present in this repository.
