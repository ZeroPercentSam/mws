"use client";

import { motion } from "motion/react";
import {
  staggerContainer,
  fadeInUp,
  fadeIn,
  defaultTransition,
  defaultViewport,
} from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export default function StaggerChildren({
  children,
  className = "",
  stagger = 0.15,
}: StaggerChildrenProps) {
  const instant = useInstantEntrance();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer(instant ? 0 : stagger)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // mobile: snap visible — timed entrances flicker on iOS Safari (see hook)
  const instant = useInstantEntrance();
  return (
    <motion.div
      variants={instant ? fadeIn : fadeInUp}
      transition={instant ? INSTANT_TRANSITION : defaultTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
