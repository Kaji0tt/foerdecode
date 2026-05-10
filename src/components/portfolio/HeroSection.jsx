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
        <div className="w-full max-w-7xl flex flex-col gap-6 lg:gap-7">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-stretch gap-8 lg:gap-6 lg:min-h-[min(58vh,540px)]">
          {/* Main Headline */}
          <div className="flex flex-col gap-4 lg:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-3 rounded-full w-fit pr-4 pl-2 py-2"
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(0,34,85,0.16)",
              boxShadow: "0 10px 28px rgba(0,34,85,0.09)",
            }}
          >
            <img
              src={foerdeCodeLogo}
              alt="Foerde Code Logo"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
            />
            <span className="font-sora font-semibold tracking-tight" style={{ color: "#002255", fontSize: "clamp(0.9rem, 0.9vw, 1.05rem)" }}>
              Foerde Code
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-6xl sm:text-8xl md:text-[6.5rem] lg:text-[8.5rem] font-bold tracking-tighter leading-[0.86] text-left font-sora"
            style={{ color: "#002255" }}
          >
            <span className="block">Ihr</span>
            <span className="block">Geschäft.</span>
            <span
              className="block"
              style={{ background: "linear-gradient(135deg, #782121, #a73535)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Ihre
            </span>
            <span
              className="block"
              style={{ background: "linear-gradient(135deg, #782121, #a73535)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Website.
            </span>
          </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
            className="h-full relative overflow-hidden rounded-[1.75rem]"
            style={{
              boxShadow: "0 18px 60px rgba(5,10,18,0.28), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            {/* Background layer WITH mask — glass card fades at the bottom visually */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[1.75rem] hero-card-bg-fade"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 18%, rgba(88,28,28,0.18) 44%, rgba(24,42,78,0.34) 72%, rgba(10,16,28,0.42) 100%)",
                border: "1px solid rgba(255,255,255,0.16)",
                backdropFilter: "blur(24px) saturate(150%)",
              }}
            >
              {/* Matching liquid-glass layer from navbar */}
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 26%, rgba(255,255,255,0.02) 100%)",
                }}
              />
              <div
                className="absolute -left-8 top-[-55%] h-40 w-40 rounded-full pointer-events-none z-0"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.1) 35%, rgba(255,255,255,0.02) 58%, transparent 72%)",
                  filter: "blur(10px)",
                }}
              />
              <div
                className="absolute right-[12%] top-[-70%] h-44 w-52 rounded-full pointer-events-none z-0"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(120,160,255,0.08) 42%, transparent 74%)",
                  filter: "blur(14px)",
                  transform: "rotate(-12deg)",
                }}
              />
              <div
                className="absolute left-[22%] bottom-[-120%] h-48 w-64 rounded-full pointer-events-none z-0"
                style={{
                  background: "radial-gradient(circle, rgba(158,0,0,0.14) 0%, rgba(15,31,61,0.08) 45%, transparent 76%)",
                  filter: "blur(18px)",
                  transform: "rotate(8deg)",
                }}
              />
            </div>

            {/* Content layer — NOT affected by the mask above; messages remain fully visible */}
            <div className="relative z-10 pt-1 lg:pt-2 px-2 sm:px-3 lg:px-4 flex flex-col gap-4 lg:gap-5 h-full">

            <p
              className="relative z-10 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: "clamp(0.92rem, 0.95vw, 1.08rem)",
              }}
            >
              Klare Struktur, starker erster Eindruck und eine moderne Website, die auf Ihr Geschaeft einzahlt.
            </p>

            <div className="flex-1 w-full min-h-0 flex flex-col justify-between gap-4" style={{ position: "relative", zIndex: 1 }}>
              <div
                className="rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "clamp(12px,1.1vw,18px)",
                }}
              >
                <p
                  className="leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(0.92rem, 0.95vw, 1.08rem)" }}
                >
                  Moderne Websites mussen kein Grossprojekt sein: klare Struktur, starker erster Eindruck und eine Loesung,
                  die zu Ihrem Alltag passt.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  "Branding passend zu Foerde Code",
                  "Persoenliche Abstimmung statt Agentur-Umwege",
                  "Saubere Umsetzung inkl. technischer Details",
                ].map((point) => (
                  <div
                    key={point}
                    className="rounded-xl"
                    style={{
                      background: "rgba(15,31,61,0.28)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "rgba(255,255,255,0.92)",
                      fontSize: "clamp(0.78rem,0.78vw,0.92rem)",
                      padding: "0.58rem 0.72rem",
                    }}
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            </div>
          </motion.div>

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
    </div>

    </section>
  );
}