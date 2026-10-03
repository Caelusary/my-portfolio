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
  'project.viewProject': { en: 'View Project', tl: 'Tingnan ang Proyekto' },
  'portfolio.viewAll': { en: 'View All Projects', tl: 'Tingnan ang Lahat ng Proyekto' },

  // Projects page
  'projects.back': { en: 'Back to home', tl: 'Bumalik sa home' },
  'projects.title': { en: 'All Projects', tl: 'Lahat ng Proyekto' },
  'projects.intro': {
    en: "Everything I've built and shipped so far, from vanilla JavaScript experiments to full-stack apps.",
    tl: 'Lahat ng nagawa at nai-ship ko na, mula sa mga eksperimento sa vanilla JavaScript hanggang sa mga full-stack na app.'
  },
  'projects.filterLabel': { en: 'Filter projects', tl: 'I-filter ang mga proyekto' },
  'filter.all': { en: 'All', tl: 'Lahat' },
  'filter.fullstack': { en: 'Full Stack', tl: 'Full Stack' },
  'filter.frontend': { en: 'Frontend', tl: 'Frontend' },
  'filter.inProgress': { en: 'In Progress', tl: 'Isinasagawa' },
  'project.trip.desc': {
    en: 'A full-stack trip planner with accounts, multi-city itineraries, per-destination weather forecasts, and a 3D attraction carousel.',
    tl: 'Isang full-stack na trip planner na may account, itinerary sa maraming lungsod, weather forecast bawat destinasyon, at 3D na carousel ng mga atraksyon.'
  },
  'project.weather.desc': {
    en: 'An interactive weather dashboard with live maps, 5-day forecasts, and dynamic time-of-day backgrounds.',
    tl: 'Isang interactive na weather dashboard na may live maps, 5-araw na forecast, at dynamic na background base sa oras ng araw.'
  },
  'project.mood.desc': {
    en: 'A full-stack couples app for mood tracking, playful mini-games, and shared photo memories.',
    tl: 'Isang full-stack na app para sa magkasintahan na may mood tracking, masasayang mini-games, at magkasamang alaala sa larawan.'
  },
  'project.shelf.desc': {
    en: 'A React book search app powered by the Open Library API, with live suggestions, scoped search, and sorting.',
    tl: 'Isang React na app para sa paghahanap ng libro gamit ang Open Library API, na may live na suggestion, scoped na paghahanap, at pag-sort.'
  },
  'project.budgy.desc': {
    en: 'A personal budget tracker with category limits, recurring entries, spending summaries, and a savings goal.',
    tl: 'Isang personal na budget tracker na may limit bawat kategorya, paulit-ulit na entry, buod ng gastos, at savings goal.'
  },
  'project.ambag.desc': {
    en: 'A group-project tracker where a task only counts as done once proof is attached, backed by an immutable activity log.',
    tl: 'Isang tracker para sa group project kung saan tapos lang ang task kapag may kalakip na patunay, kasama ang activity log na hindi nababago.'
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

  // Project link labels
  'modal.github': { en: 'GitHub', tl: 'GitHub' },
  'modal.liveDemo': { en: 'Live Demo', tl: 'Live na Demo' },

  // Shared duration / role values
  'duration.twoWeeks': { en: '2 weeks', tl: '2 linggo' },
  'duration.twoMonths': { en: '2 months', tl: '2 buwan' },
  'duration.oneMonth': { en: '1 month', tl: '1 buwan' },
  'duration.ongoing': { en: 'Ongoing', tl: 'Kasalukuyang ginagawa' },
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
  'screenshot.lobby': { en: 'Lobby', tl: 'Lobby' },
  'screenshot.searchResults': { en: 'Search Results', tl: 'Mga Resulta ng Paghahanap' },
  'screenshot.bookDetails': { en: 'Book Details', tl: 'Detalye ng Libro' },
  'screenshot.summary': { en: 'Spending Summary', tl: 'Buod ng Gastos' },
  'screenshot.budgets': { en: 'Category Budgets', tl: 'Budget bawat Kategorya' },
  'screenshot.taskPool': { en: 'Task Pool', tl: 'Pool ng mga Task' },
  'screenshot.leaderReview': { en: 'Leader Review', tl: 'Pagsusuri ng Leader' },
  'screenshot.memberLedger': { en: 'Member Ledger', tl: 'Ledger ng mga Miyembro' },

  // Trip Planner features
  'trip.feature.1': { en: 'Sign up and keep trips private to your account', tl: 'Mag-sign up at panatilihing pribado sa iyong account ang mga biyahe' },
  'trip.feature.2': { en: 'Multi-city trips with stops, a map, and a packing list', tl: 'Biyahe sa maraming lungsod na may mga stop, mapa, at packing list' },
  'trip.feature.3': { en: '5-day weather forecast and suggestions for each destination', tl: '5-araw na weather forecast at mga suhestiyon para sa bawat destinasyon' },
  'trip.feature.4': { en: '3D attraction carousel with category and budget filters', tl: '3D na carousel ng mga atraksyon na may filter sa kategorya at budget' },
  'trip.feature.5': { en: 'Saved attractions, trip history, and shareable trip links', tl: 'Mga naka-save na atraksyon, kasaysayan ng biyahe, at link ng biyaheng puwedeng i-share' },

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

  // Shelf Help features
  'shelf.feature.1': { en: 'Debounced autocomplete with keyboard navigation', tl: 'Debounced na autocomplete na may keyboard navigation' },
  'shelf.feature.2': { en: 'Search everything, titles only, or authors only', tl: 'Maghanap sa lahat, sa pamagat lang, o sa may-akda lang' },
  'shelf.feature.3': { en: 'Sort by relevance, newest, or rating', tl: 'I-sort ayon sa relevance, pinakabago, o rating' },
  'shelf.feature.4': { en: 'Back button returns to the exact result set you came from', tl: 'Ibinabalik ka ng back button sa mismong resultang pinanggalingan mo' },
  'shelf.feature.5': { en: 'Skeleton loading cards that keep the layout stable', tl: 'Skeleton loading cards para hindi gumalaw ang layout' },

  // Budgy features
  'budgy.feature.1': { en: 'Log income and expenses by category', tl: 'Itala ang kita at gastos ayon sa kategorya' },
  'budgy.feature.2': { en: 'Monthly limit for every spending category', tl: 'Buwanang limit sa bawat kategorya ng gastos' },
  'budgy.feature.3': { en: 'Recurring entries that post automatically', tl: 'Paulit-ulit na entry na awtomatikong naitatala' },
  'budgy.feature.4': { en: 'Spending breakdown by category', tl: 'Hati-hati ng gastos ayon sa kategorya' },
  'budgy.feature.5': { en: 'Savings goal with a bamboo progress meter', tl: 'Savings goal na may bamboo na progress meter' },

  // Ambag features
  'ambag.feature.1': { en: 'Claim open tasks from a shared pool', tl: 'Kumuha ng bukas na task mula sa shared pool' },
  'ambag.feature.2': { en: 'Completion requires proof: a file, link, or text', tl: 'Kailangan ng patunay para matapos: file, link, o text' },
  'ambag.feature.3': { en: 'Leader accepts or rejects proof, with a required reason on rejection', tl: 'Tinatanggap o tinatanggihan ng leader ang patunay, at kailangan ng dahilan kapag tinanggihan' },
  'ambag.feature.4': { en: 'Per-member ledger of on-time, late, and overdue work', tl: 'Ledger ng bawat miyembro para sa on-time, late, at overdue na gawa' },
  'ambag.feature.5': { en: 'Revocable read-only share links for a professor', tl: 'Read-only na share link para sa propesor na puwedeng bawiin' },

  // Footer
  'footer.rights': { en: 'All Rights Reserved.', tl: 'Nakalaan ang Lahat ng Karapatan.' },
  'footer.builtWith': { en: 'Built with ❤️ and a lot of coffee.', tl: 'Ginawa nang may ❤️ at maraming kape.' }
};
