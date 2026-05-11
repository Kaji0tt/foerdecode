import React, { useEffect, useState } from "react";
import HeroSection from "@/components/portfolio/HeroSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import PricingSection from "@/components/portfolio/PricingSection";
import SimpleContactSection from "@/components/portfolio/SimpleContactSection";
import FloatingHeader from "@/components/portfolio/FloatingHeader";
import ProcessSection from "@/components/portfolio/ProcessSection";

const sectionIds = ["hero", "services", "process", "projects", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        entries.forEach((entry) => {
          if (entry.target.id === visible[0].target.id) setActiveSection(entry.target.id);
        });
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-15% 0px -45% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ scrollBehavior: "smooth", backgroundColor: "#f2f5fb" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <div className="absolute inset-0" style={{ background: "#edf2f8" }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 44% at 8% 6%, rgba(125,155,196,0.22), transparent 66%), radial-gradient(ellipse 48% 32% at 88% 14%, rgba(192,60,60,0.12), transparent 74%)",
          }}
        />
      </div>
      <FloatingHeader activeSection={activeSection} />

      <main className="relative z-10">
        <div className="relative">
          <HeroSection />
          <div
            className="pointer-events-none absolute left-0 right-0 top-full z-[1] -mt-px h-32 sm:h-40 lg:h-48"
            style={{
              background: "linear-gradient(180deg, rgba(242,245,251,0.96) 0%, rgba(242,245,251,0.6) 42%, rgba(242,245,251,0) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="relative z-[2]">
          <ProcessSection />
          <PricingSection />
          <PortfolioSection />
          <SimpleContactSection />
        </div>
      </main>
    </div>
  );
}