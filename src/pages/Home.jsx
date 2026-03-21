import React, { useState, useEffect, useRef } from "react";
import NavigationDots from "@/components/portfolio/NavigationDots";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import PricingSection from "@/components/portfolio/PricingSection";
import ContactSection from "@/components/portfolio/ContactSection";
import SimpleContactSection from "@/components/portfolio/SimpleContactSection";
import ShopDrawer from "@/components/portfolio/ShopDrawer";

const sectionIds = ["hero", "problem", "solution", "portfolio", "contact", "pricing", "simple-contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef(null);
  const [shopOpen, setShopOpen] = useState(false);
  const [shopPackage, setShopPackage] = useState(null);
  const [shopFormData, setShopFormData] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

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

  const openShop = (pkg = null, formData = null) => {
    setShopPackage(pkg);
    setShopFormData(formData);
    setShopOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none", position: "relative", zIndex: 1 }}
    >
      {/* Fixed background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #8aafd4 0%, #c5d8f0 50%, #334554 100%)",
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

      <NavigationDots activeSection={activeSection} />
      <HeroSection onDomainSelected={setSelectedDomain} />
      <AboutSection />
      <PortfolioSection />
      <ContactSection onOpenShop={openShop} prefilledDomain={selectedDomain} />
      <PricingSection onOrderClick={openShop} />
      <SimpleContactSection />

      <ShopDrawer
        open={shopOpen}
        onClose={() => setShopOpen(false)}
        preselectedPackage={shopPackage}
        formData={shopFormData}
      />
    </div>
  );
}