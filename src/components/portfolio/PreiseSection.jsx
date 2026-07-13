import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { plans } from "@/data/plans";

function RotatingExample({ examples, color }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % examples.length);
    }, 2200);
    return () => clearInterval(id);
  }, [examples.length]);

  return (
    <div
      className="relative overflow-hidden flex-1"
      style={{ height: "1.5rem", marginTop: "0.25rem" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          style={{ color: "#4a6188", position: "absolute", inset: 0 }}
          className="text-sm italic"
        >
          {examples[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function PreiseSection({ onPlanSelect }) {
  const scrollToContact = (message) => {
    if (onPlanSelect) onPlanSelect(message);
  };

  const popularIndex = plans.findIndex((p) => p.popular);

  const [emblaRef] = useEmblaCarousel({
    align: "center",
    startIndex: popularIndex >= 0 ? popularIndex : 1,
    loop: false,
    containScroll: "trimSnaps",
  });

  const planCard = (plan) => (
    <article
      className="relative flex h-full flex-col rounded-2xl border p-4 md:p-6"
      style={{
        borderColor: plan.popular ? plan.color : "rgba(163,183,212,0.28)",
        background: plan.popular ? "rgba(249,252,255,0.98)" : "rgba(249,252,255,0.9)",
        boxShadow: plan.popular ? `0 4px 24px rgba(31,45,72,0.10)` : "none",
      }}
    >
      {plan.popular && (
        <div
          className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ background: plan.color }}
        >
          Most Popular!
        </div>
      )}

      <div className="mb-3 md:mb-5">
        <h3 className="mb-1 font-sora text-lg font-semibold" style={{ color: "#213a66" }}>
          {plan.name}
        </h3>
        <p className="text-sm font-medium leading-relaxed" style={{ color: "#4a6188" }}>
          {plan.tagline}
        </p>
        {plan.tooltip && (
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6b85ad" }}>
            {plan.tooltip}
          </p>
        )}
      </div>

      <div className="mb-3 md:mb-4 flex items-end gap-1">
        <span className="font-sora text-3xl font-bold md:text-4xl" style={{ color: plan.color }}>
          {plan.price}€
        </span>
        <span className="mb-1 text-sm" style={{ color: "#6b85ad" }}>
          +35 / month for full service
        </span>
      </div>

      {/* Option B: Preis-Note + Rounds in einer Zeile */}
      <div
        className="mb-3 md:mb-5 rounded-lg px-3 py-2 text-xs font-medium"
        style={{ background: "rgba(112,142,186,0.10)", color: "#2f4c79" }}
      >
        <span>{plan.rounds}</span>
        <span className="mx-1 opacity-40">·</span>
        <span className="opacity-70">{plan.priceNote}</span>
      </div>

      <ul className="mb-4 md:mb-6 flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
            <Check className="mt-[3px] h-4 w-4 flex-shrink-0" style={{ color: plan.color }} />
            {f}
          </li>
        ))}
        {plan.expertRotating && plan.expertExamples && (
          <li className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
            <span className="h-4 w-4 flex-shrink-0 mt-[3px]" />
            <RotatingExample examples={plan.expertExamples} color={plan.color} />
          </li>
        )}
      </ul>

      <button
        type="button"
        onClick={() => scrollToContact(plan.contactMessage)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: plan.color }}
      >
        {plan.cta}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </article>
  );

  return (
    <section id="pricing" className="relative py-16 sm:py-20" style={{ background: "rgba(242,245,251, 0.76)" }}>
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 max-w-none"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Pricing
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Simple, Transparent Pricing.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Placeholder pricing intro. Choose the plan that fits your needs. All plans include ongoing support.
          </p>
        </motion.div>

        {/* Mobile: Swipe-Karussell */}
        <div className="md:hidden">
          <div className="overflow-hidden -mx-6 pb-6" ref={emblaRef}>
            <div className="flex gap-3 px-[10%]">
              {plans.map((plan) => (
                <div key={plan.name} className="flex-[0_0_80%] min-w-0 pt-4">
                  {planCard(plan)}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs" style={{ color: "#8aa0c0" }}>
            Swipe to switch
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="pt-4"
            >
              {planCard(plan)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
