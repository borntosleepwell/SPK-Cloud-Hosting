// Normalisasi matriks keputusan
export const normalizeMatrix = (matrix) => {
  const normalized = matrix.map((row, i) => {
    const sumOfSquares = matrix.reduce((sum, r) => sum + r[i] ** 2, 0);
    const denominator = Math.sqrt(sumOfSquares);
    return row.map((val, j) => val / denominator);
  });
  return normalized;
};

// Pembobotan matriks ternormalisasi
export const weightedMatrix = (normalizedMatrix, weights) => {
  return normalizedMatrix.map((row) =>
    row.map((val, i) => val * weights[i])
  );
};

// Hitung concordance matrix
export const calculateConcordance = (weightedMatrix, k) => {
  const n = weightedMatrix.length;
  const concordance = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let p = 0; p < n; p++) {
    for (let q = 0; q < n; q++) {
      if (p !== q) {
        let sum = 0;
        for (let i = 0; i < k; i++) {
          if (weightedMatrix[p][i] >= weightedMatrix[q][i]) {
            sum += 1;
          }
        }
        concordance[p][q] = sum;
      }
    }
  }
  return concordance;
};

// Hitung discordance matrix
export const calculateDiscordance = (weightedMatrix, k, weights) => {
  const n = weightedMatrix.length;
  const discordance = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  const maxDifference = {};
  for (let i = 0; i < k; i++) {
    const values = weightedMatrix.map((row) => row[i]);
    maxDifference[i] = Math.max(...values) - Math.min(...values);
  }

  for (let p = 0; p < n; p++) {
    for (let q = 0; q < n; q++) {
      if (p !== q) {
        let maxDisc = 0;
        for (let i = 0; i < k; i++) {
          if (weightedMatrix[p][i] < weightedMatrix[q][i]) {
            const disc =
              (weightedMatrix[q][i] - weightedMatrix[p][i]) /
              maxDifference[i];
            if (disc > maxDisc) {
              maxDisc = disc;
            }
          }
        }
        discordance[p][q] = maxDisc;
      }
    }
  }
  return discordance;
};

// Hitung dominance matrix
export const calculateDominance = (
  concordance,
  discordance,
  concordanceThreshold,
  discordanceThreshold
) => {
  const n = concordance.length;
  const dominance = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let p = 0; p < n; p++) {
    for (let q = 0; q < n; q++) {
      if (
        concordance[p][q] >= concordanceThreshold &&
        discordance[p][q] <= discordanceThreshold
      ) {
        dominance[p][q] = 1;
      }
    }
  }
  return dominance;
};

// Hitung eliminasi dan ranking
export const calculateRanking = (dominance) => {
  const n = dominance.length;
  const eliminated = new Set();
  const ranking = [];

  for (let i = 0; i < n; i++) {
    let isDominated = false;
    for (let j = 0; j < n; j++) {
      if (i !== j && dominance[j][i] === 1) {
        isDominated = true;
        break;
      }
    }
    if (!isDominated && !eliminated.has(i)) {
      ranking.push(i);
      for (let k = 0; k < n; k++) {
        if (dominance[i][k] === 1) {
          eliminated.add(k);
        }
      }
    }
  }

  return ranking;
};

// Main ELECTRE calculation
export const calculateELECTRE = (
  decisionMatrix,
  weights,
  costBenefit = []
) => {
  const m = decisionMatrix.length; // alternatif
  const k = decisionMatrix[0].length; // kriteria

  // Default: semua benefit
  const cb = costBenefit.length > 0 ? costBenefit : Array(k).fill("benefit");

  // Normalisasi dengan cost/benefit
  const normalized = decisionMatrix.map((row, altIdx) => {
    return row.map((val, critIdx) => {
      const sumOfSquares = decisionMatrix.reduce(
        (sum, r) => sum + r[critIdx] ** 2,
        0
      );
      const denominator = Math.sqrt(sumOfSquares);
      const normalizedVal = val / denominator;

      // Jika cost, balik nilainya
      if (cb[critIdx] === "cost") {
        return -normalizedVal;
      }
      return normalizedVal;
    });
  });

  const weighted = weightedMatrix(normalized, weights);

  const concordanceMatrix = calculateConcordance(weighted, k);
  const discordanceMatrix = calculateDiscordance(weighted, k, weights);

  // Threshold default
  const concThreshold =
    concordanceMatrix.flat().reduce((a, b) => a + b, 0) /
    (concordanceMatrix.length * (concordanceMatrix.length - 1));
  const discThreshold =
    discordanceMatrix.flat().reduce((a, b) => a + b, 0) /
    (discordanceMatrix.length * (discordanceMatrix.length - 1));

  const dominanceMatrix = calculateDominance(
    concordanceMatrix,
    discordanceMatrix,
    concThreshold,
    discThreshold
  );

  const ranking = calculateRanking(dominanceMatrix);

  return {
    normalized,
    weighted,
    concordanceMatrix,
    discordanceMatrix,
    dominanceMatrix,
    ranking,
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
