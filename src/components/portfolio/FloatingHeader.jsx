import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const foerdeCodeLogo = new URL("../../../Förde Code Logo.svg", import.meta.url).href;

export default function FloatingHeader({ activeSection, onContactOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const idleTimer = React.useRef(null);
  const inTopZone = React.useRef(false);

  const startHideTimer = () => {
    clearTimeout(idleTimer.current);
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      idleTimer.current = setTimeout(() => setVisible(false), 1000);
    }
  };

  const isInHero = () => window.scrollY < window.innerHeight * 0.85;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setVisible(true);
      if (isInHero()) {
        // Im Hero: immer sichtbar
        setVisible(true);
        clearTimeout(idleTimer.current);
      } else {
        // Außerhalb: nach dem Scrollen wieder verstecken (außer Cursor ist oben)
        if (!inTopZone.current && !menuOpen) startHideTimer();
      }
    };

    const onMouseMove = (e) => {
      const nowInTop = e.clientY < 80;
      if (nowInTop && !inTopZone.current) {
        inTopZone.current = true;
        setVisible(true);
        clearTimeout(idleTimer.current);
      } else if (!nowInTop && inTopZone.current) {
        inTopZone.current = false;
        if (!isInHero() && !menuOpen) startHideTimer();
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(idleTimer.current);
    };
  }, [menuOpen]);

  const navItems = [
    { label: "Start", id: "hero" },
    { label: "Ablauf", id: "services" },
    { label: "Über mich", id: "about" },
    { label: "Projekte", id: "projects" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Wenn Menü offen ist, nicht verschwinden lassen
  useEffect(() => {
    if (menuOpen) {
      clearTimeout(idleTimer.current);
      setVisible(true);
    } else if (!isInHero()) {
      startHideTimer();
    }
    return () => clearTimeout(idleTimer.current);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div
        className="mx-auto mt-4 w-full max-w-7xl rounded-xl px-4 py-2 sm:px-6"
        style={{
          background: scrolled ? "rgba(245,249,255,0.8)" : "rgba(245,249,255,0.8)",
          border: scrolled ? "1px solid rgba(151,170,198,0.32)" : "1px solid rgba(151,170,198,0.32)",
          backdropFilter: "blur(9px)",
          WebkitBackdropFilter: "blur(9px)",
          boxShadow: scrolled ? "0 10px 26px rgba(26,45,78,0.12)" : "0 4px 12px rgba(26,45,78,0.06)",
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
            <span className="text-xs font-semibold uppercase tracking-[0.08em] sm:text-base sm:tracking-[0.14em]" style={{ color: "#1f335b" }}>
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { onContactOpen?.(); }}
              aria-label="Rückruf-Ablauf besprechen"
              className="rounded-lg px-2 py-2 text-xs font-semibold text-white transition-colors sm:px-4 sm:text-sm"
              style={{ background: "#9e1c1c" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#861717";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#9e1c1c";
              }}
            >
              <span className="md:hidden">Besprechen</span>
              <span className="hidden md:inline">Rückruf-Ablauf besprechen</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-lg p-2 md:hidden"
              style={{ color: "#1e3158" }}
              aria-label={menuOpen ? "Navigation schließen" : "Navigation öffnen"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 pb-2 pt-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="rounded-md border-l-2 px-4 py-2 text-left text-sm font-medium transition-colors"
                    style={{
                      color: "#1e3158",
                      borderLeftColor: activeSection === item.id ? "#dc2626" : "transparent",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}