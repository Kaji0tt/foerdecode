import React from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Start" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Lösung" },
  { id: "portfolio", label: "Portfolio" },
  { id: "pricing", label: "Pakete" },
  { id: "contact", label: "Kontakt" },
];

export default function NavigationDots({ activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 max-md:hidden">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center"
          aria-label={section.label}
        >
          <span className="absolute right-8 whitespace-nowrap text-xs font-medium transition-all duration-300 pointer-events-none" style={{ color: "rgba(30,58,110,0)", }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(30,58,110,0.8)"}
          >
            {section.label}
          </span>
          <motion.div
            className="rounded-full border border-white/20 transition-all duration-300"
            animate={{
              width: activeSection === section.id ? 12 : 8,
              height: activeSection === section.id ? 12 : 8,
              backgroundColor: activeSection === section.id ? "#1e3a6e" : "rgba(30,58,110,0.2)",
              borderColor: activeSection === section.id ? "#1e3a6e" : "rgba(30,58,110,0.15)",
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      ))}
    </nav>
  );
}