import React, { useState, useEffect, useRef } from "react";
import NavigationDots from "@/components/portfolio/NavigationDots";
import HeroSection from "@/components/portfolio/HeroSection";
import ProblemSection from "@/components/portfolio/ProblemSection";
import SolutionSection from "@/components/portfolio/SolutionSection";
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
      style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <NavigationDots activeSection={activeSection} />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <PortfolioSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
}