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
          Client Voices
        </span>
      </FadeInWhenVisible>
      <div className="mt-3">
        <AnimatedHeading
          text="What They Say."
          as="h2"
          className="text-3xl md:text-5xl font-800 leading-[1.1] tracking-tight"
          accentLastPeriod
        />
      </div>
      <FadeInWhenVisible delay={0.2}>
        <p className="mt-4 text-text-secondary text-lg max-w-2xl mb-12">
          Don&apos;t take our word for it. Here&apos;s what our clients have to say.
        </p>
      </FadeInWhenVisible>

      <TestimonialCarousel />
    </SectionWrapper>
  );
}
