import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { base44 } from "@/api/base44Client";

const plans = [
  {
    name: "Basis",
    price: "129",
    priceNote: "zzgl. Domain-Kosten",
    tagline: "Ihre Seite steht — jetzt muss sie nur noch passen.",
    color: "#1e3a6e",
    rounds: "Bis zu 3 Feedback-Runden",
    roundsNote: "Ideal für überschaubare Änderungen",
    features: [
      "Fertige Website auf Basis Ihrer Demo",
      "Anpassungen: Texte, Bilder, Farben, Öffnungszeiten",
      "Mobilfreundlich & schnell",
      "Bei Bedarf, eigene Web-Adresse (Domain) je nach Verfügbarkeit",
    ],
    maintenance: [
      { label: "Preislisten-Sync", desc: "Preise & Inhalte werden automatisch aus Google Tabellen übernommen" },
      { label: "Eigener Bearbeitungszugang", desc: "Sie können Texte selbst ändern — bei Design-Fragen helfe ich" },
      { label: "Rundum-Betreuung", desc: "Ich kümmere mich um alle Änderungswünsche zum nächsten verfügbaren Termin" },
    ],
  },
  {
    name: "Standard",
    price: "259",
    priceNote: "zzgl. Domain-Kosten",
    tagline: "Für alle, die mehr als eine Visitenkarte im Netz wollen.",
    color: "#b91c1c",
    popular: true,
    rounds: "Bis zu 8 Feedback-Runden",
    roundsNote: "Für individuelle Gestaltungswünsche",
    features: [
      "Alles aus Basis",
      "Individuelle Anpassungen, bspw. Navigation oder Layout",
      "Bei Bedarf, eigene Web-Adresse (Domain) je nach Verfügbarkeit",
      "Eigene E-Mail-Adresse (z. B. info@ihr-laden.de)",
    ],
    maintenance: [
      { label: "Preislisten-Sync", desc: "Preise & Inhalte werden automatisch aus Google Tabellen übernommen, die Sie leicht bearbeiten können." },
      { label: "Eigener Bearbeitungszugang", desc: "Sie können Texte selbst ändern — bei Design-Fragen helfe ich" },
      { label: "Rundum-Betreuung", desc: "Ich kümmere mich um alle Änderungswünsche zum nächsten verfügbaren Termin" },
    ],
  },
  {
    name: "Expert",
    price: "499",
    priceNote: "zzgl. Domain-Kosten · Preis nach Absprache",
    tagline: "Wenn Ihre Website wirklich arbeiten soll — nicht nur aussehen.",
    color: "#0f1f3d",
    rounds: "Bis zu 12 Feedback-Runden",
    roundsNote: "Für komplexe Funktionen & enge Zusammenarbeit",
    features: [
      "Alles aus Standard",
      "Bei Bedarf, eigene Web-Adresse (Domain) je nach Verfügbarkeit",
      "Eigene E-Mail-Adresse inklusive",
      "Individuelle Sonderfunktionen nach Absprache",
    ],
    maintenance: [
      { label: "Preislisten-Sync", desc: "Preise & Inhalte werden automatisch aus Google Tabellen übernommen" },
      { label: "Eigener Bearbeitungszugang", desc: "Sie können Texte selbst ändern — bei Design-Fragen helfe ich" },
      { label: "Rundum-Betreuung", desc: "Ich kümmere mich um alle Änderungswünsche zum nächsten verfügbaren Termin" },
    ],
  },
];

const maintenanceMonthly = "18€ / Monat";

export default function ShopDrawer({ open, onClose, preselectedPackage, formData }) {
  const [selected, setSelected] = useState(preselectedPackage || null);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [step, setStep] = useState("select");
  const [orderData, setOrderData] = useState({ name: formData?.name || "", email: formData?.email || "" });
  const [loading, setLoading] = useState(false);
  const [expandedMaint, setExpandedMaint] = useState(null);

  const handleOrder = async () => {
    setLoading(true);
    await base44.entities.ContactRequest.create({
      name: orderData.name,
      email: orderData.email,
      business: formData?.business || "",
      important: formData?.important || "",
      colors: formData?.colors || "",
      selected_package: selected,
      status: "neu",
    });
    setLoading(false);
    setStep("done");
  };

  const selectedPlan = plans.find(p => p.name === selected);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(15,31,61,0.6)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
            style={{ width: "min(520px, 100vw)", background: "white", boxShadow: "-8px 0 48px rgba(15,31,61,0.2)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(30,58,110,0.1)" }}>
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" style={{ color: "#1e3a6e" }} />
                <span className="font-bold text-lg" style={{ color: "#0f1f3d" }}>Angebot wählen</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 px-6 py-6 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

              {/* STEP: SELECT */}
              {step === "select" && (
                <div className="space-y-4">
                  <p className="text-sm mb-4" style={{ color: "#64748b" }}>
                    Wie viel Anpassung brauchen Sie? Wählen Sie das passende Paket:
                  </p>

                  {plans.map((plan) => (
                    <button
                      key={plan.name}
                      onClick={() => setSelected(plan.name)}
                      className="w-full text-left rounded-2xl p-5 transition-all duration-200 relative"
                      style={{
                        border: selected === plan.name ? `2px solid ${plan.color}` : "1.5px solid rgba(30,58,110,0.12)",
                        background: selected === plan.name ? `${plan.color}08` : "white",
                        boxShadow: selected === plan.name ? `0 4px 20px ${plan.color}20` : "none",
                      }}
                    >
                      {plan.popular && (
                        <span className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: "#b91c1c" }}>
                          Beliebteste Wahl
                        </span>
                      )}
                      {/* Top row: name + price */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-base" style={{ color: "#0f1f3d" }}>{plan.name}</div>
                        <div className="text-right" style={{ minWidth: 0 }}>
                          <div className="flex items-baseline justify-end gap-0.5">
                            <span className="text-xl font-bold" style={{ color: plan.color }}>{plan.price}</span>
                            <span className="text-sm" style={{ color: "#94a3b8" }}>€</span>
                          </div>
                          <div className="text-xs mt-0.5 leading-tight" style={{ color: "#94a3b8", maxWidth: 140, wordBreak: "break-word" }}>{plan.priceNote}</div>
                          {selected === plan.name && (
                            <div className="mt-1 w-6 h-6 rounded-full flex items-center justify-center ml-auto" style={{ background: plan.color }}>
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Tagline */}
                      <div className="text-xs mt-1.5" style={{ color: "#94a3b8" }}>{plan.tagline}</div>
                      {/* Features */}
                      <ul className="mt-3 space-y-1.5">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#475569" }}>
                            <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      {/* Rounds badge — always at the bottom */}
                      <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(30,58,110,0.08)" }}>
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: `${plan.color}12`, color: plan.color }}>
                          {plan.rounds}
                        </span>
                      </div>
                    </button>
                  ))}

                </div>
              )}

              {/* STEP: MAINTENANCE */}
              {step === "maintenance" && (
                <div className="space-y-5">
                  <button onClick={() => setStep("select")} className="text-sm flex items-center gap-1" style={{ color: "#64748b" }}>
                    ← Paket ändern
                  </button>

                  <div className="rounded-xl p-4" style={{ background: `${selectedPlan?.color}08`, border: `1.5px solid ${selectedPlan?.color}20` }}>
                    <div className="font-bold text-sm" style={{ color: "#0f1f3d" }}>{selected} · ab {selectedPlan?.price}€</div>
                    <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>{selectedPlan?.tagline}</div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: "#0f1f3d" }}>Möchten Sie Wartung & Pflege dazu? <span className="font-normal" style={{ color: "#94a3b8" }}>({maintenanceMonthly})</span></p>
                    <p className="text-xs mb-4" style={{ color: "#94a3b8" }}>Optional — Sie können auch ohne weiter fortfahren.</p>

                    <div className="space-y-2">
                      {selectedPlan?.maintenance.map((m, i) => (
                        <div
                          key={i}
                          className="rounded-xl overflow-hidden"
                          style={{ border: selectedMaintenance === i ? `1.5px solid ${selectedPlan.color}` : "1.5px solid rgba(30,58,110,0.12)", background: selectedMaintenance === i ? `${selectedPlan.color}06` : "white" }}
                        >
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 text-left"
                            onClick={() => {
                              setExpandedMaint(expandedMaint === i ? null : i);
                              setSelectedMaintenance(i);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                style={{ borderColor: selectedMaintenance === i ? selectedPlan.color : "rgba(30,58,110,0.2)" }}>
                                {selectedMaintenance === i && <div className="w-2.5 h-2.5 rounded-full" style={{ background: selectedPlan.color }} />}
                              </div>
                              <span className="text-sm font-medium" style={{ color: "#0f1f3d" }}>{m.label}</span>
                            </div>
                            {expandedMaint === i
                              ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: "#94a3b8" }} />
                              : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "#94a3b8" }} />
                            }
                          </button>
                          <AnimatePresence>
                            {expandedMaint === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="px-4 pb-3"
                              >
                                <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{m.desc}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}

                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left"
                        onClick={() => { setSelectedMaintenance(null); setExpandedMaint(null); }}
                        style={{
                          border: selectedMaintenance === null ? "1.5px solid rgba(30,58,110,0.4)" : "1.5px solid rgba(30,58,110,0.12)",
                          background: selectedMaintenance === null ? "rgba(30,58,110,0.04)" : "white"
                        }}
                      >
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: selectedMaintenance === null ? "#1e3a6e" : "rgba(30,58,110,0.2)" }}>
                          {selectedMaintenance === null && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#1e3a6e" }} />}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "#0f1f3d" }}>Nein, danke — erstmal ohne</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* STEP: CONFIRM */}
              {step === "confirm" && (
                <div className="space-y-5">
                  <button onClick={() => setStep("maintenance")} className="text-sm flex items-center gap-1" style={{ color: "#64748b" }}>
                    ← Zurück
                  </button>

                  <div className="rounded-xl p-4 space-y-2" style={{ background: `${selectedPlan?.color}08`, border: `1.5px solid ${selectedPlan?.color}20` }}>
                    <div className="font-bold text-sm" style={{ color: "#0f1f3d" }}>{selected} · ab {selectedPlan?.price}€</div>
                    {selectedMaintenance !== null && (
                      <div className="text-xs" style={{ color: "#64748b" }}>
                        + Wartung: {selectedPlan?.maintenance[selectedMaintenance]?.label} ({maintenanceMonthly})
                      </div>
                    )}
                    <div className="text-xs" style={{ color: "#94a3b8" }}>{selectedPlan?.priceNote}</div>
                  </div>

                  <div>
                    <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Name *</label>
                    <input
                      value={orderData.name}
                      onChange={e => setOrderData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Ihr Name"
                      className="w-full h-12 px-4 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid rgba(30,58,110,0.2)", background: "white" }}
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>E-Mail *</label>
                    <input
                      type="email"
                      value={orderData.email}
                      onChange={e => setOrderData(p => ({ ...p, email: e.target.value }))}
                      placeholder="ihre@email.de"
                      className="w-full h-12 px-4 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid rgba(30,58,110,0.2)", background: "white" }}
                    />
                  </div>

                </div>
              )}

              {/* STEP: DONE */}
              {step === "done" && (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(30,58,110,0.08)" }}>
                    <Check className="w-8 h-8" style={{ color: "#1e3a6e" }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "#0f1f3d" }}>Anfrage gesendet!</h3>
                  <p className="mb-2" style={{ color: "#64748b" }}>
                    Ihre Anfrage für das <strong>{selected}</strong>-Paket ist eingegangen.
                  </p>
                  <p className="text-sm" style={{ color: "#94a3b8" }}>Ich melde mich innerhalb von 24 Stunden bei Ihnen.</p>
                  <button
                    onClick={onClose}
                    className="mt-8 px-6 py-3 rounded-xl text-white font-semibold"
                    style={{ background: "#1e3a6e" }}
                  >
                    Schließen
                  </button>
                </div>
              )}

            </div>

            {/* Fixed footer button */}
            {step === "select" && selected && (
              <div className="flex-shrink-0 px-6 py-4" style={{ borderTop: "1px solid rgba(30,58,110,0.1)" }}>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setStep("maintenance")}
                  className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300"
                  style={{ background: selectedPlan?.color, boxShadow: `0 8px 24px ${selectedPlan?.color}30` }}
                >
                  Weiter →
                </motion.button>
              </div>
            )}
            {step === "maintenance" && (
              <div className="flex-shrink-0 px-6 py-4" style={{ borderTop: "1px solid rgba(30,58,110,0.1)" }}>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setStep("confirm")}
                  className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300"
                  style={{ background: selectedPlan?.color }}
                >
                  Weiter →
                </motion.button>
              </div>
            )}
            {step === "confirm" && (
              <div className="flex-shrink-0 px-6 py-4" style={{ borderTop: "1px solid rgba(30,58,110,0.1)" }}>
                <button
                  onClick={handleOrder}
                  disabled={loading || !orderData.name || !orderData.email}
                  className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: selectedPlan?.color }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Jetzt anfragen
                    </>
                  )}
                </button>
                <p className="text-xs text-center mt-2" style={{ color: "#94a3b8" }}>
                  Keine Zahlung jetzt — ich melde mich innerhalb von 24h bei Ihnen.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}