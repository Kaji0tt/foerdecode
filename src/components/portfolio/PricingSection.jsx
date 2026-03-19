import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Plus } from "lucide-react";

const expertExamples = [
  "Online-Buchungssystem",
  "Online-Bestellung & Shop",
  "Chat & direkter Kundenkontakt",
];

const plans = [
  {
    name: "Basis",
    tagline: "Dein digitaler Einstieg",
    price: "99",
    tier: "base",
    features: [
      "Professionelle Website mit modernem Design",
      "Mobilfreundlich & schnell",
      "Inhalte leicht selbst anpassbar",
      "Hosting inklusive",
      "Einrichtung in wenigen Tagen",
    ],
    addon: "Zzgl. optionaler Wartung & Aktualisierung auf Nachfrage für 18 €/Monat",
    cta: "Basis wählen",
  },
  {
    name: "Standard",
    tagline: "Für den professionellen Auftritt",
    price: "249",
    tier: "standard",
    popular: true,
    features: [
      "Alles aus Basis, plus:",
      "Eigene Wunschadresse (z.B. dein-laden.de)",
      "Eigene E-Mail-Adresse",
      "Suchmaschinen Optimierung",
    ],
    addon: "Zzgl. optionaler monatlicher Wartung für 15 €/Monat",
    cta: "Standard wählen",
  },
  {
    name: "Expert",
    tagline: "Das Komplettpaket",
    price: "499",
    tier: "expert",
    features: [
      "Alles aus Standard, plus:",
      "Individuelle Sonderwünsche nach Absprache, zum Beispiel:",
    ],
    addon: "Zzgl. optionaler monatlicher Wartung für 15 €/Monat",
    cta: "Expert wählen",
    expertRotating: true,
  },
];

// base=navy blue, standard=red (SH Löwe), expert=deep blue
const tierStyles = {
  base: {
    badge: { border: "1px solid rgba(30,58,110,0.2)", background: "rgba(30,58,110,0.06)", color: "#1e3a6e" },
    price: { color: "#1e3a6e" },
    button: { background: "#1e3a6e", boxShadow: "0 8px 24px rgba(30,58,110,0.2)" },
    buttonHover: { background: "#162d5a" },
    check: { color: "#1e3a6e" },
    glow: "rgba(30,58,110,0.05)",
    plus: { color: "#1e3a6e" },
  },
  standard: {
    badge: { border: "1px solid rgba(185,28,28,0.2)", background: "rgba(185,28,28,0.06)", color: "#b91c1c" },
    price: { color: "#b91c1c" },
    button: { background: "#b91c1c", boxShadow: "0 8px 24px rgba(185,28,28,0.2)" },
    buttonHover: { background: "#991b1b" },
    check: { color: "#b91c1c" },
    glow: "rgba(185,28,28,0.05)",
    plus: { color: "#b91c1c" },
  },
  expert: {
    badge: { border: "1px solid rgba(30,58,110,0.2)", background: "rgba(30,58,110,0.06)", color: "#1e3a6e" },
    price: { color: "#1e3a6e" },
    button: { background: "#0f1f3d", boxShadow: "0 8px 24px rgba(15,31,61,0.25)" },
    buttonHover: { background: "#1e3a6e" },
    check: { color: "#1e3a6e" },
    glow: "rgba(30,58,110,0.05)",
    plus: { color: "#1e3a6e" },
  },
};

function RotatingExample({ tier }) {
  const [index, setIndex] = useState(0);
  const style = tierStyles[tier];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % expertExamples.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-7 flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm font-medium"
          style={style.check}
        >
          {expertExamples[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
    >


      <div ref={ref} className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight" style={{ color: "#0f1f3d" }}>
            Für jedes Budget{" "}
            <span style={{ color: "#1e3a6e" }}>
              das richtige Paket.
            </span>
          </h2>
          <p className="mt-4 text-lg max-w-xl" style={{ color: "#64748b" }}>
            Transparent, fair und ohne versteckte Kosten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => {
            const style = tierStyles[plan.tier];
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className="relative rounded-2xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1"
                style={{
                  border: plan.popular ? "1px solid rgba(185,28,28,0.2)" : "1px solid rgba(30,58,110,0.1)",
                  background: plan.popular ? "rgba(185,28,28,0.02)" : "#fff",
                  boxShadow: plan.popular ? "0 4px 24px rgba(185,28,28,0.06)" : "0 2px 12px rgba(30,58,110,0.05)",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "#b91c1c", boxShadow: "0 4px 16px rgba(185,28,28,0.3)" }}>
                      Beliebteste Wahl
                    </span>
                  </div>
                )}

                {/* Glow */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 rounded-full blur-3xl opacity-50" style={{ background: style.glow }} />

                <div className="relative flex flex-col flex-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={style.badge}>
                    {plan.tagline}
                  </span>

                  <h3 className="mt-4 text-2xl font-bold" style={{ color: "#0f1f3d" }}>{plan.name}</h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-sm mr-0.5" style={{ color: "#94a3b8" }}>{plan.name === "Expert" ? "ab" : ""}</span>
                    <span className="text-4xl font-bold" style={style.price}>{plan.price}</span>
                    <span className="text-sm" style={{ color: "#94a3b8" }}>€</span>
                  </div>

                  <ul className="mt-8 space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={style.check} />
                        <span className="text-sm" style={{ color: "#475569" }}>{feature}</span>
                      </li>
                    ))}
                    {plan.expertRotating && (
                      <li className="flex items-start gap-3 pl-7">
                        <RotatingExample tier={plan.tier} />
                      </li>
                    )}
                  </ul>

                  <div className="mt-8">
                    {plan.addon && (
                      <div className="flex items-start gap-2 mb-4">
                        <Plus className="w-4 h-4 mt-0.5 flex-shrink-0" style={style.plus} />
                        <span className="text-sm" style={{ color: "#94a3b8" }}>{plan.addon}</span>
                      </div>
                    )}
                    <button
                      onClick={scrollToContact}
                      onMouseEnter={e => Object.assign(e.currentTarget.style, style.buttonHover)}
                      onMouseLeave={e => Object.assign(e.currentTarget.style, style.button)}
                      className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300"
                      style={style.button}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}