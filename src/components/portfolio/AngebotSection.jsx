import React from "react";
import { motion } from "framer-motion";
import { Globe, Palette, Bot, LifeBuoy } from "lucide-react";

const services = [
  {
    title: "Website & Einrichtung",
    text: "Du kriegst eine fertige Website. Domain, E-Mail, Impressum, Datenschutz – alles drin, alles eingerichtet. Du musst nichts wissen.",
    Icon: Globe,
  },
  {
    title: "Individuelle Gestaltung",
    text: "Hast du konkrete Vorstellungen, wie es aussehen soll? Gut. Ich freue mich darauf, deine Vision kennenzulernen – und sie entsprechend deiner Vorstellung umzusetzen.",
    Icon: Palette,
  },
  {
    title: "KI & Automatisierung",
    text: "Brauchst du mehr als 'ne einfache Seite? Buchungssystem, automatisierte Abläufe, irgendwas Spezielles – ich zeig dir, was mit KI alles möglich ist. Und bau es dir.",
    Icon: Bot,
  },
  {
    title: "Beratung & Wartung",
    text: "Noch nicht sicher, was du brauchst? Kein Problem, wir finden eine Lösung. Auch nach dem Launch bleibe ich als Ansprechpartner für dich da.",
    Icon: LifeBuoy,
  },
];

export default function AngebotSection() {
  return (
    <section id="services" className="relative py-16 sm:py-20" style={{ background: "rgba(242,245,251, 0.76)" }}>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Angebot
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Wobei ich helfen kann.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Ich hab Kunst studiert und bin IT-Generalist. Das klingt komisch – ist aber praktisch, wenn man Websites baut, die auch gut aussehen sollen.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="rounded-2xl border p-6 transition-transform"
              style={{
                borderColor: "rgba(163,183,212,0.28)",
                background: "rgba(249,252,255,0.9)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "rgba(112,142,186,0.16)" }}>
                <service.Icon className="h-5 w-5" style={{ color: "#2f4c79" }} />
              </div>
              <h3 className="mb-3 font-sora text-xl font-semibold" style={{ color: "#213a66" }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                {service.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
