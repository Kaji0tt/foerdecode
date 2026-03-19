import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Clock, Smartphone, Search } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Veraltetes Design",
    description: "Websites von 2010 schrecken Kunden ab, bevor sie den Laden betreten.",
  },
  {
    icon: Smartphone,
    title: "Nicht mobilfreundlich",
    description: "80% der lokalen Suchen passieren am Handy — und deine Seite passt nicht auf den Bildschirm.",
  },
  {
    icon: Search,
    title: "Unsichtbar bei Google",
    description: "Ohne modernen Webauftritt finden neue Kunden dein Geschäft einfach nicht.",
  },
  {
    icon: TrendingDown,
    title: "Umsatzverlust",
    description: "Jeder Tag mit einer schlechten Website kostet Kunden und Umsatz.",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problem"
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
    >
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(2px)" }} />
      
      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-red-400/80 text-sm font-semibold uppercase tracking-widest">
            Das Problem
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Deine Website kostet dich
            <br />
            <span className="text-red-400">Kunden.</span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-xl mx-auto">
            Viele lokale Geschäfte in Flensburg verlieren täglich potenzielle Kunden durch veraltete Webauftritte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/15 transition-colors duration-500">
                <problem.icon className="w-6 h-6 text-red-400/80" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{problem.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}