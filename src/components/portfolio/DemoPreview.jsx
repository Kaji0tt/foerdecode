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
      model: "claude_sonnet_4_6",
      prompt: `Du bist ein preisgekrönter Webdesigner und Frontend-Entwickler. Erstelle eine VOLLSTÄNDIGE, professionelle, produktionsreife einseitige HTML-Website für ein lokales Geschäft in Flensburg, Schleswig-Holstein.

=== KUNDENDATEN ===
Geschäftsbeschreibung: ${formData.business}
Prioritäten / wichtige Inhalte: ${formData.important || "Öffnungszeiten, Leistungen, Kontakt"}
Farbwünsche: ${formData.colors || "Wähle passende, professionelle Farben die zum Geschäft passen"}
Ansprechpartner: ${formData.name}

=== PFLICHT-SECTIONS (alle müssen enthalten sein) ===
1. NAVIGATION — Sticky-Navbar mit Logo/Name, Links zu allen Sections, Hamburger-Menü für Mobile
2. HERO — Großer visueller Einstieg mit Headline, Subheadline, CTA-Button, passenden CSS-Formen/Dekorationen im Hintergrund
3. ÜBER UNS — Geschichte, Werte, Persönlichkeit des Geschäfts, optional mit Zitat oder Highlight-Box
4. LEISTUNGEN / ANGEBOT — Cards oder Grid mit mindestens 4 konkreten Leistungen/Produkten mit Icons (nutze Unicode oder CSS-Symbole), kurzer Beschreibung und wenn sinnvoll einem Preis-/Zeitrahmen
5. HIGHLIGHTS / WARUM WIR — 3–4 USPs mit Icons in einem ansprechenden Layout (z.B. Icon + Text horizontal)
6. ${formData.important?.toLowerCase().includes("speisekarte") ? "SPEISEKARTE — Kategorien als Tabs oder Accordion mit echten Gerichten und Preisen" : formData.important?.toLowerCase().includes("öffnungszeit") ? "ÖFFNUNGSZEITEN — Übersichtliche Tabelle mit Wochentagen, visuell hervorgehobener Heute-Zeile" : "KUNDENSTIMMEN — 3 glaubwürdige Bewertungen mit Name, Sternchen und kurzem Text"}
7. KONTAKT — Formular (Name, E-Mail, Nachricht), Adresse in Flensburg, Öffnungszeiten, eingebettete Google Maps Placeholder (nur visuell)
8. FOOTER — Logo, Links, Adresse, Social-Media-Icons (CSS), Copyright

=== DESIGN-ANFORDERUNGEN ===
- Farbpalette: Leite aus den Farbwünschen ab. Definiere min. 3 CSS-Variablen: --primary, --secondary, --accent
- Typografie: Passende Google Font einbinden (z.B. Playfair Display für Gastronomie, Inter für Tech, Lato für allgemein)
- Abstände: Großzügige Padding/Margins, min. 80px zwischen Sections
- Hover-Effekte: Alle Buttons und Links haben sanfte Transitions
- Cards: Schatten, border-radius, hover: leicht anheben (translateY)
- Ein Hero soll vorhanden sein!
- Responsive: Flexbox/Grid, bricht bei 768px zu Mobile um, Hamburger-Menü mit JS toggle
- Du darfst externe, passende Place-Holder Bilder verwenden, wenn es die Wirkung der Seite verbessert.

=== TECHNISCHE ANFORDERUNGEN ===
- Vollständiges HTML5-Dokument (<!DOCTYPE html> bis </html>)
- CSS komplett im <style>-Tag eingebettet — KEIN externes CSS außer Google Fonts
- JavaScript komplett im <script>-Tag — für Navbar-Toggle, Scroll-Animationen
- Sinnvolle, realistische Placeholder-Texte die zum Geschäft passen (KEIN Lorem Ipsum!)
- Semantisches HTML (header, main, section, article, footer)

WICHTIG: Gib NUR den reinen HTML-Code zurück — kein Markdown, keine Erklärungen, keine Codeblöcke. Direkt mit <!DOCTYPE html> beginnen.`,
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