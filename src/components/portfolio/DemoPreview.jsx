import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Loader2, X, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function DemoPreview({ formData, onBack, onOrder }) {
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const iframeRef = useRef(null);

  const generate = async () => {
    setLoading(true);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Du bist ein Webdesigner. Erstelle eine vollständige, moderne und professionelle einseitige HTML-Website (mit eingebettetem CSS, keine externen Links außer Google Fonts) für ein lokales Geschäft aus Flensburg, Schleswig-Holstein.

Geschäftsbeschreibung: ${formData.business}
Wichtige Inhalte: ${formData.important}
Farbwünsche: ${formData.colors || "Keine spezifischen Angaben - wähle passende professionelle Farben"}
Kontaktname: ${formData.name}

Anforderungen:
- Vollständiges HTML-Dokument (<!DOCTYPE html>...)
- Modernes, professionelles Design mit dem Farbschema aus den Farbwünschen
- Sections: Hero, Über uns, Leistungen/Angebot, Kontakt
- Responsive (mobile-first)
- Placeholder-Inhalte die zum Geschäft passen
- Keine externen Bilder (nutze CSS-Hintergründe oder Platzhalter)
- Schöne Google Font einbinden
- Kein JavaScript nötig
- NUR das HTML zurückgeben, kein Kommentar davor oder danach`,
    });
    setHtml(result);
    setLoading(false);
    setGenerated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#0f1f3d" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Formular
        </button>
        <div className="text-white/50 text-sm">Demo-Vorschau · {formData.name}</div>
        <button onClick={onBack} className="text-white/50 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {!generated && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="text-center max-w-md px-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(255,255,255,0.1)" }}>
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Demo erstellen</h2>
              <p className="text-white/60 mb-8">
                Unsere KI erstellt jetzt eine individuelle Website-Vorschau basierend auf deinen Angaben. Das dauert ca. 15 Sekunden.
              </p>
              <button
                onClick={generate}
                className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
                style={{ background: "#b91c1c", boxShadow: "0 8px 24px rgba(185,28,28,0.3)" }}
                onMouseEnter={e => e.currentTarget.style.background = "#991b1b"}
                onMouseLeave={e => e.currentTarget.style.background = "#b91c1c"}
              >
                Demo generieren
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
            <p className="text-white/70 text-sm">KI generiert deine Website...</p>
          </div>
        )}

        {generated && html && (
          <>
            <iframe
              ref={iframeRef}
              srcDoc={html}
              className="w-full h-full border-0"
              title="Website Demo"
              sandbox="allow-same-origin"
            />
            {/* Floating CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
              <button
                onClick={onOrder}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #b91c1c, #1e3a6e)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                }}
              >
                <MessageSquare className="w-6 h-6" />
                Website anfragen
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}