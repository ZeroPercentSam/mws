"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

export default function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials">
      <FadeInWhenVisible>
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Project Highlights
        </span>
      </FadeInWhenVisible>
      <div className="mt-3">
        <AnimatedHeading
          text="What We've Built."
          as="h2"
          className="text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
          accentLastPeriod
        />
      </div>
      <FadeInWhenVisible delay={0.2}>
        <p className="mt-4 text-text-secondary text-lg max-w-2xl mb-12">
          Real projects, real features, real results. Here are some highlights from our portfolio.
        </p>
      </FadeInWhenVisible>

      <TestimonialCarousel />
    </SectionWrapper>
  );
}
