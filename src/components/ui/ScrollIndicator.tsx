"use client";

import { motion } from "motion/react";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className="flex flex-col items-center gap-2 will-change-transform"
        style={{
          animation: "scroll-bounce 2s ease-in-out infinite",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        <span className="text-text-secondary text-xs uppercase tracking-[0.2em]">
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="text-text-secondary"
        >
          <path
            d="M7.293 23.707a1 1 0 001.414 0l6.364-6.364a1 1 0 00-1.414-1.414L8 21.586l-5.657-5.657a1 1 0 00-1.414 1.414l6.364 6.364zM7 0v23h2V0H7z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </div>
    </motion.div>
  );
}
