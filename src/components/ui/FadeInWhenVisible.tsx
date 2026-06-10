"use client";

import { motion } from "motion/react";
import { fadeInUp, fadeIn, defaultTransition, defaultViewport } from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInWhenVisible({
  children,
  delay = 0,
  className = "",
}: FadeInWhenVisibleProps) {
  // mobile: snap visible in one write — timed opacity/transform entrances
  // flicker on iOS Safari while scrolling
  const instant = useInstantEntrance();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={instant ? fadeIn : fadeInUp}
      transition={instant ? INSTANT_TRANSITION : { ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
