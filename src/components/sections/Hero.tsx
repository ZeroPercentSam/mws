"use client";

import { motion } from "motion/react";
import OrbBackground from "@/components/ui/OrbBackground";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const transition = { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const };

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <OrbBackground />

      <div
        className="relative z-10 text-center max-w-5xl mx-auto"
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0 }}
          className="text-text-secondary text-xs md:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-8"
        >
          Business Consulting & AI Systems
        </motion.p>

        {/* Headline */}
        <div className="font-[family-name:var(--font-heading)]">
          {SITE.tagline.map((line, i) => (
            <motion.h1
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.15 + i * 0.15 }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight"
            >
              {line.slice(0, -1)}
              <span className="text-accent">.</span>
            </motion.h1>
          ))}
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.5 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed font-[family-name:var(--font-body)]"
        >
          {SITE.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.7 }}
          className="mt-10"
        >
          <Button href="#contact" variant="primary">
            Start Your Transformation
          </Button>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
