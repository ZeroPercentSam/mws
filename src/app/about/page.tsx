"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import GlowCard from "@/components/ui/GlowCard";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import CTABanner from "@/components/ui/CTABanner";
import { STORY, VALUES } from "@/lib/constants";

function StorySection() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.5 });

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Narrative */}
        <div className="md:col-span-7">
          <FadeInWhenVisible>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              Our Story
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
              {STORY.headline}
            </h2>
          </FadeInWhenVisible>
          <div className="mt-8 space-y-6">
            {STORY.paragraphs.map((paragraph, i) => (
              <FadeInWhenVisible key={i} delay={0.1 + i * 0.1}>
                <p className="text-text-secondary leading-relaxed text-lg">
                  {paragraph}
                </p>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>

        {/* Pull quote with animated border */}
        <div className="md:col-span-5 flex items-center">
          <div ref={quoteRef} className="relative pl-6">
            {/* Animated accent border-left line */}
            <motion.div
              initial={{ height: 0 }}
              animate={quoteInView ? { height: "100%" } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
              className="absolute left-0 top-0 w-[2px] bg-accent"
            />
            <FadeInWhenVisible delay={0.4}>
              <blockquote className="text-xl md:text-2xl text-text-primary font-medium leading-relaxed italic">
                &ldquo;{STORY.pullQuote}&rdquo;
              </blockquote>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function ValuesSection() {
  return (
    <section className="bg-bg-secondary">
      <SectionWrapper>
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              What We Stand For
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
              Our Values.
            </h2>
          </div>
        </FadeInWhenVisible>

        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          stagger={0.1}
        >
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <GlowCard>
                <div className="p-6 md:p-8">
                  {/* Icon animation on viewport entry */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                    className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-5"
                  >
                    <span className="text-accent text-lg">
                      {value.icon === "precision" && "◎"}
                      {value.icon === "handshake" && "⟡"}
                      {value.icon === "chart" && "◆"}
                      {value.icon === "rocket" && "△"}
                    </span>
                  </motion.div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionWrapper>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        heading="Technology That Means Business."
        subtext="A solo founder with AI-augmented workflows, building digital solutions that actually move the needle — across 16+ projects and 8 industries."
        showOrbs
      />

      <StorySection />
      <ValuesSection />

      <CTABanner
        heading="Want to Work Together."
        subtext="We're always looking for ambitious businesses to partner with."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  );
}
