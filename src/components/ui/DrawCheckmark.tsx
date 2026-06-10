"use client";

import { motion } from "motion/react";
import { drawPathDelayed, defaultViewport } from "@/lib/animations";

interface DrawCheckmarkProps {
  className?: string;
  size?: number;
  delay?: number;
}

export default function DrawCheckmark({
  className = "",
  size = 20,
  delay = 0,
}: DrawCheckmarkProps) {
  return (
    <motion.svg
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* delay must live INSIDE the variant — drawPath-style variants
          carry their own transition, so a sibling prop is ignored */}
      <motion.path
        d="M5 13L9 17L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawPathDelayed(delay)}
      />
    </motion.svg>
  );
}
