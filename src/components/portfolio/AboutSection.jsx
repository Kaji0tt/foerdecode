import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MessageSquare, Wand2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wand2,
    title: "Demo erstellen",
    description:
      "Füllen Sie das untenstehende Formular aus, um einen kostenlosen Ersteindruck einer möglichen Website zu erhalten. Bei Interesse, wählen Sie ein passendes Paket aus und stellen eine Anfrage.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Kurzes Gespräch",
    description:
      "Wir tauschen uns aus. Nacheinander Pflege ich ihre Wünsche und Vorstellungen ein. Je nach dem, wie sicher sie im Umgang mit der Technik sind, finden wir entweder Lösungen, mit denen Sie im Nachhinein arbeiten können - oder ich übernehme alle Verantwortung und Pflege ihre Website!",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Ich setze Ihre Vision um",
    description:
      "Ich buche ihre Wunschadresse, erstelle Ihre Website, implementiere ihre Services - und bei Bedarf, pflege und verwalte ich sie.",
  },
];

const icons = { Wand2, MessageSquare, Rocket };

function StepsCarousel({ isInView }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActive((c) => Math.min(c + 1, steps.length - 1));
      else setActive((c) => Math.max(c - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Card track */}
      <div className="relative flex items-center justify-center" style={{ height: 280 }}>
        {steps.map((step, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          const scale = isActive ? 1 : 0.85;
          const opacity = isActive ? 1 : 0.3;
          const x = offset * 88;
          return (
            <motion.div
              key={step.number}
              animate={{ x: `${x}%`, scale, opacity, zIndex: isActive ? 10 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => !isActive && setActive(i)}
              className="absolute w-[78vw] max-w-xs rounded-2xl p-6 flex flex-col"
              style={{
                cursor: isActive ? "default" : "pointer",
                border: "1px solid rgba(30,58,110,0.12)",
                background: "rgba(255,255,255,0.95)",
                boxShadow: isActive ? "0 8px 32px rgba(30,58,110,0.10)" : "0 2px 8px rgba(30,58,110,0.04)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.15)" }}>
                  <step.icon className="w-5 h-5" style={{ color: "#b91c1c" }} />
                </div>
                <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(30,58,110,0.4)" }}>
                  SCHRITT {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#0f1f3d" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === active ? 20 : 8, height: 8, background: i === active ? "#b91c1c" : "rgba(185,28,28,0.2)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problem"
      className="h-screen w-full flex items-center relative snap-start overflow-hidden"
    >
      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col justify-center h-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight" style={{ color: "#0f1f3d" }}>
            Große Wirkung.{" "}
            <span style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Kleines Geld.
            </span>
          </h2>
        </motion.div>

        {/* Info box moved from Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8 p-4 rounded-xl"
          style={{ background: "rgba(30,58,110,0.04)", border: "1px solid rgba(30,58,110,0.1)" }}
        >
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#475569" }}>
            Sie hätten gerne einen Webauftritt, aber haben keine Ahnung von Technik?
            Teure Agenturen und eventuelle Wartung schrecken Sie ab?
          </p>
          <p className="mt-3 text-sm sm:text-base font-semibold" style={{ color: "#b91c1c" }}>
            Wir finden eine Lösung, die zu Ihnen passt.
          </p>
        </motion.div>

        {/*
          AUSKOMMENTIERT — alter Fließtext (kann bei Bedarf wieder eingeblendet werden)

          <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: "#475569" }}>
            Viele kleine Geschäfte haben noch keine oder eine alte Website. Zum einen steigt die Bedeutung eines Internetauftritts für Sichtbarkeit stetig - zum anderen wird Erstellung, Bearbeitung und Wartung dank künstlicher Intelligenz einfacher denn je!
            Mir bleibt damit mehr Zeit für das Wesentliche: Lösungen im Umgang mit der Technik finden, die für Sie funktionieren!
          </p>

          <p className="mt-4 text-lg font-medium leading-relaxed max-w-2xl" style={{ color: "#b91c1c" }}>
            Dank der KI, bleibt der Preis damit klein und die Wirkung wird groß.
          </p>
        */}

        {/* Steps carousel — mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="sm:hidden"
        >
          <StepsCarousel isInView={isInView} />
        </motion.div>

        {/* Steps — desktop: 3 cards side by side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden sm:grid grid-cols-3 gap-5"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
              className="rounded-2xl p-6 flex flex-col"
              style={{ border: "1px solid rgba(30,58,110,0.12)", background: "rgba(255,255,255,0.95)", boxShadow: "0 4px 16px rgba(30,58,110,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.15)" }}>
                  <step.icon className="w-5 h-5" style={{ color: "#b91c1c" }} />
                </div>
                <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(30,58,110,0.4)" }}>
                  SCHRITT {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#0f1f3d" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}