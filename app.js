/* =========================================================
   STEEVLIET VZW - BESPOKE CONTROLLER & ROLE MANAGER
   Role-Based Views, Presentation Deck & Realtime Workflow
   ========================================================= */

const app = {
  currentView: 'slides', // 'slides' | 'webapp'
  currentSlide: 1,
  totalSlides: 6,

  // Webapp state
  currentModule: 'catalog',
  currentRole: 'medewerker',
  categoryFilter: 'all',
  searchQuery: '',
  rating: 5,
  isPopoverOpen: false,
  activeCampus: 'melle',

  // Role Definitions & Personalized Navbars
  users: {
    medewerker: {
      name: "Tom De Smet",
      role: "Pedagogisch Begeleider",
      dept: "Leefgroep De Eik",
      avatar: "T",
      defaultModule: "catalog",
      navItems: [
        { key: "catalog", label: "Opleidingsaanbod", icon: "book" },
        { key: "my-requests", label: "Mijn Aanvragen & Status", icon: "check-circle", hasBadge: true },
        { key: "evaluations", label: "Evaluatie Indienen", icon: "star" }
      ]
    },
    coordinator: {
      name: "Sarah Claeys",
      role: "Teamcoördinator",
      dept: "Leefgroepen De Eik & De Berk",
      avatar: "S",
      defaultModule: "approvals",
      navItems: [
        { key: "approvals", label: "Openstaande Aanvragen", icon: "check-circle", hasPendingBadge: true },
        { key: "team", label: "Team Opleidingsoverzicht", icon: "users" },
        { key: "catalog", label: "Vormingsaanbod Bekijken", icon: "book" }
      ]
    },
    ines: {
      name: "Ines Van Damme",
      role: "HR & Loonadministratie",
      dept: "Centrale Dienst Melle",
      avatar: "I",
      defaultModule: "payroll",
      navItems: [
        { key: "payroll", label: "Looncodes & Tijdregistratie", icon: "clock", hasInesTag: true },
        { key: "team", label: "Centraal Opleidingsregister", icon: "users" }
      ]
    },
    els: {
      name: "Els Martens",
      role: "Opleidingsverantwoordelijke",
      dept: "Vormingsbeleid Steevliet",
      avatar: "E",
      defaultModule: "catalog",
      navItems: [
        { key: "catalog", label: "Vormingsaanbod Beheer", icon: "book" },
        { key: "logistics", label: "Zalen & Broodjes Campussen", icon: "home" },
        { key: "evaluations", label: "Partner Kwaliteit & Reviews", icon: "star" }
      ]
    }
  },

  // Courses Catalog
  courses: [
    {
      id: 1,
      title: "Omgaan met Weerstand & De-escalatie in de Leefgroep",
      category: "pedagogisch",
      categoryLabel: "Pedagogisch",
      partner: "Pimento vzw & Steevliet",
      duration: "8 uren (1 dag)",
      location: "Campus Melle (Zaal De Berk)",
      catering: "Broodjeslunch voorzien",
      summary: "Verbale en fysieke de-escalatietechnieken bij acute spanningen en crisis in residentiële leefgroepen.",
      target: "Opvoeders en leefgroepbegeleiders"
    },
    {
      id: 2,
      title: "Levensreddend Handelen & EHBO bij Kinderen en Jongeren",
      category: "pedagogisch",
      categoryLabel: "Pedagogisch / Logistiek",
      partner: "Rode Kruis Vlaanderen",
      duration: "4 uren",
      location: "Vormingscentrum Gent",
      catering: "Koffie & water",
      summary: "Wettelijk verplichte herhaling van reanimatie en eerste hulp gericht op kinderen en adolescenten (met officieel attest).",
      target: "Alle medewerkers (driejaarlijks verplicht)"
    },
    {
      id: 3,
      title: "HACCP & Voedselveiligheid in de Leefgroepkeuken",
      category: "logistiek",
      categoryLabel: "Logistiek & Keuken",
      partner: "Interne Kwaliteitsdienst Steevliet",
      duration: "3 uren",
      location: "Campus Melle (Keuken De Linde)",
      catering: "Koffie & koekjes",
      summary: "Voedselhygiëne, bewaartemperaturen en allergenenbeheer bij het koken in en met de residentiële leefgroepen.",
      target: "Keukenpersoneel en begeleiders met kookbeurt"
    },
    {
      id: 4,
      title: "Vroegdetectie van Suïcidaal Gedrag bij Jongeren",
      category: "pedagogisch",
      categoryLabel: "Pedagogisch",
      partner: "VLESP & CGG Passant",
      duration: "6 uren",
      location: "Campus St-Maria-Oudenhove",
      catering: "Broodjeslunch voorzien",
      summary: "Signalen herkennen, veiligheidsplanning opstellen en crisishantering binnen de jeugdhulp.",
      target: "Pedagogisch begeleiders en gezinsbegeleiders"
    },
    {
      id: 5,
      title: "Efficiënte Verslaglegging & Dossierbeheer",
      category: "admin",
      categoryLabel: "Administratie",
      partner: "Steevliet Kennisnetwerk",
      duration: "4 uren",
      location: "Campus Melle (Vergaderruimte)",
      catering: "Water & frisdrank",
      summary: "Praktische richtlijnen voor doelgerichte verslaglegging en veilige communicatie binnen het jeugdzorglandschap.",
      target: "Administratief personeel en coördinatoren"
    }
  ],

  // Tom's Personal Requests (My Requests module)
  myRequests: [
    {
      id: 101,
      course: "Omgaan met Weerstand & De-escalatie",
      hours: "8 uren",
      datetime: "18 Okt 2026 (09:00 - 17:00)",
      location: "Campus Melle (Zaal De Berk)",
      catering: "Broodje Vlees/Kaas",
      rooster: "Buiten werkrooster (overuren/recup)",
      status: "pending",
      statusLabel: "In afwachting van Sarah"
    }
  ],

  // Sarah's Approvals Queue
  approvals: [
    {
      id: 101,
      applicant: "Tom De Smet",
      role: "Pedagogisch Begeleider",
      dept: "Leefgroep De Eik",
      avatar: "T",
      dateSubmitted: "Vandaag om 14:15",
      course: "Omgaan met Weerstand & De-escalatie",
      hours: "8 uren",
      scheduleNote: "Buiten werkrooster (overuren/recup)",
      isOutsideShift: true,
      resultingLooncode: "LC-204",
      catering: "Broodje Vlees/Kaas (Campus Melle)",
      motivation: "Noodzakelijk voor crisishantering bij escalaties in leefgroep De Eik.",
      status: "pending"
    },
    {
      id: 102,
      applicant: "Anja Peeters",
      role: "Leefgroepbegeleider",
      dept: "Leefgroep De Berk",
      avatar: "A",
      dateSubmitted: "Gisteren om 16:30",
      course: "Vroegdetectie van Suïcidaal Gedrag",
      hours: "6 uren",
      scheduleNote: "Binnen gepland werkrooster",
      isOutsideShift: false,
      resultingLooncode: "LC-101",
      catering: "Broodje Vegetarisch (Campus St-Maria-Oudenhove)",
      motivation: "Verdieping voor intakegesprekken met nieuwe residenten.",
      status: "pending"
    }
  ],

  // Ines' Pre-Payroll Table
  payroll: [
    {
      id: 201,
      name: "Tom De Smet",
      dept: "Leefgroep De Eik (Pedagogisch)",
      course: "Omgaan met Weerstand & De-escalatie",
      hours: "8.0 uren",
      rooster: "Buiten dienst (Zaterdag / Vrije dag)",
      looncode: "LC-204",
      highlight: true,
      status: "Klaar voor Tijdregistratie"
    },
    {
      id: 202,
      name: "Anja Peeters",
      dept: "Leefgroep De Berk (Pedagogisch)",
      course: "Levensreddend Handelen & EHBO",
      hours: "4.0 uren",
      rooster: "Binnen geplande werkuren",
      looncode: "LC-101",
      highlight: false,
      status: "Verwerkt in Tijdregistratie"
    },
    {
      id: 203,
      name: "Marc Verbeeck",
      dept: "Facilitair & Onderhoud (Logistiek)",
      course: "HACCP & Voedselveiligheid",
      hours: "3.0 uren",
      rooster: "Binnen geplande werkuren",
      looncode: "LC-101",
      highlight: false,
      status: "Verwerkt in Tijdregistratie"
    },
    {
      id: 204,
      name: "Sophie De Vriendt",
      dept: "Secretariaat & Onthaal (Admin)",
      course: "Efficiënte Verslaglegging",
      hours: "4.0 uren",
      rooster: "Buiten werkuren (Avondsessie)",
      looncode: "LC-204",
      highlight: true,
      status: "Klaar voor Tijdregistratie"
    }
  ],

  // Catering Data (Els: Broodjes & Zalen per Campus)
  cateringData: {
    melle: {
      campusName: "Campus Melle",
      date: "Vrijdag 18 Okt 2026",
      zaal: "Zaal De Berk (09:00 - 17:00)",
      zaalSetup: "U-vorm voor 12 personen • Beamer, Geluid & Flipchart",
      totals: "8x Broodje Vlees/Kaas • 4x Broodje Vegetarisch",
      delivery: "Levering om 12:15 door Bakkerij De Baere (Melle)",
      course: "Omgaan met Weerstand & De-escalatie (Pimento vzw)",
      attendees: [
        { name: "Tom De Smet", dept: "Leefgroep De Eik", sandwich: "Broodje Vlees/Kaas (Griekse Kip)", diet: "Geen mayonaise", status: "Bevestigd" },
        { name: "Anja Peeters", dept: "Leefgroep De Berk", sandwich: "Broodje Vegetarisch (Geitenkaas & Walnoot)", diet: "Noten ok", status: "Bevestigd" },
        { name: "Marc Verbeeck", dept: "Facilitair & Keuken", sandwich: "Broodje Vlees/Kaas (Klassiek Ham/Kaas)", diet: "Geen boter", status: "Bevestigd" },
        { name: "Sophie De Vriendt", dept: "Secretariaat Melle", sandwich: "Broodje Vegetarisch (Hummus & Gegrild)", diet: "Veganistisch", status: "Bevestigd" },
        { name: "Jonas Claes", dept: "Leefgroep De Linde", sandwich: "Broodje Vlees/Kaas (Kip Curry)", diet: "Standaard", status: "Bevestigd" },
        { name: "Sarah Claeys", dept: "Coördinatie Leefgroepen", sandwich: "Broodje Vegetarisch (Mozzarella Pesto)", diet: "Vegetarisch", status: "Bevestigd" },
        { name: "Pieter Van Damme", dept: "Leefgroep De Eik", sandwich: "Broodje Vlees/Kaas (Rosbief)", diet: "Extra rauwkost", status: "Bevestigd" },
        { name: "Ellen Boons", dept: "Leefgroep De Berk", sandwich: "Broodje Vlees/Kaas (Martino Kip)", diet: "Pikant", status: "Bevestigd" },
        { name: "Koen De Vos", dept: "Opvoeder Residentie", sandwich: "Broodje Vlees/Kaas (Krabsalade)", diet: "Standaard", status: "Bevestigd" },
        { name: "Lise Martens", dept: "Pedagogische Dienst", sandwich: "Broodje Vegetarisch (Ei-Bieslook)", diet: "Vegetarisch", status: "Bevestigd" },
        { name: "Dries Maes", dept: "Contextbegeleiding", sandwich: "Broodje Vlees/Kaas (Kip Andalouse)", diet: "Standaard", status: "Bevestigd" },
        { name: "Els Martens", dept: "Opleidingsverantwoordelijke", sandwich: "Broodje Vlees/Kaas (Oude Kaas & Mosterd)", diet: "Standaard", status: "Bevestigd" }
      ]
    },
    oudenhove: {
      campusName: "Campus St-Maria-Oudenhove",
      date: "Donderdag 22 Okt 2026",
      zaal: "Vergaderzaal Het Park (09:30 - 16:00)",
      zaalSetup: "Vergaderopstelling voor 8 personen • Smart TV & Wifi",
      totals: "5x Broodje Vlees/Kaas • 3x Broodje Vegetarisch",
      delivery: "Levering om 12:00 door Bakkerij 't Zottegems Broodje",
      course: "Vroegdetectie van Suïcidaal Gedrag (VLESP & CGG Passant)",
      attendees: [
        { name: "Charlotte De Clercq", dept: "Leefgroep Het Park", sandwich: "Broodje Vegetarisch (Geitenkaas)", diet: "Geen mosterd", status: "Bevestigd" },
        { name: "Bart Van Hauwermeiren", dept: "Leefgroep De Kade", sandwich: "Broodje Vlees/Kaas (Ham & Kaas)", diet: "Standaard", status: "Bevestigd" },
        { name: "Mieke De Smet", dept: "Opvoeder Oudenhove", sandwich: "Broodje Vlees/Kaas (Griekse Kip)", diet: "Standaard", status: "Bevestigd" },
        { name: "Stefanie Lauwers", dept: "Contextbegeleiding", sandwich: "Broodje Vegetarisch (Brie)", diet: "Vegetarisch", status: "Bevestigd" },
        { name: "Timon De Meyer", dept: "Leefgroep Het Park", sandwich: "Broodje Vlees/Kaas (Rosbief)", diet: "Extra groenten", status: "Bevestigd" },
        { name: "Nathalie Claes", dept: "Orthopedagoog", sandwich: "Broodje Vegetarisch (Hummus)", diet: "Veganistisch", status: "Bevestigd" },
        { name: "Wouter Stevens", dept: "Leefgroep De Kade", sandwich: "Broodje Vlees/Kaas (Kip Curry)", diet: "Standaard", status: "Bevestigd" },
        { name: "Els Martens", dept: "Opleidingsverantwoordelijke", sandwich: "Broodje Vlees/Kaas (Kaas & Ei)", diet: "Standaard", status: "Bevestigd" }
      ]
    }
  },

  // Els' Course-Specific Partner Reviews (From staff feedback)
  partnerReviews: [
    {
      courseTitle: "Omgaan met Weerstand & De-escalatie in de Leefgroep",
      partner: "Pimento vzw",
      score: "★ 4.8",
      reviewsCount: 19,
      verdict: "Aanrader voor Leefgroepen",
      badgeClass: "p-high",
      quote: "Direct toepasbare de-escalatietechnieken om crisissituaties in de leefgroep rustig te ontmijnen zonder fysieke time-out.",
      reviewer: "Tom De Smet (Leefgroep De Eik)"
    },
    {
      courseTitle: "Levensreddend Handelen & EHBO bij Kinderen en Jongeren",
      partner: "Rode Kruis Vlaanderen",
      score: "★ 4.9",
      reviewsCount: 26,
      verdict: "Wettelijk Verplicht (Topscore)",
      badgeClass: "p-high",
      quote: "Heldere reanimatietraining met oefenpoppen voor baby's en tieners. Duidelijke lesgevers en het attest is 3 jaar geldig.",
      reviewer: "Anja Peeters (Leefgroep De Berk)"
    },
    {
      courseTitle: "Efficiënte Verslaglegging & Dossierbeheer in de Jeugdzorg",
      partner: "Steevliet Kennisnetwerk (Intern)",
      score: "★ 4.4",
      reviewsCount: 8,
      verdict: "Interne Kennisdeling",
      badgeClass: "p-med",
      quote: "Handige sjablonen voor verslaglegging in het jeugdzorgdossier. Bespaart wekelijks overtikwerk bij de dagrapportage.",
      reviewer: "Sophie De Vriendt (Secretariaat)"
    },
    {
      courseTitle: "Algemene Vergadertechnieken & Tijdsbeheer",
      partner: "Vormingsbureau X (Extern)",
      score: "★ 2.4",
      reviewsCount: 5,
      verdict: "Advies: Niet meer inboeken",
      badgeClass: "p-low",
      quote: "Te schools en puur theoretisch. Weinig aansluiting bij de hectische dagelijkse realiteit van een residentiële jeugdzorgwerking.",
      reviewer: "Klaas Martens (Opvoeder)"
    }
  ]
};


// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initDeckDots();
  renderCourses();
  renderMyRequests();
  renderApprovals();
  renderPayrollTable();
  renderPartnersList();
  renderCateringTable('melle');
  renderNavigation();

  // Keyboard navigation for presentation slides
  document.addEventListener('keydown', handleKeyNavigation);

  // Single fullscreen toggle listener
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

  // Click outside to close user popover
  document.addEventListener('click', (e) => {
    const popover = document.getElementById('user-role-popover');
    const trigger = document.getElementById('user-profile-trigger');
    if (app.isPopoverOpen && popover && trigger && !popover.contains(e.target) && !trigger.contains(e.target)) {
      closeUserRolePopover();
    }
  });
});


// ================= VIEW SWITCHER =================
function switchToWebapp() {
  app.currentView = 'webapp';
  document.body.className = 'mode-webapp';

  document.getElementById('view-slides-mode').classList.remove('active');
  document.getElementById('view-webapp-mode').classList.add('active');
}

function switchToSlides() {
  app.currentView = 'slides';
  document.body.className = 'mode-slides';

  document.getElementById('view-webapp-mode').classList.remove('active');
  document.getElementById('view-slides-mode').classList.add('active');
}


// ================= SINGLE FULLSCREEN CONTROLLER =================
function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {});
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function handleFullscreenChange() {
  const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  const iconEnter = document.getElementById('icon-fs-enter');
  const iconExit = document.getElementById('icon-fs-exit');
  const label = document.getElementById('txt-fs-label');

  if (iconEnter) iconEnter.style.display = isFs ? 'none' : 'inline';
  if (iconExit) iconExit.style.display = isFs ? 'inline' : 'none';
  if (label) label.textContent = isFs ? 'Scherm Verkleinen' : 'Volledig Scherm';
}


// ================= SLIDES DECK CONTROLLER =================
function initDeckDots() {
  const dots = document.getElementById('deck-dots');
  if (!dots) return;

  dots.innerHTML = Array.from({ length: app.totalSlides }).map((_, i) => `
    <span class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i + 1})" title="Dia ${i + 1}"></span>
  `).join('');
}

function updateSlideView() {
  document.querySelectorAll('.slide-card').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.slide) === app.currentSlide);
  });

  document.querySelectorAll('.dot').forEach((d, idx) => {
    d.classList.toggle('active', (idx + 1) === app.currentSlide);
  });

  const counter = document.getElementById('slide-counter');
  if (counter) {
    counter.textContent = `Dia ${app.currentSlide} van ${app.totalSlides}`;
  }

  const btnPrev = document.getElementById('btn-prev-slide');
  const btnNext = document.getElementById('btn-next-slide');
  if (btnPrev) btnPrev.style.opacity = app.currentSlide === 1 ? '0.35' : '1';
  if (btnNext) btnNext.style.opacity = app.currentSlide === app.totalSlides ? '0.35' : '1';
}

function nextSlide() {
  if (app.currentSlide < app.totalSlides) {
    app.currentSlide++;
    updateSlideView();
  }
}

function prevSlide() {
  if (app.currentSlide > 1) {
    app.currentSlide--;
    updateSlideView();
  }
}

function goToSlide(n) {
  if (n >= 1 && n <= app.totalSlides) {
    app.currentSlide = n;
    updateSlideView();
  }
}

function handleKeyNavigation(e) {
  if (app.currentView !== 'slides') return;
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

  if (e.key === 'ArrowRight' || e.key === 'Space') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevSlide();
  }
}


// ================= DYNAMIC ROLE-BASED NAVIGATION =================
function renderNavigation() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  const user = app.users[app.currentRole];
  if (!user) return;

  // Icon SVG helper
  const getIconSvg = (iconName) => {
    switch (iconName) {
      case 'book':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
      case 'check-circle':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
      case 'clock':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
      case 'users':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
      case 'home':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
      case 'star':
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      default:
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
    }
  };

  const pendingApprovalsCount = app.approvals.filter(a => a.status === 'pending').length;

  let html = `<div class="nav-section-title">Menu</div>`;

  user.navItems.forEach(item => {
    const isActive = (app.currentModule === item.key);
    let badgeHtml = '';

    if (item.hasPendingBadge && pendingApprovalsCount > 0) {
      badgeHtml = `<span class="badge-count">${pendingApprovalsCount}</span>`;
    } else if (item.hasBadge && app.myRequests.length > 0) {
      badgeHtml = `<span class="badge-count">${app.myRequests.length}</span>`;
    } else if (item.hasInesTag) {
      badgeHtml = `<span class="badge-tag-ines">Ines</span>`;
    }

    html += `
      <button class="nav-btn ${isActive ? 'active' : ''}" data-tab="${item.key}" onclick="selectModule('${item.key}')">
        ${getIconSvg(item.icon)}
        <span>${item.label}</span>
        ${badgeHtml}
      </button>
    `;
  });

  html += `
    <div class="sidebar-spacer"></div>
    <button class="nav-btn btn-to-slides" onclick="switchToSlides()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      <span>Terug naar Presentatie</span>
    </button>
  `;

  nav.innerHTML = html;
}


// ================= USER SWITCHER (BOTTOM POPOVER) =================
function toggleUserRolePopover() {
  const popover = document.getElementById('user-role-popover');
  const chevron = document.querySelector('.chevron-up');
  app.isPopoverOpen = !app.isPopoverOpen;

  if (popover) popover.classList.toggle('active', app.isPopoverOpen);
  if (chevron) {
    chevron.style.transform = app.isPopoverOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  }
}

function closeUserRolePopover() {
  app.isPopoverOpen = false;
  const popover = document.getElementById('user-role-popover');
  const chevron = document.querySelector('.chevron-up');
  if (popover) popover.classList.remove('active');
  if (chevron) chevron.style.transform = 'rotate(0deg)';
}

function selectUserRole(roleKey) {
  app.currentRole = roleKey;
  const user = app.users[roleKey];
  if (!user) return;

  // Update checkmarks in popover
  document.querySelectorAll('.popover-item').forEach(item => {
    item.classList.toggle('active', item.dataset.role === roleKey);
  });

  // Update trigger button in sidebar
  const av = document.getElementById('sidebar-user-avatar');
  const nm = document.getElementById('sidebar-user-name');
  const dp = document.getElementById('sidebar-user-dept');
  if (av) av.textContent = user.avatar;
  if (nm) nm.textContent = user.name;
  if (dp) dp.textContent = user.dept;

  // Update modal applicant preview
  const modAvatar = document.getElementById('modal-applicant-avatar');
  const modName = document.getElementById('modal-applicant-name');
  const modDept = document.getElementById('modal-applicant-dept');
  if (modAvatar) modAvatar.textContent = user.avatar;
  if (modName) modName.textContent = user.name;
  if (modDept) modDept.textContent = `${user.role} • ${user.dept}`;

  closeUserRolePopover();

  // Switch to role's default module & update sidebar
  app.currentModule = user.defaultModule;
  renderNavigation();
  selectModule(user.defaultModule);
}


// ================= MODULE NAVIGATION =================
function selectModule(moduleKey) {
  app.currentModule = moduleKey;

  // Update sidebar active buttons
  document.querySelectorAll('.sidebar-nav .nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === moduleKey);
  });

  // Show active module pane
  document.querySelectorAll('.module-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const activePane = document.getElementById(`module-${moduleKey}`);
  if (activePane) activePane.classList.add('active');

  // Update workspace header titles and subtitles
  const titles = {
    catalog: {
      title: "Opleidingsaanbod",
      sub: "Blader door het centrale aanbod en dien direct een aanvraag in"
    },
    'my-requests': {
      title: "Mijn Aanvragen & Status",
      sub: "Overzicht van jouw ingediende vormingen en goedkeuring door Sarah"
    },
    approvals: {
      title: "Openstaande Goedkeuringen",
      sub: "Beoordeel aanvragen van jouw teamleden voor akkoord en looncodetoekenning"
    },
    team: {
      title: "Team Opleidingsoverzicht",
      sub: "Bezetting en opleidingsplanning in Leefgroep De Eik en De Berk"
    },
    payroll: {
      title: "Looncodes & Tijdregistratie",
      sub: "Voor Ines: geautomatiseerde roosterkoppeling (LC-101 vs LC-204) klaar voor export"
    },
    logistics: {
      title: "Zalen & Broodjes per Campus",
      sub: "Overzicht van zaalreservaties en broodjesbestellingen Campus Melle & Oudenhove"
    },
    evaluations: {
      title: "Evaluaties & Kwaliteit",
      sub: "Kwaliteitsbeoordelingen van externe partners en 1-minuut feedback per opleiding"
    }
  };

  const titleEl = document.getElementById('current-module-title');
  const subEl = document.getElementById('current-module-sub');
  if (titleEl && titles[moduleKey]) titleEl.textContent = titles[moduleKey].title;
  if (subEl && titles[moduleKey]) subEl.textContent = titles[moduleKey].sub;

  // Contextual Header Actions
  const actionsEl = document.getElementById('workspace-actions');
  if (actionsEl) {
    if (moduleKey === 'catalog' || moduleKey === 'my-requests') {
      actionsEl.innerHTML = `
        <button class="btn btn-secondary" onclick="openModal('sheet-suggest')">
          <span>+ Externe Vorming Voorstellen</span>
        </button>
      `;
    } else if (moduleKey === 'payroll') {
      actionsEl.innerHTML = `
        <button class="btn btn-primary" onclick="exportPayrollCSV()">
          <span>📥 Download CSV Tijdregistratie</span>
        </button>
      `;
    } else if (moduleKey === 'logistics') {
      actionsEl.innerHTML = `
        <button class="btn btn-primary" onclick="exportCateringCSV()">
          <span>📥 Download Bestelbon Bakkerij (CSV)</span>
        </button>
      `;
    } else {
      actionsEl.innerHTML = '';
    }
  }
}


// ================= MODULE 1: CATALOGUS =================
function filterCatalog(cat, pillEl) {
  app.categoryFilter = cat;

  if (pillEl) {
    pillEl.parentElement.querySelectorAll('.filter-btn').forEach(p => p.classList.remove('active'));
    pillEl.classList.add('active');
  }

  renderCourses();
}

function onSearchCourses() {
  const input = document.getElementById('global-search-input');
  app.searchQuery = input ? input.value.toLowerCase().trim() : '';
  renderCourses();
}

function renderCourses() {
  const container = document.getElementById('courses-grid-container');
  if (!container) return;

  const filtered = app.courses.filter(c => {
    const matchCat = (app.categoryFilter === 'all') || (c.category === app.categoryFilter);
    const matchSearch = !app.searchQuery || 
      c.title.toLowerCase().includes(app.searchQuery) ||
      c.partner.toLowerCase().includes(app.searchQuery) ||
      c.summary.toLowerCase().includes(app.searchQuery);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #ffffff; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <p class="text-muted" style="margin-bottom: 1rem;">Geen opleidingen gevonden voor deze zoekopdracht.</p>
        <button class="btn btn-secondary" onclick="filterCatalog('all', null)">Herstel Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(c => `
    <article class="course-card-clean">
      <div>
        <div class="course-card-top">
          <span class="cat-badge ${c.category}">${c.categoryLabel}</span>
          <span class="partner-text">${c.partner}</span>
        </div>
        <h3 class="course-title">${c.title}</h3>
        <p class="course-summary">${c.summary}</p>

        <div class="course-specs-strip">
          <div class="spec-item">
            <span>Duur:</span>
            <strong>${c.duration}</strong>
          </div>
          <div class="spec-item">
            <span>Locatie:</span>
            <strong>${c.location}</strong>
          </div>
          <div class="spec-item">
            <span>Doelgroep:</span>
            <strong>${c.target}</strong>
          </div>
        </div>
      </div>

      <button class="btn-card-apply" onclick="openApplicationModal(${c.id})">
        <span>Aanvraag Indienen</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </article>
  `).join('');
}

function openApplicationModal(courseId) {
  const course = app.courses.find(c => c.id === courseId);
  if (!course) return;

  const titleEl = document.getElementById('modal-course-title');
  const idEl = document.getElementById('apply-course-id');
  const motEl = document.getElementById('apply-motivation');

  if (titleEl) titleEl.textContent = course.title;
  if (idEl) idEl.value = course.id;
  if (motEl) motEl.value = "";
  selectShiftOption('binnen');

  openModal('sheet-apply');
}

function selectShiftOption(type) {
  const cardBinnen = document.getElementById('shift-card-binnen');
  const cardBuiten = document.getElementById('shift-card-buiten');

  if (type === 'binnen') {
    if (cardBinnen) {
      cardBinnen.classList.add('active');
      const radio = cardBinnen.querySelector('input');
      if (radio) radio.checked = true;
    }
    if (cardBuiten) cardBuiten.classList.remove('active');
  } else {
    if (cardBuiten) {
      cardBuiten.classList.add('active');
      const radio = cardBuiten.querySelector('input');
      if (radio) radio.checked = true;
    }
    if (cardBinnen) cardBinnen.classList.remove('active');
  }
}

function submitApplication(e) {
  e.preventDefault();

  const courseId = parseInt(document.getElementById('apply-course-id')?.value || '1');
  const course = app.courses.find(c => c.id === courseId);
  const checkedRadio = document.querySelector('input[name="shiftOption"]:checked');
  const shiftType = checkedRadio ? checkedRadio.value : 'binnen';
  const lunch = document.getElementById('apply-lunch')?.value || "Broodje Vlees/Kaas";
  const loc = document.getElementById('apply-location')?.value || "Campus Melle";
  const mot = document.getElementById('apply-motivation')?.value || "Aansluiting bij leefgroepwerking";
  const activeUser = app.users[app.currentRole] || app.users.medewerker;

  closeModal('sheet-apply');

  const isBuiten = (shiftType === 'buiten');
  const newReqId = Date.now();

  // Add to Tom's personal requests list
  app.myRequests.unshift({
    id: newReqId,
    course: course ? course.title : "Nieuwe Opleiding",
    hours: course ? course.duration.split(' ')[0] + ' uren' : "8 uren",
    datetime: "Gepland in Q4 2026",
    location: loc,
    catering: lunch,
    rooster: isBuiten ? "Buiten werkrooster (overuren/recup)" : "Binnen gepland werkrooster",
    status: "pending",
    statusLabel: "In afwachting van Sarah"
  });

  // Add to Sarah's queue
  const newApproval = {
    id: newReqId,
    applicant: activeUser.name,
    role: activeUser.role,
    dept: activeUser.dept,
    avatar: activeUser.avatar,
    dateSubmitted: "Zojuist ingediend",
    course: course ? course.title : "Nieuwe Opleiding",
    hours: course ? course.duration.split(' ')[0] + ' uren' : "8 uren",
    scheduleNote: isBuiten ? "Buiten werkrooster (overuren/recup)" : "Binnen gepland werkrooster",
    isOutsideShift: isBuiten,
    resultingLooncode: isBuiten ? "LC-204" : "LC-101",
    catering: `${lunch} (${loc})`,
    motivation: mot,
    status: 'pending'
  };

  app.approvals.unshift(newApproval);
  renderApprovals();
  renderMyRequests();
  renderNavigation();

  // If active user is Tom, show his My Requests view
  if (app.currentRole === 'medewerker') {
    selectModule('my-requests');
  } else {
    selectModule('approvals');
  }
}

function submitSuggestion(e) {
  e.preventDefault();

  const title = document.getElementById('suggest-title')?.value || "Nieuwe Vorming";
  const partner = document.getElementById('suggest-partner')?.value || "Externe Partner";
  const cat = document.getElementById('suggest-category')?.value || "pedagogisch";

  const newCourse = {
    id: Date.now(),
    title: title,
    category: cat,
    categoryLabel: cat.charAt(0).toUpperCase() + cat.slice(1),
    partner: partner,
    duration: "In overleg",
    location: "Te bepalen",
    catering: "Te bepalen",
    summary: `Door medewerker voorgestelde opleiding via ${partner}. Els bekijkt het vormingsplan.`,
    target: "Op voordracht van medewerker"
  };

  app.courses.unshift(newCourse);
  renderCourses();
  closeModal('sheet-suggest');
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}


// ================= MODULE: MIJN AANVRAGEN (TOM) =================
function renderMyRequests() {
  const container = document.getElementById('my-requests-container');
  if (!container) return;

  if (app.myRequests.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #ffffff; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <p class="text-muted">Je hebt momenteel geen openstaande aanvragen.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = app.myRequests.map(r => `
    <article class="my-request-card">
      <div>
        <div class="mr-head">
          <span class="mr-status-pill ${r.status === 'approved' ? 'mr-approved' : 'mr-pending'}">
            ${r.statusLabel}
          </span>
          <span class="text-muted" style="font-size: 0.76rem;">${r.hours}</span>
        </div>
        <h3 class="course-title">${r.course}</h3>
        <p class="course-summary">Locatie: ${r.location} • Lunch: ${r.catering}</p>
        
        <div class="course-specs-strip">
          <div class="spec-item">
            <span>Rooster:</span>
            <strong>${r.rooster}</strong>
          </div>
          <div class="spec-item">
            <span>Timing:</span>
            <strong>${r.datetime}</strong>
          </div>
        </div>
      </div>

      <div style="font-size: 0.78rem; color: var(--ink-muted); border-top: 1px solid var(--border); padding-top: 0.65rem;">
        ${r.status === 'approved' ? '✓ Goedgekeurd door Sarah Claeys' : '⏱️ Sarah heeft deze aanvraag in haar overzicht'}
      </div>
    </article>
  `).join('');
}


// ================= MODULE 2: GOEDKEURINGEN (SARAH - CARD BASED) =================
function renderApprovals() {
  const container = document.getElementById('approvals-cards-container');
  const counterTag = document.getElementById('approvals-counter-tag');
  if (!container) return;

  const pending = app.approvals.filter(a => a.status === 'pending');
  if (counterTag) {
    counterTag.textContent = `${pending.length} Aanvraag${pending.length === 1 ? '' : 'en'} wachten op akkoord`;
  }

  if (app.approvals.length === 0) {
    container.innerHTML = `
      <div class="empty-approvals-box">
        <h4>Geen openstaande aanvragen</h4>
        <p>Alle aanvragen zijn verwerkt of goedgekeurd.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = app.approvals.map(item => {
    if (item.status === 'approved') {
      return `
        <article class="approval-card approved">
          <div class="approved-state-box">
            <div class="approved-text">
              <div class="approved-icon-circle">✓</div>
              <div>
                <strong>Goedgekeurd: ${item.course}</strong>
                <span>Aanvraag van ${item.applicant} • Automatisch geregistreerd onder ${item.resultingLooncode} voor Ines (HR).</span>
              </div>
            </div>
            <span class="badge-code ${item.isOutsideShift ? 'highlight' : ''}">${item.resultingLooncode}</span>
          </div>
        </article>
      `;
    }

    if (item.status === 'rejected') {
      return `
        <article class="approval-card" style="opacity: 0.6; background: var(--app-surface-alt);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: var(--danger-text);">✕ Afgewezen: ${item.course}</strong>
              <span class="text-muted" style="display: block; font-size: 0.8rem;">Aanvraag van ${item.applicant} is niet weerhouden.</span>
            </div>
            <span class="badge-status" style="background: #fee2e2; color: #991b1b;">Afgewezen</span>
          </div>
        </article>
      `;
    }

    return `
      <article class="approval-card" id="approval-item-${item.id}">
        <div class="approval-card-header">
          <div class="applicant-profile">
            <div class="applicant-avatar-lg">${item.avatar || item.applicant.charAt(0)}</div>
            <div class="applicant-meta">
              <strong>${item.applicant}</strong>
              <span>${item.role} • ${item.dept}</span>
            </div>
          </div>
          <span class="request-date-tag">${item.dateSubmitted}</span>
        </div>

        <div class="approval-card-body">
          <div class="body-course-info">
            <h3>${item.course}</h3>
            <div class="course-schedule-tag">Duur: <strong>${item.hours}</strong> • Catering: ${item.catering}</div>
            <div class="motivation-quote">"${item.motivation}"</div>
          </div>

          <div class="body-impact-details">
            <div class="impact-row">
              <span>Rooster situatie:</span>
              <span class="badge-rooster-calc ${item.isOutsideShift ? 'rooster-buiten' : 'rooster-binnen'}">
                ${item.scheduleNote}
              </span>
            </div>
            <div class="impact-row">
              <span>Berekende Looncode:</span>
              <span class="badge-code-target">➔ ${item.resultingLooncode}</span>
            </div>
            <div class="impact-row">
              <span>Doorstroming:</span>
              <strong style="color: var(--success); font-size: 0.82rem;">Direct naar Pre-Payroll</strong>
            </div>
          </div>
        </div>

        <div class="approval-card-actions">
          <button class="btn-reject-action" onclick="rejectRequestItem(${item.id})">
            ✕ Afwijzen
          </button>
          <button class="btn-approve-action" onclick="approveRequestItem(${item.id})">
            ✓ Akkoord (Goedkeuren)
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function approveRequestItem(id) {
  const item = app.approvals.find(a => a.id === id);
  if (!item) return;

  item.status = 'approved';

  // Sync to Tom's personal request view
  const myReq = app.myRequests.find(r => r.id === id);
  if (myReq) {
    myReq.status = 'approved';
    myReq.statusLabel = 'Goedgekeurd door Sarah';
  }

  // Add to Ines' Pre-Payroll register
  app.payroll.unshift({
    id: Date.now(),
    name: item.applicant,
    dept: `${item.dept} (${item.role})`,
    course: item.course,
    hours: item.hours,
    rooster: item.scheduleNote,
    looncode: item.resultingLooncode,
    highlight: item.isOutsideShift,
    status: "Klaar voor Tijdregistratie"
  });

  renderApprovals();
  renderMyRequests();
  renderPayrollTable();
  renderNavigation();
}

function rejectRequestItem(id) {
  const item = app.approvals.find(a => a.id === id);
  if (!item) return;

  item.status = 'rejected';

  const myReq = app.myRequests.find(r => r.id === id);
  if (myReq) {
    myReq.status = 'rejected';
    myReq.statusLabel = 'Niet goedgekeurd';
  }

  renderApprovals();
  renderMyRequests();
  renderNavigation();
}


// ================= MODULE 3: LOONCODES & TIJD (INES) =================
function renderPayrollTable() {
  const tbody = document.getElementById('payroll-table-body');
  if (!tbody) return;

  tbody.innerHTML = app.payroll.map(row => `
    <tr>
      <td><strong>${row.name}</strong></td>
      <td><span class="text-muted">${row.dept}</span></td>
      <td><strong>${row.course}</strong></td>
      <td>${row.hours}</td>
      <td><span class="text-muted">${row.rooster}</span></td>
      <td>
        <span class="badge-code ${row.highlight ? 'highlight' : ''}">${row.looncode}</span>
      </td>
      <td>
        <span class="badge-status ${row.status.includes('Verwerkt') ? 'badge-done' : 'badge-pending'}">${row.status}</span>
      </td>
    </tr>
  `).join('');
}

function exportPayrollCSV() {
  // Generate downloadable CSV content
  const headers = "Medewerker;Afdeling;Opleiding;Uren;RoosterSituatie;Looncode;Status\n";
  const rows = app.payroll.map(r => 
    `"${r.name}";"${r.dept}";"${r.course}";"${r.hours}";"${r.rooster}";"${r.looncode}";"${r.status}"`
  ).join("\n");

  const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "steevliet_tijdregistratie_export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// ================= MODULE 6: LOGISTIEK (ELS - BROODJESLIJST PER CAMPUS) =================
function switchCampusView(campusKey, btnEl) {
  app.activeCampus = campusKey;

  document.querySelectorAll('#btn-campus-melle, #btn-campus-oudenhove').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  renderCateringTable(campusKey);
}

function renderCateringTable(campusKey) {
  const data = app.cateringData[campusKey] || app.cateringData.melle;
  const tbody = document.getElementById('catering-table-body');

  // Update summary strip
  const zaalEl = document.getElementById('cs-zaal');
  const setupEl = document.getElementById('cs-zaal-setup');
  const totalsEl = document.getElementById('cs-totals');
  const delivEl = document.getElementById('cs-delivery');
  const courseEl = document.getElementById('cs-course');

  if (zaalEl) zaalEl.textContent = data.zaal;
  if (setupEl) setupEl.textContent = data.zaalSetup;
  if (totalsEl) totalsEl.textContent = data.totals;
  if (delivEl) delivEl.textContent = data.delivery;
  if (courseEl) courseEl.textContent = data.course;

  if (!tbody) return;

  tbody.innerHTML = data.attendees.map(a => `
    <tr>
      <td><strong>${a.name}</strong></td>
      <td><span class="text-muted">${a.dept}</span></td>
      <td>
        <span class="${a.sandwich.includes('Vegetarisch') ? 'badge-code' : 'badge-code'}" style="${a.sandwich.includes('Vegetarisch') ? 'background: #ecfdf5; color: #166534; border: 1px solid #bbf7d0;' : ''}">
          ${a.sandwich}
        </span>
      </td>
      <td>
        <span class="text-muted" style="font-size: 0.8rem;">${a.diet}</span>
      </td>
      <td>
        <span class="badge-status badge-done">${a.status}</span>
      </td>
    </tr>
  `).join('');
}

function exportCateringCSV() {
  const data = app.cateringData[app.activeCampus] || app.cateringData.melle;
  const headers = "Campus;Datum;Medewerker;Afdeling;Broodje;Dieet;Status\n";
  const rows = data.attendees.map(a => 
    `"${data.campusName}";"${data.date}";"${a.name}";"${a.dept}";"${a.sandwich}";"${a.diet}";"${a.status}"`
  ).join("\n");

  const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `bestelbon_broodjes_${app.activeCampus}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// ================= MODULE 7: EVALUATIES PER OPLEIDING & PARTNER (ELS) =================
function setStarRating(starsCount) {
  app.rating = starsCount;
  const stars = document.querySelectorAll('.star-btn');
  const label = document.getElementById('star-rating-label');

  stars.forEach((s, i) => {
    s.classList.toggle('active', i < starsCount);
  });

  const texts = [
    "1/5 • Onvoldoende bruikbaar",
    "2/5 • Te theoretisch voor leefgroep",
    "3/5 • Voldoende maar matig",
    "4/5 • Goede, relevante opleiding",
    "5/5 • Zeer waardevol & Aanrader"
  ];

  if (label) label.textContent = texts[starsCount - 1] || `${starsCount}/5`;
}

function submitCourseEval(e) {
  e.preventDefault();

  const pimento = app.partnerReviews.find(p => p.partner.includes('Pimento'));
  if (pimento) {
    pimento.reviewsCount += 1;
    pimento.score = "★ 4.9";
  }
  renderPartnersList();

  const form = e.target;
  form.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem;">
      <div style="font-size: 2rem; color: var(--success); margin-bottom: 0.5rem;">✓</div>
      <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Evaluatie Doorgestuurd naar Els</h4>
      <p class="text-muted">Jouw feedback voor "Omgaan met Weerstand" is direct verwerkt in de kwaliteitsclassificatie van Pimento vzw.</p>
    </div>
  `;
}

function renderPartnersList() {
  const container = document.getElementById('partners-ranking-container');
  if (!container) return;

  container.innerHTML = app.partnerReviews.map(r => `
    <article class="partner-review-card">
      <div class="pr-top">
        <div>
          <div class="pr-course">${r.courseTitle}</div>
          <span class="pr-partner-tag">Partner: <strong>${r.partner}</strong></span>
        </div>
        <div class="p-score-box">
          <div class="p-stars">${r.score}</div>
          <span class="p-badge ${r.badgeClass}">${r.verdict}</span>
        </div>
      </div>
      <div class="pr-quote">"${r.quote}"</div>
      <div class="pr-footer">
        <span>Beoordeling door: ${r.reviewer}</span>
        <span>${r.reviewsCount} evaluaties in totaal</span>
      </div>
    </article>
  `).join('');
}
