"use client";

import { motion } from "motion/react";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const transition = { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const };

export default function PageHero({
  label,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8 overflow-hidden">
      {/* Ambient gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,107,0,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0 }}
          className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-6"
        >
          {label}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
        >
          {title.split(".").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="text-accent">.</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.25 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.4 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
