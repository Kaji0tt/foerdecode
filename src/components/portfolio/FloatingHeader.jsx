import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingHeader({ activeSection }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Header wird sichtbar ab Segment 2 (problem)
    const showInSegments = ["problem", "solution", "portfolio", "pricing", "simple-contact"];
    setIsVisible(showInSegments.includes(activeSection));
  }, [activeSection]);

  const navItems = [
    { label: "Wie es funktioniert", id: "problem" },
    { label: "Beispiele", id: "portfolio" },
    { label: "Preise", id: "pricing" },
    { label: "Kontakt", id: "simple-contact" }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-4"
        >
          <div className="flex items-center gap-8 backdrop-blur-md bg-white/10 rounded-full px-8 py-3 border border-white/20 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium transition-colors duration-300 whitespace-nowrap"
                style={{
                  color: activeSection === item.id ? "#ef4444" : "#475569",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) e.currentTarget.style.color = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = activeSection === item.id ? "#ef4444" : "#475569";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}