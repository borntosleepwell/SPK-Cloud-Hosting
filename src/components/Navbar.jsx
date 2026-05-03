import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "dokumentasi", "perhitungan"];
      const scrollY = window.scrollY;

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
      className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-emerald-100 z-50 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent"
        >
          ELECTRE SPK
        </motion.div>

        <div className="flex gap-8 items-center">
          {["home", "dokumentasi", "perhitungan"].map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.1 }}
              onClick={() => scrollToSection(item)}
              className={`relative text-sm font-medium transition-colors capitalize ${
                activeSection === item
                  ? "text-emerald-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.replace("_", " ")}
              {activeSection === item && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 to-cyan-600"
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

