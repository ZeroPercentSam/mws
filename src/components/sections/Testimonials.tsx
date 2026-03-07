"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <FadeInWhenVisible>
        <div className="text-center mb-12">
          <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
            Client Stories
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
            Don&apos;t Take Our Word For It
          </h2>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.15}>
        <TestimonialCarousel />
      </FadeInWhenVisible>
    </SectionWrapper>
  );
}
