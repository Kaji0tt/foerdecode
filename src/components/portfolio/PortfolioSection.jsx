import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Café Nordwind",
    category: "Gastronomie",
    description: "Moderner Webauftritt für ein Flensburger Café mit Speisekarte und Öffnungszeiten.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    tags: ["Basis"],
    accent: "sky",
  },
  {
    title: "Friseursalon Belle",
    category: "Beauty & Wellness",
    description: "Elegante Website mit Online-Buchungssystem und Galerie für einen lokalen Friseursalon.",
    image: "https://images.unsplash.com/photo-1560066984-138daaa4e4e1?w=800&q=80",
    tags: ["Expert"],
    accent: "violet",
  },
  {
    title: "Tischlerei Brandt",
    category: "Handwerk",
    description: "Professioneller Webauftritt mit Portfolio, eigener Domain und Kontaktformular.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tags: ["Standard"],
    accent: "cyan",
  },
  {
    title: "Blumenladen Petersen",
    category: "Einzelhandel",
    description: "Farbenfroher Online-Auftritt mit Online-Shop und interaktiver Standortkarte.",
    image: "https://images.unsplash.com/photo-1487530811015-780a62b5f3fc?w=800&q=80",
    tags: ["Expert"],
    accent: "violet",
  },
  {
    title: "Physiotherapie Küste",
    category: "Gesundheit",
    description: "Vertrauenswürdige Website mit Terminbuchung und Leistungsübersicht.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    tags: ["Standard"],
    accent: "cyan",
  },
  {
    title: "Fahrradladen Pedal",
    category: "Sport & Freizeit",
    description: "Dynamischer Webauftritt mit Produktübersicht und Reparatur-Service-Buchung.",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    tags: ["Expert"],
    accent: "violet",
  },
];

const accentTag = {
  sky: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  violet: "bg-violet-500/15 text-violet-300 border-violet-500/20",
};

export default function PortfolioSection() {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -400 : 400, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  return (
    <section
      id="portfolio"
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 w-full mx-auto py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 px-6"
        >
          <span className="text-violet-400/80 text-sm font-semibold uppercase tracking-widest">
            Referenzen
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Websites, die
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
              für sich sprechen.
            </span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-xl mx-auto">
            Beispiele für lokale Geschäfte aus Flensburg — modern, schnell und individuell.
          </p>
        </motion.div>

        {/* Scroll controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-end gap-3 px-6 max-w-6xl mx-auto mb-6"
        >
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all duration-300 disabled:opacity-25"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all duration-300 disabled:opacity-25"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Horizontal scroll track */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex-shrink-0 w-[320px] sm:w-[360px] rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden snap-start group hover:border-white/10 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${accentTag[project.accent]}`}>
                    {project.tags[0]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  {project.category}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <p className="text-center text-slate-600 text-xs mt-6 px-6">
          ← Zum Scrollen wischen oder Pfeile nutzen →
        </p>
      </div>
    </section>
  );
}