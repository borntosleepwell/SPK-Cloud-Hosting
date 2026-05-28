import { useState } from "react";
import { motion } from "framer-motion";
import { calculateELECTRE, generateDummyData } from "../utils/electre";

const DEFAULT_ALTERNATIVES = 4;
const DEFAULT_CRITERIA = 3;

const createMatrix = (rowCount, colCount, existingMatrix = []) =>
  Array.from({ length: rowCount }, (_, rowIdx) =>
    Array.from({ length: colCount }, (_, colIdx) => existingMatrix[rowIdx]?.[colIdx] ?? 0)
  );

const resizeList = (length, existingList, fallback) =>
  Array.from({ length }, (_, idx) => existingList[idx] ?? fallback(idx));

const formatNumber = (value, digits = 3) =>
  Number.isInteger(value) ? value.toString() : Number(value).toFixed(digits);

function MatrixTable({ title, matrix, digits = 3, tone = "emerald" }) {
  const color = tone === "cyan" ? "text-cyan-600" : "text-emerald-600";

  return (
    <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl overflow-x-auto">
      <h4 className={`${color} font-bold mb-4`}>{title}</h4>
      <table className="w-full text-xs text-center">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => (
                <td key={j} className="p-2 border border-gray-200 text-gray-700">
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

export default function Calculator() {
  const [alternatives, setAlternatives] = useState(DEFAULT_ALTERNATIVES);
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
  const [matrix, setMatrix] = useState(createMatrix(DEFAULT_ALTERNATIVES, DEFAULT_CRITERIA));
  const [weights, setWeights] = useState(Array(DEFAULT_CRITERIA).fill(1));
  const [costBenefit, setCostBenefit] = useState(Array(DEFAULT_CRITERIA).fill("benefit"));
  const [altNames, setAltNames] = useState(
    resizeList(DEFAULT_ALTERNATIVES, [], (idx) => `Alternatif ${idx + 1}`)
  );
  const [critNames, setCritNames] = useState(
    resizeList(DEFAULT_CRITERIA, [], (idx) => `Kriteria ${idx + 1}`)
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const resizeForm = (nextAlternatives, nextCriteria) => {
    setMatrix((currentMatrix) => createMatrix(nextAlternatives, nextCriteria, currentMatrix));
    setWeights((currentWeights) => resizeList(nextCriteria, currentWeights, () => 1));
    setCostBenefit((currentTypes) =>
      resizeList(nextCriteria, currentTypes, () => "benefit")
    );
    setAltNames((currentNames) =>
      resizeList(nextAlternatives, currentNames, (idx) => `Alternatif ${idx + 1}`)
    );
    setCritNames((currentNames) =>
      resizeList(nextCriteria, currentNames, (idx) => `Kriteria ${idx + 1}`)
    );
    setResult(null);
  };

  const clampCount = (value) => Math.min(10, Math.max(2, parseInt(value) || 2));

  const handleAlternativeCountChange = (value) => {
    const nextAlternatives = clampCount(value);
    setAlternatives(nextAlternatives);
    resizeForm(nextAlternatives, criteria);
  };

  const handleCriteriaCountChange = (value) => {
    const nextCriteria = clampCount(value);
    setCriteria(nextCriteria);
    resizeForm(alternatives, nextCriteria);
  };

  const handleMatrixChange = (altIdx, critIdx, value) => {
    const newMatrix = matrix.map((row, i) =>
      i === altIdx
        ? row.map((val, j) => (j === critIdx ? value : val))
        : row
    );
    setMatrix(newMatrix);
    setResult(null);
  };

  const handleMatrixBlur = (altIdx, critIdx) => {
    setMatrix((currentMatrix) =>
      currentMatrix.map((row, i) =>
        i === altIdx
          ? row.map((val, j) => (j === critIdx && val === "" ? 0 : val))
          : row
      )
    );
  };

  const handleWeightChange = (critIdx, value) => {
    const newWeights = weights.map((w, i) =>
      i === critIdx ? value : w
    );
    setWeights(newWeights);
    setResult(null);
  };

  const handleWeightBlur = (critIdx) => {
    setWeights((currentWeights) =>
      currentWeights.map((weight, i) => (i === critIdx && weight === "" ? 0 : weight))
    );
  };

  const handleCostBenefitChange = (critIdx, value) => {
    setCostBenefit(costBenefit.map((type, i) => (i === critIdx ? value : type)));
    setResult(null);
  };

  const handleNameChange = (type, idx, value) => {
    if (type === "alt") {
      setAltNames(altNames.map((name, i) => (i === idx ? value : name)));
    } else {
      setCritNames(critNames.map((name, i) => (i === idx ? value : name)));
    }
    setResult(null);
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const numericWeights = weights.map((weight) => Number(weight) || 0);
      const numericMatrix = matrix.map((row) =>
        row.map((value) => Number(value) || 0)
      );
      const sumWeights = numericWeights.reduce((a, b) => a + b, 0);
      if (sumWeights <= 0) {
        throw new Error("Total bobot harus lebih dari 0.");
      }
      setMatrix(numericMatrix);
      setWeights(numericWeights);
      const res = calculateELECTRE(numericMatrix, numericWeights, costBenefit);
      setResult(res);
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleGenerateDummy = () => {
    const dummy = generateDummyData(alternatives, criteria);
    setMatrix(dummy.matrix);
    setWeights(dummy.weights);
    setCostBenefit(Array(criteria).fill("benefit"));
    setAltNames(dummy.altNames);
    setCritNames(dummy.critNames);
    setResult(null);
  };

  const handleClearInput = () => {
    setMatrix(createMatrix(alternatives, criteria));
    setWeights(Array(criteria).fill(1));
    setCostBenefit(Array(criteria).fill("benefit"));
    setResult(null);
  };

  return (
    <section id="perhitungan" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
            Kalkulator
            <span className="block bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              ELECTRE
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Input data alternatif dan kriteria, kemudian lihat hasil perhitungan ELECTRE secara real-time
          </p>
        </motion.div>

        {/* Configuration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 p-6 rounded-2xl">
            <label className="block text-emerald-900 font-bold mb-3">
              Jumlah Alternatif:
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={alternatives}
              onFocus={(e) => e.target.select()}
              onChange={(e) => handleAlternativeCountChange(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-xl text-gray-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border-2 border-cyan-200 p-6 rounded-2xl">
            <label className="block text-cyan-900 font-bold mb-3">
              Jumlah Kriteria:
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={criteria}
              onFocus={(e) => e.target.select()}
              onChange={(e) => handleCriteriaCountChange(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-cyan-200 rounded-xl text-gray-900 focus:border-cyan-600 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Names Input */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-gray-200 p-6 rounded-2xl"
          >
            <h3 className="text-emerald-600 font-bold mb-4">Nama Alternatif</h3>
            <div className="space-y-3">
              {altNames.map((name, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange("alt", idx, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:border-emerald-500 focus:outline-none"
                  placeholder={`Alternatif ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-gray-200 p-6 rounded-2xl"
          >
            <h3 className="text-cyan-600 font-bold mb-4">Nama Kriteria</h3>
            <div className="space-y-3">
              {critNames.map((name, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange("crit", idx, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:border-cyan-500 focus:outline-none"
                  placeholder={`Kriteria ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Matrix Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border-2 border-gray-200 p-6 rounded-2xl mb-8 overflow-x-auto"
        >
          <h3 className="text-emerald-600 font-bold mb-4">Matriks Keputusan</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-3 text-gray-700 font-bold">
                  Alt \ Krit
                </th>
                {critNames.map((name, idx) => (
                  <th key={idx} className="text-center py-3 px-3 text-emerald-600 font-bold">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, altIdx) => (
                <tr key={altIdx} className="border-b border-gray-200">
                  <td className="py-3 px-3 text-cyan-600 font-bold">
                    {altNames[altIdx]}
                  </td>
                  {row.map((val, critIdx) => (
                    <td key={critIdx} className="py-3 px-3">
                      <input
                        type="number"
                        value={val}
                        onFocus={(e) => e.target.select()}
                        onBlur={() => handleMatrixBlur(altIdx, critIdx)}
                        onChange={(e) =>
                          handleMatrixChange(altIdx, critIdx, e.target.value)
                        }
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded text-gray-900 text-center focus:border-emerald-500 focus:outline-none"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Weights Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white border-2 border-gray-200 p-6 rounded-2xl mb-8"
        >
          <h3 className="text-emerald-600 font-bold mb-4">Bobot dan Tipe Kriteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {weights.map((weight, idx) => (
              <div key={idx} className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">
                  {critNames[idx]}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={weight}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => handleWeightBlur(idx)}
                  onChange={(e) => handleWeightChange(idx, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:border-emerald-500 focus:outline-none"
                />
                <select
                  value={costBenefit[idx] ?? "benefit"}
                  onChange={(e) => handleCostBenefitChange(idx, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="benefit">Benefit (semakin besar semakin baik)</option>
                  <option value="cost">Cost (semakin kecil semakin baik)</option>
                </select>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-4">
            Bobot digunakan sesuai nilai input seperti pada materi ELECTRE, misalnya 5, 4, 3, 4, dan 2.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-4 justify-center mb-16 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCalculate}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Menghitung..." : "Hitung ELECTRE"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateDummy}
            className="px-8 py-4 bg-white border-2 border-emerald-500 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all"
          >
            Data Dummy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearInput}
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all"
          >
            Kosongkan Input
          </motion.button>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Ranking */}
            <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-emerald-300 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">
                Ranking Hasil
              </h3>
              <p className="text-sm text-emerald-900/70 mb-4">
                Metode ranking: {result.rankingMethod}
              </p>
              <div className="space-y-3">
                {result.ranking.length > 0 ? (
                  result.ranking.map((idx, rank) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: rank * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-emerald-200"
                    >
                      <div className="text-3xl font-bold text-emerald-600 w-12">
                        #{rank + 1}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {altNames[idx]}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-700">
                    Semua alternatif tidak terdominasi
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-200 p-6 rounded-2xl">
              <h4 className="text-emerald-700 font-bold mb-3">
                Dasar Pembentukan Ranking
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Aggregate dominance matrix digunakan untuk melihat alternatif yang tereliminasi.
                Jika alternatif yang tidak tereliminasi berjumlah dua atau lebih, ranking akhir
                dibentuk dari selisih total concordance dan discordance.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-5">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Tidak Tereliminasi</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {result.rankingDetails.notEliminatedCount}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Metode Ranking</p>
                  <p className="text-base font-bold text-gray-900 mt-1">
                    {result.rankingMethod}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Aturan Selisih</p>
                  <p className="text-base font-bold text-gray-900 mt-1">
                    Total C - Total D
                  </p>
                </div>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 px-3 text-left text-gray-700">Alternatif</th>
                      <th className="py-3 px-3 text-center text-gray-700">Dominasi</th>
                      <th className="py-3 px-3 text-center text-gray-700">Didominasi</th>
                      <th className="py-3 px-3 text-center text-gray-700">Status</th>
                      <th className="py-3 px-3 text-center text-gray-700">Skor C-D</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rankingDetails.scores.map((score) => (
                      <tr key={score.index} className="border-b border-gray-200">
                        <td className="py-3 px-3 font-semibold text-gray-900">
                          {altNames[score.index]}
                        </td>
                        <td className="py-3 px-3 text-center text-gray-700">
                          {score.dominates}
                        </td>
                        <td className="py-3 px-3 text-center text-gray-700">
                          {score.dominatedBy}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                              score.isEliminated
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            {score.isEliminated ? "Tereliminasi" : "Lolos"}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-gray-900">
                          {formatNumber(score.preferenceScore, 3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
              <h4 className="text-gray-900 font-bold mb-4">
                Alur Perhitungan ELECTRE
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="font-bold text-gray-900">1. Normalisasi</p>
                  <p>Setiap nilai dibagi akar jumlah kuadrat pada kolom kriterianya.</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="font-bold text-gray-900">2. Pembobotan</p>
                  <p>Nilai normalisasi dikalikan bobot input pada setiap kriteria.</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="font-bold text-gray-900">3. Concordance dan Discordance</p>
                  <p>Setiap alternatif dibandingkan berpasangan berdasarkan tipe benefit/cost.</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="font-bold text-gray-900">4. Dominance dan Ranking</p>
                  <p>F dan G digabung menjadi E. Jika kandidat lolos lebih dari satu, digunakan skor C-D.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <MatrixTable title="Normalized Matrix" matrix={result.normalized} />
              <MatrixTable title="Weighted Matrix" matrix={result.weighted} tone="cyan" />
              <MatrixTable title="Concordance Matrix" matrix={result.concordanceMatrix} digits={2} />
              <MatrixTable title="Discordance Matrix" matrix={result.discordanceMatrix} tone="cyan" />
              <MatrixTable title="Dominan Concordance (F)" matrix={result.concordanceDominanceMatrix} digits={0} />
              <MatrixTable title="Dominan Discordance (G)" matrix={result.discordanceDominanceMatrix} digits={0} tone="cyan" />
            </div>

            <MatrixTable title="Aggregate Dominance Matrix (E)" matrix={result.dominanceMatrix} digits={0} />

            {/* Thresholds */}
            <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl">
              <h4 className="text-purple-600 font-bold mb-4">Threshold</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
                  <p className="text-gray-700 text-sm">Concordance Threshold</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {result.thresholds.concordance.toFixed(3)}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
                  <p className="text-gray-700 text-sm">Discordance Threshold</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {result.thresholds.discordance.toFixed(3)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
