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
      className="min-h-screen w-full flex items-center relative snap-start"
    >

      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16">
        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight" style={{ color: "#0f1f3d" }}>
            Große Wirkung.{" "}
            <span style={{ color: "#1e3a6e" }}>
              Kleines Geld.
            </span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: "#475569" }}>
            Viele kleine Unternehmen und Läden haben noch keine oder eine alte Website. Zum einen steigt die Bedeutung eines Internetauftritts für Sichtbarkeit stetig - zum anderen wird Erstellung, Bearbeitung und Wartung dank künstlicher Intelligenz einfacher denn je! 
            Mir bleibt damit mehr Zeit für das Wesentliche: Lösungen im Umgang mit der Technik finden, die für Sie funktionieren!
          </p>

          <p className="mt-4 text-lg font-medium leading-relaxed max-w-2xl" style={{ color: "#b91c1c" }}>
            Dank der KI, bleibt der Preis damit klein und die Wirkung wird groß.
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