// Metadata kriteria menjadi satu sumber untuk label, bobot, dan arah preferensi.
// C1 adalah cost: harga lebih kecil lebih baik. C2-C5 adalah benefit: nilai lebih besar lebih baik.
export const paperCriteria = [
  {
    code: "C1",
    name: "Harga sewa bulanan",
    unit: "Rp",
    weight: 0.3,
    type: "cost",
  },
  {
    code: "C2",
    name: "Kapasitas RAM",
    unit: "GB",
    weight: 0.25,
    type: "benefit",
  },
  {
    code: "C3",
    name: "Kapasitas storage",
    unit: "GB",
    weight: 0.2,
    type: "benefit",
  },
  {
    code: "C4",
    name: "Jumlah vCPU",
    unit: "Core",
    weight: 0.15,
    type: "benefit",
  },
  {
    code: "C5",
    name: "Jenis storage",
    unit: "Skor",
    weight: 0.1,
    type: "benefit",
  },
];

// Urutan setiap values harus sama dengan urutan C1-C5 pada paperCriteria.
// Harga disimpan dalam ribuan rupiah; perubahan skala seragam tidak mengubah normalisasi vektor.
export const paperAlternatives = [
  {
    code: "A1",
    name: "Hostinger",
    values: [116.9, 4, 50, 1, 3],
  },
  {
    code: "A2",
    name: "Dewaweb",
    values: [90, 2, 20, 2, 3],
  },
  {
    code: "A3",
    name: "IDCloudHost",
    values: [87, 2, 20, 2, 3],
  },
  {
    code: "A4",
    name: "DomaiNesia",
    values: [100, 2, 30, 2, 3],
  },
  {
    code: "A5",
    name: "Rumahweb",
    values: [60, 2, 40, 1, 2],
  },
];

// Keterangan konversi jenis storage pada data studi kasus paper.
export const storageScoreNotes = [
  "SSD SATA = 2",
  "NVMe SSD = 3",
];

// Nilai turunan ini mencegah bobot, tipe, label, dan matriks ditulis ulang di komponen.
export const paperWeights = paperCriteria.map((criterion) => criterion.weight);
export const paperCostBenefit = paperCriteria.map((criterion) => criterion.type);
export const paperCriterionLabels = paperCriteria.map(
  (criterion) => `${criterion.code} - ${criterion.name}`
);
export const paperMatrix = paperAlternatives.map((alternative) => alternative.values);
export const paperAlternativeNames = paperAlternatives.map(
  (alternative) => `${alternative.code} - ${alternative.name}`
);
