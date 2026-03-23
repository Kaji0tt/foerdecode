import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const heroChatMessages = [
  { side: "left", text: "Wie schnell kann das online gehen?" },
  { side: "right", text: "In wenigen Tagen steht die erste Version. Danach feilen wir gemeinsam am Feinschliff." },
];

const messageRevealDelayMs = 3900;
const sharedBodyFontSize = "clamp(0.84rem, 0.78vw, 1.03rem)";

const heroNavItems = [
  { label: "Wie funktioniert das?", id: "problem" },
  { label: "Beispiele", id: "portfolio" },
  { label: "Vorschau erstellen", id: "contact" },
  { label: "Preise", id: "pricing" },
  { label: "Kontakt", id: "simple-contact" },
];


export default function HeroSection() {
  const chatRef = useRef(null);
  const chatInView = useInView(chatRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (!chatInView) return;

    if (prefersReducedMotion) {
      setVisibleMessages(heroChatMessages.length);
      return;
    }

    setVisibleMessages(1);
    const interval = setInterval(() => {
      setVisibleMessages((current) => {
        if (current >= heroChatMessages.length) {
          clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, messageRevealDelayMs);

    return () => clearInterval(interval);
  }, [chatInView, prefersReducedMotion]);

  const showTyping = chatInView && !prefersReducedMotion && visibleMessages > 0 && visibleMessages < heroChatMessages.length;
  const typingOnRight = heroChatMessages[visibleMessages]?.side === "right";
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden snap-start"
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-7xl flex flex-col gap-6 lg:gap-7">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-stretch gap-8 lg:gap-6 lg:min-h-[min(58vh,540px)]">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-6xl sm:text-8xl md:text-[6.5rem] lg:text-[8.5rem] font-bold tracking-tighter leading-[0.86] text-left font-sora"
            style={{ color: "#0f1f3d" }}
          >
            <span className="block">Ihr</span>
            <span className="block">Geschäft.</span>
            <span
              className="block"
              style={{ background: "linear-gradient(135deg, #9E0000, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Ihre
            </span>
            <span
              className="block"
              style={{ background: "linear-gradient(135deg, #9E0000, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Website.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
            className="h-full pt-1 lg:pt-2 px-2 sm:px-3 lg:px-4 flex flex-col gap-4 lg:gap-5 relative"
          >
            {/* Gradient overlay – top black → transparent, behind all content */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: "linear-gradient(to bottom left, rgba(0,0,0,0.52) 0%, transparent 65%)",
              }}
            />

            {/* Subtext – body font, same as chat bubbles */}
            <p
              className="leading-relaxed"
              style={{
                color: "#ffffff",
                fontSize: "clamp(0.96rem, 1.0vw, 1.18rem)",
                position: "relative",
                zIndex: 1,
              }}
            >
              Sie kümmern sich um Ihr Geschäft – ich kümmere mich um den Rest. Kein Technik-Wissen nötig. Mit Fokus auf das Wesentliche.
            </p>

            <div
              ref={chatRef}
              className="flex-1 w-full min-h-0"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="h-full flex flex-col justify-start gap-[clamp(8px,1.2vh,14px)]">
                {heroChatMessages.map((message, index) => {
                  if (index >= visibleMessages) return null;

                  const isRight = message.side === "right";
                  return (
                    <motion.div
                      key={`${message.side}-${index}`}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: isRight ? 20 : -20, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className={`flex ${isRight ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className="max-w-[94%] rounded-2xl leading-relaxed break-words"
                        style={
                          isRight
                            ? {
                                background: "#0f1f3d",
                                color: "#ffffff",
                                border: "1px solid rgba(15,31,61,0.85)",
                                fontSize: sharedBodyFontSize,
                                paddingInline: "clamp(10px, 0.9vw, 14px)",
                                paddingBlock: "clamp(7px, 0.8vh, 12px)",
                              }
                            : {
                                background: "rgba(255,255,255,0.9)",
                                color: "#0f1f3d",
                                border: "1px solid rgba(15,31,61,0.18)",
                                fontSize: sharedBodyFontSize,
                                paddingInline: "clamp(10px, 0.9vw, 14px)",
                                paddingBlock: "clamp(7px, 0.8vh, 12px)",
                              }
                        }
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  );
                })}

                {showTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${typingOnRight ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="rounded-2xl inline-flex items-center gap-[clamp(4px,0.45vw,7px)]"
                      style={
                        typingOnRight
                          ? {
                              background: "#0f1f3d",
                              border: "1px solid rgba(15,31,61,0.85)",
                              paddingInline: "clamp(10px, 0.9vw, 14px)",
                              paddingBlock: "clamp(7px, 0.8vh, 12px)",
                            }
                          : {
                              background: "rgba(255,255,255,0.9)",
                              border: "1px solid rgba(15,31,61,0.18)",
                              paddingInline: "clamp(10px, 0.9vw, 14px)",
                              paddingBlock: "clamp(7px, 0.8vh, 12px)",
                            }
                      }
                      aria-label="tippt"
                    >
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={{ opacity: [0.35, 1, 0.35], y: [0, -1.5, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15, ease: "easeInOut" }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: typingOnRight ? "rgba(255,255,255,0.95)" : "#0f1f3d" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: "easeOut" }}
            className="w-full rounded-[1.75rem]"
            style={{
              background: "linear-gradient(112deg, rgba(130,30,30,0.72) 0%, rgba(180,60,60,0.58) 28%, rgba(30,52,95,0.68) 62%, rgba(15,28,55,0.78) 100%)",
              boxShadow: "0 16px 48px rgba(15,31,61,0.16)",
            }}
          >
            <div
              className="w-full rounded-[1.75rem] px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-5 flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between"
              style={{ backdropFilter: "blur(12px)" }}
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
                        backgroundPosition: "100% 0%",
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
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundPosition = "100% 0%"; }}
                    >
                      {item.label}
                    </button>
                    {idx < heroNavItems.length - 1 && (
                      <span style={{ color: "rgba(15,31,61,0.25)", userSelect: "none", fontSize: "0.8rem", flexShrink: 0 }}>·</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* Separator line on mobile, vertical line on desktop */}
              <div
                className="hidden lg:block self-stretch w-px mx-4 flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.18)" }}
              />
              <div
                className="block lg:hidden h-px w-full"
                style={{ background: "rgba(255,255,255,0.18)" }}
              />

              {/* Profile – flat, right-aligned, no box */}
              <button
                onClick={() => scrollToSection("simple-contact")}
                className="flex items-center gap-3 cursor-pointer transition-opacity duration-200 self-end lg:self-auto flex-shrink-0"
                style={{ background: "none", border: "none", padding: "0.15rem 0" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                aria-label="Zum Kontakt"
              >
                <div className="text-right min-w-0">
                  <span className="block font-sora font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.92)", fontSize: "clamp(0.82rem, 0.78vw, 0.96rem)" }}>
                    Pädagoge & IT-Service
                  </span>
                  <span className="block font-sora" style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(0.72rem, 0.66vw, 0.84rem)", marginTop: "0.1rem" }}>
                    Your digital Guide
                  </span>
                </div>
                <img
                  src="/ProfSmallSmile.png"
                  alt="Jascha Kruse"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover object-top flex-shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.28)" }}
                />
              </button>
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  );
}