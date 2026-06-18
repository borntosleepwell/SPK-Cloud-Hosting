import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { calculateELECTRE } from "../utils/electre";
import {
  paperAlternativeNames,
  paperCostBenefit,
  paperCriteria,
  paperCriterionLabels,
  paperMatrix,
  paperWeights,
  storageScoreNotes,
} from "../data/paperCase";

const STORAGE_SCORE_CRITERION_INDEX = 4;
const STORAGE_SCORE_OPTIONS = [3, 5];

// Menjaga input C5 manual hanya berada pada skor kategori yang diizinkan.
// Nilai di luar daftar dikembalikan ke pilihan pertama sebagai nilai aman.
const normalizeStorageScore = (value) => {
  const numericValue = Number(value);
  return STORAGE_SCORE_OPTIONS.includes(numericValue)
    ? numericValue
    : STORAGE_SCORE_OPTIONS[0];
};

const createMatrix = (rowCount, existingMatrix = []) =>
  Array.from({ length: rowCount }, (_, rowIdx) =>
    paperCriteria.map((_, colIdx) => {
      const currentValue = existingMatrix[rowIdx]?.[colIdx];
      if (colIdx === STORAGE_SCORE_CRITERION_INDEX) {
        return normalizeStorageScore(currentValue);
      }
      return currentValue ?? 0;
    })
  );

const resizeList = (length, existingList) =>
  Array.from(
    { length },
    (_, idx) => existingList[idx] ?? `Alternatif ${idx + 1}`
  );

const formatNumber = (value, digits = 3) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "-";
  return Number.isInteger(numeric) ? numeric.toString() : numeric.toFixed(digits);
};

function MatrixTable({ title, matrix, labels, digits = 3 }) {
  return (
    <div className="overflow-x-auto border border-cloud-line bg-cloud-panel p-5">
      <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-cloud-ink">
        {title}
      </h4>
      <table className="w-full text-center text-xs">
        {labels && (
          <thead>
            <tr className="border-b border-cloud-line">
              <th className="p-2 text-left text-cloud-muted">A</th>
              {labels.map((label) => (
                <th key={label} className="p-2 text-cloud-ink">
                  {label.split(" - ")[0]}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i} className="border-b border-cloud-line last:border-b-0">
              {labels && (
                <td className="p-2 text-left font-bold text-cloud-ink">
                  A{i + 1}
                </td>
              )}
              {row.map((val, j) => (
                <td key={j} className="p-2 text-cloud-muted">
                  {formatNumber(val, digits)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CriterionChips({ items, tone }) {
  if (!items.length) {
    return <span className="text-cloud-muted">-</span>;
  }

  const toneClass =
    tone === "discordance"
      ? "border-cloud-accent/40 bg-orange-50 text-cloud-accent"
      : "border-cloud-primary/30 bg-cloud-soft text-cloud-primary";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`inline-flex border px-2 py-1 text-xs font-extrabold ${toneClass}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function OutrankingSetsTable({ sets, alternativeNames }) {
  if (!sets?.length) return null;

  return (
    <div className="overflow-x-auto border border-cloud-line bg-cloud-panel p-6">
      <div className="mb-5">
        <h4 className="text-sm font-extrabold uppercase tracking-[0.14em] text-cloud-ink">
          Himpunan Concordance dan Discordance
        </h4>
        <p className="mt-2 text-sm leading-[1.6] text-cloud-muted">
          Setiap baris menunjukkan kriteria yang mendukung atau menolak klaim
          bahwa alternatif pertama mengungguli alternatif kedua.
        </p>
      </div>
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-cloud-line text-left text-cloud-muted">
            <th className="p-3">Kode</th>
            <th className="p-3">Perbandingan</th>
            <th className="p-3">Concordance</th>
            <th className="p-3">Discordance</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set) => (
            <tr key={`${set.from}-${set.to}`} className="border-b border-cloud-line">
              <td className="p-3 font-extrabold text-cloud-ink">{set.pair}</td>
              <td className="p-3 text-cloud-muted">
                <span className="font-bold text-cloud-ink">
                  {alternativeNames[set.from] ?? `A${set.from + 1}`}
                </span>
                <span className="px-2 text-cloud-accent">vs</span>
                <span className="font-bold text-cloud-ink">
                  {alternativeNames[set.to] ?? `A${set.to + 1}`}
                </span>
              </td>
              <td className="p-3">
                <CriterionChips items={set.concordance} tone="concordance" />
              </td>
              <td className="p-3">
                <CriterionChips items={set.discordance} tone="discordance" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Calculator() {
  const [mode, setMode] = useState("paper");
  const [alternatives, setAlternatives] = useState(5);
  const [matrix, setMatrix] = useState(paperMatrix);
  const [altNames, setAltNames] = useState(paperAlternativeNames);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isPaperMode = mode === "paper";
  const activeMatrix = isPaperMode ? paperMatrix : matrix;
  const activeNames = isPaperMode ? paperAlternativeNames : altNames;

  // Ringkasan jumlah nilai 1 pada setiap baris Aggregate Dominance Matrix (E).
  // Nilai ini ditampilkan sebagai jumlah dominasi dan menjadi dasar utama ranking.
  const dominanceRows = useMemo(
    () =>
      (result?.dominanceMatrix ?? []).map((row, index) => ({
        index,
        total: row.reduce((sum, value) => sum + value, 0),
      })),
    [result]
  );

  // Mode paper memakai data studi kasus yang tetap, sedangkan mode manual
  // memberi kebebasan mengubah alternatif sebelum dihitung dengan rumus yang sama.
  const switchMode = (nextMode) => {
    setMode(nextMode);
    if (nextMode === "paper") {
      setAlternatives(5);
      setMatrix(paperMatrix);
      setAltNames(paperAlternativeNames);
      setResult(null);
      return;
    }
    setResult(null);
  };

  // Jumlah alternatif manual dibatasi 2-10 agar tabel tetap mudah dibaca
  // dan struktur matriks selalu mengikuti lima kriteria paper.
  const handleAlternativeCountChange = (value) => {
    const nextAlternatives = Math.min(10, Math.max(2, parseInt(value) || 2));
    setAlternatives(nextAlternatives);
    setMatrix((currentMatrix) => createMatrix(nextAlternatives, currentMatrix));
    setAltNames((currentNames) => resizeList(nextAlternatives, currentNames));
    setResult(null);
  };

  const handleNameChange = (idx, value) => {
    setAltNames((currentNames) =>
      currentNames.map((name, i) => (i === idx ? value : name))
    );
    setResult(null);
  };

  const handleMatrixChange = (altIdx, critIdx, value) => {
    // Input HTML biasa disimpan sementara sebagai string. Khusus C5 langsung
    // dinormalisasi karena nilainya merupakan kategori, bukan angka bebas.
    const nextValue =
      critIdx === STORAGE_SCORE_CRITERION_INDEX
        ? normalizeStorageScore(value)
        : value;

    setMatrix((currentMatrix) =>
      currentMatrix.map((row, i) =>
        i === altIdx
          ? row.map((val, j) => (j === critIdx ? nextValue : val))
          : row
      )
    );
    setResult(null);
  };

  const handleMatrixBlur = (altIdx, critIdx) => {
    // Mencegah sel kosong masuk ke perhitungan sebagai NaN.
    setMatrix((currentMatrix) =>
      currentMatrix.map((row, i) =>
        i === altIdx
          ? row.map((val, j) => {
              if (j !== critIdx) return val;
              if (j === STORAGE_SCORE_CRITERION_INDEX) {
                return normalizeStorageScore(val);
              }
              return val === "" ? 0 : val;
            })
          : row
      )
    );
  };

  // Titik eksekusi utama tombol "Hitung ELECTRE".
  // Pada mode manual, input string dari form dikonversi dulu menjadi angka sebelum dihitung.
  const handleCalculate = async () => {
    setLoading(true);
    try {
      if (isPaperMode) {
        // Data paper dihitung ulang agar C1 selalu diperlakukan sebagai cost,
        // bukan mengambil matriks hasil lama yang dihitung sebagai benefit.
        setResult(calculateELECTRE(paperMatrix, paperWeights, paperCostBenefit));
      } else {
        // Semua nilai form diubah ke Number tepat sebelum masuk ke algoritma.
        const numericMatrix = matrix.map((row) =>
          row.map((value, critIdx) =>
            critIdx === STORAGE_SCORE_CRITERION_INDEX
              ? normalizeStorageScore(value)
              : Number(value) || 0
          )
        );
        setMatrix(numericMatrix);
        setResult(calculateELECTRE(numericMatrix, paperWeights, paperCostBenefit));
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  // Mengisi kalkulator manual dengan alternatif paper agar pengguna bisa
  // membandingkan hasil input manual dengan studi kasus asli.
  const handleLoadPaperAlternatives = () => {
    setAlternatives(5);
    setMatrix(createMatrix(5, paperMatrix));
    setAltNames(paperAlternativeNames);
    setResult(null);
  };

  // Mengosongkan nilai matriks tanpa mengubah nama/jumlah alternatif.
  const handleClearInput = () => {
    setMatrix(createMatrix(alternatives));
    setResult(null);
  };

  return (
    <section id="perhitungan" className="bg-cloud-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-6 border-b border-cloud-line pb-10 md:grid-cols-[0.78fr_1fr] md:items-end"
        >
          <div>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.16em] text-cloud-accent">
              Studi kasus paper SENIFORMA 2026
            </p>
            <h2 className="text-5xl font-extrabold leading-[0.95] text-cloud-ink md:text-7xl">
              Perhitungan VPS Cloud
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-[1.65] text-cloud-muted">
            Kriteria dan bobot mengikuti paper pemilihan Web Hosting VPS Cloud.
            Mode paper memuat data dari naskah, lalu hasil perhitungan muncul
            setelah tombol Hitung ELECTRE ditekan.
          </p>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="border border-cloud-line bg-cloud-panel p-5">
            <p className="text-3xl font-extrabold text-cloud-ink">5</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-cloud-muted">
              Kriteria fix
            </p>
          </div>
          <div className="border border-cloud-line bg-cloud-panel p-5">
            <p className="text-3xl font-extrabold text-cloud-ink">30%</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-cloud-muted">
              Bobot tertinggi: harga
            </p>
          </div>
          <div className="border border-cloud-line bg-cloud-panel p-5">
            <p className="text-3xl font-extrabold text-cloud-accent">5</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-cloud-muted">
              Alternatif provider
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {[
            ["paper", "Data Paper"],
            ["manual", "Kalkulator Manual"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => switchMode(value)}
              className={`border px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] transition-colors ${
                mode === value
                  ? "border-cloud-primary bg-cloud-primary text-white"
                  : "border-cloud-line bg-cloud-panel text-cloud-ink hover:border-cloud-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-8 overflow-x-auto border border-cloud-line bg-cloud-panel p-6">
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-cloud-ink">
            Kriteria, Bobot, dan Jenis
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cloud-line text-left text-cloud-muted">
                <th className="p-3">Kode</th>
                <th className="p-3">Kriteria</th>
                <th className="p-3">Bobot</th>
                <th className="p-3">Jenis</th>
                <th className="p-3">Satuan</th>
              </tr>
            </thead>
            <tbody>
              {paperCriteria.map((criterion) => (
                <tr key={criterion.code} className="border-b border-cloud-line">
                  <td className="p-3 font-extrabold text-cloud-ink">{criterion.code}</td>
                  <td className="p-3 text-cloud-ink">{criterion.name}</td>
                  <td className="p-3 text-cloud-muted">{criterion.weight * 100}%</td>
                  <td className="p-3 text-cloud-muted">
                    {criterion.type === "cost" ? "Cost" : "Benefit"}
                  </td>
                  <td className="p-3 text-cloud-muted">{criterion.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-cloud-muted">
            Konversi C5: {storageScoreNotes.join(", ")}.
            {!isPaperMode &&
              ` Pada kalkulator manual, C5 hanya dapat dipilih ${STORAGE_SCORE_OPTIONS.join(
                " atau "
              )}.`}
          </p>
        </div>

        {!isPaperMode && (
          <div className="mb-8 grid gap-6 md:grid-cols-[0.45fr_1fr]">
            <div className="border border-cloud-line bg-cloud-panel p-6">
              <label className="mb-3 block text-sm font-extrabold uppercase tracking-[0.14em] text-cloud-ink">
                Jumlah Alternatif
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={alternatives}
                onFocus={(event) => event.target.select()}
                onChange={(event) => handleAlternativeCountChange(event.target.value)}
                className="w-full border border-cloud-line bg-white px-4 py-3 text-cloud-ink focus:border-cloud-primary focus:outline-none"
              />
              <button
                onClick={handleLoadPaperAlternatives}
                className="mt-4 w-full border border-cloud-line bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-cloud-ink hover:border-cloud-primary"
              >
                Muat Alternatif Paper
              </button>
            </div>

            <div className="border border-cloud-line bg-cloud-panel p-6">
              <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-cloud-ink">
                Nama Alternatif
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {altNames.map((name, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={name}
                    onChange={(event) => handleNameChange(idx, event.target.value)}
                    className="w-full border border-cloud-line bg-white px-4 py-2 text-cloud-ink focus:border-cloud-primary focus:outline-none"
                    placeholder={`Alternatif ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 overflow-x-auto border border-cloud-line bg-cloud-panel p-6">
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-cloud-ink">
            Matriks Keputusan
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cloud-line">
                <th className="p-3 text-left text-cloud-muted">Alternatif</th>
                {paperCriteria.map((criterion) => (
                  <th key={criterion.code} className="p-3 text-center text-cloud-ink">
                    {criterion.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeMatrix.map((row, altIdx) => (
                <tr key={altIdx} className="border-b border-cloud-line">
                  <td className="p-3 font-extrabold text-cloud-ink">
                    {activeNames[altIdx]}
                  </td>
                  {row.map((val, critIdx) => (
                    <td key={critIdx} className="p-3">
                      {isPaperMode ? (
                        <span className="block text-center text-cloud-muted">
                          {formatNumber(val, critIdx === 0 ? 1 : 0)}
                        </span>
                      ) : (
                        critIdx === STORAGE_SCORE_CRITERION_INDEX ? (
                          <select
                            value={normalizeStorageScore(val)}
                            onChange={(event) =>
                              handleMatrixChange(altIdx, critIdx, event.target.value)
                            }
                            className="w-full border border-cloud-line bg-white px-3 py-2 text-center text-cloud-ink focus:border-cloud-primary focus:outline-none"
                          >
                            {STORAGE_SCORE_OPTIONS.map((score) => (
                              <option key={score} value={score}>
                                {score}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="number"
                            value={val}
                            onFocus={(event) => event.target.select()}
                            onBlur={() => handleMatrixBlur(altIdx, critIdx)}
                            onChange={(event) =>
                              handleMatrixChange(altIdx, critIdx, event.target.value)
                            }
                            className="w-full border border-cloud-line bg-white px-3 py-2 text-center text-cloud-ink focus:border-cloud-primary focus:outline-none"
                          />
                        )
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleCalculate}
            disabled={loading}
            className="border border-cloud-primary bg-cloud-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-cloud-accent disabled:opacity-50"
          >
            {loading ? "Menghitung..." : "Hitung ELECTRE"}
          </button>
          {!isPaperMode && (
            <button
              onClick={handleClearInput}
              className="border border-cloud-line bg-cloud-panel px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-cloud-muted transition-colors hover:border-cloud-primary hover:text-cloud-ink"
            >
              Kosongkan Input
            </button>
          )}
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="border border-cloud-line bg-cloud-panel p-8">
              <h3 className="mb-2 text-3xl font-extrabold text-cloud-ink">
                Ranking Hasil
              </h3>
              <p className="mb-6 text-sm leading-[1.6] text-cloud-muted">
                Metode ranking: {result.rankingMethod}
              </p>
              <div className="space-y-3">
                {result.ranking.map((idx, rank) => (
                  <div
                    key={`${idx}-${rank}`}
                    className="grid gap-3 border border-cloud-line bg-white p-4 md:grid-cols-[5rem_1fr_10rem]"
                  >
                    <div className="text-3xl font-extrabold text-cloud-accent">
                      #{rank + 1}
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-cloud-ink">
                        {activeNames[idx]}
                      </p>
                      <p className="text-sm text-cloud-muted">
                        Dominasi: {dominanceRows.find((row) => row.index === idx)?.total ?? 0}
                      </p>
                    </div>
                    <div className="text-sm font-bold uppercase tracking-[0.12em] text-cloud-muted">
                      {rank === 0 ? "Terbaik" : "Alternatif"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <MatrixTable title="Matriks Normalisasi (R)" matrix={result.normalized} labels={paperCriterionLabels} />
              <MatrixTable title="Matriks Terbobot (V)" matrix={result.weighted} labels={paperCriterionLabels} />
            </div>

            <OutrankingSetsTable
              sets={result.outrankingSets}
              alternativeNames={activeNames}
            />

            <div className="grid gap-8 md:grid-cols-2">
              <MatrixTable title="Matriks Concordance (C)" matrix={result.concordanceMatrix} digits={2} />
              <MatrixTable title="Matriks Discordance (D)" matrix={result.discordanceMatrix} digits={2} />
              <MatrixTable title="Dominan Concordance (F)" matrix={result.concordanceDominanceMatrix} digits={0} />
              <MatrixTable title="Dominan Discordance (G)" matrix={result.discordanceDominanceMatrix} digits={0} />
            </div>

            <MatrixTable title="Aggregate Dominance Matrix (E)" matrix={result.dominanceMatrix} digits={0} />

            <div className="overflow-x-auto border border-cloud-line bg-cloud-panel p-6">
              <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-cloud-ink">
                Jumlah Dominasi
              </h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cloud-line text-cloud-muted">
                    <th className="p-3 text-left">Alternatif</th>
                    <th className="p-3 text-center">Jumlah nilai 1 pada baris E</th>
                  </tr>
                </thead>
                <tbody>
                  {dominanceRows.map((row) => (
                    <tr key={row.index} className="border-b border-cloud-line">
                      <td className="p-3 font-bold text-cloud-ink">
                        {activeNames[row.index]}
                      </td>
                      <td className="p-3 text-center text-cloud-muted">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
