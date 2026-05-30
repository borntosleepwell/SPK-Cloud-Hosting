import { motion } from "framer-motion";
import heroImage from "../assets/hero.png";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const leftVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 22 },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 22, delay: 0.15 },
    },
  };

  return (
    <section id="home" className="relative min-h-screen px-6 pt-36 pb-16">
      <div className="absolute inset-x-0 top-0 h-px bg-warm-taupe" />

      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.08fr_0.92fr] md:items-end">
        <motion.div
          variants={leftVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <div className="flex items-center gap-4 border-y border-warm-taupe py-4 text-xs font-bold uppercase tracking-[0.18em] text-warm-muted">
            <span className="h-2 w-2 bg-warm-coral" />
            Sistem Pengambilan Keputusan
          </div>

          <div className="space-y-8">
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.9] tracking-[-0.055em] text-warm-ink md:text-8xl lg:text-9xl">
              Evaluasi Kelayakan Kredit Cerdas
            </h1>
            <p className="max-w-xl text-lg leading-[1.65] text-warm-muted md:text-xl">
              Platform SPK berbasis metode ELECTRE untuk analisis multi-kriteria
              yang objektif, terstruktur, dan mudah ditelusuri.
            </p>
          </div>

          <div className="grid gap-3 border-y border-warm-taupe py-6 text-sm font-semibold uppercase tracking-[0.12em] text-warm-ink sm:grid-cols-3">
            {["Multi-kriteria", "Transparan", "Terukur"].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <span className="h-px w-8 bg-warm-coral" />
                {feature}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("perhitungan")}
              className="border border-warm-ink bg-warm-ink px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-warm-white transition-colors hover:bg-warm-coral hover:border-warm-coral"
            >
              Mulai Perhitungan
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("dokumentasi")}
              className="border border-warm-taupe bg-transparent px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-warm-ink transition-colors hover:border-warm-ink"
            >
              Pelajari ELECTRE
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={rightVariants}
          initial="hidden"
          animate="visible"
          className="border border-warm-taupe bg-warm-sand"
        >
          <div className="aspect-[4/5] border-b border-warm-taupe grayscale">
            <img
              src={heroImage}
              alt="Analisis keputusan ELECTRE"
              className="h-full w-full object-cover opacity-80"
            />
          </div>
          <div className="grid grid-cols-2 divide-x divide-warm-taupe border-b border-warm-taupe">
            <div className="p-6">
              <p className="text-5xl font-extrabold tracking-[-0.05em] text-warm-ink">7</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-warm-muted">
                Tahap Analisis
              </p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-extrabold tracking-[-0.05em] text-warm-ink">100%</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-warm-muted">
                Transparan
              </p>
            </div>
          </div>
          <div className="p-6 text-sm leading-[1.6] text-warm-muted">
            Matriks, bobot, concordance, discordance, dan ranking akhir tersaji
            dalam struktur yang rapi untuk audit keputusan.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
