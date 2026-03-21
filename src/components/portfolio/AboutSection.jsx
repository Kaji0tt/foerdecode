import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MousePointerClick, MessageSquare, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Einfach ausprobieren",
    description:
      "Beschreiben Sie kurz, was Sie machen – in ein paar Sätzen, ganz ohne Technik-Kenntnisse. Die KI zeigt Ihnen in Sekunden, wie Ihre Website aussehen könnte. Kostenlos, unverbindlich.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Ich melde mich bei Ihnen",
    description:
      "Gefällt Ihnen die Vorschau? Dann nehmen wir kurz Kontakt auf. Kein Formular-Stress, kein Technik-Kram. Wir besprechen, was Sie sich vorstellen – ich kümmere mich um den Rest.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Feedback-Runden",
    description:
      "Sie geben mir Feedback über z.B. WhatsApp: 'Das gefällt mir, das nicht. Ich wünsche mir...' Ich setze alles um und bringe Ihre Seite online. Sie müssen sich um nichts weiter kümmern.",
  },
];

function StepsCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
      if (dx > dy) e.preventDefault();
    };
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActive((c) => Math.min(c + 1, steps.length - 1));
      else setActive((c) => Math.max(c - 1, 0));
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div ref={containerRef} className="w-full" onTouchEnd={onTouchEnd}>
      <div className="relative flex items-center justify-center" style={{ height: 260 }}>
        {steps.map((step, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          return (
            <motion.div
              key={step.number}
              animate={{ x: `${offset * 88}%`, scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.3, zIndex: isActive ? 10 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => !isActive && setActive(i)}
              className="absolute w-[78vw] max-w-xs rounded-2xl p-6 flex flex-col"
              style={{
                cursor: isActive ? "default" : "pointer",
                border: "1px solid rgba(30,58,110,0.12)",
                background: "rgba(255,255,255,0.97)",
                boxShadow: isActive ? "0 8px 32px rgba(30,58,110,0.10)" : "0 2px 8px rgba(30,58,110,0.04)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.15)" }}>
                  <step.icon className="w-5 h-5" style={{ color: "#b91c1c" }} />
                </div>
                <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(30,58,110,0.4)" }}>
                  SCHRITT {step.number}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#0f1f3d" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.description}</p>
            </motion.div>
          );
        })}
      </div>
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
      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-8 pb-12 flex flex-col justify-center h-full">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight" style={{ color: "#0f1f3d" }}>
            Offline geschnackt,{" "}
            <span style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Online gemacht.
            </span>
          </h2>
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-7 p-5 rounded-xl"
          style={{ background: "rgba(30,58,110,0.04)", border: "1px solid rgba(30,58,110,0.1)" }}
        >
          <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: "#475569" }}>
            Viele Menschen wissen: Eine Website wäre gut. Aber Technik ist nicht ihr Ding. Dafür gehen Sichtbarkeit und Kunden verloren.<br /> Ich will das ändern.
          </p>
          <p className="mt-3 text-sm sm:text-base font-semibold" style={{ color: "#b91c1c" }}>
            Über WhatsApp oder Telefon – gemeinsam zur Website.
          </p>
        </motion.div>

        {/*
          AUSKOMMENTIERT — alter Fließtext

          <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: "#475569" }}>
            Viele kleine Geschäfte haben noch keine oder eine alte Website. Zum einen steigt die Bedeutung eines Internetauftritts für Sichtbarkeit stetig - zum anderen wird Erstellung, Bearbeitung und Wartung dank künstlicher Intelligenz einfacher denn je!
            Mir bleibt damit mehr Zeit für das Wesentliche: Lösungen im Umgang mit der Technik finden, die für Sie funktionieren!
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed max-w-2xl" style={{ color: "#b91c1c" }}>
            Dank der KI, bleibt der Preis damit klein und die Wirkung wird groß.
          </p>
        */}

        {/* Mobile carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="sm:hidden"
        >
          <StepsCarousel />
        </motion.div>

        {/* Desktop 3-column */}
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
              style={{ border: "1px solid rgba(30,58,110,0.12)", background: "rgba(255,255,255,0.97)", boxShadow: "0 4px 16px rgba(30,58,110,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.15)" }}>
                  <step.icon className="w-5 h-5" style={{ color: "#b91c1c" }} />
                </div>
                <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(30,58,110,0.4)" }}>
                  SCHRITT {step.number}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#0f1f3d" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}