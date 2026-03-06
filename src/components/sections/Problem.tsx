"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, {
  StaggerItem,
} from "@/components/ui/StaggerChildren";
import GlowCard from "@/components/ui/GlowCard";
import { PAIN_POINTS } from "@/lib/constants";

const icons: Record<string, React.ReactNode> = {
  globe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  cog: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  chart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

export default function Problem() {
  return (
    <SectionWrapper id="problem">
      <FadeInWhenVisible>
        <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
          The Problem
        </p>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
          Your Business Deserves Better
        </h2>
      </FadeInWhenVisible>

      <StaggerChildren
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        stagger={0.15}
      >
        {PAIN_POINTS.map((point) => (
          <StaggerItem key={point.title}>
            <GlowCard>
              <div className="p-8 md:p-10">
                <div className="text-accent mb-6">{icons[point.icon]}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-3">
                  {point.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  {point.description}
                </p>
              </div>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
