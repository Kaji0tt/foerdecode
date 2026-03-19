import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import DemoPreview from "./DemoPreview";

export default function ContactSection({ onOpenShop }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", business: "", important: "", colors: "" });
  const [showDemo, setShowDemo] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canSubmit = form.name && form.email && form.business;

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
        className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
      >
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(30,58,110,0.1)" }} />

        {/* Subtle accent stripe at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #1e3a6e, #b91c1c)" }} />

        <div ref={ref} className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight" style={{ color: "#0f1f3d" }}>
              Deine Website,{" "}
              <span style={{ color: "#b91c1c" }}>live in Sekunden.</span>
            </h2>
            <p className="mt-6 text-lg max-w-lg" style={{ color: "#64748b" }}>
              Füll das Formular aus und lass dir sofort eine kostenlose Demo deiner Website generieren.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {[
                { Icon: MapPin, title: "Standort", text: "Flensburg, Schleswig-Holstein" },
                { Icon: Mail, title: "E-Mail", text: "Antwort innerhalb von 24h" },
                { Icon: Phone, title: "Telefon", text: "Auf Anfrage verfügbar" },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(30,58,110,0.08)", border: "1px solid rgba(30,58,110,0.12)" }}>
                    <Icon className="w-5 h-5" style={{ color: "#1e3a6e" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: "#0f1f3d" }}>{title}</h4>
                    <p className="text-sm mt-1" style={{ color: "#64748b" }}>{text}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <form onSubmit={e => { e.preventDefault(); setShowDemo(true); }} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Name *</label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dein Name"
                      className="h-12 bg-white"
                      style={{ borderColor: "rgba(30,58,110,0.2)" }}
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>E-Mail *</label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Deine E-Mail"
                      className="h-12 bg-white"
                      style={{ borderColor: "rgba(30,58,110,0.2)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Mein Geschäft *</label>
                  <Textarea
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Erzähle von deinem Geschäft..."
                    className="bg-white resize-none"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>

                <div>
                  <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Was ist dir wichtig?</label>
                  <Textarea
                    name="important"
                    value={form.important}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Erzähle, was dir auf der Website besonders wichtig ist, beispielsweise Speisekarte oder Öffnungszeiten..."
                    className="bg-white resize-none"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>

                <div>
                  <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Farben</label>
                  <Input
                    name="colors"
                    value={form.colors}
                    onChange={handleChange}
                    placeholder="Welche Farben besitzt das Ambiente deines Geschäfts? Du kannst auch Farbcodes angeben."
                    className="h-12 bg-white"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40"
                  style={{ background: "#b91c1c", boxShadow: "0 4px 16px rgba(185,28,28,0.25)" }}
                  onMouseEnter={e => { if (canSubmit) e.currentTarget.style.background = "#991b1b"; }}
                  onMouseLeave={e => e.currentTarget.style.background = "#b91c1c"}
                >
                  <Sparkles className="w-5 h-5" />
                  Demo erstellen
                </button>
              </form>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 pt-8 text-center"
            style={{ borderTop: "1px solid rgba(30,58,110,0.1)" }}
          >
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              © {new Date().getFullYear()} · Webdesign aus Flensburg · Mit KI erstellt, mit Leidenschaft umgesetzt.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}