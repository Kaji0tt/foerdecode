import React from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const heroNavItems = [
  { label: "Start", id: "hero" },
  { label: "Ablauf", id: "problem" },
  { label: "Beispiele", id: "portfolio" },
  { label: "Preise", id: "pricing" },
  { label: "Kontakt", id: "simple-contact" },
];

const heroBackgroundImage = new URL("../../../FlensburgNight.jpg", import.meta.url).href;
const foerdeCodeLogo = new URL("../../../Förde Code Logo.svg", import.meta.url).href;


/**
 * @param {{ activeSection?: string }} props
 */
export default function HeroSection({ activeSection }) {
  /** @param {string} id */
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden snap-start"
    >
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackgroundImage})`, backgroundPosition: "left top" }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(166, 208, 247, 0.4) 0%, rgba(107, 107, 107, 0.28) 52%, rgba(32,128,124,0.24) 100%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-14 sm:pt-16 lg:justify-center lg:pt-0 px-6">
        <div className="w-full max-w-7xl flex flex-col items-center gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-4 lg:gap-6"
          >
            <div
              className="rounded-3xl flex items-center justify-center w-full max-w-[160px] lg:max-w-none lg:w-auto px-4 py-4 lg:py-0"
              style={{
                background: "rgba(255,255,255,0.76)",
                border: "1px solid rgba(0,34,85,0.16)",
                boxShadow: "0 10px 28px rgba(0,34,85,0.1)",
              }}
            >
              <img
                src={foerdeCodeLogo}
                alt="Foerde Code Logo"
                className="h-20 w-20 sm:h-24 sm:w-24 lg:h-full lg:w-auto object-contain"
              />
            </div>

            <h1
              className="font-sora font-bold tracking-tighter leading-[0.9] text-center lg:text-left"
              style={{ color: "#002255", fontSize: "clamp(2.5rem, 6.6vw, 7.2rem)" }}
            >
              <span className="block">Ihr Geschaeft.</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #ff6b6b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ihre Website.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            className="font-sora font-bold tracking-tight text-center"
            style={{ color: "#002255", fontSize: "clamp(2rem, 5.2vw, 5.2rem)", textTransform: "lowercase" }}
          >
            förde code
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="h-px w-full max-w-5xl"
            style={{ background: "linear-gradient(90deg, rgba(0,34,85,0.05) 0%, rgba(0,34,85,0.35) 18%, rgba(239,68,68,0.44) 50%, rgba(0,34,85,0.35) 82%, rgba(0,34,85,0.05) 100%)" }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
            className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {[
              "Branding passend zu Foerde Code",
              "Persoenliche Abstimmung statt Agentur-Umwege",
              "Saubere Umsetzung inkl. technischer Details",
            ].map((point) => (
              <div
                key={point}
                className="rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.68)",
                  border: "1px solid rgba(0,34,85,0.16)",
                  color: "#0f1f3d",
                  fontSize: "clamp(0.78rem,0.9vw,0.96rem)",
                  padding: "0.8rem 0.9rem",
                  boxShadow: "0 8px 24px rgba(0,34,85,0.08)",
                }}
              >
                {point}
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-4xl text-center leading-relaxed"
            style={{ color: "#0f1f3d", fontSize: "clamp(0.95rem, 1vw, 1.12rem)" }}
          >
            Moderne Websites mussen kein Grossprojekt sein: klare Struktur, starker erster Eindruck und eine Loesung, die zu Ihrem Alltag passt.
          </motion.p>
        </div>

          {typeof document !== "undefined" && createPortal(
            <div className="fixed bottom-6 left-1/2 z-[100] w-[min(95vw,1120px)] -translate-x-1/2 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-full overflow-hidden rounded-[1.75rem] pointer-events-auto"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 18%, rgba(88,28,28,0.18) 44%, rgba(24,42,78,0.34) 72%, rgba(10,16,28,0.42) 100%)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  boxShadow: "0 18px 60px rgba(5,10,18,0.28), inset 0 1px 0 rgba(255,255,255,0.18)",
                  backdropFilter: "blur(24px) saturate(150%)",
                }}
              >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 26%, rgba(255,255,255,0.02) 100%)",
                }}
              />
              <div
                className="absolute -left-8 top-[-55%] h-40 w-40 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.1) 35%, rgba(255,255,255,0.02) 58%, transparent 72%)",
                  filter: "blur(10px)",
                }}
              />
              <div
                className="absolute right-[12%] top-[-70%] h-44 w-52 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(120,160,255,0.08) 42%, transparent 74%)",
                  filter: "blur(14px)",
                  transform: "rotate(-12deg)",
                }}
              />
              <div
                className="absolute left-[22%] bottom-[-120%] h-48 w-64 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(158,0,0,0.14) 0%, rgba(15,31,61,0.08) 45%, transparent 76%)",
                  filter: "blur(18px)",
                  transform: "rotate(8deg)",
                }}
              />
              <div
                className="relative z-10 w-full rounded-[1.75rem] px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-5 flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between"
                style={{ backdropFilter: "blur(14px)" }}
              >
                {/* Nav items – red sweep left-to-right on hover via background-clip */}
                <nav className="flex flex-1 flex-wrap items-center gap-x-0 gap-y-2">
                  {heroNavItems.map((item, idx) => (
                    <React.Fragment key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="font-sora font-bold tracking-tighter cursor-pointer flex-1 text-center"
                        style={{
                          fontSize: "clamp(0.78rem, 1.1vw, 1.05rem)",
                          background: "linear-gradient(to right, #9E0000 50%, #ffffff 50%)",
                          backgroundSize: "200% 100%",
                          backgroundPosition: activeSection === item.id ? "0% 0%" : "100% 0%",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          transition: "background-position 0.45s ease",
                          border: "none",
                          paddingInline: "clamp(6px, 0.6vw, 12px)",
                          paddingBlock: "0.25rem",
                          minWidth: 0,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundPosition = "0% 0%"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundPosition = activeSection === item.id ? "0% 0%" : "100% 0%"; }}
                      >
                        <motion.span
                          key={`${item.id}-${activeSection === item.id ? "active" : "idle"}`}
                          initial={activeSection === item.id ? { opacity: 0.45, x: -14 } : false}
                          animate={activeSection === item.id ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="inline-block"
                        >
                        {item.label}
                        </motion.span>
                      </button>
                      {idx < heroNavItems.length - 1 && (
                        <span style={{ color: "rgba(15,31,61,0.25)", userSelect: "none", fontSize: "0.8rem", flexShrink: 0 }}>·</span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>,
          document.body
          )}

      </div>
    </section>
  );
}