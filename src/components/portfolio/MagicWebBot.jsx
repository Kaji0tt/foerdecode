import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

export default function MagicWebBot({ onSubmit, isInView }) {
  const [step, setStep] = useState(1);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const typeInputRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    businessType: "",
    business: "",
    colors: "",
    hasWebsite: null,       // true | false
    renewWebsite: null,     // true | false | null
    existingUrl: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const businessTypes = [
    "Restaurant", "Imbiss / Foodtruck", "Bäckerei / Café",
    "Friseur / Beauty", "Kreativ & Hobby", "Kurse & Workshops",
    "Handwerk & Reparatur", "Einzelhandel / Laden", "Fitness & Yoga",
    "Kinderbetreuung", "Reinigung & Service", "Tierbetreuung"
  ];

  // Total steps: 1=Website-Frage, 2=Geschäft, 3=Details, 4=Kontakt
  const totalSteps = 4;

  const canGoNext = () => {
    if (step === 1) {
      if (form.hasWebsite === null) return false;
      if (form.hasWebsite === false) return true;
      if (form.renewWebsite === null) return false;
      if (form.renewWebsite === false) return true;
      if (form.renewWebsite === true) return !!form.existingUrl;
      return false;
    }
    if (step === 2) return form.businessName && form.businessType;
    if (step === 3) return !!form.business;
    if (step === 4) return form.name && form.email;
    return false;
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (form.name && form.email && form.businessName && form.business) {
      onSubmit(form);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl p-6 sm:p-8"
      style={{ border: "2px solid #b91c1c", background: "rgba(255,255,255,0.97)", boxShadow: "0 8px 32px rgba(185,28,28,0.12)" }}
    >
      {/* Step indicator */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full flex-1 transition-all"
            style={{ background: i + 1 <= step ? "#b91c1c" : "rgba(185,28,28,0.15)" }}
          />
        ))}
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        {/* STEP 1: Website-Frage */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Frage: zeige "Erneuern?" wenn hasWebsite===true, sonst "Hast du eine Website?" */}
            <div>
              <AnimatePresence mode="wait">
                {form.hasWebsite !== true ? (
                  <motion.div key="q1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <label className="text-sm font-semibold mb-3 block" style={{ color: "#0f1f3d" }}>Hast du bereits eine Website?</label>
                    <div className="flex gap-3">
                      {[{ label: "Ja", value: true }, { label: "Nein", value: false }].map(opt => (
                        <button key={opt.label} type="button"
                          onClick={() => setForm(p => ({ ...p, hasWebsite: opt.value, renewWebsite: null, existingUrl: "" }))}
                          className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                          style={{
                            border: form.hasWebsite === opt.value ? "2px solid #b91c1c" : "1.5px solid rgba(30,58,110,0.2)",
                            background: form.hasWebsite === opt.value ? "rgba(185,28,28,0.06)" : "white",
                            color: form.hasWebsite === opt.value ? "#b91c1c" : "#475569",
                          }}
                        >{opt.label}</button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="q2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <button type="button" onClick={() => setForm(p => ({ ...p, hasWebsite: null, renewWebsite: null, existingUrl: "" }))} className="text-xs font-medium underline" style={{ color: "#94a3b8" }}>
                        ← Zurück
                      </button>
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block" style={{ color: "#0f1f3d" }}>Soll die bestehende Website erneuert werden?</label>
                      <div className="flex gap-3">
                        {[{ label: "Ja", value: true }, { label: "Nein", value: false }].map(opt => (
                          <button key={opt.label} type="button"
                            onClick={() => setForm(p => ({ ...p, renewWebsite: opt.value, existingUrl: "" }))}
                            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                            style={{
                              border: form.renewWebsite === opt.value ? "2px solid #b91c1c" : "1.5px solid rgba(30,58,110,0.2)",
                              background: form.renewWebsite === opt.value ? "rgba(185,28,28,0.06)" : "white",
                              color: form.renewWebsite === opt.value ? "#b91c1c" : "#475569",
                            }}
                          >{opt.label}</button>
                        ))}
                      </div>
                    </div>
                    <AnimatePresence>
                      {form.renewWebsite === true && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                          <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>URL der bestehenden Website *</label>
                          <Input name="existingUrl" value={form.existingUrl} onChange={handleChange} placeholder="z.B. www.meingeschaeft.de" className="h-11 bg-white text-sm" style={{ borderColor: "rgba(30,58,110,0.15)" }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Geschäft */}
        {step === 2 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Wie heißt dein Geschäft? *</label>
              <Input name="businessName" value={form.businessName} onChange={handleChange} required placeholder="z.B. Meine Bäckerei" className="h-11 bg-white text-sm" style={{ borderColor: "rgba(30,58,110,0.15)" }} />
            </div>
            <div className="relative">
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Was macht das Geschäft? *</label>
              <input
                ref={typeInputRef}
                value={form.businessType}
                onChange={e => { setForm(p => ({ ...p, businessType: e.target.value })); setTypeDropdownOpen(true); }}
                onFocus={() => setTypeDropdownOpen(true)}
                onBlur={() => setTimeout(() => setTypeDropdownOpen(false), 150)}
                placeholder="z.B. Bäckerei, Friseursalon..."
                className="w-full h-11 px-3 rounded-md text-sm outline-none"
                style={{ border: "1px solid rgba(30,58,110,0.2)", background: "white", color: "#0f1f3d" }}
              />
              <AnimatePresence>
                {typeDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
                    className="absolute z-20 w-full mt-1 rounded-xl overflow-y-auto"
                    style={{ background: "white", border: "1.5px solid rgba(185,28,28,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", maxHeight: "120px", scrollbarWidth: "thin", scrollbarColor: "rgba(185,28,28,0.3) transparent" }}
                  >
                    {businessTypes.filter(t => t.toLowerCase().includes(form.businessType.toLowerCase())).map(type => (
                      <li key={type}>
                        <button type="button" onMouseDown={() => { setForm(p => ({ ...p, businessType: type })); setTypeDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-red-50" style={{ color: "#0f1f3d" }}>
                          {type}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Details */}
        {step === 3 && (
          <motion.div
            key="step3b"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Erzähle von deinem Geschäft: *</label>
              <Textarea
                name="business"
                value={form.business}
                onChange={handleChange}
                required
                rows={4}
                placeholder="z.B. Ich backe Brote und Kuchen für die ganze Nachbarschaft..."
                className="bg-white resize-none text-sm"
                style={{ borderColor: "rgba(30,58,110,0.15)" }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Farbgebung (optional)</label>
              <Input
                name="colors"
                value={form.colors}
                onChange={handleChange}
                placeholder="z.B. Rot, Gold oder #FF5733"
                className="h-11 bg-white text-sm"
                style={{ borderColor: "rgba(30,58,110,0.15)" }}
              />
            </div>
          </motion.div>
        )}

        {/* STEP 4: Kontakt */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Dein Name *</label>
              <Input name="name" value={form.name} onChange={handleChange} required placeholder="z.B. Lisa" className="h-11 bg-white text-sm" style={{ borderColor: "rgba(30,58,110,0.15)" }} />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Deine E-Mail *</label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="z.B. lisa@example.com" className="h-11 bg-white text-sm" style={{ borderColor: "rgba(30,58,110,0.15)" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-3 rounded-xl border-2 font-semibold transition-all"
            style={{ borderColor: "#b91c1c", color: "#b91c1c", background: "transparent" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(185,28,28,0.04)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {step < totalSteps ? (
          <button
            onClick={handleNext}
            disabled={!canGoNext()}
            className="flex-1 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            style={{ background: "#b91c1c", boxShadow: "0 8px 24px rgba(185,28,28,0.3)" }}
            onMouseEnter={e => { if (canGoNext()) e.currentTarget.style.background = "#991b1b"; }}
            onMouseLeave={e => e.currentTarget.style.background = "#b91c1c"}
          >
            Weiter
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canGoNext()}
            className="flex-1 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            style={{ background: "#b91c1c", boxShadow: "0 8px 24px rgba(185,28,28,0.3)" }}
            onMouseEnter={e => { if (canGoNext()) e.currentTarget.style.background = "#991b1b"; }}
            onMouseLeave={e => e.currentTarget.style.background = "#b91c1c"}
          >
            <Sparkles className="w-5 h-5" />
            Demo generieren
          </button>
        )}
      </div>
    </motion.div>
  );
}