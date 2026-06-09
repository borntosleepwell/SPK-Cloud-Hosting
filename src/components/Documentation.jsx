import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MathBlock({ children }) {
  return (
    <div className="my-5 overflow-x-auto border border-cloud-line bg-cloud-panel px-5 py-4 text-cloud-ink">
      {`\\[${children}\\]`}
    </div>
  );
}

function MathInline({ children }) {
  return <span className="text-cloud-ink">{`\\(${children}\\)`}</span>;
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
        "ELECTRE adalah metode multi-criteria decision making berbasis outranking. Pada paper ini, ELECTRE digunakan untuk membandingkan layanan VPS Cloud secara berpasangan berdasarkan harga, RAM, storage, vCPU, dan jenis storage.",
    },
    {
      title: "Dataset Paper",
      content:
        "Alternatif yang dievaluasi adalah Hostinger, Dewaweb, IDCloudHost, DomaiNesia, dan Rumahweb. Bobot kriteria yang digunakan adalah C1 harga 30%, C2 RAM 25%, C3 storage 20%, C4 vCPU 15%, dan C5 jenis storage 10%. C1 bertipe cost, sedangkan C2 sampai C5 bertipe benefit.",
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
            sesuai bobot paper, yaitu{" "}
            <MathInline>{"W=(0.30,0.25,0.20,0.15,0.10)"}</MathInline>.
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
          <MathBlock>{"E_{kl}=F_{kl}\\times G_{kl}"}</MathBlock>
          <p>
            Ranking paper dihitung dari jumlah nilai 1 pada setiap baris matriks
            E. DomaiNesia (A4) berada di peringkat pertama dengan 2 dominasi,
            diikuti Dewaweb (A2) dengan 1 dominasi.
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      id="dokumentasi"
      className="border-y border-cloud-line bg-cloud-soft px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 grid gap-8 md:grid-cols-[0.72fr_1fr] md:items-end"
        >
          <h2 className="text-5xl font-extrabold leading-[0.95] text-cloud-ink md:text-7xl">
            Dokumentasi Paper
          </h2>
          <p className="max-w-2xl text-lg leading-[1.65] text-cloud-muted">
            Ringkasan alur perhitungan ELECTRE yang dipakai pada studi kasus
            pemilihan Web Hosting VPS Cloud.
          </p>
        </motion.div>

        <div className="border-t border-cloud-ink">
          {docs.map((doc, idx) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="border-b border-cloud-line"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="group w-full bg-transparent p-0 text-left transition-colors hover:bg-white/60"
              >
                <div className="grid grid-cols-[3rem_1fr_2rem] items-center gap-4 py-7">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-cloud-accent">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-extrabold text-cloud-ink transition-colors group-hover:text-cloud-accent md:text-2xl">
                    {doc.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    className="text-right text-2xl font-light text-cloud-ink"
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
                <div className="pb-8 pl-16 pr-8 text-base leading-[1.7] text-cloud-muted md:max-w-4xl">
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
