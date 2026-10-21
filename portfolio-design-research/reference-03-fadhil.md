# Reference 03: Fadhil Gani

URL: https://fadhilgani.is-a.dev/

## Peran referensi
Aksen editorial minimal, border dashed berlapis, pengelolaan tema, dan pola modal detail sertifikat.

## Temuan
- Astro static generation, Tailwind CSS v4.2.1, dan React islands.
- Palet netral, tema gelap/terang, aksen emerald/amber/cyan.
- Kartu memakai dua lapis border dashed; lapisan depan bergeser sekitar 4 px saat hover.
- Hero memiliki typewriter enam role yang berganti sekitar tiap 4000 ms dengan crossfade sekitar 300 ms.
- Tiga baris marquee terindikasi memakai arah kiri/kanan/kiri.
- Experience berada di `/about#experience`, bukan homepage.
- Toggle tema teruji: class `.dark` berubah dan `localStorage.dark_mode` menyimpan true/false.
- Struktur modal sertifikat mencakup gambar kredensial, issuer, tanggal, ID, verification URL, dan skills, tetapi interaksi buka/tutup belum terverifikasi dengan yakin.
- Project cards menggunakan `href="#"` dan handler menuju `#projectModal`; interaksi modal proyek tidak berhasil diuji. Rute `/projects/taxpoint`, `/project/taxpoint`, dan `/projects/1` yang diuji menghasilkan 404.
- CSS scroll reveal dan IntersectionObserver teridentifikasi, tetapi seluruh perilaku live tidak terverifikasi.

## Batasan
Toggle tema dan storage terverifikasi. Interaksi modal sertifikat/proyek belum terverifikasi. Responsive hanya diuji pada beberapa viewport.

## Arahan target
Gunakan border berlapis secara selektif. Theme toggle harus menyimpan preferensi dan konsisten saat navigasi/reload. Klik sertifikat membuka modal di halaman yang sama, bukan langsung ke URL eksternal. Modal dapat memuat gambar sertifikat, issuer, tanggal, credential ID, deskripsi, skills, dan verification link jika tersedia. **Jangan gunakan modal proyek dari referensi ini; target wajib memakai halaman detail proyek tersendiri.**
