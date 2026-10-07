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
  'portfolio.eyebrow': { en: 'Selected work', tl: 'Mga piling gawa' },
  'portfolio.viewAll': { en: 'View all projects', tl: 'Tingnan ang lahat ng proyekto' },
  'portfolio.hintHover': { en: 'Hover to preview', tl: 'I-hover para makita' },
  'portfolio.hintHold': { en: 'Hold to preview', tl: 'Pindutin nang matagal para makita' },

  // Projects page
  'projects.back': { en: 'Back', tl: 'Bumalik' },
  'projects.title': { en: 'All Projects', tl: 'Lahat ng Proyekto' },
  'projects.intro': {
    en: "Everything I've built and shipped so far, from vanilla JavaScript experiments to full-stack apps.",
    tl: 'Lahat ng nagawa at nai-ship ko na, mula sa mga eksperimento sa vanilla JavaScript hanggang sa mga full-stack na app.'
  },
  'projects.filterLabel': { en: 'Filter projects', tl: 'I-filter ang mga proyekto' },
  'projects.ctaTitle': { en: 'Like what you see?', tl: 'Nagustuhan mo ba ang nakita mo?' },
  'projects.ctaText': {
    en: "Whether it's a project, a collaboration, or a question about one of these builds, I'd like to hear from you.",
    tl: 'Proyekto man, kolaborasyon, o tanong tungkol sa isa sa mga ginawa ko, gusto kong marinig mula sa iyo.',
  },
  'projects.ctaButton': { en: 'Get in touch', tl: 'Makipag-ugnayan' },
  'filter.all': { en: 'All', tl: 'Lahat' },
  'filter.fullstack': { en: 'Full Stack', tl: 'Full Stack' },
  'filter.frontend': { en: 'Frontend', tl: 'Frontend' },
  'project.trip.desc': { en: 'A trip planner with private accounts, multi-city itineraries, a five-day forecast and weather-based suggestions for every stop, and a 3D attraction carousel.', tl: 'Isang trip planner na may pribadong account, itinerary sa maraming lungsod, 5-araw na forecast at mungkahi base sa panahon sa bawat hinto, at 3D na carousel ng mga pasyalan.' },
  'project.mood.desc': { en: 'A private home for couples: pair with an invite code, share how you feel each day, play in a little playground, and keep a shared photo gallery.', tl: 'Isang pribadong tahanan para sa magkasintahan: mag-pair gamit ang invite code, ibahagi ang nararamdaman araw-araw, maglaro sa maliit na playground, at magtabi ng shared na photo gallery.' },
  'project.shelf.desc': { en: 'A book search on the Open Library API with debounced suggestions, scoped search, sorting, and a page for every book.', tl: 'Isang paghahanap ng libro gamit ang Open Library API na may debounced na mungkahi, scoped na paghahanap, pag-sort, at sariling pahina para sa bawat libro.' },
  'project.budgy.desc': { en: 'A budget tracker that lives in your browser: a limit for every category, entries that repeat on their own, a clear picture of where the money goes, and a bamboo that grows toward your savings goal.', tl: 'Isang budget tracker na nasa browser mo: may limit ang bawat kategorya, may mga entry na kusang umuulit, malinaw kung saan napupunta ang pera, at may kawayang lumalaki papunta sa savings goal mo.' },
  'project.loadout.desc': { en: 'A multi-shop marketplace for PC peripherals: shoppers filter by real specs, check out from several shops at once, and turn every product in 3D.', tl: "Isang marketplace ng PC peripherals mula sa iba't ibang shop: nagfi-filter ayon sa totoong specs, isang checkout para sa ilang shop, at bawat produkto ay naiikot sa 3D." },
  'project.cloud.desc': { en: "A weather app with an animated sky that follows each city's conditions and time of day, a five-day forecast, a live world map, and five languages.", tl: 'Isang weather app na may animated na langit na sumusunod sa panahon at oras ng bawat lungsod, 5-araw na forecast, live na mapa ng mundo, at limang wika.' },
  'loadout.feature.1': { en: 'Spec-first catalog: switch type, layout, DPI and connectivity are all filters', tl: 'Catalog na nakabase sa specs: filter ang switch type, layout, DPI at connectivity' },
  'loadout.feature.2': { en: '3D category stage on the homepage and a 3D view on every product', tl: '3D na stage ng mga kategorya sa homepage at 3D view sa bawat produkto' },
  'loadout.feature.3': { en: 'One checkout split into one order per shop, inside a database transaction', tl: 'Isang checkout na hinahati sa tig-isang order bawat shop, sa loob ng database transaction' },
  'loadout.feature.4': { en: 'Seller dashboard with product photos cut out in the browser', tl: 'Seller dashboard na tinatanggal ang background ng litrato sa browser mismo' },
  'loadout.feature.5': { en: 'Admin approvals and moderation, every action logged and undoable', tl: 'Pag-apruba at moderasyon ng admin, bawat aksyon ay naka-log at puwedeng i-undo' },
  'cloud.feature.1': { en: 'Search any city, with recent searches and your last city remembered', tl: 'Maghanap ng kahit anong lungsod; naaalala ang mga huling hinanap' },
  'cloud.feature.2': { en: 'Five-day forecast plus a details panel that explains each reading', tl: '5-araw na forecast at panel na nagpapaliwanag sa bawat sukat' },
  'cloud.feature.3': { en: 'Explore map with a temperature-coloured pin for every city', tl: 'Explore map na may pin na kulay-temperatura para sa bawat lungsod' },
  'cloud.feature.4': { en: '°C/°F and five languages, switched without refetching', tl: '°C/°F at limang wika, napapalitan nang hindi nagre-refetch' },
  'cloud.feature.5': { en: 'Animated sky driven by real weather, sunrise and sunset', tl: 'Animated na langit base sa totoong panahon, pagsikat at paglubog ng araw' },
  'role.fullStackPm': { en: 'Full Stack Developer & Project Manager', tl: 'Full Stack Developer at Project Manager' },
  'duration.threeWeeks': { en: '3 weeks', tl: '3 linggo' },
  'screenshot.home3d': { en: 'Home & 3D Stage', tl: 'Home at 3D Stage' },
  'screenshot.specFilters': { en: 'Spec Filters', tl: 'Mga Filter ng Specs' },
  'screenshot.productPage': { en: 'Product Page', tl: 'Pahina ng Produkto' },
  'project.ambag.desc': { en: 'A group-project tracker where a task only counts as done once proof is attached, with leader review, a live activity log, and a read-only view for the professor.', tl: 'Isang tracker para sa group project kung saan tapos lang ang task kapag may patunay, may review ng leader, live na activity log, at read-only na view para sa propesor.' },
  'about.text': {
    en: "I'm a 3rd year BS Computer Science student at De La Salle Lipa who enjoys turning ideas into clean, functional web experiences. I love working across the stack, from crafting responsive interfaces to wiring up APIs and databases, and I'm always looking for the next interesting problem to solve.",
    tl: 'Ako ay isang 3rd year BS Computer Science na estudyante sa De La Salle Lipa na mahilig gumawa ng malinis at functional na karanasan sa web mula sa mga simpleng ideya. Mahilig akong magtrabaho sa buong stack, mula sa paggawa ng responsive na interface hanggang sa pag-set up ng mga API at database, at lagi akong naghahanap ng susunod na kawili-wiling problema na lulutasin.'
  },
  'about.viewCv': { en: 'View CV', tl: 'Tingnan ang CV' },
  'about.downloadCv': { en: 'Download CV', tl: 'I-download ang CV' },
  'about.certTitle': { en: 'Certifications', tl: 'Mga Sertipiko' },
  'about.certPrev': { en: 'Previous certificate', tl: 'Nakaraang sertipiko' },
  'about.certNext': { en: 'Next certificate', tl: 'Susunod na sertipiko' },
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
  'shelf.feature.5': { en: 'A page for every book, with skeleton cards that keep the layout steady while loading', tl: 'Sariling pahina para sa bawat libro, may skeleton card na nagpapanatiling steady ng layout habang naglo-load' },
  'budgy.feature.2': { en: 'A monthly limit for each of the twelve spending categories, with warnings when one runs over', tl: 'Buwanang limit para sa bawat isa sa labindalawang kategorya ng gastos, may babala kapag lumampas' },
  'budgy.feature.3': { en: 'Recurring rules that post themselves monthly or on chosen weekdays', tl: 'Mga recurring rule na kusang nagpo-post buwan-buwan o sa piniling araw' },
  'budgy.feature.4': { en: 'Spending donut with month-over-month change, in light and dark themes', tl: 'Donut ng gastos na may pagbabago bawat buwan, sa light at dark na tema' },
  'budgy.feature.5': { en: 'Undo for deletions, a full activity log, and CSV export', tl: 'Undo sa pagbura, kumpletong activity log, at CSV export' },
  'ambag.feature.2': { en: 'Completion requires proof: a file, link, or text', tl: 'Kailangan ng patunay para matapos: file, link, o text' },
  'ambag.feature.3': { en: 'Leader accepts or rejects proof, with a required reason on rejection', tl: 'Tinatanggap o tinatanggihan ng leader ang patunay, may kailangang dahilan kapag tinanggihan' },
  'ambag.feature.4': { en: 'Per-member ledger of on-time, late, and overdue work', tl: 'Ledger ng bawat miyembro para sa on-time, late, at overdue na trabaho' },
  'ambag.feature.5': { en: 'Live updates between teammates, plus a demo that needs no account', tl: 'Live na updates sa pagitan ng magkakagrupo, at demo na hindi kailangan ng account' },
  'footer.builtWith': { en: 'Built with ❤️ and a lot of coffee.', tl: 'Ginawa nang may ❤️ at maraming kape.' },

  // Feedback widget
  'feedback.open': { en: 'Feedback', tl: 'Puna' },
  'feedback.title': { en: 'Rate this portfolio', tl: 'I-rate ang portfolio na ito' },
  'feedback.subtitle': { en: 'Only I can see what you send.', tl: 'Ako lang ang makakakita ng ipapadala mo.' },
  'feedback.rating': { en: 'Your rating', tl: 'Ang rating mo' },
  'feedback.comment': { en: 'Opinions or suggestions', tl: 'Mga opinyon o mungkahi' },
  'feedback.commentPlaceholder': { en: "What worked, what didn't, what you'd change...", tl: 'Ano ang maganda, ano ang hindi, ano ang babaguhin mo...' },
  'feedback.name': { en: 'Name (optional)', tl: 'Pangalan (opsyonal)' },
  'feedback.send': { en: 'Send feedback', tl: 'Ipadala ang puna' },
  'feedback.sending': { en: 'Sending...', tl: 'Ipinapadala...' },
  'feedback.thanks': { en: 'Thanks! Got it.', tl: 'Salamat! Natanggap ko na.' },
  'feedback.error': { en: "Couldn't send that. Try again in a bit.", tl: 'Hindi naipadala. Subukan ulit mamaya.' },
  'feedback.needRating': { en: 'Pick a star rating first.', tl: 'Pumili muna ng star rating.' },
  'feedback.close': { en: 'Close', tl: 'Isara' }
};
