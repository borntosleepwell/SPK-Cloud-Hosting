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
      className="fixed top-0 z-50 w-full border-b border-cloud-line bg-cloud-bg/90 backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <motion.div
          whileHover={{ y: -1 }}
          className="text-xl font-extrabold text-cloud-ink md:text-2xl"
        >
          VPS ELECTRE
        </motion.div>

        <div className="flex gap-8 items-center">
          {["home", "dokumentasi", "perhitungan"].map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.1 }}
              onClick={() => scrollToSection(item)}
              className={`relative pb-1 text-xs md:text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
                activeSection === item
                  ? "text-cloud-ink"
                  : "text-cloud-muted hover:text-cloud-ink"
              }`}
            >
              {item.replace("_", " ")}
              {activeSection === item && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute bottom-0 left-0 right-0 h-px bg-cloud-accent"
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
