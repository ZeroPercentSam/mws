"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import GlowCard from "@/components/ui/GlowCard";
import DrawCheckmark from "@/components/ui/DrawCheckmark";
import Accordion from "@/components/ui/Accordion";
import CTABanner from "@/components/ui/CTABanner";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import { SERVICE_DETAILS, TECH_STACK, FAQ_ITEMS } from "@/lib/constants";

function ServiceSection({
  service,
  index,
}: {
  service: (typeof SERVICE_DETAILS)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax the big number at a different speed
  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id={service.title.toLowerCase().replace(/\s+/g, "-")}
      className={`relative py-24 md:py-32 overflow-hidden ${
        index % 2 !== 0 ? "bg-bg-secondary" : ""
      }`}
    >
      {/* Parallax number */}
      <motion.div
        style={{ y: numberY }}
        className="absolute top-12 right-6 md:right-16 pointer-events-none select-none"
      >
        <span className="font-[family-name:var(--font-heading)] text-[10rem] md:text-[16rem] font-900 leading-none text-white/[0.02]">
          {service.number}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 ${
            !isEven ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Heading column */}
          <div className={`md:col-span-5 ${!isEven ? "md:order-2" : ""}`}>
            <FadeInWhenVisible>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                {service.number}
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-800 mt-3 tracking-tight">
                {service.title}
              </h2>
              <p className="text-text-muted text-lg mt-2 italic">
                {service.tagline}
              </p>
              <p className="text-text-secondary mt-6 leading-relaxed">
                {service.description}
              </p>
            </FadeInWhenVisible>

            {/* Deliverables with draw checkmarks */}
            <div className="mt-8 space-y-3">
              {service.deliverables.map((item, i) => (
                <FadeInWhenVisible key={item} delay={0.1 + i * 0.05}>
                  <div className="flex items-center gap-3">
                    <DrawCheckmark
                      size={18}
                      delay={i * 0.08}
                      className="text-accent flex-shrink-0"
                    />
                    <span className="text-text-secondary text-sm">
                      {item}
                    </span>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>

          {/* Features column */}
          <div className={`md:col-span-7 ${!isEven ? "md:order-1" : ""}`}>
            <StaggerChildren
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              stagger={0.1}
            >
              {service.features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <GlowCard>
                    <div className="p-6">
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </GlowCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="bg-bg-secondary">
      <SectionWrapper>
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              Our Stack
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-800 mt-3 tracking-tight">
              Tools we trust.
            </h2>
          </div>
        </FadeInWhenVisible>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(TECH_STACK).map(([category, tools], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
                delay: catIndex * 0.1,
              }}
            >
              <GlowCard>
                <div className="p-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {tools.map((tool) => (
                      <p
                        key={tool}
                        className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-150"
                      >
                        {tool}
                      </p>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="What We Do"
        heading="Services Built for Growth."
        subtext="Three pillars of digital transformation. Each one designed to solve real business problems with technology that actually works."
        showOrbs
      />

      {/* Service Deep-Dives */}
      {SERVICE_DETAILS.map((service, i) => (
        <ServiceSection key={service.number} service={service} index={i} />
      ))}

      {/* Tech Grid */}
      <TechGrid />

      {/* FAQ */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <FadeInWhenVisible>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                FAQ
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mt-3">
                Common Questions.
              </h2>
              <p className="text-text-secondary mt-4">
                Straight answers to the questions we hear most.
              </p>
            </FadeInWhenVisible>
          </div>
          <div className="md:col-span-8">
            <FadeInWhenVisible delay={0.15}>
              <Accordion items={FAQ_ITEMS} />
            </FadeInWhenVisible>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTABanner
        heading="Ready to Get Started."
        subtext="Tell us about your project and we'll show you what's possible."
        buttonText="Book a Strategy Call"
        buttonHref="/contact"
      />
    </>
  );
}
