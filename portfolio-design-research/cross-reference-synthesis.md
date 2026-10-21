# Cross-Reference Synthesis

## Peran referensi
| Referensi | Peran | Pola inspirasi |
|---|---|---|
| R1 — Rifki | Atmosfer dan motion | Loading intro, hero sinematik, moving tech stack, timeline, certificate hover preview |
| R2 — Zahidan | Struktur konten/proyek | About, selected-project grid, halaman detail dan galeri, footer |
| R3 — Fadhil | Aksen editorial/interaksi | Border dashed selektif, theme toggle persisten, modal detail sertifikat |

## Arah desain
**Experimental Editorial Hybrid**: hero sinematik, konten editorial yang rapi, dan aksen neo-brutalist secara selektif. Jangan terapkan brutalism ke seluruh situs. About berfondasi editorial dengan aksen neo-brutalist seperlunya. Light dan dark mode sama-sama perlu dirancang.

## Urutan homepage
1. Loading Intro
2. Hero
3. About
4. Moving Tech Stack
5. Experience
6. Selected Projects
7. Certifications
8. Footer

## Persyaratan target
### Loading intro
- Greeting berurutan: Indonesian → English → Japanese → Chinese/Mandarin → Javanese.
- Greeting terakhir persis `Sugeng rawuh`.
- Progress 100% hanya setelah greeting terakhir selesai.
- Tampil sekali per sesi browser.
- Reduced-motion support/fallback.
- Urutan target ini berbeda dari urutan greeting R1 yang teramati.

### Detail proyek
- **Halaman/rute tersendiri, bukan modal.**
- Setiap kartu menuju rute detail yang benar.
- Rute harus berfungsi melalui navigasi internal, direct URL, dan refresh.
- Halaman dapat memuat overview, role/contribution jika relevan, fitur, tech stack, galeri, serta demo/repository link jika tersedia.
- Modal proyek dari R3 tidak digunakan.

### Sertifikat
- Daftar sertifikat terinspirasi R1, termasuk hover preview mengikuti cursor jika tetap nyaman dan aksesibel.
- Klik sertifikat membuka modal detail di halaman yang sama, bukan langsung membuka external credential URL.
- Modal dapat menampilkan gambar, issuer, tanggal, credential ID, deskripsi, skills, dan verification link jika tersedia.

### Prinsip lintas situs
- Tech marquee berdiri sendiri setelah About; timeline setelah marquee.
- Footer menjadi penutup kuat dengan tautan kontak jelas.
- Gunakan motion yang halus, reduced motion, keyboard navigation, focus states, struktur semantik, kontras memadai, dan responsive layout.
- Jangan menambah dependency hanya untuk meniru efek tanpa alasan.
- Warna/ukuran referensi bukan token final.
- Jangan menyebut interaksi sebagai terverifikasi bila hanya didukung markup/CSS atau observasi terbatas.
- Framework dan arsitektur akhir ditentukan setelah audit repository.

## Status
- Arah desain: **Experimental Editorial Hybrid**.
- Detail proyek: **rute tersendiri, bukan modal**.
- Modal: **khusus detail sertifikat**.
- `DESIGN.md` belum dibuat/diubah. Tahap berikutnya: review dokumen riset, audit repository, lalu spesifikasi desain dan prompt implementasi dengan persetujuan terpisah.
