import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function ProjectPreview({ project }) {
  const hasImages = project.desktopImage || project.mobileImage;

  if (!hasImages) {
    return (
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
    );
  }

  return (
    <div className="relative mb-6 h-72">
      <div
        className="absolute inset-x-0 top-0 bottom-5 rounded-xl border p-4"
        style={{
          borderColor: "rgba(163,183,212,0.24)",
          background: "linear-gradient(155deg, rgba(241,246,253,0.98), rgba(229,237,248,0.95))",
        }}
      >
        <div className="absolute right-4 top-4 z-[1] rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ background: "rgba(255,255,255,0.82)", color: "#4f648d" }}>
          Desktop + Mobile
        </div>

        {project.desktopImage ? (
          <div className="h-full w-[calc(100%-4.5rem)] overflow-hidden rounded-lg border bg-white shadow-[0_18px_35px_rgba(88,114,156,0.12)]" style={{ borderColor: "rgba(163,183,212,0.34)" }}>
            <img
              src={project.desktopImage}
              alt={`${project.title} Desktop-Vorschau`}
              className="h-full w-full object-contain object-top"
              loading="lazy"
            />
          </div>
        ) : null}
      </div>

      {project.mobileImage ? (
        <div
          className="absolute bottom-0 right-3 z-[2] w-[28%] min-w-[92px] max-w-[132px] rounded-[1.9rem] p-[5px] shadow-[0_22px_40px_rgba(31,45,72,0.28)]"
          style={{
            background: "linear-gradient(180deg, #2f3746 0%, #161d29 100%)",
          }}
        >
          <div className="pointer-events-none absolute left-1/2 top-[10px] z-[3] h-[5px] w-10 -translate-x-1/2 rounded-full bg-[#0b111a] opacity-90" />
          <div className="pointer-events-none absolute right-[10px] top-1/2 z-[3] h-12 w-[3px] -translate-y-1/2 rounded-full bg-[#445066] opacity-80" />
          <div className="overflow-hidden rounded-[1.55rem] border border-[#3d4758] bg-[#0f1724]">
            <img
              src={project.mobileImage}
              alt={`${project.title} Mobile-Vorschau`}
              className="aspect-[9/19.5] h-auto w-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="pointer-events-none absolute bottom-[10px] left-1/2 z-[3] h-[4px] w-12 -translate-x-1/2 rounded-full bg-[#cfd6e4] opacity-80" />
        </div>
      ) : null}
    </div>
  );
}

const projects = [
  {
    title: "Restaurant Website",
    description: "Moderner und mobiler Auftritt fuer ein lokales Restaurant mit klarer Speisekartenstruktur.",
    details: "In mehreren Feedbackrunden wurde der Auftritt geschaerft, damit Speisekarte, Reservierung und Kontakt auf allen Geraeten schnell und ohne Umwege erreichbar sind.",
    accent: "#9e1c1c",
  },
  {
    title: "Handwerksbetrieb Nord",
    description: "Relaunch einer veralteten Seite mit Fokus auf Leistungen, Vertrauen und Kontaktanfragen.",
    details: "Der Feinschliff entstand ueber mehrere Iterationen mit besonderem Augenmerk auf klarer Nutzerfuehrung, mobile Lesbarkeit und einer einfachen Kontaktaufnahme.",
    accent: "#355f98",
  },
  {
    title: "Portfolio Lukas Wojciechowski",
    description: "Portfolio fuer einen Fotografen und Videografen mit Fokus auf visuelles Storytelling, Stills und Motion.",
    details: "In ca. 8 Iterationen ist ein sehenswertes Portfolio entstanden. Besonderes Augenmerk lag bei der Umsetzung auf der Anwenderfreundlichkeit bei mobilen Geräten, Windows und Mac.",
    accent: "#9e1c1c",
    href: "https://lukaswojciechowski.de/#/about",
    desktopImage: "/projects/Lukas-Desktop.png",
    mobileImage: "/projects/Lukas-Mobile.png",
  },
  {
    title: "Lokales Kursprojekt",
    description: "Website inklusive Kursuebersicht und einfacher digitaler Anmeldung.",
    details: "Durch mehrere Abstimmungen wurde die Struktur so verdichtet, dass Kursinfos, Termine und Anmeldung auf Desktop und Smartphone gleichermassen unkompliziert funktionieren.",
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
              <ProjectPreview project={project} />

              <h3 className="mb-3 font-sora text-xl font-semibold" style={{ color: "#213a66" }}>
                {project.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                {project.description}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#5b7196" }}>
                {project.details}
              </p>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
                style={{ background: project.accent }}
                onClick={() => {
                  if (project.href) {
                    window.open(project.href, "_blank", "noopener,noreferrer");
                  }
                }}
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
