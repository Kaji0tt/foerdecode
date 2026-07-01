import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const foerdeCodeLogo = new URL("../../../Förde Code Logo.svg", import.meta.url).href;

export default function FloatingHeader({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Start", id: "hero" },
    { label: "Angebot", id: "services" },
    { label: "Beispiele", id: "projects" },
    { label: "Preise", id: "pricing" },
    { label: "Kontakt", id: "contact" },
  ];

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div
        className="mx-auto mt-4 w-full max-w-7xl rounded-xl px-4 py-2 sm:px-6"
        style={{
          background: scrolled ? "rgba(245,249,255,0.8)" : "transparent",
          border: scrolled ? "1px solid rgba(151,170,198,0.32)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(9px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(9px)" : "none",
          boxShadow: scrolled ? "0 10px 26px rgba(26,45,78,0.12)" : "none",
          transition: "background 220ms ease, border-color 220ms ease, backdrop-filter 220ms ease, box-shadow 220ms ease",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 rounded-lg px-1 py-1 sm:gap-3"
          >
            <img src={foerdeCodeLogo} alt="Foerde Code Logo" className="h-8 w-auto" />
            <span className="text-sm font-semibold uppercase tracking-[0.12em] max-[430px]:hidden sm:text-base sm:tracking-[0.14em]" style={{ color: "#1f335b" }}>
              FÖRDECODE
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-md border-b-2 px-3 py-2 text-sm font-medium transition-colors"
                style={{
                  color: "#1e3158",
                  borderBottomColor: activeSection === item.id ? "#dc2626" : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#122648";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#1e3158";
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-white transition-colors sm:px-4"
            style={{ background: "#9e1c1c" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#861717";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#9e1c1c";
            }}
          >
            Anfragen
          </button>
        </div>

        <div className="mt-2 flex w-full justify-center gap-1 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="rounded-md border-b-2 px-2 py-1 text-xs font-medium"
              style={{
                color: "#1e3158",
                borderBottomColor: activeSection === item.id ? "#dc2626" : "transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
}