import React from "react";
import { motion } from "framer-motion";
import { UserCircle2, ShieldCheck, MapPin } from "lucide-react";

const trustCards = [
  {
    title: "Persoenlich statt Agentur",
    text: "Direkter Kontakt ohne Zwischenstationen. Sie sprechen direkt mit der Person, die Ihr Projekt umsetzt.",
    Icon: UserCircle2,
  },
  {
    title: "Technisch sauber",
    text: "Moderne Entwicklung mit Fokus auf Performance, klare Struktur und eine stabile Basis fuer den Alltag.",
    Icon: ShieldCheck,
  },
  {
    title: "Lokal und erreichbar",
    text: "Aus Flensburg fuer die Region. Schnelle Abstimmung, kurze Wege und verstaendliche Kommunikation.",
    Icon: MapPin,
  },
];

export default function AboutSection() {
  return (
    <section id="trust" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Vertrauen auf den ersten Blick
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Klare Zusammenarbeit ohne Agentur-Komplexitaet.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Viele lokale Unternehmen wollen vor allem Verlaesslichkeit, saubere Umsetzung und einen festen Ansprechpartner.
            Genau darauf ist FoerdeCode ausgerichtet.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {trustCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(163,183,212,0.28)",
                background: "rgba(249,252,255,0.9)",
              }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "rgba(112,142,186,0.16)" }}>
                <card.Icon className="h-5 w-5" style={{ color: "#2f4c79" }} />
              </div>
              <h3 className="mb-3 font-sora text-xl font-semibold" style={{ color: "#213a66" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                {card.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}