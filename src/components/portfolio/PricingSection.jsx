import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { plans } from "@/data/plans";



const expertExamples = [
  "Online-Bestellsystem",
  "Kurs-Buchungen",
  "Liefer-Tracking",
  "Mitglieder-Bereich",
];

const tierStyles = {
  base: {
    badge: { border: "1px solid rgba(30,58,110,0.2)", background: "rgba(30,58,110,0.06)", color: "#1e3a6e" },
    price: { color: "#1e3a6e" },
    button: { background: "#1e3a6e", boxShadow: "0 8px 24px rgba(30,58,110,0.2)" },
    buttonHover: { background: "#162d5a" },
    check: { color: "#1e3a6e" },
    plus: { color: "#1e3a6e" },
    rounds: { background: "rgba(30,58,110,0.08)", color: "#1e3a6e" },
  },
  standard: {
    badge: { border: "1px solid rgba(185,28,28,0.2)", background: "rgba(185,28,28,0.06)", color: "#b91c1c" },
    price: { color: "#b91c1c" },
    button: { background: "#b91c1c", boxShadow: "0 8px 24px rgba(185,28,28,0.2)" },
    buttonHover: { background: "#991b1b" },
    check: { color: "#b91c1c" },
    plus: { color: "#b91c1c" },
    rounds: { background: "rgba(185,28,28,0.08)", color: "#b91c1c" },
  },
  expert: {
    badge: { border: "1px solid rgba(30,58,110,0.2)", background: "rgba(30,58,110,0.06)", color: "#1e3a6e" },
    price: { color: "#0f1f3d" },
    button: { background: "#0f1f3d", boxShadow: "0 8px 24px rgba(15,31,61,0.25)" },
    buttonHover: { background: "#1e3a6e" },
    check: { color: "#1e3a6e" },
    plus: { color: "#1e3a6e" },
    rounds: { background: "rgba(30,58,110,0.08)", color: "#1e3a6e" },
  },
};

function RotatingExample({ tier }) {
  const [index, setIndex] = useState(0);
  const style = tierStyles[tier];
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % expertExamples.length), 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-6 flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs font-medium"
          style={style.check}
        >
          {expertExamples[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function PlanCard({ plan, onOrderClick, active }) {
  const style = tierStyles[plan.tier];
  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col h-full transition-all duration-300"
      style={{
        border: plan.popular ? "1px solid rgba(185,28,28,0.2)" : "1px solid rgba(30,58,110,0.1)",
        background: "rgba(255,255,255,0.97)",
        boxShadow: active
          ? (plan.popular ? "0 8px 32px rgba(185,28,28,0.12)" : "0 8px 32px rgba(30,58,110,0.10)")
          : "0 2px 8px rgba(30,58,110,0.04)",
      }}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#b91c1c", boxShadow: "0 4px 16px rgba(185,28,28,0.3)" }}>
            Beliebteste Wahl
          </span>
        </div>
      )}
      <div className="relative flex flex-col flex-1">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={style.badge}>
          {plan.tagline}
        </span>
        <div className="mt-3">
          <h3 className="text-xl font-bold" style={{ color: "#0f1f3d" }}>{plan.name}</h3>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-xs mr-0.5" style={{ color: "#94a3b8" }}>{plan.name === "Expert" ? "ab" : ""}</span>
          <span className="text-3xl font-bold" style={style.price}>{plan.price}</span>
          <span className="text-sm" style={{ color: "#94a3b8" }}>€</span>
        </div>
        {/* Tooltip als Beschreibung */}
        <p className="mt-3 text-xs leading-relaxed" style={{ color: "#64748b" }}>{plan.tooltip}</p>
        {/* Rounds badge */}
        <div className="mt-3 inline-flex">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={style.rounds}>
            {plan.rounds}
          </span>
        </div>
        <ul className="mt-4 space-y-2 flex-1">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={style.check} />
              <span className="text-xs" style={{ color: "#475569" }}>{feature}</span>
            </li>
          ))}
          {plan.expertRotating && (
            <li className="flex items-start gap-2 pl-5">
              <RotatingExample tier={plan.tier} />
            </li>
          )}
        </ul>
        <div className="mt-4">
          {plan.addon && (
            <div className="flex items-start gap-2 mb-3">
              <Plus className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={style.plus} />
              <span className="text-xs" style={{ color: "#94a3b8" }}>{plan.addon}</span>
            </div>
          )}
          <button
            onClick={() => onOrderClick ? onOrderClick(plan.name) : document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            onMouseEnter={e => Object.assign(e.currentTarget.style, style.buttonHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, style.button)}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300"
            style={style.button}
          >
            {plan.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

function MobilePricingCarousel({ onOrderClick }) {
  const [active, setActive] = useState(1);
  const touchStartX = useRef(null);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActive((c) => Math.min(c + 1, plans.length - 1));
      else setActive((c) => Math.max(c - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="relative flex items-center justify-center" style={{ height: "calc(100vh - 200px)", minHeight: 460 }}>
        {plans.map((plan, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          return (
            <motion.div
              key={plan.name}
              animate={{ x: `${offset * 88}%`, scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.35, zIndex: isActive ? 10 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => !isActive && setActive(i)}
              className="absolute w-[78vw] max-w-xs"
              style={{ cursor: isActive ? "default" : "pointer" }}
            >
              <PlanCard plan={plan} onOrderClick={onOrderClick} active={isActive} />
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {plans.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === active ? 20 : 8, height: 8, background: i === active ? "#1e3a6e" : "rgba(30,58,110,0.2)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PricingSection({ onOrderClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="min-h-screen w-full flex items-center relative overflow-hidden snap-start">
      <div ref={ref} className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight" style={{ color: "#0f1f3d" }}>
            Alles bezahlbar –{" "}
            <span style={{ background: "linear-gradient(135deg, #b91c1c, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              dank der KI.
            </span>
          </h2>
        </motion.div>

        {/* Mobile carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="sm:hidden"
        >
          <MobilePricingCarousel onOrderClick={onOrderClick} />
        </motion.div>

        {/* Desktop grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden sm:grid grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} onOrderClick={onOrderClick} active={true} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}