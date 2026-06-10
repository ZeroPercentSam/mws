"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";

interface PageHeroProps {
  label: string;
  heading: string;
  subtext?: string;
  showGlow?: boolean;
}

export default function PageHero({
  label,
  heading,
  subtext,
  showGlow = false,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* Static gradient wash (homepage hero language) — zero animation
          cost, no iOS layer churn (the old orb loops were infinite). */}
      {showGlow && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,107,0,0.14), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 75%, rgba(56,130,180,0.13), transparent 60%)",
          }}
        />
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
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
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
