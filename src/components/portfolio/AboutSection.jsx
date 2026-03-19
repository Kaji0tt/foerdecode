import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Wand2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Kurzes Gespräch",
    description:
      "Wir reden kurz darüber, was dein Geschäft macht und welchen Eindruck du hinterlassen möchtest. Dabei erfahre ich mehr über dich und dein Unternehmen.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Ich gestalte deine Website",
    description:
      "Mit modernen KI-Werkzeugen und meinem technischen Know-how erstelle ich eine Website, die zu dir passt.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Online gehen",
    description:
      "Deine neue Seite wird auf deiner Wunschadresse veröffentlicht — fertig und für alle erreichbar.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problem"
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #1a0f0a 0%, #221209 100%)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl" style={{ background: "rgba(249,115,22,0.05)" }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: "rgba(127,29,29,0.08)" }} />

      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Ihr Geschäft.
            <br />
            <span style={{ background: "linear-gradient(90deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Ihre Website.
            </span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: "#c4956a" }}>
            Viele kleine Unternehmen und Läden in Flensburg haben noch immer eine veraltete Website – 
            oder gar keine. Dabei profitieren gerade Geschäfte des Tagesbedarfs. Neben Informationen für Interessierte, wie Speisekarten, Öffnungszeiten oder Impressionen in die Lokalitäten, 
            sorgt eine Website für bessere Sichtbarkeit und Außenwarhnehmung.
            <br />Gleichzeitig war es noch nie so einfach und erschwinglich, eine 
            professionelle Online-Präsenz aufzubauen.
          </p>
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "#8c5e3c" }}>
            Lass Sie uns das ändern!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-2xl">
          <div className="absolute left-6 top-0 bottom-0 w-px max-sm:hidden" style={{ background: "linear-gradient(to bottom, rgba(249,115,22,0.3), rgba(127,29,29,0.2), transparent)" }} />

          <div className="space-y-14">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + 0.15 * index }}
                className="flex gap-8 items-start"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
                    <step.icon className="w-5 h-5" style={{ color: "#f97316" }} />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(249,115,22,0.5)" }}>
                    SCHRITT {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2">{step.title}</h3>
                  <p className="leading-relaxed" style={{ color: "#8c5e3c" }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}