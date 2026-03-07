"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Desktop: show 3 at a time as grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.slice(0, 3).map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: i * 0.15 }}
            className="border border-border rounded-[var(--radius-card)] p-8 bg-bg-card relative"
          >
            {/* Quote mark */}
            <span className="absolute top-6 left-8 text-5xl font-800 text-accent/20 font-[family-name:var(--font-heading)] leading-none select-none">
              &ldquo;
            </span>
            <p className="text-text-secondary text-sm leading-relaxed mt-6 mb-6">
              {t.quote}
            </p>
            <div className="border-t border-border pt-4">
              <p className="text-text-primary text-sm font-semibold">{t.name}</p>
              <p className="text-text-muted text-xs mt-0.5">
                {t.title}, {t.company}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: carousel with one at a time */}
      <div className="md:hidden relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="border border-border rounded-[var(--radius-card)] p-6 bg-bg-card relative"
            >
              <span className="absolute top-4 left-6 text-5xl font-800 text-accent/20 font-[family-name:var(--font-heading)] leading-none select-none">
                &ldquo;
              </span>
              <p className="text-text-secondary text-sm leading-relaxed mt-8 mb-6">
                {TESTIMONIALS[active].quote}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-text-primary text-sm font-semibold">
                  {TESTIMONIALS[active].name}
                </p>
                <p className="text-text-muted text-xs mt-0.5">
                  {TESTIMONIALS[active].title}, {TESTIMONIALS[active].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-accent w-6" : "bg-border hover:bg-text-muted"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
