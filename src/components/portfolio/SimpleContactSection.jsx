import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { base44 } from "@/api/base44Client";
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
    await base44.integrations.Core.SendEmail({
      to: "mail@nordweb.de",
      subject: `Neue Anfrage von ${form.name}`,
      body: `Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`,
    });
    setLoading(false);
    setDone(true);
  };

  const canSubmit = form.name && form.email && form.message;

  return (
    <section
      id="simple-contact"
      className="h-screen w-full flex items-center relative overflow-hidden snap-start"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(30,58,110,0.1)" }} />

      <div ref={ref} className="relative z-10 w-full max-w-2xl mx-auto px-6 py-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight font-sora" style={{ color: "#0f1f3d" }}>
            Noch Fragen offen?{" "}
            <span style={{ color: "#b91c1c" }}>Kein Problem.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {done ? (
            <div
              className="rounded-2xl p-10 flex flex-col items-center text-center"
              style={{ border: "2px solid rgba(30,58,110,0.15)", background: "rgba(255,255,255,0.97)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(30,58,110,0.08)" }}>
                <CheckCircle className="w-7 h-7" style={{ color: "#1e3a6e" }} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-sora" style={{ color: "#0f1f3d" }}>Nachricht gesendet!</h3>
              <p className="text-sm" style={{ color: "#64748b" }}>Ich melde mich so schnell wie möglich bei Ihnen.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 sm:p-8 space-y-5"
              style={{ border: "2px solid rgba(30,58,110,0.15)", background: "rgba(255,255,255,0.97)", boxShadow: "0 8px 32px rgba(30,58,110,0.08)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block" style={{ color: "#374151" }}>Ihr Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="z.B. Max Mustermann"
                    className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all"
                    style={{ border: "1.5px solid rgba(30,58,110,0.2)", background: "white", color: "#0f1f3d" }}
                    onFocus={e => e.target.style.borderColor = "#1e3a6e"}
                    onBlur={e => e.target.style.borderColor = "rgba(30,58,110,0.2)"}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block" style={{ color: "#374151" }}>Ihre E-Mail *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="max@beispiel.de"
                    className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all"
                    style={{ border: "1.5px solid rgba(30,58,110,0.2)", background: "white", color: "#0f1f3d" }}
                    onFocus={e => e.target.style.borderColor = "#1e3a6e"}
                    onBlur={e => e.target.style.borderColor = "rgba(30,58,110,0.2)"}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block" style={{ color: "#374151" }}>Ihre Frage oder Nachricht *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Was möchten Sie wissen?"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: "1.5px solid rgba(30,58,110,0.2)", background: "white", color: "#0f1f3d" }}
                  onFocus={e => e.target.style.borderColor = "#1e3a6e"}
                  onBlur={e => e.target.style.borderColor = "rgba(30,58,110,0.2)"}
                />
              </div>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: "#1e3a6e", boxShadow: "0 8px 24px rgba(30,58,110,0.25)" }}
                onMouseEnter={e => { if (canSubmit && !loading) e.currentTarget.style.background = "#162d5a"; }}
                onMouseLeave={e => e.currentTarget.style.background = "#1e3a6e"}
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
              <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
                Ich antworte in der Regel innerhalb von 24 Stunden.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}