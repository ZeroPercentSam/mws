"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, {
  StaggerItem,
} from "@/components/ui/StaggerChildren";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { METRICS } from "@/lib/constants";

export default function Results() {
  return (
    <SectionWrapper id="results">
      <FadeInWhenVisible>
        <div className="text-center">
          <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
            The Impact
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
            Results That Speak
          </h2>
        </div>
      </FadeInWhenVisible>

      <StaggerChildren
        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-20"
        stagger={0.2}
      >
        {METRICS.map((metric, i) => (
          <StaggerItem key={metric.label}>
            <div
              className={`text-center ${
                i < METRICS.length - 1
                  ? "md:border-r md:border-border"
                  : ""
              }`}
            >
              <div className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-extrabold text-accent mb-3">
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                />
              </div>
              <p className="text-text-secondary text-xs md:text-sm uppercase tracking-wider leading-relaxed">
                {metric.label}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
