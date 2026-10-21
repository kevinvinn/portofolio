import type { Language } from "@/lib/i18n";

export interface ProjectTranslation {
  title: string;
  category: string;
  date: string;
  tags: string[];
  summary: string;
  role?: string;
  overview?: string;
  features?: string[];
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  date: string;
  description: string;
  gallery: string[];
  link?: string;
  summary?: string;
  role?: string;
  overview?: string;
  features?: string[];
  githubUrl?: string;
  demoUrl?: string;
  translations: {
    id: ProjectTranslation;
  };
}

export type LocalizedProject = Omit<Project, "translations">;

export function localizeProject(
  project: Project,
  language: Language,
): LocalizedProject {
  const { translations, ...base } = project;

  if (language === "en") {
    return base;
  }

  return {
    ...base,
    ...translations.id,
    tags: translations.id.tags,
  };
}

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "jepretin",
    title:
      "JEPRETIN - A Location-Based Photography and Videography Marketplace Platform",
    category: "Web Development",
    date: "September 2025",
    image: "/projects/project 2/1.1.png",
    tags: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "REST API",
      "JWT",
      "Midtrans",
      "Swagger",
      "Jest",
      "Backend Development",
    ],
    summary:
      "A location-based marketplace platform connecting customers with photography and videography service providers.",
    role: "Backend Developer",
    overview:
      "JEPRETIN is a location-based marketplace platform designed to connect customers with photography and videography service providers. The platform helps users discover providers, explore their portfolios and service packages, place orders, and manage transactions through an integrated system.",
    features: [
      "User authentication and role-based access control with JWT",
      "Provider profile, service package, and portfolio management",
      "Order workflow management from booking to completion",
      "Midtrans payment gateway integration with webhook handling",
      "Integrated wallet, withdrawal, review, and notification services",
      "REST API documentation with Swagger and unit testing with Jest",
    ],
    description: `JEPRETIN is a location-based marketplace platform designed to connect customers with photography and videography service providers. The platform helps users discover providers, explore their portfolios and service packages, place orders, and manage transactions through an integrated system.

The backend was developed to support core marketplace operations, including user authentication, provider management, service coverage, portfolio, booking and order management, payment processing, wallet, withdrawal, reviews, notifications, and other supporting features.

The database was designed using PostgreSQL and Prisma, with structured relationships between users, providers, orders, payments, and other entities to support the application's business processes.

Authentication and authorization were implemented using JWT, role-based access, password hashing, middleware, and refresh tokens. The payment system was integrated with Midtrans, including webhook handling for payment status updates.

The application also includes comprehensive REST API documentation using Swagger and automated testing using Jest. The backend was deployed to Railway and developed collaboratively using GitHub with branching, pull requests, merging, and conflict resolution.`,
    gallery: [
      "/projects/project 2/1.1.png",
      "/projects/project 2/1.2.png",
      "/projects/project 2/1.3.png",
      "/projects/project 2/1.4.png",
      "/projects/project 2/1.5.png",
      "/projects/project 2/1.6.png",
    ],
    translations: {
      id: {
        title:
          "JEPRETIN - Platform Marketplace Fotografi dan Videografi Berbasis Lokasi",
        category: "Pengembangan Web",
        date: "September 2025",
        tags: [
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "Prisma",
          "REST API",
          "JWT",
          "Midtrans",
          "Swagger",
          "Jest",
          "Pengembangan Backend",
        ],
        summary:
          "Platform marketplace berbasis lokasi yang menghubungkan pelanggan dengan penyedia jasa fotografi dan videografi.",
        role: "Pengembang Backend",
        overview:
          "JEPRETIN adalah platform marketplace berbasis lokasi yang dirancang untuk menghubungkan pelanggan dengan penyedia jasa fotografi dan videografi. Platform ini membantu pengguna menemukan penyedia, menjelajahi portofolio dan paket layanan, melakukan pemesanan, serta mengelola transaksi melalui sistem terintegrasi.",
        features: [
          "Autentikasi pengguna dan kontrol akses berbasis peran dengan JWT",
          "Pengelolaan profil penyedia, paket layanan, dan portofolio",
          "Pengelolaan alur pesanan dari pemesanan hingga penyelesaian",
          "Integrasi payment gateway Midtrans dengan penanganan webhook",
          "Layanan dompet digital, penarikan dana, ulasan, dan notifikasi terintegrasi",
          "Dokumentasi REST API dengan Swagger dan pengujian unit dengan Jest",
        ],
        description: `JEPRETIN adalah platform marketplace berbasis lokasi yang dirancang untuk menghubungkan pelanggan dengan penyedia jasa fotografi dan videografi. Platform ini membantu pengguna menemukan penyedia, menjelajahi portofolio dan paket layanan, melakukan pemesanan, serta mengelola transaksi melalui sistem terintegrasi.

Backend dikembangkan untuk mendukung operasi marketplace inti, termasuk autentikasi pengguna, pengelolaan penyedia, cakupan layanan, portofolio, pemesanan dan pengelolaan pesanan, pemrosesan pembayaran, dompet digital, penarikan dana, ulasan, notifikasi, dan fitur pendukung lainnya.

Basis data dirancang menggunakan PostgreSQL dan Prisma, dengan relasi terstruktur antara pengguna, penyedia, pesanan, pembayaran, dan entitas lain untuk mendukung proses bisnis aplikasi.

Autentikasi dan otorisasi diimplementasikan menggunakan JWT, akses berbasis peran, hashing password, middleware, dan refresh token. Sistem pembayaran diintegrasikan dengan Midtrans, termasuk penanganan webhook untuk pembaruan status pembayaran.

Aplikasi juga dilengkapi dokumentasi REST API yang komprehensif menggunakan Swagger dan pengujian otomatis menggunakan Jest. Backend dideploy ke Railway dan dikembangkan secara kolaboratif menggunakan GitHub dengan branching, pull request, merge, dan resolusi konflik.`,
      },
    },
  },
  {
    id: "2",
    slug: "sky-ticket",
    title: "Sky Ticket - A Web-Based Flight Ticket Booking Platform",
    category: "Web Development",
    date: "December 2024",
    image: "/projects/project 1/Screenshot 2024-12-27 184243.png",
    tags: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "REST API",
      "JWT",
      "Google OAuth",
      "Redis",
      "AWS",
      "GitHub Actions",
      "Jest",
    ],
    summary:
      "A web-based flight ticket booking platform developed as the final project of the MSIB Batch 7 program at Binar Academy.",
    role: "Backend Developer",
    overview:
      "Sky Ticket is a web-based flight ticket booking platform that provides a system for users to search and book flights, manage passenger information, select seats, and process flight ticket bookings through an integrated backend system.",
    features: [
      "Flight search, passenger information, and seat selection system",
      "Authentication with JWT, password hashing, email OTP, and Google OAuth",
      "Relational database design with PostgreSQL and Prisma",
      "Redis caching and automated token expiration with node-cron",
      "REST API documentation with Swagger and testing with Jest",
      "CI/CD automated deployment to AWS using GitHub Actions",
    ],
    description: `Sky Ticket is a web-based flight ticket booking platform developed as the final project of the MSIB Batch 7 Studi Independen program. The project was developed collaboratively by a team of 8 members consisting of 4 frontend developers and 4 backend developers.

The platform provides a system for users to search and book flights, manage passenger information, select seats, and process flight ticket bookings through an integrated backend system.

The database was designed using PostgreSQL and Prisma, including relationships between users, bookings, passengers, tickets, flights, airports, airlines, aircraft, and seat management.

The authentication system was implemented using JWT, role-based access, middleware, password hashing, refresh tokens, email OTP, and Google OAuth. Redis was used as a caching mechanism, while node-cron was implemented to automate the removal of expired tokens.

The backend provides REST APIs documented using Swagger and tested using Jest. The application was deployed to AWS using CI/CD with GitHub Actions.

The project was developed collaboratively using Git and GitHub through branching, pull requests, merging, and conflict resolution, with ClickUp used for project progress tracking. The project was also presented to MSIB mentors and stakeholders.`,
    gallery: [
      "/projects/project 1/Screenshot 2024-12-27 184243.png",
      "/projects/project 1/Screenshot 2024-12-27 211520.png",
      "/projects/project 1/Screenshot 2024-12-27 211632.png",
      "/projects/project 1/Screenshot 2024-12-27 215444.png",
      "/projects/project 1/Screenshot 2024-12-27 215456.png",
      "/projects/project 1/Screenshot 2024-12-27 220606.png",
      "/projects/project 1/Screenshot 2024-12-27 221259.png",
      "/projects/project 1/Screenshot 2024-12-27 221455.png",
      "/projects/project 1/Screenshot 2024-12-27 221518.png",
    ],
    translations: {
      id: {
        title: "Sky Ticket - Platform Pemesanan Tiket Pesawat Berbasis Web",
        category: "Pengembangan Web",
        date: "Desember 2024",
        tags: [
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "Prisma",
          "REST API",
          "JWT",
          "Google OAuth",
          "Redis",
          "AWS",
          "GitHub Actions",
          "Jest",
        ],
        summary:
          "Platform pemesanan tiket pesawat berbasis web yang dikembangkan sebagai proyek akhir program MSIB Batch 7 di Binar Academy.",
        role: "Pengembang Backend",
        overview:
          "Sky Ticket adalah platform pemesanan tiket pesawat berbasis web yang menyediakan sistem bagi pengguna untuk mencari dan memesan penerbangan, mengelola informasi penumpang, memilih kursi, dan memproses pemesanan tiket melalui sistem backend terintegrasi.",
        features: [
          "Sistem pencarian penerbangan, informasi penumpang, dan pemilihan kursi",
          "Autentikasi dengan JWT, hashing password, OTP email, dan Google OAuth",
          "Perancangan basis data relasional dengan PostgreSQL dan Prisma",
          "Caching Redis dan kedaluwarsa token otomatis dengan node-cron",
          "Dokumentasi REST API dengan Swagger dan pengujian dengan Jest",
          "CI/CD deployment otomatis ke AWS menggunakan GitHub Actions",
        ],
        description: `Sky Ticket adalah platform pemesanan tiket pesawat berbasis web yang dikembangkan sebagai proyek akhir program MSIB Batch 7 Studi Independen. Proyek ini dikembangkan secara kolaboratif oleh tim beranggotakan 8 orang yang terdiri dari 4 pengembang frontend dan 4 pengembang backend.

Platform menyediakan sistem bagi pengguna untuk mencari dan memesan penerbangan, mengelola informasi penumpang, memilih kursi, dan memproses pemesanan tiket melalui sistem backend terintegrasi.

Basis data dirancang menggunakan PostgreSQL dan Prisma, termasuk relasi antara pengguna, pemesanan, penumpang, tiket, penerbangan, bandara, maskapai, pesawat, dan pengelolaan kursi.

Sistem autentikasi diimplementasikan menggunakan JWT, akses berbasis peran, middleware, hashing password, refresh token, OTP email, dan Google OAuth. Redis digunakan sebagai mekanisme caching, sedangkan node-cron diimplementasikan untuk mengotomatiskan penghapusan token yang kedaluwarsa.

Backend menyediakan REST API yang didokumentasikan menggunakan Swagger dan diuji menggunakan Jest. Aplikasi dideploy ke AWS menggunakan CI/CD dengan GitHub Actions.

Proyek dikembangkan secara kolaboratif menggunakan Git dan GitHub melalui branching, pull request, merge, dan resolusi konflik, dengan ClickUp digunakan untuk memantau progres proyek. Proyek ini juga dipresentasikan kepada mentor dan pemangku kepentingan MSIB.`,
      },
    },
  },
  {
    id: "3",
    slug: "bweather",
    title: "BWeather - A Mobile Weather Detection Application",
    category: "Mobile Development",
    date: "2024",
    image: "/projects/project 3/Slide Dark 1.png",
    tags: [
      "Mobile Development",
      "Project Management",
      "System Development",
      "Teamwork",
      "Problem Solving",
    ],
    summary:
      "A mobile weather detection application developed for Pekan Inovasi Fakultas Teknik.",
    role: "Project Manager",
    overview:
      "BWeather is a mobile weather detection application developed as a collaborative team project for the Pekan Inovasi Fakultas Teknik, delivering accessible weather forecasting and real-time environmental metrics.",
    features: [
      "Mobile weather monitoring interface and weather data visualization",
      "Full development lifecycle from project planning to stakeholder presentation",
      "Cross-functional team coordination, problem solving, and decision making",
    ],
    description: `BWeather is a mobile weather detection application developed as a team project for the Pekan Inovasi Fakultas Teknik. The project was developed collaboratively to provide weather-related information through a mobile application.

The project involved multiple stages of development, including project planning, analysis, system development, and collaboration between team members. I contributed as the Project Manager, coordinating the team and helping manage the development process from planning through project presentation.

The project provided experience in team coordination, project management, communication, problem solving, and decision making during the development process.`,
    gallery: [
      "/projects/project 3/Slide Dark 1.png",
      "/projects/project 3/Slide Dark 2.png",
      "/projects/project 3/Slide Light 1.png",
      "/projects/project 3/Slide Light 2.png",
      "/projects/project 3/Slide Light 5.png",
    ],
    translations: {
      id: {
        title: "BWeather - Aplikasi Deteksi Cuaca Mobile",
        category: "Pengembangan Aplikasi Mobile",
        date: "2024",
        tags: [
          "Pengembangan Aplikasi Mobile",
          "Manajemen Proyek",
          "Pengembangan Sistem",
          "Kerja Tim",
          "Pemecahan Masalah",
        ],
        summary:
          "Aplikasi deteksi cuaca mobile yang dikembangkan untuk Pekan Inovasi Fakultas Teknik.",
        role: "Manajer Proyek",
        overview:
          "BWeather adalah aplikasi deteksi cuaca mobile yang dikembangkan sebagai proyek tim kolaboratif untuk Pekan Inovasi Fakultas Teknik, menghadirkan prakiraan cuaca yang mudah diakses dan metrik lingkungan secara real-time.",
        features: [
          "Antarmuka pemantauan cuaca mobile dan visualisasi data cuaca",
          "Siklus pengembangan penuh dari perencanaan proyek hingga presentasi kepada pemangku kepentingan",
          "Koordinasi tim lintas fungsi, pemecahan masalah, dan pengambilan keputusan",
        ],
        description: `BWeather adalah aplikasi deteksi cuaca mobile yang dikembangkan sebagai proyek tim untuk Pekan Inovasi Fakultas Teknik. Proyek ini dikembangkan secara kolaboratif untuk menyediakan informasi terkait cuaca melalui aplikasi mobile.

Proyek ini melibatkan beberapa tahap pengembangan, termasuk perencanaan proyek, analisis, pengembangan sistem, dan kolaborasi antaranggota tim. Saya berkontribusi sebagai Manajer Proyek, mengoordinasikan tim dan membantu mengelola proses pengembangan dari tahap perencanaan hingga presentasi proyek.

Proyek ini memberikan pengalaman dalam koordinasi tim, manajemen proyek, komunikasi, pemecahan masalah, dan pengambilan keputusan selama proses pengembangan.`,
      },
    },
  },
  {
    id: "4",
    slug: "yolov8-logistics",
    title: "Multi-Object Detection for Hiker Logistics (YOLOv8 Nano)",
    category: "Artificial Intelligence / Computer Vision",
    date: "2026",
    image: "/projects/project 4/Screenshot 2026-05-11 225527.png",
    tags: [
      "YOLOv8",
      "Computer Vision",
      "Object Detection",
      "Roboflow",
      "Machine Learning",
      "Research",
    ],
    summary:
      "Undergraduate thesis research evaluating the detection performance of YOLOv8 Nano on hiker logistics under visual clutter.",
    role: "Undergraduate Researcher",
    overview:
      "This project is an undergraduate research study in Information Systems evaluating the performance of the YOLOv8 Nano model for detecting multiple hiking logistics items across varying levels of visual density and background clutter.",
    features: [
      "Custom dataset preparation and annotation using Roboflow",
      "YOLOv8 Nano model training for multi-object detection and localization",
      "Evaluation of detection performance and recall under varying clutter conditions",
      "Quantitative comparative analysis published in an academic peer-reviewed journal",
    ],
    link: "https://doi.org/10.47065/bit.v7i2.2786",
    description: `This project is a research-based computer vision project developed as part of my undergraduate thesis in Information Systems. The research evaluates the performance of the YOLOv8 Nano model for detecting multiple hiking logistics objects based on visual density.

The dataset was independently collected and prepared using Roboflow, then used to train the YOLOv8 Nano model for multi-object detection.

The research evaluates the model's detection capability under different levels of visual object density, with a focus on determining how the model performs when multiple logistics objects appear within a single image.

The project combines data preparation, model training, object detection, and performance evaluation as part of an undergraduate research process.`,
    gallery: [
      "/projects/project 4/Screenshot 2026-05-11 225527.png",
      "/projects/project 4/Screenshot 2026-05-03 153108.png",
      "/projects/project 4/Screenshot 2026-05-11 222642.png",
      "/projects/project 4/Screenshot 2026-05-31 020326.png",
    ],
    translations: {
      id: {
        title: "Deteksi Multi-Objek untuk Logistik Pendaki (YOLOv8 Nano)",
        category: "Kecerdasan Buatan / Visi Komputer",
        date: "2026",
        tags: [
          "YOLOv8",
          "Visi Komputer",
          "Deteksi Objek",
          "Roboflow",
          "Pembelajaran Mesin",
          "Riset",
        ],
        summary:
          "Penelitian skripsi yang mengevaluasi performa deteksi YOLOv8 Nano pada logistik pendaki dalam kondisi visual yang padat.",
        role: "Peneliti S1",
        overview:
          "Proyek ini merupakan penelitian skripsi pada program studi Sistem Informasi yang mengevaluasi performa model YOLOv8 Nano untuk mendeteksi berbagai item logistik pendaki pada tingkat kepadatan visual dan latar belakang yang bervariasi.",
        features: [
          "Persiapan dan anotasi dataset khusus menggunakan Roboflow",
          "Pelatihan model YOLOv8 Nano untuk deteksi dan lokalisasi multi-objek",
          "Evaluasi performa deteksi dan recall pada berbagai kondisi kepadatan",
          "Analisis komparatif kuantitatif yang diterbitkan di jurnal akademik peer-review",
        ],
        description: `Proyek ini merupakan proyek visi komputer berbasis penelitian yang dikembangkan sebagai bagian dari skripsi saya di program studi Sistem Informasi. Penelitian ini mengevaluasi performa model YOLOv8 Nano untuk mendeteksi beberapa objek logistik pendaki berdasarkan kepadatan visual.

Dataset dikumpulkan dan disiapkan secara mandiri menggunakan Roboflow, kemudian digunakan untuk melatih model YOLOv8 Nano untuk deteksi multi-objek.

Penelitian ini mengevaluasi kemampuan deteksi model pada berbagai tingkat kepadatan objek visual, dengan fokus menentukan performa model ketika beberapa objek logistik muncul dalam satu gambar.

Proyek ini menggabungkan persiapan data, pelatihan model, deteksi objek, dan evaluasi performa sebagai bagian dari proses penelitian skripsi.`,
      },
    },
  },
];
