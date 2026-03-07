"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import FilterBar from "@/components/ui/FilterBar";
import ProjectCard from "@/components/ui/ProjectCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CTABanner from "@/components/ui/CTABanner";
import { CASE_STUDIES, WORK_METRICS } from "@/lib/constants";

const CATEGORIES = ["all", "websites", "ai", "automation"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.category === activeFilter);

  return (
    <>
      <PageHero
        label="Our Work"
        heading="Built to Perform."
        subtext="Every project starts with a problem worth solving. Here's how we've helped businesses transform their digital presence, automate operations, and leverage AI."
        showOrbs
      />

      {/* Filter + Grid */}
      <SectionWrapper className="!pt-0">
        <FadeInWhenVisible>
          <div className="mb-10">
            <LayoutGroup>
              <FilterBar
                categories={CATEGORIES}
                active={activeFilter}
                onSelect={setActiveFilter}
              />
            </LayoutGroup>
          </div>
        </FadeInWhenVisible>

        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((study) => (
                <ProjectCard key={study.slug} study={study} />
              ))}
            </div>
          </AnimatePresence>
        </LayoutGroup>
      </SectionWrapper>

      {/* Results Ribbon */}
      <section className="border-y border-border bg-bg-secondary">
        <div className="max-w-7xl mx-auto py-16 px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {WORK_METRICS.map((metric, i) => (
              <div
                key={metric.label}
                className={`text-center ${
                  i < WORK_METRICS.length - 1
                    ? "md:border-r md:border-border"
                    : ""
                }`}
              >
                <div className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-extrabold text-accent mb-2">
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                  />
                </div>
                <p className="text-text-secondary text-xs md:text-sm uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        heading="Have a Project in Mind."
        subtext="Let's discuss how we can bring your vision to life."
        buttonText="Start a Conversation"
        buttonHref="/contact"
      />
    </>
  );
}
