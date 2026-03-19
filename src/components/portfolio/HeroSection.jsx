import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ border: "1px solid rgba(30,58,110,0.2)", background: "rgba(30,58,110,0.06)", color: "#1e3a6e" }}
          >
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
          <span style={{ color: "#1e3a6e" }}>Deine Website.</span>
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

        {/* Ausführlicher Infoblock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="mt-10 max-w-2xl mx-auto text-left space-y-4"
        >
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#475569" }}>
            Dank moderner KI war es noch nie so einfach, eine professionelle Website zu erstellen.
            Was früher Wochen dauerte und viel Geld kostete, ist heute in wenigen Tagen möglich —
            zu einem Bruchteil des früheren Preises.
          </p>
          <div
            className="p-5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(30,58,110,0.12)", backdropFilter: "blur(8px)" }}
          >
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#475569" }}>
              Ich nehme dir dabei jede Unsicherheit — egal ob du noch nie mit einer Website zu tun hattest
              oder einfach nicht weißt, wo du anfangen sollst. Mir liegt es am Herzen, individuelle Lösungen
              zu finden, die sich auch langfristig leicht pflegen lassen.
            </p>
            <p className="mt-3 text-base sm:text-lg leading-relaxed" style={{ color: "#475569" }}>
              Ob du per{" "}
              <span className="font-semibold" style={{ color: "#1e3a6e" }}>WhatsApp der KI</span> sagst,
              welche Details sie anpassen soll, ob du einfach eine Liste aktualisierst,
              oder ob du gar nichts selbst machen möchtest —{" "}
              <span className="font-medium" style={{ color: "#0f1f3d" }}>
                wir finden gemeinsam die Lösung, die zu dir passt.
              </span>{" "}
              Und das zu kleinsten Preisen.
            </p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300"
            style={{ background: "#1e3a6e", boxShadow: "0 8px 24px rgba(30,58,110,0.2)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#162d5a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1e3a6e")}
          >
            Pakete ansehen
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            style={{ border: "1px solid rgba(30,58,110,0.25)", color: "#1e3a6e", background: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(30,58,110,0.06)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.4)")}
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