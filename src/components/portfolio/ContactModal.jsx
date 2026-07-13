import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send } from "lucide-react";

export default function ContactModal({ open, onClose, prefillMessage }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((p) => ({ ...p, message: prefillMessage || "" }));
      setDone(false);
    }
  }, [open, prefillMessage]);

  // Body-Scroll sperren solange Modal offen
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape schließt Modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`New enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:contact@yourbrand.com?subject=${subject}&body=${body}`;
    setDone(true);
  };

  const canSubmit = form.name && form.email && form.message;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60]"
            style={{
              background: "rgba(12, 22, 46, 0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[61] flex items-center justify-center px-4 py-8"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl border p-6 sm:p-8"
              style={{
                borderColor: "rgba(163,183,212,0.3)",
                background: "rgba(245,249,255,0.97)",
                boxShadow: "0 24px 64px rgba(12,22,46,0.24)",
                pointerEvents: "auto",
              }}
            >
              {/* Schließen-Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-1.5 transition-colors"
                style={{ color: "#6b85ad" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1f335b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b85ad")}
                aria-label="Schließen"
              >
                <X className="h-5 w-5" />
              </button>

              {done ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: "rgba(112,142,186,0.16)" }}
                  >
                    <CheckCircle className="h-7 w-7" style={{ color: "#2f4c79" }} />
                  </div>
                  <h3 className="mb-2 font-sora text-xl font-bold" style={{ color: "#213a66" }}>
                    Message Ready
                  </h3>
                  <p className="text-sm" style={{ color: "#4a6188" }}>
                    Your email client has been opened. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 pr-6">
                    <p
                      className="mb-1 text-xs font-semibold uppercase tracking-[0.12em]"
                      style={{ color: "#4f648d" }}
                    >
                      Contact
                    </p>
                    <h2
                      className="font-sora text-2xl font-bold"
                      style={{ color: "#1f335b" }}
                    >
                      Get in Touch.
                    </h2>
                    <p className="mt-1.5 text-sm" style={{ color: "#4a6188" }}>
                      Drop us a short message. We'll respond quickly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-1.5 block text-sm font-semibold"
                          style={{ color: "#2f4c79" }}
                        >
                          Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Jane Smith"
                          className="h-11 w-full rounded-xl px-4 text-sm outline-none transition-all"
                          style={{
                            border: "1.5px solid rgba(163,183,212,0.38)",
                            background: "rgba(255,255,255,0.94)",
                            color: "#1f335b",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#6f95c9")}
                          onBlur={(e) =>
                            (e.target.style.borderColor = "rgba(163,183,212,0.38)")
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="mb-1.5 block text-sm font-semibold"
                          style={{ color: "#2f4c79" }}
                        >
                          E-Mail *
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className="h-11 w-full rounded-xl px-4 text-sm outline-none transition-all"
                          style={{
                            border: "1.5px solid rgba(163,183,212,0.38)",
                            background: "rgba(255,255,255,0.94)",
                            color: "#1f335b",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#6f95c9")}
                          onBlur={(e) =>
                            (e.target.style.borderColor = "rgba(163,183,212,0.38)")
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block text-sm font-semibold"
                        style={{ color: "#2f4c79" }}
                      >
                        Nachricht *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="What can we help you with?"
                        className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        style={{
                          border: "1.5px solid rgba(163,183,212,0.38)",
                          background: "rgba(255,255,255,0.94)",
                          color: "#1f335b",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#6f95c9")}
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(163,183,212,0.38)")
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all disabled:opacity-50"
                      style={{ background: "#9e1c1c" }}
                      onMouseEnter={(e) => {
                        if (canSubmit) e.currentTarget.style.background = "#861717";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#9e1c1c";
                      }}
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
