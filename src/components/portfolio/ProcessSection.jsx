import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Kurzes Gespraech",
    text: "Wir lernen uns kennen und besprechen Ihre Ziele und Anforderungen.",
  },
  {
    number: "02",
    title: "Konzept und Struktur",
    text: "Wir definieren Inhalte, Aufbau und den roten Faden. Anschließend bereite ich ein erstes Konzept vor, damit Sie eine klare Vorstellung vom Ergebnis haben.",
  },
  {
    number: "03",
    title: "Umsetzung",
    text: "Sie entscheiden, ob Ihnen das Konzept gefällt. Falls ja, setze ich das Projekt um. Je nach Umfang, bleiben wir dabei in engem Austausch, damit Sie jederzeit den Überblick behalten und Feedback geben können.",
  },
  {
    number: "04",
    title: "Launch und Betreuung",
    text: "Die Website oder das Projekt geht live und kann auf Wunsch weiter von mir betreut, gepflegt und erweitert werden - oder wir entwerfen einen Self-Service Ansatz, der sich für Sie richtig anfühlt.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-16 sm:py-20" style={{ background: "rgb(242,245,251)" }}>
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
            So kommen wir zum Ziel.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Wir lernen uns kennen. Danach entwickle ich ein Konzept, passend zu Ihnen und Ihrem Unternehmen.
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
