"use client";

import { motion, useScroll } from "motion/react";

/* Scroll-linked reading-progress seam under the fixed navbar.
   Position-derived transform (scaleX from scrollYProgress) — not a timed
   animation window, so no instant gating; sanctioned scroll-driven motion. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-[2px] origin-left bg-gradient-to-r from-accent/60 via-accent to-accent-light md:top-20"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
