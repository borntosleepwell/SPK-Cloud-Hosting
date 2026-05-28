import { useState } from "react";
import { motion } from "framer-motion";

export default function Documentation() {
  const [openIndex, setOpenIndex] = useState(0);

  const docs = [
    {
      title: "Apa itu ELECTRE?",
      content:
        "ELECTRE adalah metode multi-criteria decision making (MCDM) berbasis outranking. Metode ini membandingkan alternatif secara berpasangan untuk melihat apakah satu alternatif cukup kuat mengungguli alternatif lain berdasarkan banyak kriteria.",
    },
    {
      title: "Langkah 1: Normalisasi Matriks",
      content:
        "Rumus: rij = xij / sqrt(sum xij^2). Normalisasi menyamakan skala antar kriteria dengan membagi setiap nilai pada kolom kriteria terhadap akar jumlah kuadrat kolom tersebut.",
    },
    {
      title: "Langkah 2: Pembobotan",
      content:
        "Rumus: vij = wj x rij. Bobot menunjukkan tingkat kepentingan tiap kriteria dan digunakan sesuai nilai input, seperti contoh W = (5, 4, 3, 4, 2) pada materi.",
    },
    {
      title: "Langkah 3: Concordance Matrix",
      content:
        "Concordance mengukur kekuatan dukungan ketika alternatif p dibandingkan dengan q. Nilainya adalah jumlah bobot kriteria saat p minimal sama baik dengan q. Pada kriteria benefit nilai lebih besar lebih baik, sedangkan pada kriteria cost nilai lebih kecil lebih baik.",
    },
    {
      title: "Langkah 4: Discordance Matrix",
      content:
        "Discordance mengukur penolakan terhadap klaim bahwa p mengungguli q. Nilainya dihitung dari selisih terbesar pada kriteria ketika p lebih buruk dari q dibandingkan dengan selisih terbesar seluruh kriteria.",
    },
    {
      title: "Langkah 5: Dominance dan Ranking",
      content:
        "Concordance dan discordance dibandingkan dengan threshold rata-rata untuk membentuk aggregate dominance matrix. Jika belum ada alternatif yang dominan, ranking dapat dihitung dari jumlah nilai Ckl - Dkl seperti tabel akhir pada materi.",
    },
  ];

  return (
    <section
      id="dokumentasi"
      className="py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
            Dokumentasi
            <span className="block bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Metode ELECTRE
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pelajari langkah demi langkah cara kerja ELECTRE dalam pengambilan keputusan multi-kriteria
          </p>
        </motion.div>

        <div className="space-y-4">
          {docs.map((doc, idx) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full text-left p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-emerald-500 transition-all group"
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {doc.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    className="text-emerald-600 text-2xl flex-shrink-0 ml-4"
                  >
                    v
                  </motion.div>
                </div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === idx ? "auto" : 0,
                  opacity: openIndex === idx ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-t-0 border-gray-200 rounded-b-2xl text-gray-700 leading-relaxed">
                  {doc.content}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
