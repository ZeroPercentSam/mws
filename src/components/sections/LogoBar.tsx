"use client";

import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import LogoMarquee from "@/components/ui/LogoMarquee";

export default function LogoBar() {
  return (
    <section className="py-12 md:py-16 border-y border-border">
      <FadeInWhenVisible>
        <p className="text-center text-xs uppercase tracking-[0.2em] text-text-muted mb-8">
          Trusted by forward-thinking companies
        </p>
        <LogoMarquee />
      </FadeInWhenVisible>
    </section>
  );
}
