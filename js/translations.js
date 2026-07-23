/* =========================================================
   TRANSLATIONS
   English / Filipino (Tagalog) copy for the site.
   Job titles and tech terms (e.g. "Full Stack Developer",
   "GitHub", "RLS") are intentionally kept in English in the
   Filipino column, matching common Taglish tech-industry usage.
   ========================================================= */
const translations = {
  // Accessibility / chrome
  'a11y.skipLink': { en: 'Skip to main content', tl: 'Lumaktaw papunta sa pangunahing nilalaman' },
  'a11y.langSelector': { en: 'Language selector', tl: 'Pagpili ng wika' },
  'a11y.darkModeToggle': { en: 'Toggle dark mode', tl: 'Buksan/isara ang dark mode' },
  'a11y.modalClose': { en: 'Close', tl: 'Isara' },
  'a11y.backToTop': { en: 'Back to top', tl: 'Bumalik sa itaas' },

  // Navigation
  'nav.home': { en: 'Home', tl: 'Home' },
  'nav.portfolio': { en: 'Portfolio', tl: 'Portfolyo' },
  'nav.about': { en: 'About', tl: 'Tungkol sa Akin' },
  'nav.contact': { en: 'Contact', tl: 'Makipag-ugnayan' },

  // Hero section
  'hero.subtitle': { en: 'Full Stack Developer & Creative Thinker', tl: 'Full Stack Developer at Malikhaing Tagaisip' },
  'hero.tagline': {
    en: 'I craft high-performance web experiences that blend code with design.',
    tl: 'Gumagawa ako ng mataas ang performance na web experience na pinagsasama ang code at design.'
  },
  'hero.cta': { en: 'View My Work', tl: 'Tingnan ang Aking mga Gawa' },
  'hero.ctaSecondary': { en: "Let's Talk", tl: 'Mag-usap Tayo' },

  // Portfolio section
  'portfolio.title': { en: 'My Projects', tl: 'Aking mga Proyekto' },
  'project.viewDetails': { en: 'View Details', tl: 'Tingnan ang Detalye' },
  'project.trip.desc': {
    en: 'A travel planning app for browsing tourist attractions, saving favorites, and organizing your upcoming trips.',
    tl: 'Isang travel planning app para sa pag-browse ng mga atraksyon, pag-save ng paborito, at pag-oorganisa ng mga paparating na biyahe.'
  },
  'project.weather.desc': {
    en: 'An interactive weather dashboard with live maps, 5-day forecasts, and dynamic time-of-day backgrounds.',
    tl: 'Isang interactive na weather dashboard na may live maps, 5-araw na forecast, at dynamic na background base sa oras ng araw.'
  },
  'project.mood.desc': {
    en: 'A full-stack couples app for mood tracking, playful mini-games, and shared photo memories.',
    tl: 'Isang full-stack na app para sa magkasintahan na may mood tracking, masasayang mini-games, at magkasamang alaala sa larawan.'
  },

  // About section
  'about.title': { en: 'About Me', tl: 'Tungkol sa Akin' },
  'about.text': {
    en: "I'm a 3rd year BS Computer Science student at De La Salle Lipa who enjoys turning ideas into clean, functional web experiences. I love working across the stack — from crafting responsive interfaces to wiring up APIs and databases — and I'm always looking for the next interesting problem to solve.",
    tl: 'Ako ay isang 3rd year BS Computer Science na estudyante sa De La Salle Lipa na mahilig gumawa ng malinis at functional na karanasan sa web mula sa mga simpleng ideya. Mahilig akong magtrabaho sa buong stack — mula sa paggawa ng responsive na interface hanggang sa pag-set up ng mga API at database — at lagi akong naghahanap ng susunod na kawili-wiling problema na lulutasin.'
  },
  'about.viewCv': { en: 'View CV', tl: 'Tingnan ang CV' },
  'about.downloadCv': { en: 'Download CV', tl: 'I-download ang CV' },
  'about.certTitle': { en: 'Certifications', tl: 'Mga Sertipiko' },
  'about.certInProgress': { en: 'Currently Working Toward', tl: 'Kasalukuyang Tinatapos' },
  'about.viewCert': { en: 'View Certificate', tl: 'Tingnan ang Sertipiko' },
  'about.inProgress': { en: 'In Progress', tl: 'Isinasagawa' },

  // Contact section
  'contact.title': { en: 'Get In Touch', tl: 'Makipag-ugnayan' },
  'contact.newMessage': { en: 'New Message', tl: 'Bagong Mensahe' },
  'contact.labelName': { en: 'Your Name', tl: 'Iyong Pangalan' },
  'contact.labelEmail': { en: 'Your Email', tl: 'Iyong Email' },
  'contact.labelSubject': { en: 'Subject', tl: 'Paksa' },
  'contact.labelMessage': { en: 'Message', tl: 'Mensahe' },
  'contact.placeholderName': { en: 'Enter your name', tl: 'Ilagay ang iyong pangalan' },
  'contact.placeholderEmail': { en: 'Enter your email', tl: 'Ilagay ang iyong email' },
  'contact.placeholderSubject': { en: 'Enter subject', tl: 'Ilagay ang paksa' },
  'contact.placeholderMessage': { en: 'Enter your message', tl: 'Ilagay ang iyong mensahe' },
  'contact.feedbackName': { en: 'Please enter your name.', tl: 'Mangyaring ilagay ang iyong pangalan.' },
  'contact.feedbackEmail': { en: 'Please enter a valid email address.', tl: 'Mangyaring maglagay ng wastong email address.' },
  'contact.feedbackSubject': { en: 'Please enter a subject.', tl: 'Mangyaring ilagay ang paksa.' },
  'contact.feedbackMessage': { en: 'Please enter a message.', tl: 'Mangyaring ilagay ang iyong mensahe.' },
  'contact.sendBtn': { en: 'Send Message', tl: 'Ipadala ang Mensahe' },
  'contact.sending': { en: 'Sending...', tl: 'Ipinapadala...' },
  'contact.successMsg': { en: 'Your message has been sent successfully!', tl: 'Matagumpay na naipadala ang iyong mensahe!' },
  'contact.errorMsg': { en: 'Something went wrong. Please try again later.', tl: 'May naganap na error. Pakisubukang muli mamaya.' },

  // Modal shared labels
  'modal.technologies': { en: 'Technologies', tl: 'Mga Teknolohiya' },
  'modal.features': { en: 'Features', tl: 'Mga Tampok' },
  'modal.duration': { en: 'Duration:', tl: 'Tagal:' },
  'modal.role': { en: 'Role:', tl: 'Tungkulin:' },
  'modal.github': { en: 'GitHub', tl: 'GitHub' },
  'modal.liveDemo': { en: 'Live Demo', tl: 'Live na Demo' },

  // Shared duration / role values
  'duration.oneWeek': { en: '1 week', tl: '1 linggo' },
  'duration.twoWeeks': { en: '2 weeks', tl: '2 linggo' },
  'duration.twoMonths': { en: '2 months', tl: '2 buwan' },
  'role.frontendDev': { en: 'Frontend Developer', tl: 'Frontend Developer' },
  'role.fullStackDev': { en: 'Full Stack Developer', tl: 'Full Stack Developer' },

  // Screenshot captions
  'screenshot.dashboard': { en: 'Dashboard', tl: 'Dashboard' },
  'screenshot.exploreAttractions': { en: 'Explore Attractions', tl: 'Galugarin ang mga Atraksyon' },
  'screenshot.tripForm': { en: 'Trip Form', tl: 'Form ng Biyahe' },
  'screenshot.upcomingTrips': { en: 'Upcoming Trips', tl: 'Paparating na Biyahe' },
  'screenshot.mainView': { en: 'Main View', tl: 'Pangunahing Pahina' },
  'screenshot.weatherMap': { en: 'Weather Map', tl: 'Mapa ng Panahon' },
  'screenshot.forecast': { en: 'Forecast', tl: 'Pagtataya ng Panahon' },
  'screenshot.moodCheckin': { en: 'Mood Check-in', tl: 'Pag-check ng Mood' },
  'screenshot.signupPairing': { en: 'Sign Up & Pairing', tl: 'Pagpaparehistro at Pagpapares' },

  // Trip Planner features
  'trip.feature.1': { en: 'Browse tourist attractions by category and budget', tl: 'Mag-browse ng mga atraksyon ayon sa kategorya at budget' },
  'trip.feature.2': { en: 'Save favorite attractions for later', tl: 'I-save ang mga paboritong atraksyon para sa susunod' },
  'trip.feature.3': { en: 'Plan trips with custom dates and destinations', tl: 'Magplano ng biyahe na may custom na petsa at destinasyon' },
  'trip.feature.4': { en: 'Track upcoming and past trip history', tl: 'Subaybayan ang paparating at nakaraang mga biyahe' },

  // Weather Dashboard features
  'weather.feature.1': { en: 'Search weather by city', tl: 'Maghanap ng panahon ayon sa lungsod' },
  'weather.feature.2': { en: '5-day forecast view', tl: '5-araw na pagtataya ng panahon' },
  'weather.feature.3': { en: 'Interactive weather map', tl: 'Interactive na mapa ng panahon' },
  'weather.feature.4': { en: 'Dynamic time-of-day backgrounds', tl: 'Dynamic na background base sa oras ng araw' },

  // Twogether features
  'mood.feature.1': { en: 'Couple signup and pairing', tl: 'Pagpaparehistro at pagpapares ng magkasintahan' },
  'mood.feature.2': { en: 'Daily mood tracking', tl: 'Araw-araw na pagsubaybay sa mood' },
  'mood.feature.3': { en: 'Interactive playground / mini-games', tl: 'Interactive na palaruan / mini-games' },
  'mood.feature.4': { en: 'Shared photo gallery', tl: 'Magkasamang gallery ng larawan' },
  'mood.feature.5': { en: 'Strict per-couple data isolation via RLS', tl: 'Mahigpit na paghihiwalay ng datos ng bawat couple gamit ang RLS' },

  // Footer
  'footer.rights': { en: 'All Rights Reserved.', tl: 'Nakalaan ang Lahat ng Karapatan.' },
  'footer.builtWith': { en: 'Built with ❤️ and a lot of coffee.', tl: 'Ginawa nang may ❤️ at maraming kape.' }
};
