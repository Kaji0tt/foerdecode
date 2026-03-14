import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Globe, Mail, CalendarCheck, ShoppingCart, MapPin } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tagline: "Dein digitaler Einstieg",
    price: "ab 299",
    accent: "sky",
    features: [
      "Professionelle Website mit modernem Design",
      "Mobilfreundlich & schnell",
      "Inhalte leicht selbst anpassbar",
      "Hosting inklusive",
      "Einrichtung in wenigen Tagen",
    ],
    cta: "Starter wählen",
  },
  {
    name: "Business",
    tagline: "Für den professionellen Auftritt",
    price: "ab 499",
    accent: "cyan",
    popular: true,
    features: [
      "Alles aus Starter, plus:",
      "Eigene Wunschadresse (z.B. dein-laden.de)",
      "Professionelle E-Mail-Adresse",
      "SEO-Grundoptimierung",
      "Google Maps Integration",
    ],
    cta: "Business wählen",
  },
  {
    name: "Premium",
    tagline: "Das Komplettpaket",
    price: "ab 799",
    accent: "violet",
    features: [
      "Alles aus Business, plus:",
      "Online-Buchungssystem",
      "Online-Bestellungen / Shop",
      "Interaktive Karte & Kontaktformulare",
      "Individuelle Sonderwünsche",
    ],
    cta: "Premium wählen",
  },
];

const accentStyles = {
  sky: {
    badge: "border-sky-400/20 bg-sky-400/5 text-sky-300",
    price: "text-sky-400",
    button: "bg-sky-500 hover:bg-sky-400 shadow-sky-500/20 hover:shadow-sky-400/30",
    check: "text-sky-400",
    glow: "bg-sky-500/10",
  },
  cyan: {
    badge: "border-cyan-400/20 bg-cyan-400/5 text-cyan-300",
    price: "text-cyan-400",
    button: "bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/20 hover:shadow-cyan-400/30",
    check: "text-cyan-400",
    glow: "bg-cyan-500/10",
  },
  violet: {
    badge: "border-violet-400/20 bg-violet-400/5 text-violet-300",
    price: "text-violet-400",
    button: "bg-violet-500 hover:bg-violet-400 shadow-violet-500/20 hover:shadow-violet-400/30",
    check: "text-violet-400",
    glow: "bg-violet-500/10",
  },
};

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div ref={ref} className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400/80 text-sm font-semibold uppercase tracking-widest">
            Pakete & Preise
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Für jedes Budget
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              das richtige Paket.
            </span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-xl mx-auto">
            Transparent, fair und ohne versteckte Kosten. Wähle das Paket, das zu dir passt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const style = accentStyles[plan.accent];
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                  plan.popular
                    ? "border-cyan-500/30 bg-white/[0.04]"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-cyan-500 text-white shadow-lg shadow-cyan-500/30">
                      Beliebteste Wahl
                    </span>
                  </div>
                )}

                {/* Glow */}
                <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 ${style.glow} rounded-full blur-3xl opacity-50`} />

                <div className="relative">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${style.badge}`}>
                    {plan.tagline}
                  </span>

                  <h3 className="mt-4 text-2xl font-bold text-white">{plan.name}</h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${style.price}`}>{plan.price}</span>
                    <span className="text-slate-500 text-sm">€</span>
                  </div>

                  <ul className="mt-8 space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.check}`} />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToContact}
                    className={`mt-8 w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg ${style.button}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}