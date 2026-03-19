import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

const TLDS = [".com", ".de", ".org", ".sh", ".to"];

export default function DomainChecker({ onDomainSelected }) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!input.includes(".")) {
      // Wenn kein Punkt vorhanden, zeige alle TLDs als Vorschläge
      const baseName = input.trim();
      if (!baseName) return [];
      return TLDS.map(tld => baseName + tld);
    }
    return [];
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  const handleCheck = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    
    // Simulate domain check
    setTimeout(() => {
      setChecked({ domain: input, available: Math.random() > 0.4 });
      setLoading(false);
      if (onDomainSelected) {
        onDomainSelected(input);
      }
    }, 1000);
  };

  return (
    <div className="mt-4 flex-shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          onFocus={() => setShowSuggestions(true)}
          placeholder="wunschadresse.de"
          className="w-full px-6 py-3.5 rounded-xl text-base sm:text-lg outline-none transition-all duration-300"
          style={{
            border: "1px solid rgba(30,58,110,0.15)",
            color: "#0f1f3d",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(8px)",
            boxShadow: showSuggestions && suggestions.length > 0 ? "0 8px 24px rgba(30,58,110,0.08)" : "none"
          }}
        />

        {/* Auto-complete suggestions */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1 rounded-xl border z-10 backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(30,58,110,0.15)", boxShadow: "0 8px 24px rgba(30,58,110,0.08)" }}
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="w-full text-left px-6 py-2.5 text-sm hover:bg-slate-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  style={{ color: "#475569" }}
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Check result */}
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 rounded-xl flex items-center gap-2 text-sm"
            style={{ background: checked.available ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)" }}
          >
            {checked.available ? (
              <>
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#22c55e" }} />
                <span style={{ color: "#22c55e" }}>Verfügbar: <strong>{checked.domain}</strong></span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 flex-shrink-0" style={{ color: "#ef4444" }} />
                <span style={{ color: "#ef4444" }}>Nicht verfügbar</span>
              </>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="mt-2 text-center text-xs" style={{ color: "#94a3b8" }}>
          Prüfe Domain...
        </div>
      )}
    </div>
  );
}