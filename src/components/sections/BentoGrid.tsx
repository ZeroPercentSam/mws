"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import { staggerContainer, fadeInUp, defaultTransition, defaultViewport } from "@/lib/animations";
import { CAPABILITIES } from "@/lib/constants";

const capabilityIcons: Record<string, React.ReactNode> = {
  "SEO Optimization": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
  ),
  "Brand Identity": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
  ),
  "AI Chatbots": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
  ),
  "Workflow Automation": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
  ),
  "Performance Analytics": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
  ),
  "Custom Integrations": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
  ),
};

export default function BentoGrid() {
  return (
    <SectionWrapper id="capabilities">
      <FadeInWhenVisible>
        <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
          Capabilities
        </p>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
          Everything You Need to Win
        </h2>
      </FadeInWhenVisible>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer(0.1)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 mt-16"
      >
        {CAPABILITIES.map((cap) => (
          <motion.div
            key={cap.title}
            variants={fadeInUp}
            transition={defaultTransition}
            className={`bg-bg-card border border-border rounded-[var(--radius-card)] p-6 md:p-8 hover:border-border-hover transition-colors duration-300 ${cap.span}`}
          >
            <div className="text-accent mb-4">
              {capabilityIcons[cap.title]}
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-2">
              {cap.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {cap.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
