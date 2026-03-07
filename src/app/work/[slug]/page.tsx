"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TechStack from "@/components/ui/TechStack";
import NextProject from "@/components/ui/NextProject";
import CTABanner from "@/components/ui/CTABanner";
import ImageGallery from "@/components/ui/ImageGallery";
import { CASE_STUDIES } from "@/lib/constants";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const currentIndex = CASE_STUDIES.findIndex((s) => s.slug === slug);
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  // Results divider line
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.5 });

  // Generate abstract gallery gradients from case study gradient
  const galleryGradients = [
    study.gradient,
    study.gradient.replace("135deg", "45deg"),
    study.gradient.replace("135deg", "225deg"),
    study.heroGradient,
    study.heroGradient.replace("160deg", "20deg"),
    study.gradient.replace("135deg", "315deg"),
  ];

  const galleryLabels = [
    "Landing Page",
    "Dashboard View",
    "Mobile Interface",
    "Analytics Panel",
    "Settings Module",
    "User Flow",
  ];

  return (
    <>
      {/* Case Study Hero */}
      <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: study.heroGradient,
            scale: heroScale,
            opacity: heroOpacity,
          }}
        />
        {/* Accent gradient overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: study.gradient }}
        />
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-8 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                {study.category} &mdash; {study.client}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.35 }}
              className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl lg:text-6xl font-800 tracking-tight mt-4 max-w-4xl leading-[1.1]"
            >
              {study.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.5 }}
              className="text-text-secondary text-lg mt-4 max-w-2xl"
            >
              {study.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Challenge Section */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <FadeInWhenVisible>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                The Challenge
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mt-3">
                What they faced.
              </h2>
            </FadeInWhenVisible>
          </div>
          <div className="md:col-span-8">
            <FadeInWhenVisible delay={0.15}>
              <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
                {study.challenge.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </SectionWrapper>

      {/* Approach Section */}
      <section className="bg-bg-secondary">
        <SectionWrapper>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-8 md:order-1">
              <FadeInWhenVisible delay={0.15}>
                <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
                  {study.approach.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </FadeInWhenVisible>
            </div>
            <div className="md:col-span-4 md:order-2">
              <FadeInWhenVisible>
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  Our Approach
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mt-3">
                  How we solved it.
                </h2>
              </FadeInWhenVisible>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Solution Gallery */}
      <SectionWrapper>
        <FadeInWhenVisible>
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            The Solution
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mt-3 mb-10">
            What we built.
          </h2>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.2}>
          <ImageGallery gradients={galleryGradients} labels={galleryLabels} />
        </FadeInWhenVisible>
      </SectionWrapper>

      {/* Tech Stack */}
      <section className="bg-bg-secondary">
        <SectionWrapper>
          <FadeInWhenVisible>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              Technology
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mt-3 mb-8">
              Built with.
            </h2>
          </FadeInWhenVisible>
          <TechStack technologies={study.technologies} />
        </SectionWrapper>
      </section>

      {/* Results */}
      <SectionWrapper>
        <FadeInWhenVisible>
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              The Results
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-4xl font-bold mt-3">
              Measurable impact.
            </h2>
          </div>
        </FadeInWhenVisible>

        {/* Animated divider */}
        <div ref={lineRef} className="flex justify-center my-8">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={lineInView ? { width: "4rem", opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
            className="h-[1px] bg-accent"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-12">
          {study.results.map((metric, i) => (
            <FadeInWhenVisible key={metric.label} delay={i * 0.1}>
              <div
                className={`text-center ${
                  i < study.results.length - 1
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
                <p className="text-text-secondary text-xs md:text-sm uppercase tracking-wider mb-1">
                  {metric.label}
                </p>
                {metric.description && (
                  <p className="text-text-muted text-xs">{metric.description}</p>
                )}
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonial */}
      {study.testimonial && (
        <section className="bg-bg-secondary">
          <SectionWrapper>
            <FadeInWhenVisible>
              <div className="max-w-3xl mx-auto text-center">
                <span className="text-6xl text-accent leading-none font-serif">&ldquo;</span>
                <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed font-medium mt-2">
                  {study.testimonial.quote}
                </blockquote>
                <div className="mt-8">
                  <p className="text-text-primary font-semibold">
                    {study.testimonial.name}
                  </p>
                  <p className="text-text-muted text-sm">
                    {study.testimonial.title}, {study.testimonial.company}
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </SectionWrapper>
        </section>
      )}

      {/* Next Project */}
      <SectionWrapper>
        <NextProject study={nextStudy} />
      </SectionWrapper>

      {/* CTA */}
      <CTABanner
        heading="Ready to Be Next."
        subtext="Let's create results like these for your business."
        buttonText="Start Your Project"
        buttonHref="/contact"
      />
    </>
  );
}
