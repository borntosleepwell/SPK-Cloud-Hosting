const EPSILON = 1e-12;

// Normalisasi matriks keputusan dengan vector normalization per kriteria.
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

// Pembobotan matriks ternormalisasi
export const weightedMatrix = (normalizedMatrix, weights) => {
  return normalizedMatrix.map((row) =>
    row.map((val, i) => val * Number(weights[i]))
  );
};

// Hitung concordance matrix
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

// Hitung discordance matrix
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
      if (p !== q && discordance[p][q] >= discordanceThreshold) {
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

// Hitung ranking dengan aturan eliminasi ELECTRE.
// Jika kandidat tidak tereliminasi lebih dari satu, gunakan selisih total C-D.
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

  const notEliminatedCount = scores.filter((item) => item.dominatedBy === 0).length;
  const shouldUsePreferenceScore = notEliminatedCount >= 2;

  const sortedScores = [...scores]
    .sort((a, b) => {
      if (shouldUsePreferenceScore) {
        if (b.preferenceScore !== a.preferenceScore) {
          return b.preferenceScore - a.preferenceScore;
        }
        return b.dominanceScore - a.dominanceScore;
      }

      if (b.dominanceScore !== a.dominanceScore) {
        return b.dominanceScore - a.dominanceScore;
      }
      return b.preferenceScore - a.preferenceScore;
    });

  return {
    scores: sortedScores,
    ranking: sortedScores.map((item) => item.index),
    method: shouldUsePreferenceScore
      ? "Selisih total Concordance - Discordance"
      : "Aggregate dominance matrix",
    notEliminatedCount,
  };
};

// Hitung ranking seluruh alternatif berdasarkan aggregate dominance matrix.
export const calculateRanking = (dominance, concordance, discordance) => {
  return calculateRankingDetails(dominance, concordance, discordance).ranking;
};

// Main ELECTRE calculation
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

  const concordanceMatrix = calculateConcordance(weighted, weights, cb);
  const discordanceMatrix = calculateDiscordance(weighted, cb);

  // Threshold default
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
