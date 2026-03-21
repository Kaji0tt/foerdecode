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



        <div ref={ref} className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-8 pb-16 flex flex-col justify-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight font-sora" style={{ color: "#0f1f3d" }}>
              In Tagen{" "}
              <span style={{ color: "#9E0000" }}>statt Wochen.</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed" style={{ color: "#475569" }}>
              Erzählen Sie von Ihrem Geschäft – ich zeige Ihnen eine unverbindliche, kostenlose Vorschau.
            </p>
          </motion.div>

          {/* Magic Web Bot */}
          <MagicWebBot onSubmit={handleFormSubmit} isInView={isInView} />
        </div>
      </section>
    </>
  );
}