export type Language = "en" | "id";

export type LocalizedText = Record<Language, string>;
export type LocalizedList = Record<Language, string[]>;

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "portfolio-language";

export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "id";
}

export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key)
      ? String(values[key])
      : match,
  );
}

const en = {
  language: {
    groupLabel: "Language",
    names: {
      id: "Indonesian",
      en: "English",
    },
  },
  nav: {
    logoHome: "Kevin Risky Abadi, home",
    openMenu: "Open navigation menu",
    portfolio: "Portfolio 2026",
    badge: "KEVIN.DEV • FULLSTACK DEVELOPER •",
    home: "Home",
    about: "About",
    techStack: "Tech Stack",
    experience: "Experience",
    projects: "Projects",
    certifications: "Certifications",
    contact: "Contact",
    panelLabel: "Site navigation",
    panelEyebrow: "Navigation",
    closeMenu: "Close navigation menu",
    primary: "Primary",
    search: "Search projects",
    elsewhere: "Elsewhere",
  },
  hero: {
    role: "Role",
    rolePrimary: "Fullstack Developer",
    roleSecondary: "Backend Developer",
    focus: "Focus",
    focusPrimary: "Web Apps, REST APIs",
    focusSecondary: "& Databases",
    bio: "Fullstack and Backend Developer based in Nganjuk, Indonesia. I build reliable web applications, clean REST APIs, and the data systems behind them.",
    getInTouch: "Get in touch",
    scroll: "Scroll",
    location: "Nganjuk / East Java",
  },
  about: {
    eyebrow: "01 // ABOUT",
    heading:
      "Hi, I'm Kevin, a developer who enjoys building things that simply work.",
    paragraphs: {
      intro:
        "I'm a developer from Nganjuk, Indonesia who loves turning practical ideas into useful digital experiences. I enjoy exploring how software operates under the hood, learning modern tools, and finding straightforward ways to solve real problems.",
      craft:
        "I consider development an ongoing craft. Every project, collaboration, and tricky debugging session gives me an opportunity to learn something new and build something better than before.",
    },
    education: "Universitas Nusantara PGRI Kediri (2022–2026)",
    location: "Nganjuk, East Java, Indonesia",
    pillars: {
      backend: {
        title: "Backend Development",
        description:
          "Enjoy building the behind-the-scenes parts of applications that keep features working reliably, cleanly, and fast.",
      },
      "problem-solving": {
        title: "Problem Solving",
        description:
          "Like breaking down complicated problems, exploring practical solutions, and learning directly from the build process.",
      },
      collaboration: {
        title: "Collaboration",
        description:
          "Value clear communication, sharing ideas openly, and working constructively with teammates toward a common goal.",
      },
      fullstack: {
        title: "Fullstack Development",
        description:
          "Interested in how responsive user interfaces and solid backend systems come together to create complete digital experiences.",
      },
    },
  },
  techStack: {
    eyebrow: "02 // TECH STACK",
    title: "Tools & Technologies",
    intro:
      "The languages, frameworks, databases, and workflow tools I use to design and build software.",
    pauseHint: "HOVER OR FOCUS TO PAUSE",
    categories: {
      languages: "Languages",
      frameworks: "Frameworks & Libraries",
      databases: "Databases & ORM",
      tools: "Tools & Ecosystem",
    },
    technologiesAria: "Technologies in {category}",
    pauseAria:
      "Scrolling {category} list. Press Tab or hover to pause motion.",
  },
  experience: {
    eyebrow: "03 // EXPERIENCE",
    title: "Work & Education Journey",
    intro:
      "A chronological timeline of production engineering internships, formal education, and hands-on system building.",
    hideAchievements: "Hide key achievements",
    viewAchievements: "View key achievements",
    highlightsFor: "Highlights for {company}",
  },
  selectedWork: {
    eyebrow: "04 // SELECTED PROJECTS",
    title: "Selected Work",
    intro:
      "A selection of projects reflecting backend architectures, responsive applications, and computer vision research.",
    viewCaseStudy: "View case study for {title}",
    readCaseStudy: "Read case study for {title}",
    shareLink: "Share link for {title}",
    linkCopied: "Link copied to clipboard",
    linkCopiedShort: "Link copied!",
    shareProject: "Share project",
    viewCaseStudyTitle: "View case study",
    shareText: "Portfolio of Kevin Risky",
  },
  certifications: {
    eyebrow: "05 // CREDENTIALS",
    title: "Certifications",
    intro:
      "Verified credentials in backend development, system administration, and enterprise software engineering.",
    openDetails: "Open certificate details for {title}",
    verified: "Verified",
    yearPeriod: "Year / Period:",
    close: "Close certification details",
  },
  search: {
    title: "Search projects",
    help: "Search by project name, category, or technology. Type at least two characters. Press Escape to close.",
    inputLabel: "Search projects by name, category, or technology",
    placeholder: "Search projects or technologies",
    close: "Close search",
    filterGroup: "Filter projects by category",
    categories: {
      all: "All",
      web: "Web Development",
      mobile: "Mobile App",
      uiux: "UI/UX Design",
      ai: "Machine Learning",
    },
    statusPrompt: "Type at least two characters to search.",
    emptyTitle: "Search the project archive",
    emptyBody:
      "Type at least 2 characters to search by project, technology, or category.",
    results: "Projects",
    resultSingular: "project",
    resultPlural: "projects",
    noMatch: "No projects match “{query}”",
    noCategory: "No projects in this category yet",
    noResultsBody:
      "Try a different project name or technology, or reset the filters below.",
    reset: "Reset search",
  },
  projectDetail: {
    backToProjects: "Back to Projects",
    breadcrumb: "Breadcrumb",
    home: "Home",
    projects: "Projects",
    readPaper: "Read Published Research Paper",
    overviewEyebrow: "01 // OVERVIEW",
    context: "Project Context",
    engineeringEyebrow: "02 // ENGINEERING",
    architecture: "Architecture & Implementation",
    featuresEyebrow: "03 // FEATURES",
    keyFeatures: "Key Technical Features",
    details: "Project Details",
    category: "Category",
    date: "Date",
    role: "Role",
    externalReference: "External Reference",
    publishedArticle: "Published Article",
    technologies: "Technologies & Tools",
    nextCaseStudy: "Next Case Study",
  },
  contactModal: {
    title: "Get in touch",
    subtitle: "Choose a platform to connect",
    close: "Close contact dialog",
  },
  footer: {
    promptFirst: "Have a project in mind, or just want to say hello?",
    promptSecond: "I'd be glad to hear what you're building.",
    letTalk: "Let's Talk",
    emailAria: "Email Kevin Risky Abadi at {email}",
    rights: "All rights reserved",
    role: "Fullstack & Backend Developer",
    localTime: "Local Time",
    timeFallback: "WIB (GMT+7)",
  },
  floatingActions: {
    backToTop: "Back to top",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
  gallery: {
    galleryAria:
      "Image gallery for {title}. Use the left and right arrow keys to navigate.",
    previewAlt: "{title} - Preview {current} of {total}",
    previous: "Previous gallery image",
    next: "Next gallery image",
    thumbnails: "Gallery thumbnails",
    thumbnailAlt: "Thumbnail {current}",
    thumbnailAria: "Thumbnail {current} of {total}",
  },
  loadingIntro: {
    skip: "Skip [Esc]",
    skipAria: "Skip introduction",
    dialogLabel: "Loading introduction",
    languages: ["Indonesian", "English", "Japanese", "Chinese", "Javanese"],
  },
  notFound: {
    title: "Page Not Found",
    description:
      "Sorry, the page you are looking for doesn't exist or has been moved.",
    backHome: "Back to Home",
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  language: {
    groupLabel: "Bahasa",
    names: {
      id: "Bahasa Indonesia",
      en: "Bahasa Inggris",
    },
  },
  nav: {
    logoHome: "Kevin Risky Abadi, beranda",
    openMenu: "Buka menu navigasi",
    portfolio: "Portofolio 2026",
    badge: "KEVIN.DEV • PENGEMBANG FULLSTACK •",
    home: "Beranda",
    about: "Tentang",
    techStack: "Tech Stack",
    experience: "Pengalaman",
    projects: "Proyek",
    certifications: "Sertifikasi",
    contact: "Kontak",
    panelLabel: "Navigasi situs",
    panelEyebrow: "Navigasi",
    closeMenu: "Tutup menu navigasi",
    primary: "Utama",
    search: "Cari proyek",
    elsewhere: "Tautan lainnya",
  },
  hero: {
    role: "Peran",
    rolePrimary: "Pengembang Fullstack",
    roleSecondary: "Pengembang Backend",
    focus: "Fokus",
    focusPrimary: "Aplikasi Web, REST API",
    focusSecondary: "& Basis Data",
    bio: "Pengembang Fullstack dan Backend yang berbasis di Nganjuk, Indonesia. Saya membangun aplikasi web yang andal, REST API yang rapi, dan sistem data di baliknya.",
    getInTouch: "Hubungi saya",
    scroll: "Gulir",
    location: "Nganjuk / Jawa Timur",
  },
  about: {
    eyebrow: "01 // TENTANG",
    heading:
      "Halo, saya Kevin, pengembang yang senang membangun sesuatu yang benar-benar berfungsi.",
    paragraphs: {
      intro:
        "Saya pengembang dari Nganjuk, Indonesia yang senang mengubah ide praktis menjadi pengalaman digital yang berguna. Saya menikmati proses menelusuri cara kerja perangkat lunak, mempelajari perkakas modern, dan menemukan cara sederhana untuk menyelesaikan masalah nyata.",
      craft:
        "Saya memandang pengembangan sebagai keahlian yang terus diasah. Setiap proyek, kolaborasi, dan sesi debugging yang rumit memberi kesempatan untuk mempelajari hal baru dan membangun sesuatu yang lebih baik dari sebelumnya.",
    },
    education: "Universitas Nusantara PGRI Kediri (2022–2026)",
    location: "Nganjuk, Jawa Timur, Indonesia",
    pillars: {
      backend: {
        title: "Pengembangan Backend",
        description:
          "Menikmati proses membangun bagian belakang aplikasi yang membuat fitur tetap bekerja secara andal, rapi, dan cepat.",
      },
      "problem-solving": {
        title: "Pemecahan Masalah",
        description:
          "Senang mengurai masalah rumit, mencoba solusi praktis, dan belajar langsung dari proses pembangunan.",
      },
      collaboration: {
        title: "Kolaborasi",
        description:
          "Menghargai komunikasi yang jelas, berbagi ide secara terbuka, dan bekerja konstruktif dengan tim menuju tujuan bersama.",
      },
      fullstack: {
        title: "Pengembangan Fullstack",
        description:
          "Tertarik pada cara antarmuka pengguna yang responsif dan sistem backend yang solid menyatu menjadi pengalaman digital yang utuh.",
      },
    },
  },
  techStack: {
    eyebrow: "02 // TECH STACK",
    title: "Alat & Teknologi",
    intro:
      "Bahasa pemrograman, framework, basis data, dan alat kerja yang saya gunakan untuk merancang dan membangun perangkat lunak.",
    pauseHint: "ARAHKAN ATAU FOKUS UNTUK JEDA",
    categories: {
      languages: "Bahasa Pemrograman",
      frameworks: "Framework & Library",
      databases: "Basis Data & ORM",
      tools: "Alat & Ekosistem",
    },
    technologiesAria: "Teknologi dalam kategori {category}",
    pauseAria:
      "Daftar {category} yang bergerak. Tekan Tab atau arahkan kursor untuk menjeda animasi.",
  },
  experience: {
    eyebrow: "03 // PENGALAMAN",
    title: "Perjalanan Karier & Pendidikan",
    intro:
      "Linimasa kronologis magang pengembangan perangkat lunak, pendidikan formal, dan pembangunan sistem secara langsung.",
    hideAchievements: "Sembunyikan pencapaian utama",
    viewAchievements: "Lihat pencapaian utama",
    highlightsFor: "Pencapaian utama untuk {company}",
  },
  selectedWork: {
    eyebrow: "04 // PROYEK PILIHAN",
    title: "Karya Pilihan",
    intro:
      "Pilihan proyek yang mencerminkan arsitektur backend, aplikasi responsif, dan riset visi komputer.",
    viewCaseStudy: "Lihat studi kasus untuk {title}",
    readCaseStudy: "Baca studi kasus untuk {title}",
    shareLink: "Bagikan tautan untuk {title}",
    linkCopied: "Tautan disalin ke papan klip",
    linkCopiedShort: "Tautan disalin!",
    shareProject: "Bagikan proyek",
    viewCaseStudyTitle: "Lihat studi kasus",
    shareText: "Portofolio Kevin Risky",
  },
  certifications: {
    eyebrow: "05 // KREDENSIAL",
    title: "Sertifikasi",
    intro:
      "Kredensial terverifikasi di bidang pengembangan backend, administrasi sistem, dan rekayasa perangkat lunak enterprise.",
    openDetails: "Buka detail sertifikat untuk {title}",
    verified: "Terverifikasi",
    yearPeriod: "Tahun / Periode:",
    close: "Tutup detail sertifikasi",
  },
  search: {
    title: "Cari proyek",
    help: "Cari berdasarkan nama proyek, kategori, atau teknologi. Ketik minimal dua karakter. Tekan Escape untuk menutup.",
    inputLabel: "Cari proyek berdasarkan nama, kategori, atau teknologi",
    placeholder: "Cari proyek atau teknologi",
    close: "Tutup pencarian",
    filterGroup: "Filter proyek berdasarkan kategori",
    categories: {
      all: "Semua",
      web: "Pengembangan Web",
      mobile: "Aplikasi Mobile",
      uiux: "Desain UI/UX",
      ai: "Kecerdasan Buatan",
    },
    statusPrompt: "Ketik minimal dua karakter untuk mencari.",
    emptyTitle: "Cari di arsip proyek",
    emptyBody:
      "Ketik minimal 2 karakter untuk mencari berdasarkan proyek, teknologi, atau kategori.",
    results: "Proyek",
    resultSingular: "proyek",
    resultPlural: "proyek",
    noMatch: "Tidak ada proyek yang cocok dengan “{query}”",
    noCategory: "Belum ada proyek di kategori ini",
    noResultsBody:
      "Coba nama proyek atau teknologi lain, atau atur ulang filter di bawah.",
    reset: "Atur ulang pencarian",
  },
  projectDetail: {
    backToProjects: "Kembali ke Proyek",
    breadcrumb: "Navigasi halaman",
    home: "Beranda",
    projects: "Proyek",
    readPaper: "Baca Artikel Penelitian Terbit",
    overviewEyebrow: "01 // GAMBARAN UMUM",
    context: "Konteks Proyek",
    engineeringEyebrow: "02 // REKAYASA",
    architecture: "Arsitektur & Implementasi",
    featuresEyebrow: "03 // FITUR",
    keyFeatures: "Fitur Teknis Utama",
    details: "Detail Proyek",
    category: "Kategori",
    date: "Tanggal",
    role: "Peran",
    externalReference: "Referensi Eksternal",
    publishedArticle: "Artikel Terbit",
    technologies: "Teknologi & Alat",
    nextCaseStudy: "Studi Kasus Berikutnya",
  },
  contactModal: {
    title: "Hubungi saya",
    subtitle: "Pilih platform untuk terhubung",
    close: "Tutup dialog kontak",
  },
  footer: {
    promptFirst: "Punya proyek yang ingin diwujudkan, atau sekadar ingin menyapa?",
    promptSecond: "Saya akan senang mendengar apa yang sedang Anda bangun.",
    letTalk: "Mari Bicara",
    emailAria: "Kirim email ke Kevin Risky Abadi di {email}",
    rights: "Hak cipta dilindungi",
    role: "Pengembang Fullstack & Backend",
    localTime: "Waktu Lokal",
    timeFallback: "WIB (GMT+7)",
  },
  floatingActions: {
    backToTop: "Kembali ke atas",
    switchToLight: "Beralih ke tema terang",
    switchToDark: "Beralih ke tema gelap",
  },
  gallery: {
    galleryAria:
      "Galeri gambar {title}. Gunakan tombol panah kiri dan kanan untuk bernavigasi.",
    previewAlt: "{title} - Pratinjau {current} dari {total}",
    previous: "Gambar galeri sebelumnya",
    next: "Gambar galeri berikutnya",
    thumbnails: "Gambar mini galeri",
    thumbnailAlt: "Gambar mini {current}",
    thumbnailAria: "Gambar mini {current} dari {total}",
  },
  loadingIntro: {
    skip: "Lewati [Esc]",
    skipAria: "Lewati perkenalan",
    dialogLabel: "Memuat perkenalan",
    languages: ["Indonesia", "Inggris", "Jepang", "Mandarin", "Jawa"],
  },
  notFound: {
    title: "Halaman Tidak Ditemukan",
    description:
      "Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.",
    backHome: "Kembali ke Beranda",
  },
};

export const dictionaries: Record<Language, Dictionary> = { en, id };
