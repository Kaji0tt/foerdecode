import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Restaurant Website",
    description: "Moderner und mobiler Auftritt fuer ein lokales Restaurant mit klarer Speisekartenstruktur.",
    goal: "Ziel: Mehr Reservierungen ueber Mobilgeraete und bessere Auffindbarkeit.",
    result: "Verbesserung: Klarere Navigation, schnellere Ladezeit, professionelleres Erscheinungsbild.",
    accent: "#9e1c1c",
  },
  {
    title: "Handwerksbetrieb Nord",
    description: "Relaunch einer veralteten Seite mit Fokus auf Leistungen, Vertrauen und Kontaktanfragen.",
    goal: "Ziel: Mehr qualifizierte Anfragen und bessere Vorstellung der Referenzen.",
    result: "Verbesserung: Strukturierte Leistungsseiten und vereinfachter Kontaktweg.",
    accent: "#355f98",
  },
  {
    title: "Praxis an der Foerde",
    description: "Ruhiger Webauftritt fuer einen Dienstleister mit klarer Termin- und Leistungsinformation.",
    goal: "Ziel: Patientinnen und Patienten schneller zu den wichtigsten Infos fuehren.",
    result: "Verbesserung: Lesbare Inhalte, mobile Optimierung und bessere Nutzerfuehrung.",
    accent: "#9e1c1c",
  },
  {
    title: "Lokales Kursprojekt",
    description: "Website inklusive Kursuebersicht und einfacher digitaler Anmeldung.",
    goal: "Ziel: Weniger manueller Aufwand bei Buchungen und klarere Kommunikation.",
    result: "Verbesserung: Digitalisierte Anfragewege und strukturierte Inhalte.",
    accent: "#355f98",
  },
];

export default function PortfolioSection() {
  return (
    <section id="projects" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Projekte
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Beispiele mit klarem Ziel und sichtbarer Verbesserung.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Nicht nur Screenshots, sondern nachvollziehbare Ergebnisse fuer reale Anforderungen aus dem Alltag.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(163,183,212,0.28)",
                background: "rgba(249,252,255,0.9)",
              }}
            >
              <div className="mb-4 h-44 rounded-xl border" style={{ borderColor: "rgba(163,183,212,0.24)", background: "linear-gradient(155deg, rgba(241,246,253,0.95), rgba(229,237,248,0.92))" }}>
                <div className="h-full w-full p-4">
                  <div className="mb-3 h-2 w-20 rounded-full" style={{ background: "rgba(123,150,191,0.52)" }} />
                  <div className="mb-2 h-2 w-40 rounded-full" style={{ background: "rgba(123,150,191,0.32)" }} />
                  <div className="mb-2 h-2 w-28 rounded-full" style={{ background: "rgba(123,150,191,0.25)" }} />
                  <div className="mt-7 grid grid-cols-3 gap-2">
                    <span className="h-10 rounded-md" style={{ background: "rgba(123,150,191,0.22)" }} />
                    <span className="h-10 rounded-md" style={{ background: "rgba(123,150,191,0.22)" }} />
                    <span className="h-10 rounded-md" style={{ background: "rgba(123,150,191,0.22)" }} />
                  </div>
                </div>
              </div>

              <h3 className="mb-3 font-sora text-xl font-semibold" style={{ color: "#213a66" }}>
                {project.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                {project.description}
              </p>
              <p className="mb-2 text-sm leading-relaxed" style={{ color: "#2c436d" }}>
                {project.goal}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#5b7196" }}>
                {project.result}
              </p>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
                style={{ background: project.accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.92";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Live ansehen
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
