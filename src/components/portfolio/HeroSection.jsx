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
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.95] text-center max-w-7xl"
          style={{ color: "#0f1f3d" }}
        >
          Offline geschnackt,{" "}
          <span style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Online gemacht.</span>
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
          <button
            onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 rounded-lg text-white font-medium text-sm transition-all duration-300"
            style={{ background: "#b91c1c", boxShadow: "0 4px 12px rgba(185,28,28,0.3)" }}
            onMouseEnter={e => e.currentTarget.style.background = "#991b1b"}
            onMouseLeave={e => e.currentTarget.style.background = "#b91c1c"}
          >
            Wie funktioniert das?
          </button>
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border"
            style={{ borderColor: "#1e3a6e", color: "#1e3a6e", background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,58,110,0.04)"; }}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Beispiele
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border"
            style={{ borderColor: "#1e3a6e", color: "#1e3a6e", background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,58,110,0.04)"; }}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Vorschau erstellen
          </button>
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border"
            style={{ borderColor: "#1e3a6e", color: "#1e3a6e", background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,58,110,0.04)"; }}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Preise
          </button>
          <button
            onClick={() => document.getElementById("simple-contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border"
            style={{ borderColor: "#1e3a6e", color: "#1e3a6e", background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,58,110,0.04)"; }}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Kontakt
          </button>
        </motion.div>
      </div>


    </section>
  );
}