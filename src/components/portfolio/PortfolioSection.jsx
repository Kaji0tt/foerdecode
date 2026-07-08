import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * @param {{
 *   project: {
 *     title: string,
 *     description?: string,
 *     details?: string,
 *     accent?: string,
 *     href?: string,
 *     desktopImage?: string,
 *     mobileImage?: string
 *   }
 * }} props
 */
function ProjectPreview({ project }) {
  const hasImages = project.desktopImage || project.mobileImage;
  const isMobileOnly = project.mobileImage && !project.desktopImage;

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

  if (isMobileOnly) {
    return (
      <div
        className="relative z-[2] w-full max-w-[80px] sm:max-w-[120px] rounded-[1.9rem] p-[6px] shadow-[0_22px_40px_rgba(31,45,72,0.28)]"
        style={{
          aspectRatio: "9/16",
          background: "linear-gradient(180deg, #2f3746 0%, #161d29 100%)",
        }}
      >
        <div className="pointer-events-none absolute left-1/2 top-[10px] z-[3] h-[5px] w-10 -translate-x-1/2 rounded-full bg-[#0b111a] opacity-90" />
        <div className="pointer-events-none absolute right-[10px] top-1/2 z-[3] h-12 w-[3px] -translate-y-1/2 rounded-full bg-[#445066] opacity-80" />
        <div className="h-full overflow-hidden rounded-[1.65rem] border border-[#3d4758] bg-[#0f1724]">
          <img
            src={project.mobileImage}
            alt={`${project.title} Mobile-Vorschau`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute bottom-[10px] left-1/2 z-[3] h-[4px] w-12 -translate-x-1/2 rounded-full bg-[#cfd6e4] opacity-80" />
      </div>
    );
  }

  return (
    <div className="relative mb-6">
      <div
        className="relative aspect-video w-[calc(100%-4.75rem)] sm:w-[calc(100%-5.5rem)] rounded-xl border p-1.5 sm:p-4"
        style={{
          borderColor: "rgba(163,183,212,0.24)",
          background: "linear-gradient(155deg, rgba(241,246,253,0.98), rgba(229,237,248,0.95))",
        }}
      >
        {project.desktopImage ? (
          <div className="h-full w-full overflow-hidden rounded-lg border bg-white shadow-[0_18px_35px_rgba(88,114,156,0.12)]" style={{ borderColor: "rgba(163,183,212,0.34)" }}>
            <img
              src={project.desktopImage}
              alt={`${project.title} Desktop-Vorschau`}
              className="h-full w-full object-contain object-center"
              loading="lazy"
            />
          </div>
        ) : null}
      </div>

      {project.mobileImage ? (
        <div
          className="absolute top-1/2 right-0 z-[2] w-[7rem] sm:w-[7.75rem] -translate-y-[42%] rotate-[4deg] rounded-[1.5rem] p-[5px]"
          style={{
            background: "linear-gradient(180deg, #2f3746 0%, #161d29 100%)",
            filter: "drop-shadow(0 16px 32px rgba(31,45,72,0.38))",
          }}
        >
          <div className="pointer-events-none absolute left-1/2 top-[7px] z-[3] h-[3px] w-5 -translate-x-1/2 rounded-full bg-[#0b111a] opacity-90" />
          <div className="pointer-events-none absolute right-[7px] top-1/2 z-[3] h-7 w-[2px] -translate-y-1/2 rounded-full bg-[#445066] opacity-80" />
          <div className="overflow-hidden rounded-[1.3rem] border border-[#3d4758] bg-[#0f1724]" style={{ aspectRatio: "9/16" }}>
            <img
              src={project.mobileImage}
              alt={`${project.title} Mobile-Vorschau`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="pointer-events-none absolute bottom-[7px] left-1/2 z-[3] h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#cfd6e4] opacity-80" />
        </div>
      ) : null}
    </div>
  );
}

const projects = [
  {
    title: "Portfolio Lukas Wojciechowski",
    bullets: [
      "Domainbestellung und Einrichtung",
      "Mailsystem und Weiterleitung",
      "Impressum und Datenschutzrichtlinien nach DSGVO",
      "Responsives Design für Mac, Windows, Android und iOS",
    ],
    accent: "#9e1c1c",
    href: "https://lukaswojciechowski.de/#/about",
    desktopImage: "/projects/Lukas-Desktop.png",
    mobileImage: "/projects/Lukas-Mobile.png",
  },
  {
    title: "Floralog Webapplikation",
    description: "Eine Webapplikation zur Förderung von Natur- und Pflanzenkenntnissen.",
    bullets: [
      "Schnittstellen mit externen Dienstleistern (Maps, Pflanzenerkennung, KI)",
      "Serverstruktur mit Front- und Backend (SQL)",
      "APK mit Launch im Google Playstore",
    ],
    accent: "#355f98",
    href: "https://floralog.de",
    mobileImage: "/projects/floralog-mobile.png",
  },
];

export default function PortfolioSection() {
  return (
    <section id="projects" className="relative py-16 sm:py-20" style={{ background: "rgba(242,245,251, 0.76)" }}>
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Beispiele
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Schau selbst.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Nicht ein Stockfoto – alles KI gezauberte Originale! Live und in Farbe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 pb-16"
              style={{
                borderColor: "rgba(163,183,212,0.28)",
                background: "rgba(249,252,255,0.9)",
              }}
            >
              {project.mobileImage && !project.desktopImage ? (
                <>
                  <div className="flex items-start gap-4">
                    {/* Linke Spalte: Titel + Beschreibung + Bullets */}
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-3 font-sora text-xl font-semibold" style={{ color: "#213a66" }}>
                        {project.title}
                      </h3>
                      <p className="mb-3 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                        {project.description}
                      </p>
                      <ul className="mb-4 space-y-1.5">
                        {project.bullets?.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                            <span className="mt-[7px] h-2 w-2 flex-shrink-0 rounded-full" style={{ background: project.accent }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Rechte Spalte: Phone Mockup – spannt über gesamte Höhe */}
                    <div
                      className="flex-shrink-0 w-[72px] sm:w-[88px] md:w-[216px] rotate-[4deg]"
                      style={{ filter: "drop-shadow(0 16px 32px rgba(31,45,72,0.38))" }}
                    >
                      <div
                        className="relative rounded-[1.5rem] p-[5px]"
                        style={{ background: "linear-gradient(180deg, #2f3746 0%, #161d29 100%)" }}
                      >
                        <div className="pointer-events-none absolute left-1/2 top-[7px] z-[3] h-[3px] w-5 -translate-x-1/2 rounded-full bg-[#0b111a] opacity-90" />
                        <div className="pointer-events-none absolute right-[7px] top-1/2 z-[3] h-7 w-[2px] -translate-y-1/2 rounded-full bg-[#445066] opacity-80" />
                        <div
                          className="overflow-hidden rounded-[1.3rem] border border-[#3d4758] bg-[#0f1724]"
                          style={{ aspectRatio: "9/16" }}
                        >
                          <img
                            src={project.mobileImage}
                            alt={`${project.title} Mobile-Vorschau`}
                            className="h-full w-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                        <div className="pointer-events-none absolute bottom-[7px] left-1/2 z-[3] h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#cfd6e4] opacity-80" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <ProjectPreview project={project} />

                  <h3 className="mb-3 font-sora text-xl font-semibold" style={{ color: "#213a66" }}>
                    {project.title}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                    {project.description}
                  </p>
                  <ul className="mb-4 grid gap-x-4 gap-y-1.5 md:grid-cols-2">
                    {project.bullets?.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                        <span className="mt-[7px] h-2 w-2 flex-shrink-0 rounded-full" style={{ background: project.accent }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <button
                type="button"
                className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
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
