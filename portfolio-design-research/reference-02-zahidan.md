# Reference 02: Zahidan

URL: https://www.zahidan.my.id/

## Peran referensi
About, grid proyek, halaman detail proyek, galeri, dan footer.

## Temuan
- Memadukan tema gelap/terang dengan gaya neo-brutalist.
- About menggunakan komposisi kartu/elemen yang tegas.
- Aksi “View Details” membuka halaman detail melalui navigasi dalam situs. Direct HTTP ke `/project/animarku` pernah menghasilkan Vercel 404, jadi direct-load route belum terverifikasi.
- Galeri detail berfungsi: memilih thumbnail ketiga mengganti gambar utama dari `animarku_homepage_hero.png` menjadi `animarku_ongoing_anime.png`, serta mengubah border thumbnail aktif.
- Toggle tema memakai `localStorage` bernama `theme`, tetapi persistensi setelah hard reload belum dikonfirmasi.
- Footer menjadi penutup halaman yang jelas.

## Nilai terukur pada referensi
Nilai ini bukan token final target:
- Primary 400 `#F384FC`, 500 `#EA4DE6`, 600 `#D123C7`.
- Accent 400 `#38BDF8`, 500 `#0EA5E9`.
- Bayangan brutalist sekitar 4, 8, dan 12 px dengan warna hitam.
- Hero heading `text-4xl sm:text-5xl lg:text-6xl`.
- Galeri `h-96 md:h-[500px]`, thumbnail `gap-2`.

## Batasan
Direct-load/refresh route belum terkonfirmasi. Persistensi tema setelah hard reload belum teruji. Hover, focus ring, dan semua perilaku responsive tidak diuji sepenuhnya.

## Arahan target
Ambil inspirasi grid proyek, hierarki halaman detail, galeri, dan footer. Neo-brutalism hanya aksen selektif, terutama project cards, bukan gaya dominan seluruh situs. **Setiap proyek target harus memiliki halaman/rute tersendiri, bukan modal, dan dapat dibuka lewat navigasi, direct URL, serta refresh.** Detail memuat overview, role/contribution bila relevan, fitur, tech stack, galeri, dan demo/repository link jika tersedia.
