import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { plans } from "@/data/plans";

export default function PreiseSection() {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Preise
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Klare Pakete. Keine versteckten Kosten.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Wählen Sie das Paket, das zu Ihrem Vorhaben passt – oder sprechen Sie mich an, wenn Sie sich unsicher sind.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="relative flex flex-col rounded-2xl border p-6"
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
                  Beliebteste Wahl
                </div>
              )}

              <div className="mb-5">
                <h3 className="mb-1 font-sora text-lg font-semibold" style={{ color: "#213a66" }}>
                  {plan.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-5 flex items-end gap-1">
                <span className="font-sora text-4xl font-bold" style={{ color: plan.color }}>
                  {plan.price}€
                </span>
                <span className="mb-1 text-sm" style={{ color: "#6b85ad" }}>
                  einmalig
                </span>
              </div>
              <p className="mb-5 text-xs" style={{ color: "#8aa0c0" }}>
                {plan.priceNote}
              </p>

              <div
                className="mb-5 rounded-lg px-3 py-2 text-xs font-medium"
                style={{ background: "rgba(112,142,186,0.10)", color: "#2f4c79" }}
              >
                {plan.rounds} · {plan.roundsNote}
              </div>

              <ul className="mb-6 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                    <Check className="mt-[3px] h-4 w-4 flex-shrink-0" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: plan.color }}
              >
                {plan.cta}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
