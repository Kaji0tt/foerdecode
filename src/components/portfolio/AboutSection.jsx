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
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-sky-400/80 text-sm font-semibold uppercase tracking-widest">
            Warum ich das mache
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Eine Website für
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Ihr Geschäft.
            </span>
          </h2>
          <p className="mt-8 text-slate-300 text-lg leading-relaxed max-w-2xl">
            Viele kleine Unternehmen in Flensburg haben noch keine moderne Website – 
            oder ihre bestehende Seite wird den heutigen Anforderungen nicht mehr gerecht. 
            Gleichzeitig war es noch nie so einfach und erschwinglich, eine 
            professionelle Online-Präsenz aufzubauen.
          </p>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed max-w-2xl">
            Lass Sie uns das ändern!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-2xl">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/30 via-cyan-500/20 to-transparent max-sm:hidden" />

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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/15 to-cyan-500/15 border border-sky-500/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-sky-400" />
                  </div>
                </div>
                <div>
                  <span className="text-sky-400/50 text-xs font-mono tracking-wider">
                    SCHRITT {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}