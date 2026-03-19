import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, X } from "lucide-react";

const TLDS = [".de", ".com", ".org", ".sh", ".to"];

export default function DomainChecker({ onDomainSelected }) {
  const [open, setOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [tld, setTld] = useState(".de");
  const [checked, setChecked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customTld, setCustomTld] = useState("");

  const handleCheck = async () => {
    if (!domain.trim()) return;
    
    setLoading(true);
    const fullDomain = domain.trim() + (customTld || tld);
    
    // Simulate domain check (würde hier echte API nutzen)
    setTimeout(() => {
      setChecked({ domain: fullDomain, available: Math.random() > 0.4 });
      setLoading(false);
      if (onDomainSelected) {
        onDomainSelected(fullDomain);
      }
    }, 1000);
  };

  return (
    <div className="mt-6 flex-shrink-0">
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        onClick={() => setOpen(!open)}
        className="px-6 py-3.5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center gap-2"
        style={{
          border: "1px solid rgba(30,58,110,0.25)",
          color: "#1e3a6e",
          background: open ? "rgba(30,58,110,0.06)" : "transparent",
        }}
      >
        🌐 Domain prüfen
        <ChevronDown className="w-4 h-4" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-3 p-4 rounded-xl"
            style={{ border: "1px solid rgba(30,58,110,0.15)", background: "rgba(255,255,255,0.8)" }}
          >
            <div className="space-y-3">
              {/* Domain Input */}
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "#64748b" }}>Domain Name</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="z.B. meine-bäckerei"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: "1px solid rgba(30,58,110,0.2)", background: "white" }}
                  onKeyPress={(e) => e.key === "Enter" && handleCheck()}
                />
              </div>

              {/* TLD Selection */}
              <div className="flex gap-2">
                <select
                  value={customTld || tld}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "custom") {
                      setCustomTld("");
                    } else {
                      setTld(val);
                      setCustomTld("");
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: "1px solid rgba(30,58,110,0.2)", background: "white" }}
                >
                  {TLDS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                  <option value="custom">Andere...</option>
                </select>

                {/* Custom TLD Input */}
                {customTld !== undefined && (
                  <input
                    type="text"
                    value={customTld}
                    onChange={(e) => setCustomTld(e.target.value.startsWith(".") ? e.target.value : "." + e.target.value)}
                    placeholder=".xyz"
                    className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ border: "1px solid rgba(30,58,110,0.2)", background: "white" }}
                    onKeyPress={(e) => e.key === "Enter" && handleCheck()}
                  />
                )}
              </div>

              {/* Check Button */}
              <button
                onClick={handleCheck}
                disabled={!domain.trim() || loading}
                className="w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 text-white disabled:opacity-50"
                style={{ background: "#1e3a6e" }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "#162d5a")}
                onMouseLeave={(e) => e.currentTarget.style.background = "#1e3a6e"}
              >
                {loading ? "Prüfe..." : "Prüfen"}
              </button>

              {/* Result */}
              {checked && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-2 rounded-lg flex items-center gap-2 text-sm"
                  style={{ background: checked.available ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)" }}
                >
                  {checked.available ? (
                    <>
                      <Check className="w-4 h-4" style={{ color: "#22c55e" }} />
                      <span style={{ color: "#22c55e" }}>Verfügbar: <strong>{checked.domain}</strong></span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" style={{ color: "#ef4444" }} />
                      <span style={{ color: "#ef4444" }}>Nicht verfügbar</span>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}