import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function SimpleContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    const subject = encodeURIComponent(`Neue Anfrage von ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:mail@nordweb.de?subject=${subject}&body=${body}`;
    setLoading(false);
    setDone(true);
  };

  const canSubmit = form.name && form.email && form.message;

  return (
    <section id="contact" className="relative py-16 sm:py-20">
      <div ref={ref} className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Kontakt
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Lassen Sie uns über Ihr Projekt sprechen.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Schreiben Sie kurz, worum es geht. Ich melde mich zeitnah.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.52, delay: 0.12 }}
          className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="rounded-2xl border p-6 sm:p-7" style={{ borderColor: "rgba(163,183,212,0.28)", background: "rgba(249,252,255,0.9)" }}>
            {done ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(112,142,186,0.16)" }}>
                  <CheckCircle className="h-7 w-7" style={{ color: "#2f4c79" }} />
                </div>
                <h3 className="mb-2 font-sora text-xl font-bold" style={{ color: "#213a66" }}>
                  Nachricht vorbereitet
                </h3>
                <p className="text-sm" style={{ color: "#4a6188" }}>
                  Ihr E-Mail-Programm wurde geoeffnet. Ich antworte in der Regel innerhalb von 24 Stunden.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#2f4c79" }}>
                    Ihr Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="z.B. Max Mustermann"
                    className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all"
                    style={{ border: "1.5px solid rgba(163,183,212,0.38)", background: "rgba(255,255,255,0.94)", color: "#1f335b" }}
                    onFocus={(e) => (e.target.style.borderColor = "#6f95c9")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(163,183,212,0.38)")}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#2f4c79" }}>
                    Ihre E-Mail *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="max@beispiel.de"
                    className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all"
                    style={{ border: "1.5px solid rgba(163,183,212,0.38)", background: "rgba(255,255,255,0.94)", color: "#1f335b" }}
                    onFocus={(e) => (e.target.style.borderColor = "#6f95c9")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(163,183,212,0.38)")}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#2f4c79" }}>
                  Ihre Frage oder Nachricht *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Was möchten Sie wissen?"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: "1.5px solid rgba(163,183,212,0.38)", background: "rgba(255,255,255,0.94)", color: "#1f335b" }}
                  onFocus={(e) => (e.target.style.borderColor = "#6f95c9")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(163,183,212,0.38)")}
                />
              </div>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: "#9e1c1c" }}
                onMouseEnter={(e) => {
                  if (canSubmit && !loading) e.currentTarget.style.background = "#861717";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#9e1c1c";
                }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Nachricht senden
                  </>
                )}
              </button>
              <p className="text-center text-xs" style={{ color: "#5b7196" }}>
                Ich antworte in der Regel innerhalb von 24 Stunden.
              </p>
            </form>
            )}
          </div>

          <aside className="rounded-2xl border p-6" style={{ borderColor: "rgba(163,183,212,0.28)", background: "rgba(249,252,255,0.9)" }}>
            <h3 className="mb-4 font-sora text-xl font-semibold" style={{ color: "#213a66" }}>
              Direkter Kontakt
            </h3>
            <ul className="space-y-4 text-sm leading-relaxed" style={{ color: "#4a6188" }}>
              <li>
                <p className="mb-1 font-semibold" style={{ color: "#2f4c79" }}>
                  E-Mail
                </p>
                <a href="mailto:mail@nordweb.de" className="transition-colors" style={{ color: "#315286" }}>
                  mail@nordweb.de
                </a>
              </li>
              <li>
                <p className="mb-1 font-semibold" style={{ color: "#2f4c79" }}>
                  Telefon (optional)
                </p>
                <p>+49 0000 000000</p>
              </li>
              <li>
                <p className="mb-1 font-semibold" style={{ color: "#2f4c79" }}>
                  Standort
                </p>
                <p>Flensburg und Umgebung</p>
              </li>
            </ul>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}