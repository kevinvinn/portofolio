export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  isCurrent: boolean;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    id: "manggala",
    company: "PT Manggala Teknologi Nusantara",
    role: "Backend Development Intern / Peserta PKL",
    location: "Kediri, Jawa Timur",
    period: "Juli 2025 — September 2025",
    duration: "3 months",
    isCurrent: false,
    highlights: [
      "Mengembangkan backend JEPRETIN menggunakan Node.js, Express.js, PostgreSQL, dan Prisma.",
      "Mengembangkan REST API, database, authentication, authorization, dan validasi.",
      "Mengintegrasikan Midtrans, membuat API documentation, testing dengan Jest, dan deployment Railway.",
      "Berkolaborasi dalam tim 4 orang menggunakan GitHub, branching, pull request, dan merge.",
    ],
  },
  {
    id: "sky-ticket",
    company: "Binar Academy",
    role: "Back End JavaScript - With AI Literacy & Global Certification Class — MSIB Studi Independen",
    location: "Remote",
    period: "September 2024 — Desember 2024",
    duration: "4 months",
    isCurrent: false,
    highlights: [
      "Mengembangkan backend Sky Ticket, website pemesanan tiket pesawat bersama tim 8 orang.",
      "Mendesain database dan relasi menggunakan PostgreSQL dan Prisma serta mengembangkan REST API.",
      "Mengimplementasikan authentication menggunakan JWT, OTP email, Google OAuth, role-based access, dan refresh token.",
      "Melakukan testing dengan Jest serta deployment ke AWS menggunakan CI/CD GitHub Actions.",
    ],
  },
  {
    id: "unpkediri",
    company: "Universitas Nusantara PGRI Kediri",
    role: "S1 Sistem Informasi",
    location: "Kediri, Jawa Timur",
    period: "2022 — 2026",
    duration: "4 years",
    isCurrent: false,
    highlights: [
      "Mempelajari pemrograman, analisis dan perancangan sistem, database, web development, proses bisnis, dan UI/UX.",
      "Menyelesaikan skripsi mengenai evaluasi kinerja YOLOv8 Nano untuk deteksi multi-objek logistik pendaki.",
      "Mengembangkan kemampuan analisis, problem solving, dan kerja tim melalui berbagai project selama perkuliahan.",
    ],
  },
];