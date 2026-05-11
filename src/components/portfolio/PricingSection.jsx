import React from "react";
import { motion } from "framer-motion";
import { MonitorSmartphone, Workflow, RefreshCcw, LifeBuoy } from "lucide-react";

const services = [
  {
    title: "Webdesign",
    text: "Moderne und responsive Webseiten mit klarer Struktur und starker Wirkung auf Desktop und Mobilgeraeten.",
    Icon: MonitorSmartphone,
  },
  {
    title: "Technische Loesungen",
    text: "Individuelle Funktionen, Automationen und digitale Prozesse, die wirklich zu Ihrem Arbeitsalltag passen.",
    Icon: Workflow,
  },
  {
    title: "Modernisierung bestehender Seiten",
    text: "Veraltete Auftritte werden technisch und visuell erneuert, ohne den roten Faden Ihres Unternehmens zu verlieren.",
    Icon: RefreshCcw,
  },
  {
    title: "Betreuung und Pflege",
    text: "Nach dem Launch bleibt Ihre Seite aktuell. Updates, Erweiterungen und laufende Unterstuetzung inklusive.",
    Icon: LifeBuoy,
  },
];

export default function PricingSection() {

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
            Leistungen
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Was ich fuer Ihr Projekt uebernehme.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Uebersichtlich, technisch fundiert und auf das ausgerichtet, was Ihr Unternehmen wirklich braucht.
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