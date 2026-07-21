# MyPortfolio

A static single-page personal portfolio website built with HTML, Bootstrap 5, custom CSS, and vanilla JavaScript. It showcases three sample projects (Trip Planner, Weather Dashboard, Mood Home) via cards and detail modals, and includes a working contact form powered by EmailJS.

## Features

- **Responsive navigation bar** with scrollspy (active link highlighting via `IntersectionObserver`), a scroll-triggered background effect, and smooth scrolling to in-page sections.
- **Hero section** with a gradient background and call-to-action button.
- **Portfolio section** with three project cards (Trip Planner, Weather Dashboard, Mood Home). Clicking/activating a project title changes the portfolio section's background color (`data-color` attributes per project) and opens a Bootstrap modal with screenshots, a technology badge list, a feature list, and duration/role metadata.
- **About section** with a short bio paragraph.
- **Contact form** ("Get In Touch") with real-time client-side validation (valid/invalid field styling as you type or blur) and submission via the [EmailJS](https://www.emailjs.com/) browser SDK (`emailjs.sendForm`). Success and error alerts are shown after submission attempts.
- **Dark mode toggle** persisted in `localStorage`, implemented via a `dark-mode` class on `<body>` and CSS custom properties in `css/style.css`.
- **Back-to-top button** that appears after scrolling and smooth-scrolls back to the top.
- **Auto-updating copyright year** in the footer.
- **Accessibility touches**: a skip-to-content link, visible focus outlines, `aria-*` attributes on interactive elements, and keyboard support (Enter/Space) for the project-title color-change interaction.

## Tech stack

- HTML5
- [Bootstrap 5.3.3](https://getbootstrap.com/) (CSS + JS bundle, loaded via CDN) for layout, navbar, cards, and modals
- [Font Awesome 6.5.2](https://fontawesome.com/) (via CDN) for icons
- [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
- Custom CSS with CSS custom properties for theming/dark mode (`css/style.css`)
- Vanilla JavaScript, no build step or framework (`js/script.js`)
- [EmailJS Browser SDK 4.x](https://www.emailjs.com/) (via CDN) for sending the contact form without a backend

There is no backend/server code in this project — form submissions are sent directly from the browser to EmailJS.

## Project structure

```
portfolio/
├── index.html        # Page markup: nav, hero, portfolio cards, project modals, contact form, footer
├── css/
│   └── style.css      # Custom styling, including dark mode via CSS custom properties
└── js/
    └── script.js       # Dark mode toggle, scrollspy, smooth scroll, project card color change,
                         # EmailJS contact form handling, back-to-top, copyright year
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

The following content is currently placeholder/sample data and will need to be filled in before this is a "real" portfolio:

- Hero name (`Your Name`) and footer name/copyright.
- Social links (Facebook, GitHub, Instagram) and per-project GitHub/Live Demo links in the modals — currently `#`.
- Project screenshots — currently placeholder images from `picsum.photos`.
- TODO: live deployment URL (not yet deployed anywhere as far as this repository shows).

## License

TODO: no license file is currently present in this repository.
