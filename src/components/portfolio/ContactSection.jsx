import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.entities.ContactRequest.create({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    });
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full flex items-center relative overflow-hidden snap-start"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(30,58,110,0.1)" }} />

      {/* Rising sun glow — scrolls with this section, centered at bottom */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "80%",
          background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(251,191,36,0.75) 0%, rgba(249,115,22,0.55) 20%, rgba(251,191,36,0.25) 50%, transparent 72%)",
          animation: "sunPulse 4s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes sunPulse {
          0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.06); }
        }
      `}</style>

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
            Lass uns{" "}
            <span style={{ color: "#b91c1c" }}>loslegen.</span>
          </h2>
          <p className="mt-6 text-lg max-w-lg" style={{ color: "#64748b" }}>
            Schreib mir eine Nachricht und ich melde mich innerhalb von 24 Stunden bei dir.
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
            {sent ? (
              <div className="text-center py-16 rounded-2xl" style={{ border: "1px solid rgba(30,58,110,0.15)", background: "white" }}>
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "#1e3a6e" }} />
                <h3 className="text-2xl font-semibold mb-2" style={{ color: "#0f1f3d" }}>Nachricht gesendet!</h3>
                <p style={{ color: "#64748b" }}>Ich melde mich schnellstmöglich bei dir.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-medium transition-colors"
                  style={{ color: "#1e3a6e" }}
                >
                  Weitere Nachricht senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="deine@email.de"
                      className="h-12 bg-white"
                      style={{ borderColor: "rgba(30,58,110,0.2)" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Telefon (optional)</label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Deine Telefonnummer"
                    className="h-12 bg-white"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>
                <div>
                  <label className="text-sm mb-1.5 block font-medium" style={{ color: "#374151" }}>Nachricht *</label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Erzähl mir kurz von deinem Geschäft und was du dir vorstellst..."
                    className="bg-white resize-none"
                    style={{ borderColor: "rgba(30,58,110,0.2)" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ background: "#1e3a6e", boxShadow: "0 4px 16px rgba(30,58,110,0.2)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#162d5a"}
                  onMouseLeave={e => e.currentTarget.style.background = "#1e3a6e"}
                >
                  {sending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Nachricht senden
                    </>
                  )}
                </button>
              </form>
            )}
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
  );
}