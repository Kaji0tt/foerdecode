import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

export default function MagicWebBot({ onSubmit, isInView }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    business: "",
    colors: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canGoNext = () => {
    if (step === 1) return form.name && form.email;
    if (step === 2) return form.businessName;
    if (step === 3) return form.business;
    return false;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
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
      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-1 flex items-center justify-center gap-2" style={{ color: "#b91c1c" }}>
        <span>✨</span>Net-Zauberer <span>🧙</span>
      </h3>
      <p className="text-sm mb-6 text-center" style={{ color: "#64748b" }}>
        Ein paar kurze Angaben – und der Zauberer zeigt dir, wie deine Website aussehen könnte.
      </p>

      {/* Step indicator */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="h-2 rounded-full flex-1 transition-all"
            style={{
              background: s <= step ? "#b91c1c" : "rgba(185,28,28,0.15)"
            }}
          />
        ))}
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>
                Dein Name *
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="z.B. Lisa"
                className="h-11 bg-white text-sm"
                style={{ borderColor: "rgba(30,58,110,0.15)" }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>
                Deine E-Mail *
              </label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="z.B. lisa@example.com"
                className="h-11 bg-white text-sm"
                style={{ borderColor: "rgba(30,58,110,0.15)" }}
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>
                Wie heißt dein Geschäft? *
              </label>
              <Input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                required
                placeholder="z.B. Meine Bäckerei"
                className="h-11 bg-white text-sm"
                style={{ borderColor: "rgba(30,58,110,0.15)" }}
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>
                Kurz erzählt: Was machst du? *
              </label>
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
              <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>
                Lieblingsfarben? (optional)
              </label>
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
        
        {step < 3 ? (
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