"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const handleDotClick = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const t = TESTIMONIALS[current];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="min-h-[280px] flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center px-4"
          >
            {/* Metric badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-accent text-sm font-semibold">
                {t.metric}
              </span>
            </div>

            {/* Quote */}
            <blockquote className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug tracking-tight mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div>
              <p className="text-text-primary font-semibold">{t.name}</p>
              <p className="text-text-muted text-sm">
                {t.title}, {t.company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className="relative w-8 h-1 rounded-full overflow-hidden bg-border cursor-pointer"
            aria-label={`Go to testimonial ${i + 1}`}
          >
            {i === current && (
              <motion.div
                layoutId="testimonial-dot"
                className="absolute inset-0 bg-accent rounded-full"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
