import React, { useState, useEffect, useRef } from "react";
import NavigationDots from "@/components/portfolio/NavigationDots";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import PricingSection from "@/components/portfolio/PricingSection";
import ContactSection from "@/components/portfolio/ContactSection";

const sectionIds = ["hero", "problem", "solution", "portfolio", "pricing", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: container,
        threshold: 0.4,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none", position: "relative", zIndex: 1 }}
    >
      {/* Fixed background — visible through all sections until contact */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #bfdbfe 0%, #e0f2fe 40%, #f0f9ff 70%, #ffffff 100%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 20% 30%, #93c5fd, transparent), radial-gradient(ellipse 60% 40% at 80% 70%, #bae6fd, transparent)",
          zIndex: 0,
        }}
      />
      {/* Rising sun glow — bottom right */}
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: 0,
          right: 0,
          width: "90%",
          height: "72%",
          background: "radial-gradient(ellipse 100% 100% at 100% 100%, rgba(251,191,36,0.55) 0%, rgba(249,115,22,0.35) 30%, rgba(251,191,36,0.15) 55%, transparent 75%)",
          zIndex: 0,
          animation: "sunPulse 4s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes sunPulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
      `}</style>

      <NavigationDots activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
}