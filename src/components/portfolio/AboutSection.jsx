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
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start bg-white"
    >
      {/* Subtle border top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(30,58,110,0.1)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(30,58,110,0.08)" }} />

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "rgba(30,58,110,0.04)" }} />

      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16">
        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight" style={{ color: "#0f1f3d" }}>
            Ihr Geschäft.{" "}
            <span style={{ color: "#1e3a6e" }}>
              Ihre Website.
            </span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: "#475569" }}>
            Viele kleine Unternehmen und Läden in Flensburg haben noch immer eine veraltete Website – 
            oder gar keine. Dabei profitieren gerade Geschäfte des Tagesbedarfs. Neben Informationen für Interessierte, wie Speisekarten, Öffnungszeiten oder Impressionen in die Lokalitäten, 
            sorgt eine Website für bessere Sichtbarkeit und Außenwahrnehmung.
            <br />Gleichzeitig war es noch nie so einfach und erschwinglich, eine 
            professionelle Online-Präsenz aufzubauen.
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed max-w-2xl" style={{ color: "#b91c1c" }}>
            Lass uns das ändern!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-2xl">
          <div className="absolute left-6 top-0 bottom-0 w-px max-sm:hidden" style={{ background: "linear-gradient(to bottom, rgba(30,58,110,0.25), rgba(185,28,28,0.15), transparent)" }} />

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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(30,58,110,0.07)", border: "1px solid rgba(30,58,110,0.15)" }}>
                    <step.icon className="w-5 h-5" style={{ color: "#1e3a6e" }} />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(30,58,110,0.45)" }}>
                    SCHRITT {step.number}
                  </span>
                  <h3 className="text-xl font-semibold mt-1 mb-2" style={{ color: "#0f1f3d" }}>{step.title}</h3>
                  <p className="leading-relaxed" style={{ color: "#64748b" }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}