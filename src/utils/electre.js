const EPSILON = 1e-12;

// Menyamakan skala semua kriteria dengan vector normalization.
// Tahap ini penting karena harga, RAM, storage, vCPU, dan skor storage punya satuan berbeda.
export const normalizeMatrix = (matrix) => {
  if (!matrix.length || !matrix[0]?.length) return [];

  const denominators = matrix[0].map((_, critIdx) => {
    const sumOfSquares = matrix.reduce(
      (sum, row) => sum + Number(row[critIdx]) ** 2,
      0
    );
    return Math.sqrt(sumOfSquares);
  });

  return matrix.map((row) =>
    row.map((val, critIdx) =>
      denominators[critIdx] > EPSILON ? Number(val) / denominators[critIdx] : 0
    )
  );
};

// Mengalikan nilai normalisasi dengan bobot kriteria dari paper.
// Hasilnya menjadi matriks V yang dipakai untuk perbandingan antar alternatif.
export const weightedMatrix = (normalizedMatrix, weights) => {
  return normalizedMatrix.map((row) =>
    row.map((val, i) => val * Number(weights[i]))
  );
};

export const calculateOutrankingSets = (
  weightedMatrix,
  costBenefit = [],
  criterionCodes = []
) => {
  const n = weightedMatrix.length;
  const k = weightedMatrix[0]?.length ?? 0;
  const sets = [];

  for (let p = 0; p < n; p++) {
    for (let q = 0; q < n; q++) {
      if (p !== q) {
        const concordance = [];
        const discordance = [];

        for (let i = 0; i < k; i++) {
          const code = criterionCodes[i] ?? `C${i + 1}`;
          const isBenefit = costBenefit[i] !== "cost";
          // Benefit dianggap lebih baik jika nilainya lebih besar, sedangkan cost
          // seperti harga dianggap lebih baik jika nilainya lebih kecil.
          const isAtLeastAsGood = isBenefit
            ? weightedMatrix[p][i] >= weightedMatrix[q][i]
            : weightedMatrix[p][i] <= weightedMatrix[q][i];

          if (isAtLeastAsGood) {
            concordance.push(code);
          } else {
            discordance.push(code);
          }
        }

        sets.push({
          pair: `A${p + 1}, A${q + 1}`,
          from: p,
          to: q,
          concordance,
          discordance,
        });
      }
    }
  }

  return sets;
};

// Menghitung matriks concordance C.
// C[p][q] adalah total bobot kriteria yang mendukung alternatif p mengungguli q.
export const calculateConcordance = (weightedMatrix, weights, costBenefit = []) => {
  const n = weightedMatrix.length;
  const k = weightedMatrix[0]?.length ?? 0;
  const concordance = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let p = 0; p < n; p++) {
    for (let q = 0; q < n; q++) {
      if (p !== q) {
        let sum = 0;
        for (let i = 0; i < k; i++) {
          const isBenefit = costBenefit[i] !== "cost";
          const isAtLeastAsGood = isBenefit
            ? weightedMatrix[p][i] >= weightedMatrix[q][i]
            : weightedMatrix[p][i] <= weightedMatrix[q][i];

          if (isAtLeastAsGood) {
            sum += Number(weights[i]);
          }
        }
        concordance[p][q] = sum;
      }
    }
  }
  return concordance;
};

// Menghitung matriks discordance D.
// D[p][q] mengukur seberapa kuat kriteria yang menolak dominasi p terhadap q.
export const calculateDiscordance = (weightedMatrix, costBenefit = []) => {
  const n = weightedMatrix.length;
  const k = weightedMatrix[0]?.length ?? 0;
  const discordance = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let p = 0; p < n; p++) {
    for (let q = 0; q < n; q++) {
      if (p !== q) {
        const allDifferences = [];
        const discordanceDifferences = [];

        for (let i = 0; i < k; i++) {
          const difference = Math.abs(weightedMatrix[p][i] - weightedMatrix[q][i]);
          const isBenefit = costBenefit[i] !== "cost";
          const isWorse = isBenefit
            ? weightedMatrix[p][i] < weightedMatrix[q][i]
            : weightedMatrix[p][i] > weightedMatrix[q][i];

          allDifferences.push(difference);
          if (isWorse) {
            discordanceDifferences.push(difference);
          }
        }

        const denominator = Math.max(...allDifferences);
        discordance[p][q] =
          denominator > EPSILON && discordanceDifferences.length
            ? Math.max(...discordanceDifferences) / denominator
            : 0;
      }
    }
  }
  return discordance;
};

export const calculateConcordanceDominance = (
  concordance,
  concordanceThreshold
) => {
  const n = concordance.length;
  const dominant = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let p = 0; p < n; p++) {
    for (let q = 0; q < n; q++) {
      if (p !== q && concordance[p][q] >= concordanceThreshold) {
        // Nilai 1 berarti dukungan concordance melewati ambang rata-rata.
        dominant[p][q] = 1;
      }
    }
  }
  return dominant;
};

export const calculateDiscordanceDominance = (
  discordance,
  discordanceThreshold
) => {
  const n = discordance.length;
  const dominant = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let p = 0; p < n; p++) {
    for (let q = 0; q < n; q++) {
      if (p !== q && discordance[p][q] <= discordanceThreshold) {
        // Nilai discordance yang lebih kecil/sama threshold berarti penolakannya masih dapat diterima.
        dominant[p][q] = 1;
      }
    }
  }
  return dominant;
};

// Hitung aggregate dominance matrix berdasarkan Ekl = Fkl x Gkl.
export const calculateDominance = (concordanceDominance, discordanceDominance) => {
  return concordanceDominance.map((row, i) =>
    row.map((val, j) => val * discordanceDominance[i][j])
  );
};

// Menyusun ranking dari Aggregate Dominance Matrix.
// Alternatif yang banyak mendominasi alternatif lain ditempatkan lebih tinggi.
export const calculateRankingDetails = (dominance, concordance, discordance) => {
  const scores = dominance.map((row, idx) => {
    const dominates = row.reduce((sum, val) => sum + val, 0);
    const dominatedBy = dominance.reduce((sum, rowItem) => sum + rowItem[idx], 0);
    const preferenceScore = concordance[idx].reduce(
      (sum, val, colIdx) => sum + (idx === colIdx ? 0 : val - discordance[idx][colIdx]),
      0
    );

    return {
      index: idx,
      dominanceScore: dominates - dominatedBy,
      dominates,
      dominatedBy,
      preferenceScore,
      isEliminated: dominatedBy > 0,
    };
  });

  const sortedScores = [...scores]
    .sort((a, b) => {
      if (b.dominates !== a.dominates) {
        return b.dominates - a.dominates;
      }
      return b.preferenceScore - a.preferenceScore;
    });

  return {
    scores: sortedScores,
    ranking: sortedScores.map((item) => item.index),
    method: "Jumlah dominasi pada Aggregate Dominance Matrix",
    notEliminatedCount: scores.filter((item) => item.dominatedBy === 0).length,
  };
};

// Hitung ranking seluruh alternatif berdasarkan aggregate dominance matrix.
export const calculateRanking = (dominance, concordance, discordance) => {
  return calculateRankingDetails(dominance, concordance, discordance).ranking;
};

// Orkestrator utama seluruh tahapan ELECTRE dari matriks keputusan sampai ranking.
// Fungsi ini dipanggil kalkulator manual agar alur perhitungan tetap satu pintu.
export const calculateELECTRE = (
  decisionMatrix,
  weights,
  costBenefit = []
) => {
  const k = decisionMatrix[0].length; // kriteria

  // Default: semua benefit
  const cb = costBenefit.length > 0 ? costBenefit : Array(k).fill("benefit");

  const normalized = normalizeMatrix(decisionMatrix);
  const weighted = weightedMatrix(normalized, weights);
  const outrankingSets = calculateOutrankingSets(weighted, cb);

  const concordanceMatrix = calculateConcordance(weighted, weights, cb);
  const discordanceMatrix = calculateDiscordance(weighted, cb);

  // Threshold memakai rata-rata nilai non-diagonal, sesuai langkah umum ELECTRE
  // untuk mengubah matriks C dan D menjadi matriks dominan biner.
  const concThreshold =
    concordanceMatrix.flat().reduce((a, b) => a + b, 0) /
    (concordanceMatrix.length * (concordanceMatrix.length - 1));
  const discThreshold =
    discordanceMatrix.flat().reduce((a, b) => a + b, 0) /
    (discordanceMatrix.length * (discordanceMatrix.length - 1));

  const concordanceDominanceMatrix = calculateConcordanceDominance(
    concordanceMatrix,
    concThreshold
  );
  const discordanceDominanceMatrix = calculateDiscordanceDominance(
    discordanceMatrix,
    discThreshold
  );
  const dominanceMatrix = calculateDominance(
    concordanceDominanceMatrix,
    discordanceDominanceMatrix
  );

  const rankingDetails = calculateRankingDetails(
    dominanceMatrix,
    concordanceMatrix,
    discordanceMatrix
  );

  return {
    normalized,
    weighted,
    outrankingSets,
    concordanceMatrix,
    discordanceMatrix,
    concordanceDominanceMatrix,
    discordanceDominanceMatrix,
    dominanceMatrix,
    ranking: rankingDetails.ranking,
    rankingMethod: rankingDetails.method,
    rankingDetails,
    thresholds: {
      concordance: concThreshold,
      discordance: discThreshold,
    },
  };
};

// Dummy data untuk testing
export const generateDummyData = (alternatives = 4, criteria = 3) => {
  const matrix = [];
  for (let i = 0; i < alternatives; i++) {
    const row = [];
    for (let j = 0; j < criteria; j++) {
      row.push(Math.floor(Math.random() * 100) + 1);
    }
    matrix.push(row);
  }
  return {
    matrix,
    weights: Array(criteria)
      .fill(0)
      .map(() => Math.random()),
    altNames: Array(alternatives)
      .fill(0)
      .map((_, i) => `Alternatif ${i + 1}`),
    critNames: Array(criteria)
      .fill(0)
      .map((_, i) => `Kriteria ${i + 1}`),
  };
};
