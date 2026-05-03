# 🎯 SPK Credit Scoring - ELECTRE Method

Sistem Pendukung Keputusan (SPK) berbasis **ELECTRE** untuk evaluasi dan analisis kelayakan kredit dengan antarmuka modern dan interaktif.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://borntosleepwell.github.io/spk-electre-react/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge)](https://github.com/borntosleepwell/spk-electre-react)

---

## ✨ Fitur Utama

- 📊 **Kalkulator ELECTRE Interaktif** - Input data dan lihat hasil perhitungan real-time
- 📚 **Dokumentasi Lengkap** - Penjelasan metode ELECTRE dengan accordion interaktif
- 🎨 **UI Modern** - Desain clean dengan light theme dan animasi smooth
- 📱 **Responsive** - Bekerja sempurna di desktop, tablet, dan mobile
- ⚡ **Fast Performance** - Build dengan Vite untuk loading super cepat
- 🚀 **Auto Deploy** - GitHub Pages deployment otomatis via GitHub Actions

---

## 🔧 Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React** | 19.2.5 | UI Library |
| **Vite** | 8.0.10 | Build tool & Dev server |
| **Tailwind CSS** | 3.4.19 | Styling framework |
| **Framer Motion** | 11.0.0 | Animasi halus |
| **JavaScript ES6+** | - | ELECTRE Algorithm |

---

## 📋 Fitur Aplikasi

### 1️⃣ Navbar Sticky
- Navigasi smooth scroll antar section
- Active indicator dengan animasi
- Fixed positioning untuk akses mudah

### 2️⃣ Hero Section
- Layout startup modern (text + visual)
- CTA buttons yang eye-catching
- Badge animasi dengan gradient

### 3️⃣ Dokumentasi ELECTRE
- 5 tahap penjelasan metode ELECTRE
- Accordion expandable untuk setiap tahap
- Rumus dan penjelasan lengkap

### 4️⃣ Kalkulator ELECTRE
- **Input:**
  - Jumlah alternatif (2-10)
  - Jumlah kriteria (2-10)
  - Matriks keputusan
  - Bobot kriteria
  
- **Output:**
  - Concordance Matrix
  - Discordance Matrix
  - Ranking alternatif
  - Threshold values

- **Bonus:**
  - Generate dummy data otomatis
  - Normalisasi bobot otomatis
  - Matriks interaktif

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ ([Download](https://nodejs.org/))
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/borntosleepwell/spk-electre-react.git
cd spk-electre-react

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka browser ke: `http://localhost:5173`

### Build untuk Production

```bash
# Build static files
npm run build

# Preview build locally
npm run preview
```

File build akan ada di folder `dist/`

---

## 📁 Struktur Project

```
spk-electre-react/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions workflow
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Hero section
│   │   ├── Documentation.jsx   # ELECTRE documentation
│   │   └── Calculator.jsx      # Main calculator
│   ├── utils/
│   │   └── electre.js          # ELECTRE algorithm
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Global styles (Tailwind)
│   └── main.jsx                # Entry point
├── public/                      # Static assets
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies
```

---

## 📊 Metode ELECTRE

ELECTRE (Elimination and Choice Translating Reality) adalah metode multi-criteria decision making yang menggunakan:

1. **Normalisasi Matriks** - Menyamakan skala data
2. **Pembobotan** - Memberikan importance pada kriteria
3. **Concordance Matrix** - Mengukur kecocokan antar alternatif
4. **Discordance Matrix** - Mengukur ketidaksesuaian
5. **Dominance Matrix** - Menentukan hubungan dominasi
6. **Ranking** - Hasil akhir eliminasi

**Rumus Normalisasi:**
```
rij = xij / √(Σ xij²)
```

**Rumus Pembobotan:**
```
vij = wj × rij
```

---

## 🌐 Deployment

Aplikasi ini di-deploy di **GitHub Pages** dengan **GitHub Actions**.

### Auto Deployment
- Setiap push ke `main` branch, GitHub Actions otomatis:
  1. Build aplikasi
  2. Upload ke GitHub Pages
  3. Deploy live

### Manual Deployment
```bash
# Build
npm run build

# Semua file ada di folder dist/
# Upload ke GitHub Pages atau hosting lain
```

---

## 💡 Cara Menggunakan

### 1. Input Data
- Tentukan jumlah alternatif (min 2, max 10)
- Tentukan jumlah kriteria (min 2, max 10)
- Isikan nama alternatif dan kriteria

### 2. Isi Matriks
- Masukkan nilai untuk setiap alternatif-kriteria
- Atau gunakan tombol "Data Dummy" untuk contoh

### 3. Set Bobot
- Tentukan bobot untuk setiap kriteria
- Gunakan nilai rasio (misal: 2, 3, 5)
- Akan dinormalisasi otomatis

### 4. Hitung
- Klik tombol "Hitung ELECTRE"
- Tunggu proses perhitungan
- Lihat hasil ranking dan matriks

---

## 📸 Screenshots

### Hero Section
Desain modern dengan CTA buttons yang eye-catching

### Dokumentasi
Penjelasan ELECTRE yang mudah dipahami dengan accordion

### Kalkulator
Interface interaktif untuk input dan melihat hasil perhitungan

---

## 🎓 Untuk Mahasiswa

Project ini dibuat untuk:
- ✅ Pembelajaran metode ELECTRE
- ✅ Tugas/Project akademik SPK
- ✅ Studi kasus credit scoring
- ✅ Referensi implementasi React + Tailwind

---

## 🔐 Lisensi

Proyek ini bebas digunakan untuk tujuan edukatif dan komersial.

---

## 👤 Author

**Aqsha** - [GitHub](https://github.com/borntosleepwell)

---

## 🤝 Contributing

Kontribusi welcome! Silakan:

1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📞 Support

Jika ada pertanyaan atau issue, buka **[GitHub Issues](https://github.com/borntosleepwell/spk-electre-react/issues)**

---

## 🙏 Terima Kasih

Terima kasih telah menggunakan SPK Credit Scoring ELECTRE! ⭐

Jika project ini membantu, beri ⭐ di GitHub repository!

---

**Made with ❤️ using React, Tailwind CSS, and Framer Motion**
