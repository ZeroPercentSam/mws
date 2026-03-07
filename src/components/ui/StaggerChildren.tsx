"use client";

import { motion } from "motion/react";
import {
  staggerContainer,
  fadeInUp,
  defaultTransition,
  defaultViewport,
} from "@/lib/animations";

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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer(stagger)}
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
  return (
    <motion.div
      variants={fadeInUp}
      transition={defaultTransition}
      className={className}
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </motion.div>
  );
}
