import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import PricingSection from "@/components/portfolio/PricingSection";
import SimpleContactSection from "@/components/portfolio/SimpleContactSection";
import ShopDrawer from "@/components/portfolio/ShopDrawer";

const sectionIds = ["hero", "problem", "portfolio", "pricing", "simple-contact"];
const sectionEntryThreshold = 0.3;
const observerThreshold = 0.45;

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef(null);
  const [shopOpen, setShopOpen] = useState(false);
  const [shopPackage, setShopPackage] = useState(null);
  const [shopFormData, setShopFormData] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > sectionEntryThreshold) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: container,
        threshold: observerThreshold,
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
      className="h-screen overflow-hidden flex"
      style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none", position: "relative", zIndex: 1 }}
    >
      {/* Fixed background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #8aafd4 0%, #c5d8f0 50%, #e8f0fa 100%)",
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

      <div className="w-screen h-screen shrink-0 overflow-hidden">
        <motion.div
          key={activeSection === "hero" ? "hero-active" : "hero-idle"}
          className="w-full h-full"
          initial={{ x: -80, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <HeroSection activeSection={activeSection} />
        </motion.div>
      </div>
      <div className="w-screen h-screen shrink-0 overflow-hidden">
        <motion.div
          key={activeSection === "problem" ? "problem-active" : "problem-idle"}
          className="w-full h-full"
          initial={{ x: -80, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <AboutSection />
        </motion.div>
      </div>
      <div className="w-screen h-screen shrink-0 overflow-hidden">
        <motion.div
          key={activeSection === "portfolio" ? "portfolio-active" : "portfolio-idle"}
          className="w-full h-full"
          initial={{ x: -80, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <PortfolioSection />
        </motion.div>
      </div>
      <div className="w-screen h-screen shrink-0 overflow-hidden">
        <motion.div
          key={activeSection === "pricing" ? "pricing-active" : "pricing-idle"}
          className="w-full h-full"
          initial={{ x: -80, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <PricingSection onOrderClick={openShop} />
        </motion.div>
      </div>
      <div className="w-screen h-screen shrink-0 overflow-hidden">
        <motion.div
          key={activeSection === "simple-contact" ? "simple-contact-active" : "simple-contact-idle"}
          className="w-full h-full"
          initial={{ x: -80, opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <SimpleContactSection />
        </motion.div>
      </div>

      <ShopDrawer
        open={shopOpen}
        onClose={() => setShopOpen(false)}
        preselectedPackage={shopPackage}
        formData={shopFormData}
      />
    </div>
  );
}