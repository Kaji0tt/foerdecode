import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileHeader() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [widthPercent, setWidthPercent] = useState(100);

  useEffect(() => {
    const calculateWidth = () => {
      const width = window.innerWidth;
      // Mobile: 100%, Tablet: 88%, Desktop: 78%
      let percent = 100;
      if (width >= 1024) {
        percent = 78;
      } else if (width >= 768) {
        percent = 88;
      }
      setWidthPercent(percent);
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-6 px-6 flex justify-center w-full"
      style={{ width: "100%" }}
    >
      <div
        className="flex items-center gap-4 backdrop-blur-sm bg-white/40 rounded-full px-6 py-3 border border-white/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
        style={{ width: `${widthPercent}%`, maxWidth: "100%" }}
      >
        {/* Profile Image */}
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="relative group cursor-pointer">
            {/* Placeholder Image with initials */}
            <div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundImage: "url()",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              id="profile-image"
            >
              {/* Fallback initials - will be replaced when image is set */}
              <span>P</span>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -5, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl before:content-[''] before:absolute before:bottom-[-6px] before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-gray-900"
                  style={{ zIndex: 1000 }}
                >
                  Pädagoge, IT'ler, Freigeist
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Title Text */}
        <div className="hidden sm:flex flex-col">
          <p
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#1e3a6e" }}
          >
            Über mich
          </p>
          <p
            className="text-sm font-medium"
            style={{ color: "#0f1f3d" }}
          >
            Pädagoge, IT'ler, Freigeist
          </p>
        </div>
      </div>


    </motion.div>
  );
}