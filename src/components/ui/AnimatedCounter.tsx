"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";
import { EASE } from "@/lib/animations";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.4,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    // standalone animate() bypasses MotionConfig — reduced-motion users get
    // the final value straight from render below, no animation started
    if (!isInView || reduceMotion) return;
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (latest) =>
        setDisplay(Math.round(latest).toLocaleString("en-US")),
    });
    return () => controls.stop();
  }, [isInView, target, duration, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduceMotion ? target.toLocaleString("en-US") : display}
      {suffix}
    </span>
  );
}
