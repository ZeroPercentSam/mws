"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, {
  StaggerItem,
} from "@/components/ui/StaggerChildren";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <SectionWrapper id="services" className="bg-bg-secondary">
      <FadeInWhenVisible>
        <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
          What We Build
        </p>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
          Three Pillars of Growth
        </h2>
      </FadeInWhenVisible>

      <StaggerChildren
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16"
        stagger={0.2}
      >
        {SERVICES.map((service) => (
          <StaggerItem key={service.number}>
            <motion.div
              className="relative bg-bg-card border border-border rounded-[var(--radius-card)] p-8 md:p-10 overflow-hidden group cursor-default"
              whileHover={{
                y: -4,
                borderColor: "rgba(255, 107, 0, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative number */}
              <span className="absolute top-4 right-6 text-8xl font-extrabold text-white/[0.03] font-[family-name:var(--font-heading)] select-none pointer-events-none">
                {service.number}
              </span>

              <div className="relative z-10">
                <span className="inline-block text-accent text-sm font-semibold tracking-wider mb-6">
                  {service.number}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
