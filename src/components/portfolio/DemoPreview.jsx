import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Loader2, X, ArrowLeft } from "lucide-react";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const guessPalette = (colors = "") => {
  const input = colors.toLowerCase();
  if (input.includes("gruen") || input.includes("green")) {
    return { primary: "#14532d", secondary: "#dcfce7", accent: "#16a34a" };
  }
  if (input.includes("rot") || input.includes("red")) {
    return { primary: "#7f1d1d", secondary: "#fee2e2", accent: "#dc2626" };
  }
  if (input.includes("blau") || input.includes("blue")) {
    return { primary: "#1e3a8a", secondary: "#dbeafe", accent: "#2563eb" };
  }
  return { primary: "#0f172a", secondary: "#e2e8f0", accent: "#b91c1c" };
};

const buildDemoHtml = (formData) => {
  const businessName = escapeHtml(formData?.businessName || "Ihr Geschaeft");
  const businessType = escapeHtml(formData?.businessType || "Lokales Unternehmen");
  const businessText = escapeHtml(formData?.business || "Moderne Leistungen mit persoenlichem Service.");
  const palette = guessPalette(formData?.colors || "");
  const colorHint = formData?.colors ? `Farbwunsch: ${escapeHtml(formData.colors)}` : "";

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${businessName} - Demo</title>
  <style>
    :root {
      --primary: ${palette.primary};
      --secondary: ${palette.secondary};
      --accent: ${palette.accent};
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Trebuchet MS", "Segoe UI", sans-serif;
      background: linear-gradient(140deg, var(--secondary), #ffffff 50%, #f8fafc);
      color: #0f172a;
      min-height: 100vh;
    }

    .wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 24px;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 12px 0;
    }

    .logo {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary);
    }

    .links {
      display: flex;
      gap: 14px;
      font-size: 14px;
    }

    .links a {
      color: #334155;
      text-decoration: none;
    }

    .hero {
      margin-top: 20px;
      border-radius: 24px;
      padding: 56px 28px;
      background: radial-gradient(circle at 10% 0%, rgba(255,255,255,0.95), rgba(255,255,255,0.8)), linear-gradient(135deg, var(--secondary), rgba(15,23,42,0.05));
      border: 1px solid rgba(15, 23, 42, 0.1);
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.1);
    }

    .badge {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(255,255,255,0.85);
      border: 1px solid rgba(15, 23, 42, 0.1);
      color: var(--primary);
      margin-bottom: 16px;
    }

    h1 {
      margin: 0;
      font-size: clamp(30px, 6vw, 56px);
      line-height: 1.05;
      max-width: 12ch;
      color: var(--primary);
    }

    .sub {
      margin-top: 16px;
      max-width: 62ch;
      font-size: 17px;
      line-height: 1.6;
      color: #334155;
    }

    .cta {
      margin-top: 28px;
      display: inline-flex;
      padding: 14px 20px;
      border-radius: 14px;
      border: none;
      background: var(--accent);
      color: white;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
    }

    .hint {
      margin-top: 20px;
      font-size: 13px;
      color: #64748b;
    }

    @media (max-width: 640px) {
      .hero {
        padding: 36px 18px;
        border-radius: 18px;
      }

      .links {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <nav>
      <div class="logo">${businessName}</div>
      <div class="links">
        <a href="#">Leistungen</a>
        <a href="#">Ueber uns</a>
        <a href="#">Kontakt</a>
      </div>
    </nav>

    <section class="hero">
      <span class="badge">Demo fuer ${businessType}</span>
      <h1>${businessName} digital praesentieren</h1>
      <p class="sub">${businessText}</p>
      <a class="cta" href="#">Unverbindlich anfragen</a>
      <p class="hint">${colorHint} Diese Vorschau wird lokal im Browser erzeugt und ist als Layout-Beispiel gedacht.</p>
    </section>
  </div>
</body>
</html>`;
};

export default function DemoPreview({ formData, onBack, onOrder }) {
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [generated, setGenerated] = useState(false);
  const iframeRef = useRef(null);

  const generate = async () => {
    setLoading(true);
    setLoadingStep("Erstelle lokale Vorschau...");
    const result = buildDemoHtml(formData);
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
                Diese Vorschau wird direkt in Ihrem Browser erzeugt und funktioniert ohne externe KI- oder Backend-Dienste.
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