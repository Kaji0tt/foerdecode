import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden snap-start"
    >
      {/*
        ═══════════════════════════════════════════════════
        HINTERGRUND-VERLAUF — hier kannst du alles anpassen
        ═══════════════════════════════════════════════════

        FARBE 1 (oben-links) → "from"-Farbe des Verlaufs
          → Ändere "#bfdbfe" zu z.B. "#93c5fd" für kräftigeres Blau
             oder "#e0f2fe" für helleres Hellblau

        FARBE 2 (mitte) → mittlere Übergangsfarbe
          → Ändere "#e0f2fe" für weicheren oder abrupteren Übergang

        FARBE 3 (unten-rechts) → "to"-Farbe = reines Weiß
          → "#ffffff" lässt es ins Weiß auslaufen

        RICHTUNG → "135deg" = diagonal oben-links → unten-rechts
          → 180deg = von oben nach unten
          → 90deg  = von links nach rechts

        STOP-POSITIONEN (z.B. "40%, 75%"):
          → Erste Zahl: bis wohin die blaue Farbe reicht
          → Zweite Zahl: ab wann es fast weiß ist
      */}
      {/* Background handled by fixed layer in Home.jsx */}

      <div className="relative z-10 px-6 max-w-4xl mx-auto w-full flex flex-col" style={{ marginTop: "-4vh", maxHeight: "calc(100vh - 80px)" }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] flex-shrink-0"
          style={{ color: "#0f1f3d" }}
        >
          Ihr Geschäft.{" "}
          <span style={{ color: "#1e3a6e" }}>Ihre Website.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-3 text-base sm:text-lg leading-relaxed flex-shrink-0"
          style={{ color: "#475569" }}
        >
          Professionelle Webauftritte für kleine Geschäfte in Flensburg — 
          modern, bezahlbar und in Tagen statt Wochen fertig.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-3 p-4 rounded-xl overflow-y-auto flex-shrink min-h-0"
          style={{ background: "rgba(30,58,110,0.04)", border: "1px solid rgba(30,58,110,0.1)" }}
        >
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#475569" }}>
            Sie hätten gerne einen Webauftritt, aber haben keine Ahnung von Technik?
            Teure Agenturen und eventuelle Wartung schrecken Sie ab?
          </p>
          <p className="mt-3 text-sm sm:text-base font-semibold" style={{ color: "#1e3a6e" }}>
            Wir finden eine Lösung, die zu Ihnen passt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 flex flex-col sm:flex-row gap-3 flex-shrink-0"
        >
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3.5 rounded-xl text-white font-semibold text-base sm:text-lg transition-all duration-300"
            style={{ background: "#1e3a6e", boxShadow: "0 8px 24px rgba(30,58,110,0.2)" }}
            onMouseEnter={e => e.currentTarget.style.background = "#162d5a"}
            onMouseLeave={e => e.currentTarget.style.background = "#1e3a6e"}
          >
            Pakete ansehen
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3.5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300"
            style={{ border: "1px solid rgba(30,58,110,0.25)", color: "#1e3a6e" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,58,110,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            Kontakt aufnehmen
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ color: "rgba(30,58,110,0.3)" }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}