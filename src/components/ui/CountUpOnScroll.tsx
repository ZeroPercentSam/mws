"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";

interface CountUpOnScrollProps {
  value: string;
  className?: string;
}

export default function CountUpOnScroll({ value, className = "" }: CountUpOnScrollProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/^([\$]?)([\d,.]+)(.*)/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const prefix = numericMatch[1];
    const numStr = numericMatch[2].replace(/,/g, "");
    const suffix = numericMatch[3];
    const target = parseFloat(numStr);

    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (numStr.includes(".")) {
        setDisplay(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.round(current).toLocaleString()}${suffix}`);
      }

      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
