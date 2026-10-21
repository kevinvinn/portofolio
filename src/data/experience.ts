import type { LocalizedList, LocalizedText } from "@/lib/i18n";

export interface Experience {
  id: string;
  company: string;
  role: LocalizedText;
  location: LocalizedText;
  period: LocalizedText;
  duration: LocalizedText;
  isCurrent: boolean;
  highlights: LocalizedList;
}

export const experienceData: Experience[] = [
  {
    id: "manggala",
    company: "PT Manggala Teknologi Nusantara",
    role: {
      en: "Backend Development Intern / Internship Participant",
      id: "Magang Pengembangan Backend / Peserta PKL",
    },
    location: {
      en: "Kediri, East Java",
      id: "Kediri, Jawa Timur",
    },
    period: {
      en: "July 2025 — September 2025",
      id: "Juli 2025 — September 2025",
    },
    duration: {
      en: "3 months",
      id: "3 bulan",
    },
    isCurrent: false,
    highlights: {
      en: [
        "Developed the JEPRETIN backend using Node.js, Express.js, PostgreSQL, and Prisma.",
        "Built REST APIs, database schemas, authentication, authorization, and validation.",
        "Integrated Midtrans, created API documentation, tested with Jest, and deployed to Railway.",
        "Collaborated in a four-person team using GitHub, branching, pull requests, and merges.",
      ],
      id: [
        "Mengembangkan backend JEPRETIN menggunakan Node.js, Express.js, PostgreSQL, dan Prisma.",
        "Mengembangkan REST API, basis data, autentikasi, otorisasi, dan validasi.",
        "Mengintegrasikan Midtrans, membuat dokumentasi API, pengujian dengan Jest, dan deployment ke Railway.",
        "Berkolaborasi dalam tim 4 orang menggunakan GitHub, branching, pull request, dan merge.",
      ],
    },
  },
  {
    id: "sky-ticket",
    company: "Binar Academy",
    role: {
      en: "Back End JavaScript - With AI Literacy & Global Certification Class — MSIB Studi Independen",
      id: "Back End JavaScript - With AI Literacy & Global Certification Class — MSIB Studi Independen",
    },
    location: {
      en: "Remote",
      id: "Remote",
    },
    period: {
      en: "September 2024 — December 2024",
      id: "September 2024 — Desember 2024",
    },
    duration: {
      en: "4 months",
      id: "4 bulan",
    },
    isCurrent: false,
    highlights: {
      en: [
        "Developed the Sky Ticket backend, a flight ticket booking website, with a team of eight.",
        "Designed the database and relationships using PostgreSQL and Prisma, and built REST APIs.",
        "Implemented authentication using JWT, email OTP, Google OAuth, role-based access, and refresh tokens.",
        "Tested with Jest and deployed to AWS using GitHub Actions CI/CD.",
      ],
      id: [
        "Mengembangkan backend Sky Ticket, website pemesanan tiket pesawat bersama tim 8 orang.",
        "Merancang basis data dan relasi menggunakan PostgreSQL dan Prisma serta mengembangkan REST API.",
        "Mengimplementasikan autentikasi menggunakan JWT, OTP email, Google OAuth, akses berbasis peran, dan refresh token.",
        "Melakukan pengujian dengan Jest serta deployment ke AWS menggunakan CI/CD GitHub Actions.",
      ],
    },
  },
  {
    id: "unpkediri",
    company: "Universitas Nusantara PGRI Kediri",
    role: {
      en: "Bachelor of Information Systems",
      id: "S1 Sistem Informasi",
    },
    location: {
      en: "Kediri, East Java",
      id: "Kediri, Jawa Timur",
    },
    period: {
      en: "2022 — 2026",
      id: "2022 — 2026",
    },
    duration: {
      en: "4 years",
      id: "4 tahun",
    },
    isCurrent: false,
    highlights: {
      en: [
        "Studied programming, systems analysis and design, databases, web development, business processes, and UI/UX.",
        "Completed a thesis evaluating YOLOv8 Nano performance for multi-object detection of hiker logistics.",
        "Developed analytical, problem-solving, and teamwork skills through various projects during my studies.",
      ],
      id: [
        "Mempelajari pemrograman, analisis dan perancangan sistem, basis data, pengembangan web, proses bisnis, dan UI/UX.",
        "Menyelesaikan skripsi mengenai evaluasi kinerja YOLOv8 Nano untuk deteksi multi-objek logistik pendaki.",
        "Mengembangkan kemampuan analisis, pemecahan masalah, dan kerja tim melalui berbagai proyek selama perkuliahan.",
      ],
    },
  },
];
