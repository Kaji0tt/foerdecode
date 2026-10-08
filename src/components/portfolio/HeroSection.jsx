import React from "react";
import { motion } from "framer-motion";
import { PhoneMissed, ClipboardList, UserCircle2 } from "lucide-react";

const heroBackgroundImage = new URL("../../../FlensburgDay.png", import.meta.url).href;

const trustCards = [
  {
    title: "Anfrage auffangen",
    text: "Verpasster Anruf oder Webanfrage: ein strukturierter Einstieg statt verstreuter Nachrichten.",
    Icon: PhoneMissed,
    tilt: "-1.8deg",
    accent: "#f7e7a3",
  },
  {
    title: "Rückruf vorbereiten",
    text: "Serviceart, selbst genannte Dringlichkeit, Einsatz-PLZ und Rückrufwunsch zusammenfassen.",
    Icon: ClipboardList,
    tilt: "1.2deg",
    accent: "#d8ecff",
  },
  {
    title: "Menschen entscheiden",
    text: "Dein Team prüft die Zusammenfassung und übernimmt den persönlichen Rückruf.",
    Icon: UserCircle2,
    tilt: "-0.8deg",
    accent: "#f7d7dc",
  },
];


export default function HeroSection({ onContactOpen }) {
  /** @param {string} id */
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col pt-24 sm:pt-28"
    >
      <div
        className="fixed inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
          backgroundPosition: "center 25%",
          filter: "blur(3px)",
          transform: "scale(1.03)",
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.72)",
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full flex-1 flex-col">
        {/*
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="-mt-8 w-full py-2 sm:-mt-12 sm:py-3 lg:-mt-15"
        >
          <div className="mx-auto w-full max-w-7xl px-6">
            <div
              className="mx-auto flex w-fit max-w-full items-center"
              style={{ gap: "clamp(0.7rem, 1.7vw, 2rem)" }}
            >
              <img
                src={foerdeCodeLogo}
                alt="Foerde Code Logo"
                className="w-auto shrink-0"
                style={{ height: "clamp(2.6rem, 6.8vw, 6rem)" }}
                loading="eager"
              />

              <div className="min-w-0">
                <p
                  className="font-sora font-bold leading-[0.95]"
                  style={{
                    fontSize: "clamp(2rem, 6.2vw, 5.2rem)",
                    letterSpacing: "clamp(0.01em, 0.2vw, 0.04em)",
                  }}
                >
                  <span style={{ color: "#153368" }}>FÖRDE</span>
                  <span style={{ color: "#b42327" }}>CODE</span>
                </p>

                <div className="mt-2 sm:mt-3">
                  <p
                    className="text-center font-semibold uppercase"
                    style={{
                      color: "#425884",
                      fontSize: "clamp(0.54rem, 1.05vw, 0.8rem)",
                      letterSpacing: "clamp(0.1em, 0.35vw, 0.16em)",
                    }}
                  >
                    Websites und digitale Loesungen aus Flensburg
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        <div className="mx-auto mt-3 w-full max-w-7xl px-6 sm:mt-4 lg:mt-5" aria-hidden="true">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(64,93,134,0) 0%, rgba(64,93,134,0.24) 22%, rgba(64,93,134,0.24) 78%, rgba(64,93,134,0) 100%)",
            }}
          />
        </div>
        */}

        <div className="mx-auto mt-8 flex w-full max-w-7xl flex-1 flex-col px-6 pb-20 sm:mt-12 sm:pb-24 lg:mt-15 lg:pb-28">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
            <div className="lg:flex lg:h-full lg:flex-col lg:pr-2">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] sm:mb-4"
              style={{ color: "#425884" }}
            >
              Für kleine Heizungs- & Sanitärbetriebe · aus Flensburg
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            >
              <h1
                className="max-w-[42rem] font-sora font-bold leading-[1.08] tracking-tight lg:max-w-[31rem] xl:max-w-[42rem]"
                style={{
                  color: "#1a2f58",
                  fontSize: "clamp(2rem, 6vw, 3.55rem)",
                }}
              >
                <span className="block">Verpasster Anruf?</span>
                <span className="block">Klarer Rückruf.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-6 max-w-[38rem]"
            >
              <p
                className="text-base leading-relaxed sm:text-lg"
                style={{
                  color: "#3c4f76",
                }}
              >
                Du bist beim Kunden, das Telefon klingelt. Ich entwickle mit dir einen KI-gestützten Ablauf, der verpasste Anrufe und Webanfragen auffängt und Rückrufe vorbereitet: Serviceart, vom Anrufer genannte Dringlichkeit, Einsatz-Postleitzahl und Rückrufwunsch. Dein Team prüft die Zusammenfassung und übernimmt persönlich.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                onClick={() =>
                  onContactOpen?.(
                    "Ich möchte den Rückruf-Ablauf für verpasste Anrufe und Webanfragen besprechen. Mein Betrieb, Einsatzgebiet und bisheriger Ablauf: "
                  )
                }
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
                style={{ background: "#9e1c1c" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#861717";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#9e1c1c";
                }}
              >
                Rückruf-Ablauf besprechen
              </button>
              <button
                onClick={() => scrollToSection("demo")}
                className="rounded-xl border px-6 py-3 text-sm font-semibold transition-colors"
                style={{
                  borderColor: "rgba(108,133,171,0.45)",
                  color: "#233965",
                  background: "rgba(248,251,255,0.78)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,245,253,0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(248,251,255,0.78)";
                }}
              >
                Demo-Ablauf ansehen
              </button>
            </motion.div>

          </div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              id="demo"
              className="self-center scroll-mt-28"
            >
              <div
                className="overflow-hidden rounded-[2rem] border"
                style={{
                  borderColor: "rgba(162,181,211,0.28)",
                  background: "rgba(248,251,255,0.76)",
                  boxShadow: "0 18px 40px rgba(26,45,78,0.12)",
                }}
              >
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#9e1c1c" }}>
                    Synthetisches Beispiel · keine echten Kundendaten
                  </p>
                  <h2 className="mt-3 font-sora text-xl font-semibold sm:text-2xl" style={{ color: "#1f335b" }}>
                    So könnte die Übergabe aussehen.
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#40547c" }}>
                    Beispielquelle: verpasster Anruf. Eine Webanfrage würde dieselben Angaben strukturiert erfassen.
                  </p>
                  <dl className="mt-6 space-y-4 text-sm" style={{ color: "#40547c" }}>
                    {[
                      ["Serviceart", "Heizungsreparatur – Heizung bleibt kalt"],
                      ["Dringlichkeit laut Anrufer", "„Möglichst heute“ – nicht fachlich bewertet"],
                      ["Postleitzahl des Einsatzorts", "24937 (fiktiver Einsatz)"],
                      ["Rückrufwunsch", "Telefonisch, nach 15 Uhr"],
                    ].map(([label, value]) => (
                      <div key={label} className="border-b border-[#dce4ef] pb-3">
                        <dt className="font-semibold" style={{ color: "#1f335b" }}>{label}</dt>
                        <dd className="mt-1">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 rounded-xl bg-[#e8eef7] p-4 text-sm" style={{ color: "#1f335b" }}>
                    <p className="font-semibold">Nächster Schritt: Prüfung durch dein Team</p>
                    <p className="mt-1 leading-relaxed">Angaben prüfen, offene Fragen klären, persönlich zurückrufen. Noch kein Termin und kein Angebot.</p>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed" style={{ color: "#40547c" }}>
                    Nur eine Illustration, kein Live-System. Es wird kein Anruf ausgelöst und keine Anfrage gespeichert.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sticky Notes — vertikal zentriert im verbleibenden Viewport-Raum */}
          <div className="flex flex-1 items-center pt-8 sm:pt-10 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="w-full grid gap-6 sm:grid-cols-3"
          >
            {trustCards.map((card, index) => (
              <article
                key={card.title}
                className="relative overflow-hidden rounded-[1.4rem] border px-5 py-4 sm:px-6 sm:py-5"
                style={{
                  borderColor: "rgba(159,180,209,0.34)",
                  background: "rgba(252,253,255,0.92)",
                  transform: `rotate(${card.tilt}) translateX(${index % 2 === 0 ? "-6px" : "4px"})`,
                  boxShadow: "0 12px 26px rgba(26,45,78,0.11)",
                }}
              >
                <div
                  className="absolute left-0 top-0 h-full w-2"
                  style={{ background: card.accent }}
                  aria-hidden="true"
                />
                <div className="absolute right-4 top-4 h-3 w-3 rounded-full" style={{ background: card.accent }} aria-hidden="true" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md"
                      style={{ background: `${card.accent}80` }}
                    >
                      <card.Icon className="h-4 w-4" style={{ color: "#2f4c79" }} />
                    </span>
                    <h3 className="text-sm font-semibold" style={{ color: "#213a66" }}>
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed sm:text-sm" style={{ color: "#4a6188" }}>
                    {card.text}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
          </div>
        </div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[11]" aria-hidden="true">
        <svg viewBox="0 0 1440 120" className="h-24 w-full sm:h-28 lg:h-32" preserveAspectRatio="none">
          <path
            d="M0,8 C180,70 500,89 820,48 C1080,18 1260,10 1440,40 L1440,120 L0,120 Z"
            fill="rgba(242,245,251,0.96)"
          />
        </svg>
      </div>
    </section>
  );
}
