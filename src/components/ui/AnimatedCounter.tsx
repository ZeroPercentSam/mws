"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";
import { EASE, VIEW_TIGHT } from "@/lib/animations";

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
  const isInView = useInView(ref, VIEW_TIGHT);
  const reduceMotion = useReducedMotion();
  // SSR and the first client paint must both render "0" — branching the
  // JSX on useReducedMotion() (null on the server) is a hydration mismatch
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    // keep the target's own precision: 99.7 must never publish as 100
    const decimals = (String(target).split(".")[1] ?? "").length;
    const fmt = (n: number) =>
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    if (reduceMotion) {
      // no animation started — snap to the final value
      setDisplay(fmt(target));
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setDisplay(fmt(latest)),
      onComplete: () => setDisplay(fmt(target)),
    });
    return () => controls.stop();
  }, [isInView, target, duration, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
