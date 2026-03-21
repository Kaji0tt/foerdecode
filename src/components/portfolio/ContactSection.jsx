import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { base44 } from "@/api/base44Client";
import DemoPreview from "./DemoPreview";
import MagicWebBot from "./MagicWebBot";

export default function ContactSection({ onOpenShop }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showDemo, setShowDemo] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (form) => {
    setFormData(form);
    setShowDemo(true);
  };

  const handleDemoOrder = () => {
    setShowDemo(false);
    onOpenShop(null, formData);
  };

  return (
    <>
      {showDemo && (
        <DemoPreview
          formData={formData}
          onBack={() => setShowDemo(false)}
          onOrder={handleDemoOrder}
        />
      )}

      <section
        id="contact"
        className="min-h-screen w-full flex items-center relative overflow-visible snap-start"
      >
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(30,58,110,0.1)" }} />

        {/* Subtle accent stripe at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #1e3a6e, #b91c1c)" }} />

        <div ref={ref} className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-8 pb-16 flex flex-col justify-center">
          {/* Magic Web Bot */}
          <MagicWebBot onSubmit={handleFormSubmit} isInView={isInView} />
        </div>
      </section>
    </>
  );
}