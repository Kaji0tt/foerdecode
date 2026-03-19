import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden snap-start bg-white"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #1e3a6e 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft color accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "rgba(30,58,110,0.05)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: "rgba(185,28,28,0.04)" }} />

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