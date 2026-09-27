export interface LinkedinPost {
  id: string;
  date: string;
  text: string;
  images: string[];
  url: string;
  likes: number;
  comments: number;
  shares: number;
}

export const linkedinPostsData: LinkedinPost[] = [
  {
    id: "7464976341805793280",
    date: "16 Jun 2026",
    text: `Beberapa bulan terakhir saya cukup banyak menghabiskan waktu ngulik backend untuk sebuah MVP project bernama Jepretin, platform marketplace jasa fotografi & videografi berbasis lokasi.

Di project ini saya berperan sebagai Backend Developer dalam tim berisi 4 orang. Fokus utama saya ada di API architecture, order workflow, payment integration, wallet system, sampai deployment menggunakan Railway + Docker.

Awalnya saya pikir backend itu mostly tentang CRUD API. Tapi setelah project mulai berkembang, ternyata challenge sebenarnya justru ada di business flow dan edge case.

Contohnya di order workflow.

Provider tidak bisa langsung mengubah order menjadi COMPLETED tanpa konfirmasi customer terlebih dahulu. Kelihatannya sederhana, tapi flow seperti ini cukup penting untuk customer protection dan mencegah premature order completion.

Selain itu, saya juga banyak belajar saat handling:
- Midtrans payment webhook
- wallet transaction flow
- modular API structure
- Prisma & PostgreSQL deployment
- Swagger API documentation
- Docker environment setup

Tech stack yang digunakan:
Node.js, Express.js, PostgreSQL, Prisma ORM, Midtrans, Railway, dan Docker.

Saat ini backend MVP sudah berhasil dideploy dan memiliki:
- Authentication & Role Management
- Provider Onboarding
- Booking & Order Workflow
- Payment Integration
- Wallet & Withdrawal System
- Review & Notification System
- OpenAPI Documentation

Project ini masih jauh dari sempurna, tapi dari sini saya mulai paham kalau backend development bukan cuma soal endpoint berjalan, tapi juga tentang bagaimana sebuah system bisa tetap reliable ketika business flow mulai kompleks.

Big thanks untuk seluruh tim yang sudah berkolaborasi di project ini ( Mochamad Abdul Azis, Aditya Arya Respati, AZRA'I MAHENDRA )

Swagger Docs:
https://lnkd.in/dZZQDN4Y
GitHub Repository:
https://lnkd.in/ddfJEqxh`,
    images: [
      "https://media.licdn.com/dms/image/v2/D4D22AQGPAqZlx5-GEA/feedshare-shrink_800/B4DZ5jsa0xJQAk-/0/1779789049479?e=1791417600&v=beta&t=DTuVMyPpTeILqtjB4O7a3XS8JwFqfpMYOv8AxI0MbpI",
      "https://media.licdn.com/dms/image/v2/D4D22AQFoLM3HChxyXQ/feedshare-shrink_800/B4DZ5jsbEiIUAg-/0/1779789050480?e=1791417600&v=beta&t=kQQrjvW9FoxtQtaa9qMYsy9ezTHlOvvogxin2TowfBM",
      "https://media.licdn.com/dms/image/v2/D4D22AQHwv4Pdry0lMg/feedshare-shrink_800/B4DZ5jsabaGQAc-/0/1779789047965?e=1791417600&v=beta&t=8PGxbvaPRV2d8yaTNAIuInAfPVo0henqUmnkSPhTkEY",
      "https://media.licdn.com/dms/image/v2/D4D22AQE04egKo5oUkQ/feedshare-shrink_800/B4DZ5jsa6PG4Ac-/0/1779789049735?e=1791417600&v=beta&t=KhyjcdWv0IBYp_r5IT0-1Cw6YHS3u0Y1K2HF3FK0g-4",
      "https://media.licdn.com/dms/image/v2/D4D22AQFU-Uu9RyYrQw/feedshare-shrink_800/B4DZ5jsaVBKAAc-/0/1779789047368?e=1791417600&v=beta&t=ziSYAfHjMYHMwV06HpYbA0yEv7iCXoK-sY3H7iBeJgA",
      "https://media.licdn.com/dms/image/v2/D4D22AQHblJI76yL38g/feedshare-shrink_800/B4DZ5jsaMIHoAc-/0/1779789046911?e=1791417600&v=beta&t=lAZ_EmpRL7OZ33gdd8TZlPx4i3VO0YtjoDT-vmDowQI"
    ],
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7464976343110221824",
    likes: 32,
    comments: 4,
    shares: 2
  },
  {
    id: "7404850363603988482",
    date: "16 Dec 2025",
    text: `Pada 18 Juni 2025, saya berkesempatan mengikuti Pekan Inovasi kampus untuk menampilkan project aplikasi cuaca yang kami kembangkan di mata kuliah Pemrograman Mobile.
Di project ini saya dipercaya sebagai Project Manager sekaligus ikut membantu di sisi backend. Saya membagi tim ke dalam beberapa divisi dengan tech lead (Backend, Frontend, UI/UX) dan mengatur workflow menggunakan ClickUp dan berkolaborasi dengan GitHub agar proses kerja lebih terstruktur.
Melalui pengalaman ini, saya banyak belajar tentang koordinasi tim, komunikasi, dan bagaimana mempresentasikan hasil kerja di depan juri maupun pengunjung.
Terima kasih untuk seluruh tim yang sudah berkontribusi dan bekerja sama hingga project ini bisa kami tampilkan dengan baik. 
Mochamad Abdul Azis
Aditya Arya Respati
Rizal Syihab`,
    images: [
      "https://media.licdn.com/dms/image/v2/D5622AQEeUGP78NICSQ/feedshare-shrink_800/B56ZsNQJVVHYAg-/0/1765453897316?e=1791417600&v=beta&t=TZdfVy5VtRnh3sGt22UDBSZRQFKPHvrtwrM_rSeiwiA",
      "https://media.licdn.com/dms/image/v2/D5622AQGf9JD9ZWiuaA/feedshare-shrink_800/B56ZsNQJW6JEAg-/0/1765453899914?e=1791417600&v=beta&t=ppHfHRfGKb0ytPWOgigo6kWa8t7oP4c8M-7pR5KbZXY",
      "https://media.licdn.com/dms/image/v2/D5622AQEnqLU9a3mY4w/feedshare-shrink_800/B56ZsNQJWFG4Ak-/0/1765453896990?e=1791417600&v=beta&t=cshHklqrOtiCir6cbvSx6o6Fkw02sMZ0pyTNfNnKkMo",
      "https://media.licdn.com/dms/image/v2/D5622AQGbJJpKCPHtFg/feedshare-shrink_800/B56ZsNQJVhJAAg-/0/1765453896790?e=1791417600&v=beta&t=w8nk-_bSzMuJ_WlPJFFO9jYjfw_JRCbePhvTOMiE0eE"
    ],
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7404850364698570752",
    likes: 9,
    comments: 0,
    shares: 0
  },
  {
    id: "7237411600113041408",
    date: "16 Sep 2024",
    text: `Halo semuanya! Saya Kevin Risky Abadi dari Universitas Nusantara PGRI Kediri, jurusan Sistem Informasi. Siap memulai petualangan baru di dunia Back-End Development bersama Binar Academy dalam program MSIB Kampus Merdeka Batch 7! 🚀

Saya tahu tentang Binar Academy lewat platform Kampus Merdeka, dan langsung tertarik buat ikut belajar di sini. Nggak sabar buat memperdalam ilmu dan pengalaman di bidang ini! 😄💻

Spesial terima kasih untuk Binar Academy dan Kampus Merdeka atas kesempatan luar biasa ini 🙏🙌  
#part_of_bejs_class_binar #MSIBBatch7 #BinarAcademy #BackEndJourney`,
    images: [
      "https://media.licdn.com/dms/image/v2/D4E22AQGtID5Fu2J8bQ/feedshare-shrink_800/feedshare-shrink_800/0/1725533388647?e=1791417600&v=beta&t=UNSWg3ElG3pQdKtFpYAvEJJ1FGlTWip3F6Wpn_s11Gs"
    ],
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7237411600113041408",
    likes: 14,
    comments: 0,
    shares: 0
  },
  {
    id: "7201516084665942016",
    date: "16 Sep 2024",
    text: `Salah satu project yang saya kerjakan selama masa studi di Universitas Nusantara PGRI Kediri. Project ini berfokus pada pengembangan aplikasi perhitungan BMI (Body Mass Index).

Tentang Project:
Project ini bertujuan untuk membantu pengguna dalam memantau kesehatan mereka melalui perhitungan BMI. Dengan memasukkan data seperti tinggi dan berat badan, aplikasi ini dapat memberikan hasil BMI beserta kategori kesehatan yang sesuai.

Fitur Utama:
1. Input data tinggi dan berat badan.
2. Kalkulasi BMI secara otomatis.
3. Klasifikasi hasil (berat badan kurang, normal, berlebih, atau obesitas).`,
    images: [
      "https://media.licdn.com/dms/image/v2/D4E05AQGvUtNvjx7qrA/videocover-high/videocover-high/0/1716975265684?e=1790179200&v=beta&t=dlIIwN-lALA3PsvfnK4OPiFEC8WuNavpV59jeRK9hXQ"
    ],
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7201516350362525696",
    likes: 3,
    comments: 0,
    shares: 0
  },
  {
    id: "7201502387746877440",
    date: "16 Sep 2024",
    text: `saya memperkenalkan SoftDown ( Software Download ), sebuah website untuk mencari dan mengunduh software, yang saya kembangkan selama belajar di SMKN 1 Tanjunganom. Terima kasih kepada semua yang telah mendukung project ini.
#SMKN1Tanjunganom`,
    images: [
      "https://media.licdn.com/dms/image/v2/D4E05AQGNA8e0YJ9YxA/videocover-high/videocover-high/0/1716972020527?e=1790179200&v=beta&t=tglKnJynwmaa0gnDurogp91C1YrR6z5xZMnAHsJlvA8"
    ],
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7201502769764020224",
    likes: 3,
    comments: 0,
    shares: 0
  }
];