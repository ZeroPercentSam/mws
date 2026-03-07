"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import OrbBackground from "@/components/ui/OrbBackground";

interface PageHeroProps {
  label: string;
  heading: string;
  subtext?: string;
  showOrbs?: boolean;
}

export default function PageHero({
  label,
  heading,
  subtext,
  showOrbs = false,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {showOrbs && (
        <div className="opacity-50">
          <OrbBackground />
        </div>
      )}
      <SectionWrapper className="!py-0 relative z-10">
        <div className="max-w-3xl">
          <FadeInWhenVisible>
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {label}
            </span>
          </FadeInWhenVisible>
          <div className="mt-4">
            <AnimatedHeading
              text={heading}
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-800 leading-[1.05] tracking-tight"
              accentLastPeriod
            />
          </div>
          {subtext && (
            <FadeInWhenVisible delay={0.3}>
              <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                {subtext}
              </p>
            </FadeInWhenVisible>
          )}
        </div>
      </SectionWrapper>
    </section>
  );
}
