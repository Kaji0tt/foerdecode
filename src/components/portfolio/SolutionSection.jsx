import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Wand2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Du sagst mir, was du brauchst",
    description:
      "In einem kurzen Gespräch klären wir, was dein Business braucht — keine Technik-Kenntnisse nötig.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "KI baut deine Website",
    description:
      "Mit modernster KI-Technologie erstelle ich in kürzester Zeit eine professionelle Website, maßgeschneidert für dein Geschäft.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deine Website geht online",
    description:
      "Deine neue Website wird auf deiner Wunschadresse veröffentlicht — fertig, sichtbar und bereit für Kunden.",
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="solution"
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
    >
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(2px)" }} />
      
      {/* Accent glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#1e3a6e" }}>
            So einfach geht's
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight" style={{ color: "#0f1f3d" }}>
            In 3 Schritten zur
            <br />
            <span style={{ color: "#1e3a6e" }}>
              neuen Website.
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-px max-sm:hidden" style={{ background: "linear-gradient(to bottom, rgba(30,58,110,0.3), rgba(30,58,110,0.1), transparent)" }} />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="flex gap-8 items-start"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(30,58,110,0.08)", border: "1px solid rgba(30,58,110,0.15)" }}>
                    <step.icon className="w-5 h-5" style={{ color: "#1e3a6e" }} />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(30,58,110,0.5)" }}>
                    SCHRITT {step.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold mt-1 mb-3" style={{ color: "#0f1f3d" }}>
                    {step.title}
                  </h3>
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