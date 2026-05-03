import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { calculateELECTRE, generateDummyData } from "../utils/electre";

export default function Calculator() {
  const [alternatives, setAlternatives] = useState(4);
  const [criteria, setCriteria] = useState(3);
  const [matrix, setMatrix] = useState([]);
  const [weights, setWeights] = useState([]);
  const [altNames, setAltNames] = useState([]);
  const [critNames, setCritNames] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dummy = generateDummyData(alternatives, criteria);
    setMatrix(dummy.matrix);
    setWeights(dummy.weights);
    setAltNames(dummy.altNames);
    setCritNames(dummy.critNames);
    setResult(null);
  }, [alternatives, criteria]);

  const handleMatrixChange = (altIdx, critIdx, value) => {
    const newMatrix = matrix.map((row, i) =>
      i === altIdx
        ? row.map((val, j) => (j === critIdx ? parseFloat(value) || 0 : val))
        : row
    );
    setMatrix(newMatrix);
  };

  const handleWeightChange = (critIdx, value) => {
    const newWeights = weights.map((w, i) =>
      i === critIdx ? parseFloat(value) || 0 : w
    );
    setWeights(newWeights);
  };

  const handleNameChange = (type, idx, value) => {
    if (type === "alt") {
      setAltNames(altNames.map((name, i) => (i === idx ? value : name)));
    } else {
      setCritNames(critNames.map((name, i) => (i === idx ? value : name)));
    }
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const sumWeights = weights.reduce((a, b) => a + b, 0);
      const normalizedWeights = weights.map((w) => w / sumWeights);
      const res = calculateELECTRE(matrix, normalizedWeights);
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
    setAltNames(dummy.altNames);
    setCritNames(dummy.critNames);
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
              onChange={(e) => setAlternatives(parseInt(e.target.value) || 2)}
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
              onChange={(e) => setCriteria(parseInt(e.target.value) || 2)}
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
          <h3 className="text-emerald-600 font-bold mb-4">Bobot Kriteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {weights.map((weight, idx) => (
              <div key={idx} className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">
                  {critNames[idx]}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={weight.toFixed(2)}
                  onChange={(e) => handleWeightChange(idx, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-4">
            💡 Bobot akan dinormalisasi otomatis. Gunakan nilai rasio (misal: 2, 3, 5)
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
            {loading ? "Menghitung..." : "🚀 Hitung ELECTRE"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateDummy}
            className="px-8 py-4 bg-white border-2 border-emerald-500 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all"
          >
            🎲 Data Dummy
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
                📊 Ranking Hasil
              </h3>
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

            {/* Matrices */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white border-2 border-gray-200 p-6 rounded-2xl overflow-x-auto"
              >
                <h4 className="text-emerald-600 font-bold mb-4">
                  Concordance Matrix
                </h4>
                <table className="w-full text-xs text-center">
                  <tbody>
                    {result.concordanceMatrix.map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td
                            key={j}
                            className="p-2 border border-gray-200 text-gray-700"
                          >
                            {val.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white border-2 border-gray-200 p-6 rounded-2xl overflow-x-auto"
              >
                <h4 className="text-cyan-600 font-bold mb-4">
                  Discordance Matrix
                </h4>
                <table className="w-full text-xs text-center">
                  <tbody>
                    {result.discordanceMatrix.map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td
                            key={j}
                            className="p-2 border border-gray-200 text-gray-700"
                          >
                            {val.toFixed(3)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

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
