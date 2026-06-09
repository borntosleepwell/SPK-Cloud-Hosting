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
      <div className="absolute inset-x-0 top-0 h-px bg-cloud-line" />

      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.08fr_0.92fr] md:items-end">
        <motion.div
          variants={leftVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <div className="flex items-center gap-4 border-y border-cloud-line py-4 text-xs font-bold uppercase tracking-[0.18em] text-cloud-muted">
            <span className="h-2 w-2 bg-cloud-accent" />
            SPK Web Hosting VPS Cloud
          </div>

          <div className="space-y-8">
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.9] text-cloud-ink md:text-8xl lg:text-9xl">
              Pemilihan VPS Cloud dengan ELECTRE
            </h1>
            <p className="max-w-xl text-lg leading-[1.65] text-cloud-muted md:text-xl">
              Aplikasi ini mengikuti paper SENIFORMA 2026 untuk membandingkan
              Hostinger, Dewaweb, IDCloudHost, DomaiNesia, dan Rumahweb.
            </p>
          </div>

          <div className="grid gap-3 border-y border-cloud-line py-6 text-sm font-semibold uppercase tracking-[0.12em] text-cloud-ink sm:grid-cols-3">
            {["Harga", "Spesifikasi", "Storage"].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <span className="h-px w-8 bg-cloud-accent" />
                {feature}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("perhitungan")}
              className="border border-cloud-primary bg-cloud-primary px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-cloud-accent hover:bg-cloud-accent"
            >
              Mulai Perhitungan
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("dokumentasi")}
              className="border border-cloud-line bg-transparent px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cloud-ink transition-colors hover:border-cloud-primary"
            >
              Pelajari ELECTRE
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={rightVariants}
          initial="hidden"
          animate="visible"
          className="border border-cloud-line bg-cloud-panel"
        >
          <div className="aspect-[4/5] border-b border-cloud-line grayscale">
            <img
              src={heroImage}
              alt="Analisis keputusan ELECTRE"
              className="h-full w-full object-cover opacity-80"
            />
          </div>
          <div className="grid grid-cols-2 divide-x divide-cloud-line border-b border-cloud-line">
            <div className="p-6">
              <p className="text-5xl font-extrabold text-cloud-ink">5</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-cloud-muted">
                Kriteria Paper
              </p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-extrabold text-cloud-accent">A4</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-cloud-muted">
                Ranking 1
              </p>
            </div>
          </div>
          <div className="p-6 text-sm leading-[1.6] text-cloud-muted">
            DomaiNesia menjadi rekomendasi terbaik pada paper dengan jumlah
            dominasi tertinggi pada Aggregate Dominance Matrix.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
