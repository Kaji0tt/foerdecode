import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const heroChatMessageSets = [
  [
    { side: "left", text: "Uns fehlt eine Online-Präsenz für unser Restaurant. Was können Sie tun?" },
    { side: "right", text: "Beschreiben Sie ihr Restaurant - wie ist das Ambiente, welche Art von Küche bieten Sie an?" },
    { side: "right", text: "Falls Sie noch keine Internetadresse haben, kann ich Ihnen ebenfalls eine erstellen und einrichten." },
  ],
  [
    { side: "left", text: "Welche rechtlichen Anforderungen muss ich beachten?" },
    { side: "right", text: "Keine Sorge, ich kümmere mich um die Erfüllung der rechtlichen Anforderungen, wieDatenschutz und Impressum." },
  ],
  [
    { side: "left", text: "Was passiert, wenn die Website aktualisiert werden muss?" },
    { side: "right", text: "Das hängt von dem Service, für den Sie sich entschieden haben ab. Im Full-Service übernehme ich die Aktualisierungen für Sie. " },
        { side: "right", text: "Wenn Sie lediglich die Inhalte selbst pflegen möchten, kann ich Ihnen eine einfache Möglichkeit zur Selbstverwaltung bereitstellen." },
  ],
  [
    { side: "left", text: "Wie lange dauert es, bis meine erste Version online ist?" },
    { side: "right", text: "Das hängt davon ab, wie umfangreich Ihre Anforderungen sind. Bei einer einfachen Website kann ich in wenigen Tagen eine erste Version bereitstellen." },
  ],
];

const messageRevealDelayMs = 3900;
const secondTypingDelayMs = 700;
const interactionStartDelayMs = 2000;
const sharedBodyFontSize = "clamp(0.84rem, 0.78vw, 1.03rem)";

const heroNavItems = [
  { label: "Wie funktioniert das?", id: "problem" },
  { label: "Beispiele", id: "portfolio" },
  { label: "Vorschau erstellen", id: "contact" },
  { label: "Preise", id: "pricing" },
  { label: "Kontakt", id: "simple-contact" },
];

const heroBackgroundImage = new URL("../../../FlensburgNight.jpg", import.meta.url).href;


/**
 * @param {{ activeSection?: string }} props
 */
export default function HeroSection({ activeSection }) {
  const chatRef = useRef(null);
  const chatInView = useInView(chatRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [heroChatMessages] = useState(() => {
    const randomIndex = Math.floor(Math.random() * heroChatMessageSets.length);
    return heroChatMessageSets[randomIndex] || heroChatMessageSets[0];
  });
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [interactionStarted, setInteractionStarted] = useState(false);
  const [secondTypingReady, setSecondTypingReady] = useState(false);

  useEffect(() => {
    if (!chatInView) {
      setInteractionStarted(false);
      setVisibleMessages(0);
      return;
    }

    setInteractionStarted(false);
    setVisibleMessages(0);

    if (prefersReducedMotion) {
      const reducedTimeout = setTimeout(() => {
        setInteractionStarted(true);
        setVisibleMessages(heroChatMessages.length);
      }, interactionStartDelayMs);
      return () => clearTimeout(reducedTimeout);
    }

    /** @type {ReturnType<typeof setInterval> | undefined} */
    let interval;
    const startTimeout = setTimeout(() => {
      setInteractionStarted(true);
      interval = setInterval(() => {
        setVisibleMessages((current) => {
          if (current >= heroChatMessages.length) {
            clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, messageRevealDelayMs);
    }, interactionStartDelayMs);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [chatInView, prefersReducedMotion]);

  useEffect(() => {
    if (!chatInView || prefersReducedMotion) {
      setSecondTypingReady(true);
      return;
    }

    if (visibleMessages !== 1) {
      setSecondTypingReady(false);
      return;
    }

    const timeout = setTimeout(() => {
      setSecondTypingReady(true);
    }, secondTypingDelayMs);

    return () => clearTimeout(timeout);
  }, [chatInView, visibleMessages, prefersReducedMotion]);

  const showTyping =
    interactionStarted &&
    chatInView &&
    !prefersReducedMotion &&
    visibleMessages < heroChatMessages.length &&
    (visibleMessages === 0 || secondTypingReady);
  const typingOnRight = heroChatMessages[visibleMessages]?.side === "right";
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

            <button
              onClick={() => scrollToSection("simple-contact")}
              className="relative z-10 w-full flex items-center justify-between gap-4 cursor-pointer transition-opacity duration-200"
              style={{ background: "none", border: "none", padding: "0.35rem 0" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.9"; }}
              aria-label="Zum Kontakt"
            >
              <div className="min-w-0 flex-1 text-right">
                <span className="block font-sora font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(0.98rem, 1.18vw, 1.34rem)" }}>
                  Jascha Kruse
                </span>
                <span className="block font-sora" style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(0.82rem, 0.82vw, 1rem)", marginTop: "0.2rem" }}>
                  IT, Service & Design
                </span>
              </div>
              <img
                src="/ProfSmallSmile.png"
                alt="Jascha Kruse"
                className="h-16 w-16 sm:h-20 sm:w-20 lg:h-[5.25rem] lg:w-[5.25rem] rounded-2xl object-cover object-top flex-shrink-0"
                style={{ border: "1px solid rgba(255,255,255,0.28)" }}
              />
            </button>

            <div
              className="relative z-10 w-full h-px"
              style={{ background: "rgba(255,255,255,0.22)" }}
              aria-hidden="true"
            />

            <p
              className="relative z-10 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "clamp(0.92rem, 0.95vw, 1.08rem)",
              }}
            >
              Sie kümmern sich um Ihr Geschäft – und ich mich um Ihre Online-Präsenz. Kein Technik-Wissen nötig.
            </p>

            <div
              ref={chatRef}
              className="flex-1 w-full min-h-0"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="h-full flex flex-col justify-start gap-[clamp(8px,1.2vh,14px)]">
                {heroChatMessages.map((message, index) => {
                  const isVisible = index < visibleMessages;
                  const isRight = message.side === "right";
                  return (
                    <motion.div
                      key={`${message.side}-${index}`}
                      initial={{ opacity: 0, x: isRight ? 20 : -20, y: 6 }}
                      animate={
                        prefersReducedMotion
                          ? { opacity: isVisible ? 1 : 0, x: 0, y: 0 }
                          : {
                              opacity: isVisible ? 1 : 0,
                              x: isVisible ? 0 : (isRight ? 20 : -20),
                              y: isVisible ? 0 : 6,
                            }
                      }
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className={`flex ${isRight ? "justify-end" : "justify-start"}`}
                      aria-hidden={!isVisible}
                      tabIndex={!isVisible ? -1 : undefined}
                      style={!isVisible ? { pointerEvents: "none", userSelect: "none" } : undefined}
                    >
                      <div
                        className="max-w-[94%] rounded-2xl leading-relaxed break-words"
                        style={
                          isRight
                            ? {
                                background: "rgba(15,31,61,0.5)",
                                color: "#ffffff",
                                border: "1px solid rgba(15,31,61,0.85)",
                                fontSize: sharedBodyFontSize,
                                paddingInline: "clamp(10px, 0.9vw, 14px)",
                                paddingBlock: "clamp(7px, 0.8vh, 12px)",
                              }
                            : {
                                background: "rgba(255,255,255,0.5)",
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
                              background: "rgba(15,31,61,0.1)",
                              border: "1px solid rgba(15,31,61,0.85)",
                              paddingInline: "clamp(10px, 0.9vw, 14px)",
                              paddingBlock: "clamp(7px, 0.8vh, 12px)",
                            }
                          : {
                              background: "rgba(255,255,255,0.1)",
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

            </div>
          </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[min(95vw,1120px)] z-50 overflow-hidden rounded-[1.75rem]"
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
        </div>

      </div>

    </section>
  );
}