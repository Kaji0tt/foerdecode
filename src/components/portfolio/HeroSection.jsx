import React from "react";
import { motion } from "framer-motion";
import { UserCircle2, Wrench, MapPin } from "lucide-react";

const placeholderLogo = new URL("../../../public/placeholder-logo.svg", import.meta.url).href;

const trustCards = [
  {
    title: "Feature One",
    text: "Placeholder text describing the first key feature or benefit of your product or service. Replace this with your actual value proposition.",
    Icon: UserCircle2,
    tilt: "-1.8deg",
    accent: "#f7e7a3",
  },
  {
    title: "Feature Two",
    text: "Placeholder text describing the second key feature. Highlight what makes your offering unique and valuable to customers.",
    Icon: Wrench,
    tilt: "1.2deg",
    accent: "#d8ecff",
  },
  {
    title: "Feature Three",
    text: "Placeholder text for the third feature. Use this space to describe your support, commitment, or another key differentiator.",
    Icon: MapPin,
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
      {/* Placeholder hero background – replace with your own image */}
      <div
        className="fixed inset-0"
        style={{
          background: "linear-gradient(135deg, #c7d8f0 0%, #dde8f7 40%, #e8eff8 70%, #f0f4fb 100%)",
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full flex-1 flex-col">
        <div className="mx-auto mt-8 flex w-full max-w-7xl flex-1 flex-col px-6 pb-20 sm:mt-12 sm:pb-24 lg:mt-15 lg:pb-28">
          <div className="grid items-start gap-8 lg:grid-cols-[45%_55%] lg:items-stretch lg:gap-12">
            <div className="lg:flex lg:h-full lg:flex-col lg:pr-2">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] sm:mb-4"
              style={{ color: "#425884" }}
            >
              Tagline · Location · Industry
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
                <span className="block whitespace-nowrap">Your Headline</span>
                <span className="block whitespace-nowrap">Goes Here.</span>
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
              Placeholder subheadline. Describe your main offering in one or two sentences. Who you help, what you do, and why it matters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                onClick={() => onContactOpen?.()}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
                style={{ background: "#9e1c1c" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#861717";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#9e1c1c";
                }}
              >
                Get in Touch
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
                See Examples
              </button>
            </motion.div>

          </div>

            {/* Profile/intro panel – right column */}
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
                      Your Tagline Here.
                    </p>
                    <p className="text-xl font-semibold sm:text-2xl" style={{ color: "#1f335b" }}>
                      Hi, I'm [Name].
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#40547c" }}>
                      Placeholder bio text. Describe who you are, your background, and what drives you. Replace this with your own story and personality. Keep it concise and engaging.
                    </p>
                  </div>

                  {/* Placeholder profile image */}
                  <div
                    className="shrink-0 overflow-hidden rounded-2xl border lg:w-52 xl:w-60"
                    style={{
                      borderColor: "rgba(154,176,210,0.4)",
                      boxShadow: "0 8px 24px rgba(26,45,78,0.13)",
                    }}
                  >
                    <div
                      className="h-48 w-full lg:h-56 xl:h-64 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #dce8f7, #c9d9ef)" }}
                    >
                      <svg viewBox="0 0 80 100" className="w-24 opacity-40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="40" cy="32" rx="20" ry="22" fill="#7a9abf"/>
                        <path d="M0 100 C0 72 80 72 80 100" fill="#7a9abf"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature cards */}
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
