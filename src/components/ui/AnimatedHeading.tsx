"use client";

import { motion } from "motion/react";
import { defaultViewport, EASE } from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  accentLastPeriod?: boolean;
}

export default function AnimatedHeading({
  text,
  as: Tag = "h2",
  className = "",
  accentLastPeriod = false,
}: AnimatedHeadingProps) {
  const words = text.split(" ");
  // mobile: snap visible — per-word timed reveals flicker on iOS Safari
  const instant = useInstantEntrance();

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: instant ? 0 : 0.05 } },
        }}
        className="inline"
      >
        {words.map((word, i) => {
          const isLast = i === words.length - 1;
          const endsWithPeriod = word.endsWith(".");
          const displayWord =
            accentLastPeriod && endsWithPeriod ? word.slice(0, -1) : word;

          // variants constant, transition-only swap: the SSR'd hidden
          // transform must be cleared by a variant that owns the key
          return (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={instant ? INSTANT_TRANSITION : { duration: 0.5, ease: EASE }}
              className="inline-block mr-[0.25em]"
            >
              {displayWord}
              {accentLastPeriod && endsWithPeriod && (
                <span className="text-accent">.</span>
              )}
              {!isLast ? "" : ""}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
