import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Loader2, X, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function DemoPreview({ formData, onBack, onOrder }) {
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [generated, setGenerated] = useState(false);
  const iframeRef = useRef(null);

  const generate = async () => {
    setLoading(true);

    // Schritt 1: Formulardaten in einen strukturierten Design-Brief umwandeln (schnell, kleines Modell)
    setLoadingStep("Analysiere dein Geschäft...");
    const brief = await base44.integrations.Core.InvokeLLM({
      prompt: `Analysiere diese Angaben zu einem lokalen Geschäft in Flensburg und erstelle einen kompakten Design-Brief für eine Website.

Geschäftsname: ${formData.businessName}
Geschäftsart: ${formData.businessType || "unbekannt"}
Geschäftsbeschreibung: ${formData.business}
Wichtige Inhalte: ${formData.important || "keine Angabe"}
Farbwünsche: ${formData.colors || "keine Angabe"}
Ansprechpartner: ${formData.name}

Gib ein JSON-Objekt zurück mit:
- businessName: vermuteter oder passender Geschäftsname
- businessType: Art des Geschäfts (z.B. Restaurant, Friseursalon, Bäckerei...)
- primaryColor: Hex-Farbe passend zum Geschäft und Farbwünschen
- secondaryColor: zweite Hex-Farbe
- accentColor: Akzentfarbe
- googleFont: passende Google Font (nur der Name)
- headline: kurze, prägnante Hero-Überschrift (max 8 Wörter)
- subheadline: Subheadline (max 15 Wörter)
- sections: Array der Sections die sinnvoll sind (z.B. ["nav","hero","about","services","hours","contact","footer"])
- services: Array mit 4 konkreten Leistungen/Produkten [{name, description, icon (unicode emoji)}]
- usps: Array mit 3 USPs [{icon (unicode emoji), title, text}]
- placeholderImageQuery: Suchbegriff für ein passendes Unsplash-Bild (auf Englisch)`,
      response_json_schema: {
        type: "object",
        properties: {
          businessName: { type: "string" },
          businessType: { type: "string" },
          primaryColor: { type: "string" },
          secondaryColor: { type: "string" },
          accentColor: { type: "string" },
          googleFont: { type: "string" },
          headline: { type: "string" },
          subheadline: { type: "string" },
          sections: { type: "array", items: { type: "string" } },
          services: { type: "array", items: { type: "object", properties: { name: { type: "string" }, description: { type: "string" }, icon: { type: "string" } } } },
          usps: { type: "array", items: { type: "object", properties: { icon: { type: "string" }, title: { type: "string" }, text: { type: "string" } } } },
          placeholderImageQuery: { type: "string" }
        }
      }
    });

    // Schritt 2: Hero-Vorschau generieren
    setLoadingStep("Erstelle deine Website...");
    const heroImage = `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80`;
    const result = await base44.integrations.Core.InvokeLLM({
      model: "claude_sonnet_4_6",
      prompt: `Erstelle einen reinen HTML-Hero-Bereich als grobe erste Vorschau für eine Website. Gib NUR reinen HTML-Code zurück, beginnend mit <!DOCTYPE html>.

WICHTIG: Dies ist keine fertige Website – nur ein erster visueller Eindruck des Hero-Bereichs. Alle Links und Buttons führen ins Nichts (href="#"). Kein Scrollen nötig.

Geschäft: ${brief.businessName} (${brief.businessType})
Farben: primary=${brief.primaryColor}, secondary=${brief.secondaryColor}, accent=${brief.accentColor}
Font: ${brief.googleFont}
Headline: "${brief.headline}"
Subheadline: "${brief.subheadline}"
Hintergrundbild: ${heroImage}

Aufbau:
1. Einfache Nav-Leiste mit Geschäftsname als Logo (links) und 2–3 Platzhalter-Links (rechts, alle href="#")
2. Hero-Bereich: Bild-Hintergrund mit dunklem Overlay, zentrierte Headline, Subheadline, ein CTA-Button (href="#")

CSS inline, Google Font einbinden, vollständig responsiv. Keine weiteren Sections. Keine Formulare. Kein Footer. Alle Texte auf Deutsch.`,
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
                Unsere KI erstellt eine individuelle Website-Vorschau basierend auf deinen Angaben. Das dauert ca. 20–30 Sekunden.
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
            <p className="text-white/70 text-sm">{loadingStep}</p>
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