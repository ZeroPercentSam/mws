"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({
  children,
  className = "",
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-8 pl-8 md:pl-16"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
