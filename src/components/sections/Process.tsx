"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="process" className="bg-bg-secondary">
      <FadeInWhenVisible>
        <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
          How It Works
        </p>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
          From Vision to Results
        </h2>
      </FadeInWhenVisible>

      <div ref={sectionRef} className="mt-20">
        {/* Desktop: Horizontal layout */}
        <div className="hidden lg:block">
          {/* Connector line container */}
          <div className="relative mx-auto max-w-4xl mb-16">
            <div className="h-px bg-border w-full" />
            <motion.div
              className="absolute top-0 left-0 h-px bg-accent origin-left"
              style={{
                width: lineWidth,
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                willChange: "width",
              }}
            />
            {/* Step nodes on the line */}
            <div className="absolute top-0 left-0 right-0 flex justify-between -translate-y-1/2">
              {PROCESS_STEPS.map((step, i) => {
                const threshold = i / (PROCESS_STEPS.length - 1);
                return (
                  <StepNode
                    key={step.step}
                    step={step.step}
                    scrollProgress={scrollYProgress}
                    threshold={threshold}
                  />
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {PROCESS_STEPS.map((step, i) => (
              <FadeInWhenVisible key={step.step} delay={i * 0.15}>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="lg:hidden space-y-12">
          {PROCESS_STEPS.map((step, i) => (
            <FadeInWhenVisible key={step.step} delay={i * 0.1}>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center shrink-0">
                    <span className="text-accent text-sm font-semibold">
                      {step.step}
                    </span>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="w-px h-full bg-border mt-3" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function StepNode({
  step,
  scrollProgress,
  threshold,
}: {
  step: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  threshold: number;
}) {
  const isActive = useTransform(scrollProgress, (v) =>
    v >= threshold ? 1 : 0
  );
  const borderColor = useTransform(isActive, (v) =>
    v ? "rgb(255, 107, 0)" : "rgba(255, 255, 255, 0.08)"
  );
  const textColor = useTransform(isActive, (v) =>
    v ? "rgb(255, 107, 0)" : "rgb(153, 153, 153)"
  );
  const bgColor = useTransform(isActive, (v) =>
    v ? "rgba(255, 107, 0, 0.1)" : "rgb(17, 17, 17)"
  );

  return (
    <motion.div
      className="w-10 h-10 rounded-full flex items-center justify-center border-2"
      style={{
        borderColor,
        backgroundColor: bgColor,
      }}
    >
      <motion.span className="text-sm font-semibold" style={{ color: textColor }}>
        {step}
      </motion.span>
    </motion.div>
  );
}
