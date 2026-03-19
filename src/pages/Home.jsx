import React, { useState, useEffect } from "react";
import NavigationDots from "@/components/portfolio/NavigationDots";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import PricingSection from "@/components/portfolio/PricingSection";
import ContactSection from "@/components/portfolio/ContactSection";

const sectionIds = ["hero", "problem", "portfolio", "pricing", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Fixed background — stays behind everything */}
      <div className="fixed inset-0 z-0">
        {/* Main gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #bfdbfe 0%, #e0f2fe 40%, #f0f9ff 70%, #ffffff 100%)",
          }}
        />
        {/* Water texture */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 30%, #93c5fd, transparent), radial-gradient(ellipse 60% 40% at 80% 70%, #bae6fd, transparent)",
          }}
        />
      </div>

      <NavigationDots activeSection={activeSection} />

      {/* Scrollable content on top of the fixed background */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <PricingSection />
        <ContactSection />
      </div>
    </div>
  );
}