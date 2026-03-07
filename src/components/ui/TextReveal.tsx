"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight flex flex-wrap gap-x-[0.3em] gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />
          );
        })}
      </p>
    </div>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}
