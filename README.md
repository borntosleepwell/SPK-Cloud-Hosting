# SPK Credit Scoring - ELECTRE

Sistem Pendukung Keputusan berbasis metode ELECTRE untuk membantu evaluasi kelayakan kredit berdasarkan beberapa kriteria. Aplikasi ini menyediakan dokumentasi metode, input data alternatif dan kriteria, serta hasil perhitungan dalam bentuk matriks dan ranking.

## Demo

- Live App: https://borntosleepwell.github.io/SPK-Cloud-Hosting/

## Fitur

- Kalkulator ELECTRE interaktif untuk data alternatif dan kriteria.
- Perhitungan concordance, discordance, threshold, dan ranking.
- Dokumentasi singkat tahapan metode ELECTRE.
- Generate data dummy untuk percobaan cepat.
- Antarmuka responsif untuk desktop dan mobile.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- JavaScript ES Modules

## Menjalankan Project

Pastikan Node.js sudah terpasang, lalu jalankan:

```bash
git clone https://github.com/borntosleepwell/spk-electre-react.git
cd spk-electre-react
npm install
npm run dev
```

Aplikasi akan berjalan di:

```bash
http://localhost:5173
```

## Script

```bash
npm run dev       # Menjalankan development server
npm run build     # Membuat production build
npm run preview   # Preview hasil build
npm run lint      # Menjalankan ESLint
```

## Struktur Project

```text
spk-electre-react/
+-- src/
|   +-- assets/
|   +-- components/
|   |   +-- Calculator.jsx
|   |   +-- Documentation.jsx
|   |   +-- Hero.jsx
|   |   +-- Navbar.jsx
|   +-- utils/
|   |   +-- electre.js
|   +-- App.jsx
|   +-- index.css
|   +-- main.jsx
+-- public/
+-- package.json
+-- tailwind.config.js
+-- vite.config.js
```

## Metode ELECTRE

ELECTRE (Elimination and Choice Translating Reality) adalah metode pengambilan keputusan multi-kriteria yang membandingkan alternatif berdasarkan hubungan dominasi. Tahapan utama yang digunakan dalam aplikasi ini meliputi normalisasi matriks, pembobotan kriteria, pembentukan matriks concordance dan discordance, perhitungan dominasi, lalu penentuan ranking alternatif.

## Deployment

Project ini dapat di-build menjadi file statis dengan:

```bash
npm run build
```

Hasil build tersedia di folder `dist/` dan dapat di-deploy ke GitHub Pages atau layanan static hosting lainnya.

## Author

Aqsha  
GitHub: https://github.com/borntosleepwell
