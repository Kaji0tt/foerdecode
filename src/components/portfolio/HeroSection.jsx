import React from "react";
import { motion } from "framer-motion";
import { UserCircle2, Wrench, MapPin } from "lucide-react";

const heroBackgroundImage = new URL("../../../FlensburgDay.png", import.meta.url).href;
const heroSideImage = new URL("../../../public/ProfSmallSmile.png", import.meta.url).href;

const trustCards = [
  {
    title: "Persoenlich statt Agentur",
    text: "Direkter Kontakt, klare Abstimmung.",
    Icon: UserCircle2,
  },
  {
    title: "Einfache Wartung",
    text: "Updates und Pflege ohne Komplexität, entsprechend Ihr Vorstellungen.",
    Icon: Wrench,
  },
  {
    title: "Lokal und erreichbar",
    text: "Aus Flensburg, fuer Flensburg und Umgebung.",
    Icon: MapPin,
  },
];


export default function HeroSection() {
  /** @param {string} id */
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 sm:pt-32"
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 sm:pb-24 lg:pb-28">
        <div className="grid items-start gap-10 lg:grid-cols-[1.22fr_0.78fr] lg:gap-14">
          <div className="lg:pr-4">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 text-sm font-medium uppercase tracking-[0.16em]"
              style={{ color: "#4f648d" }}
            >
              Websites und digitale Loesungen aus Flensburg
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            >
              <h1
                className="max-w-[42rem] font-sora text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: "#1a2f58" }}
              >
                Einfache Websites mit starker <span style={{ color: "#ef4444" }}>Wirkung</span>.
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
                Ich entwickle moderne Websites und digitale Loesungen fuer Unternehmen,
                Selbststaendige und lokale Projekte. Persoenlich, direkt und ohne Agentur-Umwege.
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
                Projekt anfragen
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

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex flex-col lg:mt-10"
          >
            <div
              className="flex flex-col gap-5 rounded-2xl border p-5 sm:p-6"
              style={{
                borderColor: "rgba(162,181,211,0.28)",
                background: "rgba(248,251,255,0.74)",
                boxShadow: "0 18px 40px rgba(26,45,78,0.12)",
              }}
            >
              <div>
                <div
                  className="float-right mb-3 ml-4 w-36 overflow-hidden rounded-xl border sm:w-40"
                  style={{ borderColor: "rgba(154,176,210,0.32)" }}
                >
                  <img
                    src={heroSideImage}
                    alt="Portraitbild von Jascha"
                    className="h-44 w-full object-cover object-top sm:h-48"
                    loading="eager"
                  />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#ef4444" }}>
                  Persönlich. Direkt.
                </p>
                <p className="mt-3 text-lg font-semibold sm:text-xl" style={{ color: "#1f335b" }}>
                  Moin, ich bin Jascha.
                </p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#40547c" }}>
                  Ich begleite Unternehmen mit klaren Websites und digitaler Umsetzung, unkompliziert und nahbar.
                  Von der Struktur bis zum Livegang erhalten Sie eine Loesung, die zu Ihrem Alltag passt und
                  sich einfach weiterentwickeln laesst.
                </p>
                <div className="clear-both" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-12 grid gap-3 sm:grid-cols-3 lg:mt-14"
        >
          {trustCards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border px-4 py-3"
              style={{
                borderColor: "rgba(163,183,212,0.28)",
                color: "#35507a",
                background: "rgba(249,252,255,0.9)",
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md"
                  style={{ background: "rgba(112,142,186,0.16)" }}
                >
                  <card.Icon className="h-4 w-4" style={{ color: "#2f4c79" }} />
                </span>
                <h3 className="text-sm font-semibold" style={{ color: "#213a66" }}>
                  {card.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#4a6188" }}>
                {card.text}
              </p>
            </article>
          ))}
        </motion.div>
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