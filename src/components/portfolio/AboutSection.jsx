import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MousePointerClick, MessageSquare, Rocket, Send, CheckCircle } from "lucide-react";
import { createPortal } from "react-dom";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Schreiben Sie mir,",
    description:
      "Schreiben Sie mich an und erzählen Sie kurz, was Sie sich vorstellen. Geben Sie dabei gerne an, was Sie machen und ob es bereits öffentliche Inhalte gibt, damit ich mir ein Bild machen kann.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Ich melde mich bei Ihnen.",
    description:
      "Ich melde mich persönlich bei Ihnen und zeige erste Ideen. Wenn Sie sich für eine Zusammenarbeit entscheiden, klären wir die Details und ich mache mich an die Arbeit.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Feedback-Runden",
    description:
      "Sie geben Feedback per WhatsApp oder Telefon — ich kümmere mich um den Rest und bringe alles online.",
  },
];

function StepsCarousel() {
  const [active, setActive] = useState(0);
  /** @type {React.MutableRefObject<number | null>} */
  const touchStartX = useRef(null);
  /** @type {React.MutableRefObject<number | null>} */
  const touchStartY = useRef(null);
  /** @type {React.MutableRefObject<HTMLDivElement | null>} */
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleTouchStart = (/** @type {TouchEvent} */ e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (/** @type {TouchEvent} */ e) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
      if (dx > dy) e.preventDefault();
    };
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchEnd = (/** @type {React.TouchEvent<HTMLDivElement>} */ e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActive((c) => Math.min(c + 1, steps.length - 1));
      else setActive((c) => Math.max(c - 1, 0));
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div ref={containerRef} className="w-full" onTouchEnd={onTouchEnd}>
      <div className="relative flex items-center justify-center" style={{ height: 260 }}>
        {steps.map((step, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          return (
            <motion.div
              key={step.number}
              animate={{ x: `${offset * 88}%`, scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.3, zIndex: isActive ? 10 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => !isActive && setActive(i)}
              className="absolute w-[78vw] max-w-xs rounded-2xl p-6 flex flex-col"
              style={{
                cursor: isActive ? "default" : "pointer",
                border: "1px solid rgba(30,58,110,0.12)",
                background: "rgba(255,255,255,0.97)",
                boxShadow: isActive ? "0 8px 32px rgba(30,58,110,0.10)" : "0 2px 8px rgba(30,58,110,0.04)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.15)" }}>
                  <step.icon className="w-5 h-5" style={{ color: "#b91c1c" }} />
                </div>
                <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(30,58,110,0.4)" }}>
                  SCHRITT {step.number}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#0f1f3d" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.description}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === active ? 20 : 8, height: 8, background: i === active ? "#b91c1c" : "rgba(185,28,28,0.2)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (/** @type {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */ e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const closeContactModal = () => {
    setContactOpen(false);
    setLoading(false);
  };

  const handleSubmit = (/** @type {React.FormEvent<HTMLFormElement>} */ e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    const subject = encodeURIComponent(`Neue Anfrage von ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:mail@nordweb.de?subject=${subject}&body=${body}`;
    setLoading(false);
    setDone(true);
  };

  const canSubmit = form.name && form.email && form.message;

  return (
    <>
      <section
        id="problem"
        className="h-screen w-full flex items-center relative snap-start overflow-hidden"
      >
      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-8 pb-12 flex flex-col justify-center h-full">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight" style={{ color: "#0f1f3d" }}>
            <span style={{ color: "#0f1f3d" }}>
              Schnell und{" "}
            </span>
            <span style={{ color: "#b91c1c" }}>
              unkompliziert.
            </span>
          </h2>

          <button
            type="button"
            onClick={() => {
              setDone(false);
              setContactOpen(true);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all"
            style={{
              border: "1px solid rgba(30,58,110,0.28)",
              background: "rgba(255,255,255,0.72)",
              color: "#0f1f3d",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.72)";
            }}
          >
            <Send className="w-4 h-4" style={{ color: "#9E0000" }} />
            Kontakt aufnehmen
          </button>
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hidden sm:block mb-7 p-5 rounded-xl"
          style={{ background: "rgba(30,58,110,0.04)", border: "1px solid rgba(30,58,110,0.1)" }}
        >
          <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: "#475569" }}>
            Eine gute Website muss heute kein riesiges Projekt mehr sein.

Dank moderner KI-Tools lassen sich schnell schöne, individuelle Seiten entwickeln — wenn man weiß, wie man mit den Systemen arbeitet.
<br />Ich kümmere mich um die Technik und Umsetzung.
<br />Sie erzählen einfach, was Sie machen und was Ihnen wichtig ist.

          </p>
          <p className="mt-3 text-sm sm:text-base font-semibold" style={{ color: "#b91c1c" }}>
            Ganz unkompliziert über WhatsApp oder Telefon.
          </p>
        </motion.div>

        {/*
          AUSKOMMENTIERT — alter Fließtext

          <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: "#475569" }}>
            Viele kleine Geschäfte haben noch keine oder eine alte Website. Zum einen steigt die Bedeutung eines Internetauftritts für Sichtbarkeit stetig - zum anderen wird Erstellung, Bearbeitung und Wartung dank künstlicher Intelligenz einfacher denn je!
            Mir bleibt damit mehr Zeit für das Wesentliche: Lösungen im Umgang mit der Technik finden, die für Sie funktionieren!
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed max-w-2xl" style={{ color: "#b91c1c" }}>
            Dank der KI, bleibt der Preis damit klein und die Wirkung wird groß.
          </p>
        */}

        {/* Mobile carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="sm:hidden"
        >
          <StepsCarousel />
        </motion.div>

        {/* Desktop 3-column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden sm:grid grid-cols-3 gap-5"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
              className="rounded-2xl p-6 flex flex-col"
              style={{ border: "1px solid rgba(30,58,110,0.12)", background: "rgba(255,255,255,0.97)", boxShadow: "0 4px 16px rgba(30,58,110,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.15)" }}>
                  <step.icon className="w-5 h-5" style={{ color: "#b91c1c" }} />
                </div>
                <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(30,58,110,0.4)" }}>
                  SCHRITT {step.number}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#0f1f3d" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {contactOpen && typeof document !== "undefined" && createPortal(
      <div className="fixed inset-0 z-[220] flex items-center justify-center px-4">
        <button
          type="button"
          aria-label="Kontaktformular schließen"
          className="absolute inset-0"
          style={{ background: "rgba(2, 8, 23, 0.55)", border: "none" }}
          onClick={closeContactModal}
        />

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl rounded-3xl p-6 sm:p-8"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.97) 100%)",
            border: "1px solid rgba(30,58,110,0.18)",
            boxShadow: "0 20px 50px rgba(2, 8, 23, 0.28)",
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sora" style={{ color: "#0f1f3d" }}>
                Kontakt
              </h3>
              <p className="mt-1 text-sm sm:text-base" style={{ color: "#475569" }}>
                Schreiben Sie mir kurz Ihr Anliegen, ich melde mich schnell zuruck.
              </p>
            </div>
            <button
              type="button"
              onClick={closeContactModal}
              className="rounded-full px-3 py-1.5 text-sm font-semibold"
              style={{ background: "rgba(15,31,61,0.08)", color: "#0f1f3d", border: "1px solid rgba(15,31,61,0.14)" }}
            >
              Schliessen
            </button>
          </div>

          {done ? (
            <div
              className="rounded-2xl p-8 flex flex-col items-center text-center"
              style={{ border: "2px solid rgba(30,58,110,0.15)", background: "rgba(255,255,255,0.97)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(30,58,110,0.08)" }}>
                <CheckCircle className="w-7 h-7" style={{ color: "#1e3a6e" }} />
              </div>
              <h4 className="text-xl font-bold mb-2 font-sora" style={{ color: "#0f1f3d" }}>Nachricht gesendet!</h4>
              <p className="text-sm" style={{ color: "#64748b" }}>Ich melde mich so schnell wie moeglich bei Ihnen.</p>
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
                  placeholder="Was moechten Sie wissen?"
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
            </form>
          )}
        </motion.div>
      </div>,
      document.body
    )}
    </>
  );
}