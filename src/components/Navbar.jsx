import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "dokumentasi", "perhitungan"];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-warm-white/90 backdrop-blur-xl border-b border-warm-taupe z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <motion.div
          whileHover={{ y: -1 }}
          className="text-xl md:text-2xl font-extrabold tracking-[-0.03em] text-warm-ink"
        >
          ELECTRE SPK
        </motion.div>

        <div className="flex gap-8 items-center">
          {["home", "dokumentasi", "perhitungan"].map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.1 }}
              onClick={() => scrollToSection(item)}
              className={`relative pb-1 text-xs md:text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
                activeSection === item
                  ? "text-warm-ink"
                  : "text-warm-muted hover:text-warm-ink"
              }`}
            >
              {item.replace("_", " ")}
              {activeSection === item && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute bottom-0 left-0 right-0 h-px bg-warm-coral"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
