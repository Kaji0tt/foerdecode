import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Kurzes Gespraech",
    text: "Sie erzaehlen, was gebraucht wird und welche Ziele Ihre Website erreichen soll.",
  },
  {
    number: "02",
    title: "Konzept und Struktur",
    text: "Wir definieren gemeinsam Inhalte, Aufbau und den roten Faden fuer den Auftritt.",
  },
  {
    number: "03",
    title: "Umsetzung",
    text: "Ich setze das Projekt technisch sauber und performant um, inkl. laufender Abstimmung.",
  },
  {
    number: "04",
    title: "Launch und Betreuung",
    text: "Die Website geht live und wird auf Wunsch weiter betreut, gepflegt und erweitert.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Ablauf
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            So laeuft Ihr Projekt in vier klaren Schritten.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Transparent, planbar und ohne technische Ueberforderung.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="rounded-2xl border p-5"
              style={{
                borderColor: "rgba(163,183,212,0.28)",
                background: "rgba(249,252,255,0.9)",
              }}
            >
              <p className="mb-3 text-sm font-bold tracking-[0.08em]" style={{ color: "#f87171" }}>
                {step.number}
              </p>
              <h3 className="mb-3 font-sora text-lg font-semibold" style={{ color: "#213a66" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                {step.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
