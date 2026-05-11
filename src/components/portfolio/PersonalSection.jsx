import React from "react";
import { motion } from "framer-motion";

export default function PersonalSection() {
  return (
    <section id="personal" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border p-4"
            style={{
              borderColor: "rgba(163,183,212,0.28)",
              background: "rgba(249,252,255,0.9)",
            }}
          >
            <div
              className="h-[280px] w-full rounded-xl border"
              style={{
                borderColor: "rgba(163,183,212,0.24)",
                background: "linear-gradient(160deg, rgba(240,246,253,0.96), rgba(228,237,249,0.9))",
              }}
            >
              <div className="flex h-full items-end justify-between p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
                    Platzhalter fuer Portrait
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "#4a6188" }}>
                    Alternativ: Arbeitsplatzfoto mit regionalem Bezug.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-2xl border p-6 sm:p-7"
            style={{
              borderColor: "rgba(163,183,212,0.28)",
              background: "rgba(249,252,255,0.9)",
            }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
              Persoenlich
            </p>
            <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
              Moin, ich bin Jascha.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
              Ich unterstuetze Unternehmen und Selbststaendige dabei, moderne Webseiten und digitale Loesungen
              umzusetzen, unkompliziert, direkt und ohne unnoetige Komplexitaet.
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
              Mein Fokus liegt auf klarer Kommunikation, sauberer technischer Umsetzung und Loesungen,
              die im Alltag wirklich funktionieren.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
