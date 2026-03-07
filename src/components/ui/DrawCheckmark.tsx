"use client";

import { motion } from "motion/react";
import { drawPath, defaultViewport } from "@/lib/animations";

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
      <motion.path
        d="M5 13L9 17L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawPath}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.4, 0.25, 1],
          delay,
        }}
      />
    </motion.svg>
  );
}
