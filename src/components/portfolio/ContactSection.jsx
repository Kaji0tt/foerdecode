import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import DemoPreview from "./DemoPreview";

export default function ContactSection({ onOpenShop, prefilledDomain }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", businessName: "", business: "", colors: "", domain: prefilledDomain || "" });
  const [showDemo, setShowDemo] = useState(false);

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
        className="h-screen w-full flex items-center relative overflow-hidden snap-start"
      >
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(30,58,110,0.1)" }} />

        {/* Subtle accent stripe at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #1e3a6e, #b91c1c)" }} />

        <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col justify-center h-full">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "#0f1f3d" }}>
              Deine Website,{" "}
              <span style={{ color: "#b91c1c" }}>live in Sekunden.</span>
            </h2>
            <p className="mt-4 text-base max-w-lg" style={{ color: "#64748b" }}>
              Füll das Formular aus und lass dir sofort eine kostenlose Demo deiner Website generieren.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Info — hidden on mobile, visible on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block space-y-6"
            >
              {[
                { Icon: MapPin, title: "Standort", text: "Flensburg" },
                { Icon: Mail, title: "E-Mail", text: "Antwort in 24h" },
                { Icon: Phone, title: "Telefon", text: "Auf Anfrage" },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(30,58,110,0.08)", border: "1px solid rgba(30,58,110,0.12)" }}>
                    <Icon className="w-4 h-4" style={{ color: "#1e3a6e" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: "#0f1f3d" }}>{title}</h4>
                    <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{text}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <form onSubmit={e => { e.preventDefault(); setShowDemo(true); }} className="space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: "#374151" }}>Name *</label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dein Name"
                      className="h-10 bg-white text-sm"
                      style={{ borderColor: "rgba(30,58,110,0.2)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: "#374151" }}>E-Mail *</label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Deine E-Mail"
                      className="h-10 bg-white text-sm"
                      style={{ borderColor: "rgba(30,58,110,0.2)" }}
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#374151" }}>Name vom Geschäft *</label>
                  <Input
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    required
                    placeholder="z.B. Meine Bäckerei"
                    className="h-10 bg-white text-sm"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>

                {/* Business Description */}
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#374151" }}>Über dein Geschäft *</label>
                  <Textarea
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    required
                    rows={2}
                    placeholder="Kurze Beschreibung deines Geschäfts..."
                    className="bg-white resize-none text-sm"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>

                {/* Domain */}
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#374151" }}>Domain</label>
                  <Input
                    name="domain"
                    value={form.domain}
                    onChange={handleChange}
                    placeholder="z.B. meine-bäckerei.de"
                    className="h-10 bg-white text-sm"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>

                {/* Colors */}
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#374151" }}>Farbgebung</label>
                  <Input
                    name="colors"
                    value={form.colors}
                    onChange={handleChange}
                    placeholder="z.B. Rot, Gold oder Hex-Codes"
                    className="h-10 bg-white text-sm"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40"
                  style={{ background: "#b91c1c", boxShadow: "0 4px 16px rgba(185,28,28,0.25)" }}
                  onMouseEnter={e => { if (canSubmit) e.currentTarget.style.background = "#991b1b"; }}
                  onMouseLeave={e => e.currentTarget.style.background = "#b91c1c"}
                >
                  <Sparkles className="w-4 h-4" />
                  Demo erstellen
                </button>
              </form>
            </motion.div>
          </div>


        </div>
      </section>
    </>
  );
}