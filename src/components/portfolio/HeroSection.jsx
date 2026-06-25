import React from "react";
import { motion } from "framer-motion";
import { UserCircle2, Wrench, MapPin } from "lucide-react";

const heroBackgroundImage = new URL("../../../FlensburgDay.png", import.meta.url).href;
const heroSideImage = new URL("../../../public/ProfSmallSmile.png", import.meta.url).href;
const foerdeCodeLogo = new URL("../../../Förde Code Logo.svg", import.meta.url).href;

const trustCards = [
  {
    title: "Persönlich begleitet",
    text: "Ein Ansprechpartner. Von der Idee bis zur Umsetzung.",
    Icon: UserCircle2,
    tilt: "-1.8deg",
    accent: "#f7e7a3",
  },
  {
    title: "Einfach & verständlich",
    text: "Keine Technik. Kein Stress. Ich kümmer mich um die komplette Umsetzung.",
    Icon: Wrench,
    tilt: "1.2deg",
    accent: "#d8ecff",
  },
  {
    title: "Lokal erreichbar",
    text: "Direkter Kontakt aus Flensburg. Persönlich und schnell erreichbar.",
    Icon: MapPin,
    tilt: "-0.8deg",
    accent: "#f7d7dc",
  },
];


export default function HeroSection() {
  /** @param {string} id */
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden pt-24 sm:pt-28"
    >
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
          backgroundPosition: "center 25%",
          filter: "blur(3px)",
          transform: "scale(1.03)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.42)",
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
          <div className="grid items-start gap-8 lg:grid-cols-[45%_55%] lg:items-stretch lg:gap-12">
            <div className="lg:flex lg:h-full lg:flex-col lg:pr-2">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] sm:mb-4"
              style={{ color: "#425884" }}
            >
              Websites und digitale Lösungen aus Flensburg
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
                  fontSize: "clamp(1.3rem, 6vw, 3.55rem)",
                }}
              >
                <span className="block whitespace-nowrap">Websites für kleine</span>
                <span className="block whitespace-nowrap">Unternehmen.</span>
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
              Ideal für Restaurants, Selbstständige und lokale Betriebe in Flensburg und Umgebung.<br /> 
              Ich bringe Sie einfach & schnell online.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
                style={{ background: "#9e1c1c" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#861717";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#9e1c1c";
                }}
              >
                Unverbindlich anfragen
              </button>
              <button
                onClick={() => scrollToSection("projects")}
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
                Beispiele ansehen
              </button>
            </motion.div>

          </div>

            {/* Profil-Panel — rechte Spalte neben dem Text */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="self-center"
            >
              <div
                className="overflow-hidden rounded-[2rem] border"
                style={{
                  borderColor: "rgba(162,181,211,0.28)",
                  background: "rgba(248,251,255,0.76)",
                  boxShadow: "0 18px 40px rgba(26,45,78,0.12)",
                }}
              >
                <div className="flex flex-col items-start gap-6 px-6 pb-6 pt-6 sm:px-7 sm:pb-7 sm:pt-7 lg:flex-row lg:items-center lg:px-8 lg:pb-8 lg:pt-8">
                  {/* Text */}
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#ef4444" }}>
                      Persönlich. Direkt. Erreichbar.
                    </p>
                    <p className="text-xl font-semibold sm:text-2xl" style={{ color: "#1f335b" }}>
                      Moin, ich bin Jascha.
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#40547c" }}>
                    Ich baue Websites für kleine Unternehmen, die online sichtbar werden wollen.
                    Viele kleine Unternehmer haben keine Zeit oder Lust auf Technik – genau dafür bin ich da.
                    Sie kümmern sich um Ihr Geschäft, ich mache Ihre Website.
                    Schnell, unkompliziert und zu einem fairen Preis.
                    </p>
                  </div>

                  {/* Bild */}
                  <div
                    className="shrink-0 overflow-hidden rounded-2xl border lg:w-52 xl:w-60"
                    style={{
                      borderColor: "rgba(154,176,210,0.4)",
                      boxShadow: "0 8px 24px rgba(26,45,78,0.13)",
                    }}
                  >
                    <img
                      src={heroSideImage}
                      alt="Portraitbild von Jascha"
                      className="h-48 w-full object-cover object-top lg:h-56 xl:h-64"
                      loading="eager"
                    />
                  </div>
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
