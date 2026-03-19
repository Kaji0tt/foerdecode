import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Café Nordwind",
    category: "Gastronomie",
    description: "Moderner Webauftritt mit Speisekarte und Öffnungszeiten.",
    before: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    after: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    tag: "Basis",
    accent: "sky",
  },
  {
    title: "Friseursalon Belle",
    category: "Beauty & Wellness",
    description: "Elegante Website mit Online-Buchungssystem und Galerie.",
    before: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    after: "https://images.unsplash.com/photo-1560066984-138daaa4e4e1?w=800&q=80",
    tag: "Expert",
    accent: "violet",
  },
  {
    title: "Tischlerei Brandt",
    category: "Handwerk",
    description: "Professioneller Auftritt mit Portfolio und eigener Domain.",
    before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tag: "Standard",
    accent: "cyan",
  },
  {
    title: "Blumenladen Petersen",
    category: "Einzelhandel",
    description: "Farbenfroher Auftritt mit Online-Shop und Standortkarte.",
    before: "https://images.unsplash.com/photo-1455793781152-0f5ca4a6e40e?w=800&q=80",
    after: "https://images.unsplash.com/photo-1487530811015-780a62b5f3fc?w=800&q=80",
    tag: "Expert",
    accent: "violet",
  },
  {
    title: "Physiotherapie Küste",
    category: "Gesundheit",
    description: "Vertrauenswürdige Website mit Terminbuchung.",
    before: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80",
    after: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    tag: "Standard",
    accent: "cyan",
  },
  {
    title: "Fahrradladen Pedal",
    category: "Sport & Freizeit",
    description: "Dynamischer Auftritt mit Produktübersicht und Service-Buchung.",
    before: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800&q=80",
    after: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    tag: "Expert",
    accent: "violet",
  },
];

const accentTag = {
  sky: "border text-orange-300",
  cyan: "border text-amber-300",
  violet: "border text-red-300",
};

const accentTagStyle = {
  sky: { background: "rgba(249,115,22,0.12)", borderColor: "rgba(249,115,22,0.25)" },
  cyan: { background: "rgba(251,191,36,0.10)", borderColor: "rgba(251,191,36,0.25)" },
  violet: { background: "rgba(127,29,29,0.15)", borderColor: "rgba(127,29,29,0.4)" },
};

function BeforeAfterSlider({ before, after }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => {
    dragging.current = true;
    updatePos(e.clientX);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = useCallback((e) => {
    if (dragging.current) updatePos(e.clientX);
  }, [updatePos]);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  const onTouchMove = (e) => {
    updatePos(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden cursor-col-resize"
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => updatePos(e.touches[0].clientX)}
    >
      {/* After (full) */}
      <img src={after} alt="Nachher" className="absolute inset-0 w-full h-full object-cover" />

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img src={before} alt="Vorher" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current?.offsetWidth || 600 }} />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{ left: `${sliderPos}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center gap-0.5 z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <ChevronLeft className="w-3.5 h-3.5 text-slate-700" />
        <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-sm pointer-events-none">
        Vorher
      </div>
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-sm pointer-events-none">
        Nachher
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

  const project = projects[current];
  const style = accentTag[project.accent];
  const styleInline = accentTagStyle[project.accent];

  return (
    <section
      id="portfolio"
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #1a0f0a 0%, #221209 50%, #1a0f0a 100%)" }} />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "rgba(127,29,29,0.07)" }} />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: "rgba(249,115,22,0.05)" }} />

      <div ref={ref} className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Websites, die{" "}
            <span style={{ background: "linear-gradient(90deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              für sich sprechen.
            </span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#8c5e3c" }}>
            Schiebe den Regler, um Vorher &amp; Nachher zu vergleichen.
          </p>
        </motion.div>

        {/* Card with arrows */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {/* Left arrow */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Card */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}
              >
                {/* Before/After image */}
                <div className="relative h-64 sm:h-80">
                  <BeforeAfterSlider before={project.before} after={project.after} />
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${style}`} style={accentTagStyle[project.accent]}>
                      {project.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#5a3a2a" }}>
                      {project.category}
                    </span>
                    <h3 className="mt-1 text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-1 text-sm" style={{ color: "#8c5e3c" }}>{project.description}</p>
                  </div>
                  {/* Dots */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    {projects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === current ? "w-4 h-2 bg-white/70" : "w-2 h-2 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}