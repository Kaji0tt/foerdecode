import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import DemoPreview from "./DemoPreview";

export default function ContactSection({ onOpenShop, prefilledDomain }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    business: "",
    colors: "",
    domain: prefilledDomain || ""
  });
  const [showDemo, setShowDemo] = useState(false);

  // Update domain when prop changes
  React.useEffect(() => {
    if (prefilledDomain) {
      setForm(prev => ({ ...prev, domain: prefilledDomain }));
    }
  }, [prefilledDomain]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canSubmit = form.name && form.email && form.business && form.businessName;

  const handleDemoOrder = () => {
    setShowDemo(false);
    onOpenShop(null, form);
  };

  return (
    <>
      {showDemo && (
        <DemoPreview
          formData={form}
          onBack={() => setShowDemo(false)}
          onOrder={handleDemoOrder}
        />
      )}

      <section
        id="contact"
        className="min-h-screen w-full flex items-center relative overflow-visible snap-start"
      >
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(30,58,110,0.1)" }} />

        {/* Subtle accent stripe at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #1e3a6e, #b91c1c)" }} />

        <div ref={ref} className="relative z-10 w-full max-w-2xl mx-auto px-6 py-16 flex flex-col justify-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight" style={{ color: "#0f1f3d" }}>
              Deine Website,{" "}
              <span style={{ color: "#b91c1c" }}>live in Sekunden.</span>
            </h2>
            <p className="mt-4 text-base" style={{ color: "#64748b" }}>
              Füll das Formular aus und lass dir sofort eine kostenlose Demo deiner Website generieren.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(30,58,110,0.1)", boxShadow: "0 8px 32px rgba(30,58,110,0.08)" }}
          >
            <form onSubmit={e => { e.preventDefault(); setShowDemo(true); }} className="space-y-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Name *</label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Dein Name"
                    className="h-11 bg-white text-sm"
                    style={{ borderColor: "rgba(30,58,110,0.15)" }}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>E-Mail *</label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Deine E-Mail"
                    className="h-11 bg-white text-sm"
                    style={{ borderColor: "rgba(30,58,110,0.15)" }}
                  />
                </div>
              </div>

              {/* Business Name + Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Geschäftsname *</label>
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
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Domain</label>
                  <Input
                    name="domain"
                    value={form.domain}
                    onChange={handleChange}
                    placeholder="z.B. meine-bäckerei.de"
                    className="h-11 bg-white text-sm"
                    style={{ borderColor: "rgba(30,58,110,0.15)" }}
                  />
                </div>
              </div>

              {/* Business Description */}
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Über dein Geschäft *</label>
                <Textarea
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Kurze Beschreibung deines Geschäfts..."
                  className="bg-white resize-none text-sm"
                  style={{ borderColor: "rgba(30,58,110,0.15)" }}
                />
              </div>

              {/* Colors */}
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: "#0f1f3d" }}>Farbgebung (optional)</label>
                <Input
                  name="colors"
                  value={form.colors}
                  onChange={handleChange}
                  placeholder="z.B. Rot, Gold oder Hex-Codes"
                  className="h-11 bg-white text-sm"
                  style={{ borderColor: "rgba(30,58,110,0.15)" }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                type="submit"
                disabled={!canSubmit}
                className="w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                style={{ background: "#b91c1c", boxShadow: "0 8px 24px rgba(185,28,28,0.3)" }}
                onMouseEnter={e => { if (canSubmit) e.currentTarget.style.background = "#991b1b"; }}
                onMouseLeave={e => e.currentTarget.style.background = "#b91c1c"}
              >
                <Sparkles className="w-5 h-5" />
                Demo generieren
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}