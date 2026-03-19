import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

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
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #bfdbfe 0%, #e0f2fe 40%, #f0f9ff 70%, #ffffff 100%)",
        }}
      />

      {/* Wasser-Textur: sanfte Wellen durch radiale Gradienten */}
      <div className="absolute inset-0 opacity-[0.25]" style={{ background: "radial-gradient(ellipse 80% 50% at 20% 30%, #93c5fd, transparent), radial-gradient(ellipse 60% 40% at 80% 70%, #bae6fd, transparent)" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ border: "1px solid rgba(30,58,110,0.2)", background: "rgba(30,58,110,0.06)", color: "#1e3a6e" }}>
            <Sparkles className="w-4 h-4" />
            KI-gestütztes Webdesign aus Flensburg
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
          style={{ color: "#0f1f3d" }}
        >
          Dein Business.{" "}
          <span style={{ color: "#1e3a6e" }}>
            Deine Website.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-8 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "#64748b" }}
        >
          Professionelle Webauftritte für lokale Geschäfte in Flensburg — 
          modern, bezahlbar und in Tagen statt Wochen fertig.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300"
            style={{ background: "#1e3a6e", boxShadow: "0 8px 24px rgba(30,58,110,0.2)" }}
            onMouseEnter={e => e.currentTarget.style.background = "#162d5a"}
            onMouseLeave={e => e.currentTarget.style.background = "#1e3a6e"}
          >
            Pakete ansehen
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
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