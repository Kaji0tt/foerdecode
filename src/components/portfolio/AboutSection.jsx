import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const faqThreads = [
  {
    question: "Wie laeuft das Ganze ab, wenn ich mit Ihnen starte?",
    chat: [
      { side: "left", text: "Wie laeuft das Ganze ab, wenn ich mit Ihnen starte?" },
      { side: "right", text: "Sie schicken mir kurz die wichtigsten Infos zu Ihrem Geschaeft, ich erstelle daraufhin eine erste Version als klare Grundlage." },
      { side: "right", text: "Danach gehen wir die Seite gemeinsam durch und priorisieren, was als Naechstes angepasst wird." },
    ],
  },
  {
    question: "Und wenn mir bei der ersten Version etwas nicht gefaellt?",
    chat: [
      { side: "left", text: "Und wenn mir bei der ersten Version etwas nicht gefaellt?" },
      { side: "right", text: "Dann gehen wir in kurze Feedback-Runden. Sie sagen, was anders sein soll, ich passe es direkt an." },
      { side: "right", text: "So entsteht Schritt fuer Schritt eine Seite, die wirklich zu Ihnen passt." },
    ],
  },
  {
    question: "Wann geht meine Website online?",
    chat: [
      { side: "left", text: "Wann geht meine Website online?" },
      { side: "right", text: "Sobald Sie die finale Version freigeben. Danach uebernehme ich den Livegang inklusive technischer Feinheiten." },
    ],
  },
  {
    question: "Uns fehlt eine Online-Praesenz. Was uebernehmen Sie?",
    chat: [
      { side: "left", text: "Uns fehlt eine Online-Praesenz. Was uebernehmen Sie konkret?" },
      { side: "right", text: "Von Struktur und Design bis zur fertigen Umsetzung. Wenn noetig auch Domain, Rechtstexte und Basiseinstellungen." },
    ],
  },
  {
    question: "Welche rechtlichen Anforderungen beachten Sie?",
    chat: [
      { side: "left", text: "Welche rechtlichen Anforderungen beachten Sie?" },
      { side: "right", text: "Ich plane die noetigen Bausteine wie Impressum und Datenschutz direkt mit ein, damit der Auftritt sauber aufgebaut ist." },
    ],
  },
  {
    question: "Was ist, wenn spaeter Aenderungen noetig sind?",
    chat: [
      { side: "left", text: "Was ist, wenn spaeter Aenderungen noetig sind?" },
      { side: "right", text: "Je nach Paket uebernehme ich die Pflege fuer Sie oder richte alles so ein, dass Sie Inhalte einfach selbst aktualisieren koennen." },
    ],
  },
];

const messageRevealDelayMs = 1850;
const startDelayMs = 450;
const chatFontSize = "clamp(0.84rem, 0.78vw, 1.03rem)";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [activeThreadIndex, setActiveThreadIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);

  const activeThread = faqThreads[activeThreadIndex] || faqThreads[0];

  useEffect(() => {
    if (!isInView) {
      setVisibleMessages(0);
      return;
    }

    setVisibleMessages(0);

    if (prefersReducedMotion) {
      const reducedTimeout = setTimeout(() => {
        setVisibleMessages(activeThread.chat.length);
      }, 120);
      return () => clearTimeout(reducedTimeout);
    }

    /** @type {ReturnType<typeof setInterval> | undefined} */
    let interval;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setVisibleMessages((current) => {
          if (current >= activeThread.chat.length) {
            clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, messageRevealDelayMs);
    }, startDelayMs);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [activeThreadIndex, isInView, prefersReducedMotion, activeThread.chat.length]);

  const showTyping = isInView && !prefersReducedMotion && visibleMessages < activeThread.chat.length;
  const typingOnRight = activeThread.chat[visibleMessages]?.side === "right";
  const scrollToContact = () => document.getElementById("simple-contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="problem"
      className="h-screen w-full flex items-center relative overflow-hidden"
    >
      <div ref={ref} className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-8 pb-12 flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight font-sora" style={{ color: "#0f1f3d" }}>
            Fragen & Ablauf
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base" style={{ color: "#475569" }}>
            Waehlen Sie links eine Frage aus. Rechts sehen Sie den passenden Chat-Verlauf mit Antwort und naechstem Schritt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.35fr] items-stretch gap-6 lg:gap-8 min-h-0">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-3xl p-4 sm:p-5 lg:p-6"
            style={{
              background: "rgba(255,255,255,0.68)",
              border: "1px solid rgba(30,58,110,0.14)",
              boxShadow: "0 12px 40px rgba(30,58,110,0.08)",
            }}
          >
            <div className="flex flex-col gap-2">
              {faqThreads.map((thread, index) => {
                const isActive = index === activeThreadIndex;
                return (
                  <button
                    key={thread.question}
                    type="button"
                    onClick={() => setActiveThreadIndex(index)}
                    className="w-full text-left rounded-2xl px-4 py-3 transition-all"
                    style={{
                      background: isActive ? "rgba(15,31,61,0.12)" : "rgba(255,255,255,0.74)",
                      border: isActive ? "1px solid rgba(15,31,61,0.3)" : "1px solid rgba(30,58,110,0.12)",
                      color: isActive ? "#0f1f3d" : "#334155",
                    }}
                  >
                    <span className="text-sm sm:text-[0.95rem] font-medium leading-snug">{thread.question}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            key={`thread-${activeThreadIndex}`}
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.62, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[1.75rem] min-h-[min(52vh,490px)]"
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

            <div className="relative z-10 h-full p-4 sm:p-5 lg:p-6 flex flex-col gap-3.5">
              <button
                type="button"
                onClick={scrollToContact}
                className="w-full flex items-center justify-between gap-3 cursor-pointer transition-opacity duration-200"
                style={{ background: "none", border: "none", padding: "0" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                aria-label="Zum Kontakt"
              >
                <div className="min-w-0 flex-1 text-right">
                  <span className="block font-sora font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(0.96rem, 1.02vw, 1.2rem)" }}>
                    Jascha Kruse
                  </span>
                  <span className="block font-sora" style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(0.78rem, 0.78vw, 0.92rem)", marginTop: "0.15rem" }}>
                    IT, Service & Design
                  </span>
                </div>
                <img
                  src="/ProfSmallSmile.png"
                  alt="Jascha Kruse"
                  className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl object-cover object-top flex-shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.28)" }}
                />
              </button>

              <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.18)" }} aria-hidden="true" />

              <p className="text-xs sm:text-sm uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.62)" }}>
                Simulierter Verlauf
              </p>

              <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-[clamp(8px,1.2vh,14px)]">
                {activeThread.chat.map((message, index) => {
                  const isVisible = index < visibleMessages;
                  const isRight = message.side === "right";
                  return (
                    <motion.div
                      key={`${activeThreadIndex}-${message.side}-${index}`}
                      initial={{ opacity: 0, x: isRight ? 18 : -18, y: 6 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        x: isVisible ? 0 : (isRight ? 18 : -18),
                        y: isVisible ? 0 : 6,
                      }}
                      transition={{ duration: 0.38, ease: "easeOut" }}
                      className={`flex ${isRight ? "justify-end" : "justify-start"}`}
                      aria-hidden={!isVisible}
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
                                fontSize: chatFontSize,
                                paddingInline: "clamp(10px, 0.9vw, 14px)",
                                paddingBlock: "clamp(7px, 0.8vh, 12px)",
                              }
                            : {
                                background: "rgba(255,255,255,0.5)",
                                color: "#0f1f3d",
                                border: "1px solid rgba(15,31,61,0.18)",
                                fontSize: chatFontSize,
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
                      style={{
                        background: typingOnRight ? "rgba(15,31,61,0.1)" : "rgba(255,255,255,0.1)",
                        border: typingOnRight ? "1px solid rgba(15,31,61,0.85)" : "1px solid rgba(15,31,61,0.18)",
                        paddingInline: "clamp(10px, 0.9vw, 14px)",
                        paddingBlock: "clamp(7px, 0.8vh, 12px)",
                      }}
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
      </div>
    </section>
  );
}