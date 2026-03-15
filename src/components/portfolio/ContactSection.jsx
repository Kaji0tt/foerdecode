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
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-indigo-950/50 to-slate-950" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400/80 text-sm font-semibold uppercase tracking-widest">
            Kontakt
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Lass uns
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              loslegen.
            </span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-lg mx-auto">
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
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Standort</h4>
                <p className="text-slate-400 text-sm mt-1">Flensburg, Schleswig-Holstein</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">E-Mail</h4>
                <p className="text-slate-400 text-sm mt-1">Antwort innerhalb von 24h</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Telefon</h4>
                <p className="text-slate-400 text-sm mt-1">Auf Anfrage verfügbar</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="text-center py-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Nachricht gesendet!</h3>
                <p className="text-slate-400">Ich melde mich schnellstmöglich bei dir.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
                >
                  Weitere Nachricht senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Name *</label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dein Name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12 focus:border-sky-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">E-Mail *</label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="deine@email.de"
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12 focus:border-sky-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1.5 block">Telefon (optional)</label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Deine Telefonnummer"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12 focus:border-sky-500/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1.5 block">Nachricht *</label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Erzähl mir kurz von deinem Geschäft und was du dir vorstellst..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-sky-500/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 flex items-center justify-center gap-2 disabled:opacity-50"
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
          className="mt-20 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} · Webdesign aus Flensburg · Mit KI erstellt, mit Leidenschaft umgesetzt.
          </p>
        </motion.div>
      </div>
    </section>
  );
}