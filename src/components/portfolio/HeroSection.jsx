import React from "react";
import { motion } from "framer-motion";


export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden snap-start"
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.95] text-center max-w-7xl font-sora"
          style={{ color: "#0f1f3d" }}
        >
          Ihr Geschäft.{" "}
          <span style={{ background: "linear-gradient(135deg, #9E0000, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ihre Website.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg md:text-xl text-center max-w-3xl leading-relaxed"
          style={{ color: "#475569" }}
        >
          Sie kümmern sich um Ihr Geschäft – ich kümmere mich um den Rest. Kein Technik-Wissen nötig, einfach per WhatsApp oder Telefon. Mit Fokus auf das Wesentliche.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-8 flex flex-row gap-2 flex-shrink-0 flex-wrap justify-center"
        >
          {[
            { label: "Wie funktioniert das?", id: "problem" },
            { label: "Beispiele", id: "portfolio" },
            { label: "Vorschau erstellen", id: "contact" },
            { label: "Preise", id: "pricing" },
            { label: "Kontakt", id: "simple-contact" }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => document.getElementById(btn.id)?.scrollIntoView({ behavior: "smooth" })}
              className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-md"
              style={{ borderColor: "rgba(30,58,110,0.3)", color: "#1e3a6e", background: "rgba(255,255,255,0.7)", boxShadow: "0 8px 32px rgba(30,58,110,0.15)" }}
              onMouseEnter={e => { 
                e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                e.currentTarget.style.boxShadow = "0 12px 48px rgba(30,58,110,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(30,58,110,0.15)";
              }}
            >
              {btn.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Founder badge bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-8 left-6 sm:left-10 z-20 flex items-center gap-3 backdrop-blur-md rounded-2xl px-4 py-3"
        style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(30,58,110,0.12)", boxShadow: "0 8px 32px rgba(30,58,110,0.12)" }}
      >
        <img
          src="/ProfSmallSmile.png"
          alt="Jascha Kruse"
          className="w-11 h-11 rounded-full object-cover flex-shrink-0"
          style={{ border: "2px solid rgba(30,58,110,0.15)" }}
        />
        <div className="leading-tight">
          <p className="text-sm font-semibold" style={{ color: "#0f1f3d" }}>Jascha Kruse</p>
          <p className="text-xs" style={{ color: "#64748b" }}>Pädagoge · IT'ler · Idealist</p>
        </div>
      </motion.div>

    </section>
  );
}