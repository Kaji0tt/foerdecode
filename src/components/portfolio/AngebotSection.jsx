import React from "react";
import { motion } from "framer-motion";
import { Globe, Palette, Bot, LifeBuoy } from "lucide-react";

const services = [
  {
    title: "Website & Einrichtung",
    text: "Fertige, responsive Website inkl. Domain, E-Mail-Postfach, Impressum und Datenschutzerklärung nach DSGVO – alles aus einer Hand, ohne technischen Aufwand für Sie.",
    Icon: Globe,
  },
  {
    title: "Individuelle Gestaltung",
    text: "Ästhetische Anforderungen sind keine Blackbox. Durch mein Kunststudium verstehe ich gestalterische Ideen und setze sie präzise um – vom ersten Entwurf bis zum fertigen Auftritt.",
    Icon: Palette,
  },
  {
    title: "KI & Automatisierung",
    text: "Als IT-Generalist übersetze ich Ihre Anforderungen in technische Lösungen: individuelle Applikationen, automatisierte Abläufe und smarte Schnittstellen – entwickelt mit KI-Unterstützung.",
    Icon: Bot,
  },
  {
    title: "Betreuung & Wartung",
    text: "Nach dem Launch bleibe ich Ihr Ansprechpartner. Updates, Erweiterungen, Korrekturen – auf Wunsch mit laufendem Service, damit Sie sich um Ihr Kerngeschäft kümmern können.",
    Icon: LifeBuoy,
  },
];

export default function AngebotSection() {
  return (
    <section id="services" className="relative py-16 sm:py-20">
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
            Technik, die gestalterisch denkt.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Als IT-Generalist mit einem Studium der Künste verstehe ich beide Seiten: Was etwas gut aussehen soll und was es dafür technisch braucht. Ich übersetze ästhetische Anforderungen in funktionierende Lösungen – und begleite das Ganze von der Idee bis zum laufenden Betrieb.
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
