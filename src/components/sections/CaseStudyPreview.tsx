"use client";

import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import { CASE_STUDIES } from "@/lib/constants";

export default function CaseStudyPreview() {
  const featured = CASE_STUDIES.filter((s) => s.featured).slice(0, 3);

  return (
    <SectionWrapper id="work-preview">
      <FadeInWhenVisible>
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Our Work
        </span>
      </FadeInWhenVisible>
      <div className="mt-3">
        <AnimatedHeading
          text="Proven Results."
          as="h2"
          className="text-3xl md:text-5xl font-800 leading-[1.1] tracking-tight"
          accentLastPeriod
        />
      </div>
      <FadeInWhenVisible delay={0.2}>
        <p className="mt-4 text-text-secondary text-lg max-w-2xl">
          Real projects. Measurable outcomes. Here&apos;s a look at what we&apos;ve built.
        </p>
      </FadeInWhenVisible>

      <StaggerChildren className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
        {featured.map((study) => (
          <StaggerItem key={study.slug}>
            <CaseStudyCard study={study} />
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeInWhenVisible delay={0.5}>
        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors duration-200 font-medium text-sm group"
          >
            View All Work
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </FadeInWhenVisible>
    </SectionWrapper>
  );
}
