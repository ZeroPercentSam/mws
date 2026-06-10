"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import Button from "@/components/ui/Button";

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
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, amount: 0.5 });

  return (
    <section className="relative bg-bg-secondary">
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto">
          <AnimatedHeading
            text={heading}
            as="h2"
            className="text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
            accentLastPeriod
          />

          {/* Animated line */}
          <div ref={lineRef} className="flex justify-center my-8">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: "4rem", opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.4 }}
              className="h-[1px] bg-accent"
            />
          </div>

          <FadeInWhenVisible delay={0.3}>
            <p className="text-text-secondary text-lg mb-10">{subtext}</p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.5}>
            <Button href={buttonHref} variant="primary" className="px-10 py-4 text-base">
              {buttonText}
            </Button>
          </FadeInWhenVisible>
        </div>
      </SectionWrapper>
    </section>
  );
}
