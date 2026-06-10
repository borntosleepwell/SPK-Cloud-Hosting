# SPK Pemilihan VPS Cloud - ELECTRE

Aplikasi Sistem Pendukung Keputusan (SPK) berbasis metode ELECTRE untuk memilih layanan Web Hosting VPS Cloud terbaik. Project ini mengikuti studi kasus paper SENIFORMA 2026 dengan membandingkan Hostinger, Dewaweb, IDCloudHost, DomaiNesia, dan Rumahweb berdasarkan harga serta spesifikasi layanan.

## Demo

- Live App: https://borntosleepwell.github.io/SPK-Cloud-Hosting/

## Fitur Utama

- Studi kasus paper pemilihan Web Hosting VPS Cloud.
- Mode **Data Paper** untuk memuat dataset dan hasil perhitungan sesuai paper.
- Mode **Kalkulator Manual** untuk mengubah jumlah alternatif, nama alternatif, dan nilai matriks keputusan.
- Perhitungan ELECTRE lengkap: normalisasi, pembobotan, himpunan concordance/discordance, matriks concordance, matriks discordance, matriks dominan, aggregate dominance matrix, dan ranking.
- Dokumentasi interaktif tahapan metode ELECTRE dengan rumus perhitungan.
- Tampilan responsif dengan animasi dan visual hero.

## Studi Kasus

Project ini menggunakan 5 alternatif provider VPS Cloud:

| Kode | Alternatif |
| --- | --- |
| A1 | Hostinger |
| A2 | Dewaweb |
| A3 | IDCloudHost |
| A4 | DomaiNesia |
| A5 | Rumahweb |

Kriteria yang digunakan:

| Kode | Kriteria | Bobot | Jenis | Satuan |
| --- | --- | --- | --- | --- |
| C1 | Harga sewa bulanan | 30% | Cost | ribu Rp |
| C2 | Kapasitas RAM | 25% | Benefit | GB |
| C3 | Kapasitas storage | 20% | Benefit | GB |
| C4 | Jumlah vCPU | 15% | Benefit | Core |
| C5 | Jenis storage | 10% | Benefit | Skor |

Konversi jenis storage:

- SSD SATA = 2
- NVMe SSD = 3

Berdasarkan data paper, DomaiNesia (A4) menjadi alternatif terbaik karena memiliki jumlah dominasi tertinggi pada Aggregate Dominance Matrix.

## Metode ELECTRE

ELECTRE (Elimination and Choice Translating Reality) adalah metode pengambilan keputusan multi-kriteria berbasis outranking. Aplikasi ini menjalankan tahapan berikut:

1. Menyusun matriks keputusan.
2. Melakukan normalisasi matriks dengan vector normalization.
3. Mengalikan matriks normalisasi dengan bobot kriteria.
4. Membentuk himpunan dan matriks concordance.
5. Membentuk himpunan dan matriks discordance.
6. Menghitung threshold concordance dan discordance.
7. Membentuk matriks dominan concordance dan discordance.
8. Membentuk Aggregate Dominance Matrix.
9. Menentukan ranking alternatif berdasarkan jumlah dominasi.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- JavaScript ES Modules
- MathJax untuk rendering rumus pada dokumentasi

## Menjalankan Project

Pastikan Node.js dan npm sudah terpasang, lalu jalankan:

```bash
git clone https://github.com/borntosleepwell/spk-electre-react.git
cd spk-electre-react
npm install
npm run dev
```

Aplikasi development akan berjalan di:

```bash
http://localhost:5173
```

## Script

```bash
npm run dev       # Menjalankan development server
npm run build     # Membuat production build
npm run preview   # Preview hasil production build
npm run lint      # Menjalankan ESLint
npm run deploy    # Deploy folder dist ke GitHub Pages
```

## Struktur Project

```text
spk-electre-react/
+-- public/
+-- src/
|   +-- assets/
|   |   +-- hero.png
|   +-- components/
|   |   +-- Calculator.jsx
|   |   +-- Documentation.jsx
|   |   +-- Hero.jsx
|   |   +-- Navbar.jsx
|   +-- data/
|   |   +-- paperCase.js
|   +-- utils/
|   |   +-- electre.js
|   +-- App.jsx
|   +-- index.css
|   +-- main.jsx
+-- index.html
+-- package.json
+-- tailwind.config.js
+-- vite.config.js
```

## Build dan Deployment

Buat production build dengan:

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`.

Untuk deploy ke GitHub Pages:

```bash
npm run deploy
```

Script deploy akan menjalankan build terlebih dahulu melalui `predeploy`, lalu mengirim folder `dist/` menggunakan package `gh-pages`.

## Author

Aqsha  
GitHub: https://github.com/borntosleepwell
Aan
https://github.com/MuhammadAan18
