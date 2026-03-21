import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingCart, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { plans, maintenanceOptions, maintenanceMonthly } from "@/data/plans";

// Tooltip that renders via portal, centered on screen, arrow pointing at icon
function PlanTooltip({ text, iconRef, onClose }) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    setPos({ iconCenterX: rect.left + rect.width / 2, iconBottom: rect.bottom });
  }, [iconRef]);

  useEffect(() => {
    const handler = () => onClose();
    const timer = setTimeout(() => {
      document.addEventListener("click", handler);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handler);
    };
  }, [onClose]);

  if (!pos) return null;

  const padding = 16;
  const tooltipWidth = Math.min(300, window.innerWidth - padding * 2);
  // Center tooltip on screen, clamp to viewport
  const screenCenterX = window.innerWidth / 2;
  const left = Math.max(padding, Math.min(screenCenterX - tooltipWidth / 2, window.innerWidth - tooltipWidth - padding));
  // Arrow position relative to tooltip left
  const arrowLeft = Math.max(12, Math.min(pos.iconCenterX - left - 8, tooltipWidth - 28));

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      onClick={e => e.stopPropagation()}
      style={{
        position: "fixed",
        top: pos.iconBottom + 8,
        left,
        width: tooltipWidth,
        background: "#0f1f3d",
        color: "#e2e8f0",
        borderRadius: 12,
        padding: 16,
        fontSize: 12,
        lineHeight: 1.6,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        zIndex: 9999,
      }}
    >
      {text}
      {/* Arrow pointing up toward the icon */}
      <div style={{
        position: "absolute",
        top: 0,
        left: arrowLeft,
        transform: "translateY(-100%)",
        width: 0,
        height: 0,
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "8px solid #0f1f3d",
      }} />
    </motion.div>,
    document.body
  );
}

export default function ShopDrawer({ open, onClose, preselectedPackage, formData }) {
  const [selected, setSelected] = useState(preselectedPackage || null);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [step, setStep] = useState("select");
  const [orderData, setOrderData] = useState({ name: formData?.name || "", email: formData?.email || "" });
  const [contactMethod, setContactMethod] = useState("email");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedMaint, setExpandedMaint] = useState(null);
  const [openTooltip, setOpenTooltip] = useState(null);
  const [message, setMessage] = useState("");
  const iconRefs = useRef({});

  const contactMethodLabel = { email: "E-Mail", whatsapp: "WhatsApp", phone: "Telefon" };

  // Vorformulierte Nachricht neu aufbauen wenn sich relevante Felder ändern
  useEffect(() => {
    const maintLabel = selectedMaintenance !== null ? maintenanceOptions[selectedMaintenance]?.label : "keine Wartung";
    const demoLine = formData?.demo_html
      ? `\nIch habe bei der Demo folgendes Template erhalten:\n${window.location.origin + "?demo=preview"}\n`
      : "";
    const contactLabel = contactMethodLabel[contactMethod] || contactMethod;
    const name = orderData.name || "[Ihr Name]";

    let reachLine = "";
    if (contactMethod === "email") {
      reachLine = `über ${contactLabel} unter ${orderData.email || "[Ihre E-Mail]"}`;
    } else if (contactMethod === "whatsapp" || contactMethod === "phone") {
      reachLine = `über ${contactLabel} unter ${phoneNumber || "[Ihre Nummer]"}`;
    }

    setMessage(
`Hallo!

Ich interessiere mich für Ihr ${selected || "[Paket]"} Angebot, zusammen mit ${maintLabel}.${demoLine}

Ich würde mich freuen, wenn Sie sich ${reachLine} bei mir melden könnten!

Grüße,
${name}`
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, selectedMaintenance, contactMethod, orderData.name, orderData.email, phoneNumber, formData?.demo_html]);

  const handleOrder = async () => {
    setLoading(true);
    await base44.entities.ContactRequest.create({
      name: orderData.name,
      email: orderData.email,
      business: formData?.business || "",
      important: formData?.important || "",
      colors: formData?.colors || "",
      selected_package: selected,
      contact_method: contactMethod,
      phone_number: phoneNumber || "",
      message: message,
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
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden"
            style={{ width: "min(520px, 100vw)", background: "white", boxShadow: "-8px 0 48px rgba(15,31,61,0.2)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(30,58,110,0.1)" }}>
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" style={{ color: "#1e3a6e" }} />
                <span className="font-bold text-lg" style={{ color: "#0f1f3d" }}>Angebot anfragen</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

              {/* STEP: SELECT */}
              {step === "select" && (
                <div className="space-y-4">
                  <p className="text-sm mb-4" style={{ color: "#64748b" }}>
                    Wie viel Anpassung brauchen Sie? Wählen Sie das passende Paket:
                  </p>

                  {plans.map((plan) => (
                    <div key={plan.name} className="relative">
                      {/* Portal Tooltip */}
                      <AnimatePresence>
                        {openTooltip === plan.name && (
                          <PlanTooltip
                            text={plan.tooltip}
                            iconRef={{ current: iconRefs.current[plan.name] }}
                            onClose={() => setOpenTooltip(null)}
                          />
                        )}
                      </AnimatePresence>
                      {/* Plan card as div, not button, to avoid nested buttons */}
                      <div
                        onClick={() => setSelected(plan.name)}
                        className="w-full text-left rounded-2xl p-5 transition-all duration-200 relative cursor-pointer"
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
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-base" style={{ color: "#0f1f3d" }}>{plan.name}</span>
                            <span
                              ref={el => iconRefs.current[plan.name] = el}
                              onClick={e => { e.stopPropagation(); setOpenTooltip(openTooltip === plan.name ? null : plan.name); }}
                              className="flex items-center justify-center rounded-full transition-colors cursor-pointer"
                              style={{ color: "#94a3b8" }}
                            >
                              <HelpCircle className="w-4 h-4" />
                            </span>
                          </div>
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
                        <div className="text-xs mt-1.5" style={{ color: "#94a3b8" }}>{plan.shopTagline}</div>
                        {/* Features */}
                        <ul className="mt-3 space-y-1.5">
                          {plan.shopFeatures.map((f, i) => (
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
                      </div>
                    </div>
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
                    <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>{selectedPlan?.shopTagline}</div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: "#0f1f3d" }}>Wartung & Pflege – was passt zu Ihnen?</p>
                    <p className="text-xs mb-4" style={{ color: "#94a3b8" }}>Wählen Sie eine Option:</p>

                    <div className="space-y-2">
                      {maintenanceOptions.map((m, i) => (
                        <div
                          key={i}
                          className="rounded-xl overflow-hidden"
                          style={{
                            border: selectedMaintenance === i ? (m.highlight ? "1.5px solid #16a34a" : `1.5px solid ${selectedPlan?.color}`) : "1.5px solid rgba(30,58,110,0.12)",
                            background: selectedMaintenance === i ? (m.highlight ? "rgba(22,163,74,0.06)" : `${selectedPlan?.color}06`) : "white"
                          }}
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
                                style={{ borderColor: selectedMaintenance === i ? (m.highlight ? "#16a34a" : selectedPlan?.color) : "rgba(30,58,110,0.2)" }}>
                                {selectedMaintenance === i && <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.highlight ? "#16a34a" : selectedPlan?.color }} />}
                              </div>
                              <div>
                                <span className="text-sm font-medium" style={{ color: "#0f1f3d" }}>{m.label}</span>
                                <span className="ml-2 text-xs font-medium" style={{ color: "#0f1f3d" }}>
                                  {m.price}
                                </span>
                              </div>
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
                    {selectedMaintenance !== null && maintenanceOptions[selectedMaintenance]?.priceValue > 0 && (
                      <div className="text-xs" style={{ color: "#64748b" }}>
                        + Wartung: {maintenanceOptions[selectedMaintenance]?.label} ({maintenanceOptions[selectedMaintenance]?.price})
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

                  <div>
                    <label className="text-sm mb-3 block font-medium" style={{ color: "#374151" }}>Wie soll ich dich erreichen? *</label>
                    <div className="space-y-2">
                      {[
                        { value: "email", label: "📧 E-Mail" },
                        { value: "whatsapp", label: "💬 WhatsApp" },
                        { value: "phone", label: "☎️ Telefon" }
                      ].map(option => (
                        <label key={option.value} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all" style={{ border: contactMethod === option.value ? `1.5px solid #b91c1c` : "1.5px solid rgba(30,58,110,0.2)", background: contactMethod === option.value ? "rgba(185,28,28,0.05)" : "white" }}>
                          <input
                            type="radio"
                            name="contactMethod"
                            value={option.value}
                            checked={contactMethod === option.value}
                            onChange={e => setContactMethod(e.target.value)}
                            className="w-4 h-4"
                            style={{ accentColor: "#b91c1c" }}
                          />
                          <span className="text-sm font-medium" style={{ color: "#0f1f3d" }}>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {(contactMethod === "whatsapp" || contactMethod === "phone") && (
                    <div>
                      <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Telefon-/Handynummer *</label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        placeholder="z.B. +49 123 4567890"
                        className="w-full h-12 px-4 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid rgba(30,58,110,0.2)", background: "white" }}
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Ihre Nachricht</label>
                    <p className="text-xs mb-2" style={{ color: "#94a3b8" }}>Diese Nachricht wird automatisch für Sie vorbereitet – Sie können sie noch anpassen:</p>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{ border: "1.5px solid rgba(30,58,110,0.2)", background: "#f8fafc", lineHeight: 1.6 }}
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

            {/* Fixed footer buttons */}
            {(step === "select" || step === "maintenance" || step === "confirm") && (
              <div className="border-t" style={{ borderColor: "rgba(30,58,110,0.1)" }}>
                {step === "select" && selected && (
                  <div className="px-6 py-4">
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
                  <div className="px-6 py-4">
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
                  <div className="px-6 py-4">
                    <button
                      onClick={handleOrder}
                      disabled={loading || !orderData.name || !orderData.email || ((contactMethod === "whatsapp" || contactMethod === "phone") && !phoneNumber)}
                      className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ background: selectedPlan?.color }}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Anfrage senden
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center mt-2" style={{ color: "#94a3b8" }}>
                      Keine Zahlung jetzt — ich melde mich innerhalb von 24h bei Ihnen.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}