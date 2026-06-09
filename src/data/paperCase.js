export const paperCriteria = [
  {
    code: "C1",
    name: "Harga sewa bulanan",
    unit: "ribu Rp",
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

export const storageScoreNotes = [
  "SSD SATA = 2",
  "NVMe SSD = 3",
];

export const paperWeights = paperCriteria.map((criterion) => criterion.weight);
export const paperCostBenefit = paperCriteria.map((criterion) => criterion.type);
export const paperCriterionLabels = paperCriteria.map(
  (criterion) => `${criterion.code} - ${criterion.name}`
);
export const paperMatrix = paperAlternatives.map((alternative) => alternative.values);
export const paperAlternativeNames = paperAlternatives.map(
  (alternative) => `${alternative.code} - ${alternative.name}`
);

export const paperPublishedResult = {
  normalized: [
    [0.54, 0.816, 0.673, 0.408, 0.514],
    [0.416, 0.408, 0.269, 0.816, 0.514],
    [0.402, 0.408, 0.269, 0.816, 0.514],
    [0.462, 0.408, 0.404, 0.816, 0.514],
    [0.277, 0.408, 0.538, 0.408, 0.343],
  ],
  weighted: [
    [0.162, 0.204, 0.134, 0.061, 0.051],
    [0.124, 0.102, 0.053, 0.122, 0.051],
    [0.12, 0.102, 0.053, 0.122, 0.051],
    [0.138, 0.102, 0.08, 0.122, 0.051],
    [0.083, 0.102, 0.107, 0.061, 0.034],
  ],
  outrankingSets: [
    { pair: "A1, A2", from: 0, to: 1, concordance: ["C1", "C2", "C3"], discordance: ["C4", "C5"] },
    { pair: "A1, A3", from: 0, to: 2, concordance: ["C1", "C2", "C3"], discordance: ["C4", "C5"] },
    { pair: "A1, A4", from: 0, to: 3, concordance: ["C1", "C2", "C3"], discordance: ["C4", "C5"] },
    { pair: "A1, A5", from: 0, to: 4, concordance: ["C1", "C2", "C3", "C5"], discordance: ["C4"] },
    { pair: "A2, A1", from: 1, to: 0, concordance: ["C4", "C5"], discordance: ["C1", "C2", "C3"] },
    { pair: "A2, A3", from: 1, to: 2, concordance: ["C1", "C2", "C3", "C4", "C5"], discordance: [] },
    { pair: "A2, A4", from: 1, to: 3, concordance: ["C2", "C4", "C5"], discordance: ["C1", "C3"] },
    { pair: "A2, A5", from: 1, to: 4, concordance: ["C1", "C4", "C5"], discordance: ["C2", "C3"] },
    { pair: "A3, A1", from: 2, to: 0, concordance: ["C4", "C5"], discordance: ["C1", "C2", "C3"] },
    { pair: "A3, A2", from: 2, to: 1, concordance: ["C1", "C4", "C5"], discordance: ["C2", "C3"] },
    { pair: "A3, A4", from: 2, to: 3, concordance: ["C4", "C5"], discordance: ["C1", "C2", "C3"] },
    { pair: "A3, A5", from: 2, to: 4, concordance: ["C1", "C4", "C5"], discordance: ["C2", "C3"] },
    { pair: "A4, A1", from: 3, to: 0, concordance: ["C4", "C5"], discordance: ["C1", "C2", "C3"] },
    { pair: "A4, A2", from: 3, to: 1, concordance: ["C1", "C3", "C4", "C5"], discordance: ["C2"] },
    { pair: "A4, A3", from: 3, to: 2, concordance: ["C1", "C2", "C3", "C4", "C5"], discordance: [] },
    { pair: "A4, A5", from: 3, to: 4, concordance: ["C1", "C4", "C5"], discordance: ["C2", "C3"] },
    { pair: "A5, A1", from: 4, to: 0, concordance: ["C4"], discordance: ["C1", "C2", "C3", "C5"] },
    { pair: "A5, A2", from: 4, to: 1, concordance: ["C2", "C3"], discordance: ["C1", "C4", "C5"] },
    { pair: "A5, A3", from: 4, to: 2, concordance: ["C2", "C3"], discordance: ["C1", "C4", "C5"] },
    { pair: "A5, A4", from: 4, to: 3, concordance: ["C2", "C3"], discordance: ["C1", "C4", "C5"] },
  ],
  concordanceMatrix: [
    [0, 0.75, 0.75, 0.75, 0.85],
    [0.25, 0, 1, 0.5, 0.55],
    [0.25, 0.55, 0, 0.25, 0.55],
    [0.25, 0.7, 1, 0, 0.55],
    [0.15, 0.45, 0.45, 0.45, 0],
  ],
  discordanceMatrix: [
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0.56, 0.63],
    [0, 0.63, 0, 0, 0.63],
    [0, 0.35, 0, 0, 0.63],
    [0, 0, 0, 0, 0],
  ],
  concordanceDominanceMatrix: [
    [0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0],
  ],
  discordanceDominanceMatrix: [
    [0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
  ],
  dominanceMatrix: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  ranking: [3, 1, 2, 0, 4],
  rankingMethod: "Jumlah dominasi pada Aggregate Dominance Matrix sesuai paper",
  rankingDetails: {
    notEliminatedCount: 3,
    scores: [
      {
        index: 3,
        dominanceScore: 2,
        dominates: 2,
        dominatedBy: 0,
        preferenceScore: 0,
        isEliminated: false,
      },
      {
        index: 1,
        dominanceScore: 0,
        dominates: 1,
        dominatedBy: 1,
        preferenceScore: 0,
        isEliminated: true,
      },
      {
        index: 2,
        dominanceScore: -1,
        dominates: 0,
        dominatedBy: 1,
        preferenceScore: 0,
        isEliminated: true,
      },
      {
        index: 0,
        dominanceScore: 0,
        dominates: 0,
        dominatedBy: 0,
        preferenceScore: 0,
        isEliminated: false,
      },
      {
        index: 4,
        dominanceScore: 0,
        dominates: 0,
        dominatedBy: 0,
        preferenceScore: 0,
        isEliminated: false,
      },
    ],
  },
  thresholds: {
    concordance: 0.545,
    discordance: 0.371,
  },
};
