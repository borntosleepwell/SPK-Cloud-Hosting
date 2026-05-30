import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MathBlock({ children }) {
  return (
    <div className="my-5 overflow-x-auto border border-warm-taupe bg-warm-white px-5 py-4 text-warm-ink">
      {`\\[${children}\\]`}
    </div>
  );
}

function MathInline({ children }) {
  return <span className="text-warm-ink">{`\\(${children}\\)`}</span>;
}

export default function Documentation() {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [openIndex]);

  const docs = [
    {
      title: "Apa itu ELECTRE?",
      content:
        "ELECTRE adalah metode multi-criteria decision making (MCDM) berbasis outranking. Metode ini membandingkan alternatif secara berpasangan untuk melihat apakah satu alternatif cukup kuat mengungguli alternatif lain berdasarkan banyak kriteria.",
    },
    {
      title: "Langkah 1: Normalisasi Matriks",
      content: (
        <>
          <p>Rumus normalisasi matriks:</p>
          <MathBlock>
            {"r_{ij}=\\frac{x_{ij}}{\\sqrt{\\sum_{i=1}^{m}x_{ij}^{2}}}"}
          </MathBlock>
          <p>
            Normalisasi menyamakan skala antar kriteria dengan membagi setiap
            nilai pada kolom kriteria terhadap akar jumlah kuadrat kolom
            tersebut.
          </p>
        </>
      ),
    },
    {
      title: "Langkah 2: Pembobotan",
      content: (
        <>
          <p>Rumus pembobotan:</p>
          <MathBlock>{"v_{ij}=w_j \\times r_{ij}"}</MathBlock>
          <p>
            Bobot menunjukkan tingkat kepentingan tiap kriteria dan digunakan
            sesuai nilai input, seperti contoh{" "}
            <MathInline>{"W=(5,4,3,4,2)"}</MathInline> pada materi.
          </p>
        </>
      ),
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
      content: (
        <>
          <p>
            Concordance dan discordance dibandingkan dengan threshold rata-rata
            untuk membentuk aggregate dominance matrix.
          </p>
          <MathBlock>
            {"S_k=\\sum_{l=1}^{m}C_{kl}-\\sum_{l=1}^{m}D_{kl}"}
          </MathBlock>
          <p>
            Jika belum ada alternatif yang dominan, ranking dapat dihitung dari
            skor selisih concordance dan discordance seperti tabel akhir pada
            materi.
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      id="dokumentasi"
      className="border-y border-warm-taupe bg-warm-taupe px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 grid gap-8 md:grid-cols-[0.72fr_1fr] md:items-end"
        >
          <h2 className="text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-warm-ink md:text-7xl">
            Dokumentasi Metode ELECTRE
          </h2>
          <p className="max-w-2xl text-lg leading-[1.65] text-warm-muted">
            Pelajari langkah demi langkah cara kerja ELECTRE dalam pengambilan keputusan multi-kriteria
          </p>
        </motion.div>

        <div className="border-t border-warm-ink">
          {docs.map((doc, idx) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="border-b border-warm-ink"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="group w-full bg-transparent p-0 text-left transition-colors hover:bg-warm-white/40"
              >
                <div className="grid grid-cols-[3rem_1fr_2rem] items-center gap-4 py-7">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-warm-coral">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-extrabold tracking-[-0.02em] text-warm-ink transition-colors group-hover:text-warm-coral md:text-2xl">
                    {doc.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    className="text-right text-2xl font-light text-warm-ink"
                  >
                    +
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
                <div className="pb-8 pl-16 pr-8 text-base leading-[1.7] text-warm-muted md:max-w-4xl">
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
