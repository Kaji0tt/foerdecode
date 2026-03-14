import React from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Start" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Lösung" },
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
          <span className="absolute right-8 whitespace-nowrap text-xs font-medium text-white/0 group-hover:text-white/80 transition-all duration-300 pointer-events-none">
            {section.label}
          </span>
          <motion.div
            className="rounded-full border border-white/20 transition-all duration-300"
            animate={{
              width: activeSection === section.id ? 12 : 8,
              height: activeSection === section.id ? 12 : 8,
              backgroundColor: activeSection === section.id ? "rgb(56, 189, 248)" : "rgba(255,255,255,0.25)",
              borderColor: activeSection === section.id ? "rgb(56, 189, 248)" : "rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      ))}
    </nav>
  );
}