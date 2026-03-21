import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Café Nordwind",
    category: "Gastronomie",
    description: "Moderner Webauftritt mit Speisekarte und Öffnungszeiten.",
    isRework: true,
    before: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    after: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    tag: "Basis",
    accent: "sky",
  },
  {
    title: "Friseursalon Belle",
    category: "Beauty & Wellness",
    description: "Elegante Website mit Online-Buchungssystem und Galerie.",
    isRework: false,
    before: "https://images.unsplash.com/photo-1560066984-138daaa4e4e1?w=800&q=80",
    after: null,
    tag: "Expert",
    accent: "violet",
  },
  {
    title: "Tischlerei Brandt",
    category: "Handwerk",
    description: "Professioneller Auftritt mit Portfolio und eigener Domain.",
    isRework: true,
    before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tag: "Standard",
    accent: "cyan",
  },
  {
    title: "Blumenladen Petersen",
    category: "Einzelhandel",
    description: "Farbenfroher Auftritt – komplett neu erstellt.",
    isRework: false,
    before: "https://images.unsplash.com/photo-1487530811015-780a62b5f3fc?w=800&q=80",
    after: null,
    tag: "Expert",
    accent: "violet",
  },
  {
    title: "Physiotherapie Küste",
    category: "Gesundheit",
    description: "Vertrauenswürdige Website mit Terminbuchung.",
    isRework: true,
    before: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80",
    after: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    tag: "Standard",
    accent: "cyan",
  },
  {
    title: "Fahrradladen Pedal",
    category: "Sport & Freizeit",
    description: "Dynamischer Auftritt – von Null zur fertigen Website.",
    isRework: false,
    before: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    after: null,
    tag: "Expert",
    accent: "violet",
  },
];

const accentTag = {
  sky: "border",
  cyan: "border",
  violet: "border",
};

const accentTagStyle = {
  sky: { background: "rgba(30,58,110,0.08)", borderColor: "rgba(30,58,110,0.2)", color: "#1e3a6e" },
  cyan: { background: "rgba(30,58,110,0.06)", borderColor: "rgba(30,58,110,0.15)", color: "#1e3a6e" },
  violet: { background: "rgba(185,28,28,0.07)", borderColor: "rgba(185,28,28,0.2)", color: "#b91c1c" },
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

function SingleImage({ src, label }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-sm pointer-events-none">
        {label}
      </div>
    </div>
  );
}

function ProjectVisual({ project }) {
  if (project.isRework && project.after) {
    return <BeforeAfterSlider before={project.before} after={project.after} />;
  }
  return <SingleImage src={project.before} label="Beispiel" />;
}

function MobilePortfolio({ current, setCurrent, projects }) {
  const touchStartX = useRef(null);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent((c) => (c + 1) % projects.length);
      else setCurrent((c) => (c - 1 + projects.length) % projects.length);
    }
    touchStartX.current = null;
  };

  const handleTap = () => {
    setCurrent((c) => (c + 1) % projects.length);
  };

  const project = projects[current];
  const style = accentTag[project.accent];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full" style={{ height: "56vw", minHeight: 220 }}>
            <ProjectVisual project={project} />
            <div className="absolute top-3 right-3 z-10">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${style}`} style={accentTagStyle[project.accent]}>
                {project.tag}
              </span>
            </div>
          </div>

          <div
            className="px-6 pt-5 pb-2 bg-white"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={handleTap}
          >
            <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#94a3b8" }}>
              {project.category}
            </span>
            <h3 className="mt-1 text-xl font-semibold" style={{ color: "#0f1f3d" }}>{project.title}</h3>
            <p className="mt-1 text-sm" style={{ color: "#64748b" }}>{project.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        className="flex justify-center gap-2 pt-3 pb-4 bg-white"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className="rounded-full transition-all duration-300"
            style={{ width: i === current ? 20 : 8, height: 8, background: i === current ? "#1e3a6e" : "rgba(30,58,110,0.2)" }}
          />
        ))}
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

  return (
    <section
      id="portfolio"
      className="min-h-screen w-full flex items-center relative snap-start"
    >
      <div ref={ref} className="relative z-10 w-full py-16">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 px-6 max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight" style={{ color: "#0f1f3d" }}>
            Von der Idee{" "}
            <span style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>zur fertigen Seite.</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#64748b" }}>
            {project.isRework
              ? "Schiebe den Regler, um Vorher & Nachher zu vergleichen."
              : "Neue Website – komplett von Grund auf erstellt."}
          </p>
        </motion.div>

        {/* Mobile layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="sm:hidden"
        >
          <MobilePortfolio current={current} setCurrent={setCurrent} projects={projects} />
        </motion.div>

        {/* Desktop layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden sm:flex items-center gap-4 px-6 max-w-5xl mx-auto"
        >
          <button
            onClick={prev}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: "1px solid rgba(30,58,110,0.2)", color: "#1e3a6e", background: "white" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(30,58,110,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = "white"}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(30,58,110,0.1)", background: "#fff", boxShadow: "0 4px 24px rgba(30,58,110,0.07)" }}
              >
                <div className="relative h-80">
                  <ProjectVisual project={project} />
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${style}`} style={accentTagStyle[project.accent]}>
                      {project.tag}
                    </span>
                  </div>
                  {!project.isRework && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
                        Neu erstellt
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#94a3b8" }}>{project.category}</span>
                    <h3 className="mt-1 text-xl font-semibold" style={{ color: "#0f1f3d" }}>{project.title}</h3>
                    <p className="mt-1 text-sm" style={{ color: "#64748b" }}>{project.description}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {projects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="rounded-full transition-all duration-300"
                        style={{ width: i === current ? 16 : 8, height: 8, background: i === current ? "#1e3a6e" : "rgba(30,58,110,0.2)" }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: "1px solid rgba(30,58,110,0.2)", color: "#1e3a6e", background: "white" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(30,58,110,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = "white"}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}