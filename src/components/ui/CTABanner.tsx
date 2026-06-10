"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import GlowCTA from "@/components/ui/GlowCTA";

interface CTABannerProps {
  heading?: string;
  subtext?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTABanner({
  heading = "Ready to Build Something Great.",
  subtext = "Let's talk about what we can build together.",
  buttonText = "Start a Conversation",
  buttonHref = "/contact",
}: CTABannerProps) {
  return (
    <section
      className="relative border-t border-border"
      style={{
        background:
          "linear-gradient(180deg, #0D0703 0%, rgba(255,107,0,0.05) 35%, var(--color-bg-primary) 100%)",
      }}
    >
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto">
          <AnimatedHeading
            text={heading}
            as="h2"
            className="text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
            accentLastPeriod
          />

          <FadeInWhenVisible delay={0.2}>
            <p className="text-text-secondary text-lg mt-6 mb-10">{subtext}</p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.35}>
            <GlowCTA label={buttonText} href={buttonHref} />
          </FadeInWhenVisible>
        </div>
      </SectionWrapper>
    </section>
  );
}
