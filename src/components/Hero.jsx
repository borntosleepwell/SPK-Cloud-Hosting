import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 px-6 overflow-hidden"
    >
      {/* Soft gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-full border border-emerald-200/50">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">
                  Sistem Pengambilan Keputusan Cerdas
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="text-gray-900">Evaluasi Kelayakan</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 bg-clip-text text-transparent">
                  Kredit Cerdas
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Platform SPK berbasis metode ELECTRE untuk analisis mendalam dan pengambilan keputusan yang lebih objektif dalam evaluasi kredit.
            </p>

            {/* Features */}
            <div className="space-y-3 pt-4">
              {[
                "Analisis multi-kriteria yang akurat",
                "Interface interaktif dan mudah dipelajari",
                "Dokumentasi lengkap dengan contoh",
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("perhitungan")}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Mulai Perhitungan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("dokumentasi")}
                className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-2xl border-2 border-emerald-200 hover:bg-emerald-50 transition-all"
              >
                Pelajari ELECTRE
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden md:block"
          >
            {/* Card Container */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-200 to-cyan-200 rounded-3xl blur-2xl opacity-30" />

              {/* Main card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
                {/* Visual Content */}
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4"
                    >
                      <div className="text-3xl font-bold text-emerald-600">7</div>
                      <div className="text-sm text-gray-600 mt-1">Tahap Analisis</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-2xl p-4"
                    >
                      <div className="text-3xl font-bold text-cyan-600">100%</div>
                      <div className="text-sm text-gray-600 mt-1">Transparan</div>
                    </motion.div>
                  </div>

                  {/* Matrix Preview */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="text-xs font-semibold text-gray-500 mb-3">
                      Matriks Keputusan Preview
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((row) => (
                        <div key={row} className="flex gap-2">
                          {[1, 2, 3].map((col) => (
                            <div
                              key={col}
                              className="flex-1 h-8 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-lg animate-pulse"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer text */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 border-t border-gray-200 pt-4">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    <span>Real-time calculation dengan akurasi tinggi</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-200 to-transparent rounded-2xl blur-xl opacity-40"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <div className="text-gray-400 text-sm font-medium">Scroll untuk lanjut</div>
        <div className="text-emerald-500 text-2xl mt-2">↓</div>
      </motion.div>
    </section>
  );
}

