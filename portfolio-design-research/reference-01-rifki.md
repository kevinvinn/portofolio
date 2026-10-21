# Reference 01: Rifki Izzulhaq

URL: https://rifkiizzulhaq.vercel.app/en

## Peran referensi
Atmosfer sinematik, loading intro multi-bahasa, hero, moving tech stack, experience timeline, dan inspirasi preview sertifikat.

## Temuan
- Portfolio satu halaman berbasis Next.js, bernuansa gelap dengan aksen ungu `#7163F1`.
- Loader berupa overlay gelap dengan greeting dan progress. Urutan yang teramati: `selamat datang → welcome → ようこそ → 欢迎 → 환영합니다`.
- Progress mencapai 100% dan loader menghilang sekitar 3,5–4 detik setelah load. Intro tampil lagi saat reload yang diuji; perilaku sekali per sesi belum terbukti.
- Hero menggunakan canvas Three.js.
- Tech stack muncul dalam beberapa kelompok dan baris marquee.
- Experience memakai pola timeline dua kolom pada viewport besar dengan heading sticky.
- Bagian sertifikat berisi lima baris tautan. Preview/cursor-following terindikasi dari markup, tetapi hover belum terverifikasi langsung.
- Breakpoint yang terlihat: 640, 768, 1024, 1280 px. Konten max-width sekitar 1580 px, padding desktop sekitar 40 px dan mobile sekitar 16 px.

## Batasan
Marquee, timeline saat scroll, dan hover preview belum seluruhnya teruji runtime. Pemeriksaan CSS menimbulkan concern aksesibilitas: lebih dari satu H1, alt generik, teks berkontras rendah, dan reduced-motion tidak ditemukan pada CSS yang diperiksa.

## Arahan target
Gunakan atmosfer hero, loader, marquee, timeline, dan ide preview sertifikat sebagai inspirasi, bukan menyalin implementasi mentah. Loader target harus menggunakan urutan Indonesian → English → Japanese → Chinese/Mandarin → Javanese, dengan salam terakhir persis `Sugeng rawuh`. Progress 100% hanya setelah greeting terakhir selesai; intro sekali per sesi browser; dukung reduced motion/fallback.
