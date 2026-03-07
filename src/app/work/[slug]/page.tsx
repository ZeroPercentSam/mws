"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import CountUpOnScroll from "@/components/ui/CountUpOnScroll";
import { CASE_STUDIES, TESTIMONIALS } from "@/lib/data";

const transition = { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const };

export default function CaseStudyPage() {
  const params = useParams();
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug);

  if (!cs) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold mb-4">
              Case Study Not Found
            </h1>
            <Link href="/work" className="text-accent hover:underline">
              Back to Work
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const testimonial =
    cs.testimonial !== undefined ? TESTIMONIALS[cs.testimonial] : null;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 md:px-8 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,107,0,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0 }}
            className="flex items-center gap-2 text-sm text-text-muted mb-8"
          >
            <Link href="/work" className="hover:text-text-secondary transition-colors">
              Work
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{cs.title}</span>
          </motion.div>

          <div className="flex items-center gap-3 mb-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.05 }}
              className="text-accent text-xs font-semibold tracking-[0.2em] uppercase"
            >
              {cs.category}
            </motion.span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...transition, delay: 0.1 }}
              className="text-text-muted text-xs"
            >
              {cs.industry}
            </motion.span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4"
          >
            {cs.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
            className="text-text-secondary text-xl md:text-2xl mb-8"
          >
            {cs.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {cs.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-text-muted bg-bg-card border border-border rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results strip */}
      <section className="border-y border-border bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cs.results.map((r, i) => (
              <FadeInWhenVisible key={r.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-extrabold text-accent mb-2">
                    <CountUpOnScroll value={r.metric} />
                  </p>
                  <p className="text-text-secondary text-sm">{r.label}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <FadeInWhenVisible>
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              The Challenge
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-6">
              What They Were Facing
            </h2>
            <p className="text-text-secondary leading-relaxed text-[15px]">
              {cs.challenge}
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.15}>
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              The Solution
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-6">
              What We Built
            </h2>
            <p className="text-text-secondary leading-relaxed text-[15px]">
              {cs.solution}
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="py-24 md:py-32 px-6 md:px-8 bg-bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInWhenVisible>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
                <span className="text-accent text-sm font-semibold">
                  {testimonial.metric}
                </span>
              </div>

              <blockquote className="font-[family-name:var(--font-heading)] text-2xl md:text-4xl font-semibold leading-snug tracking-tight mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <p className="text-text-primary font-semibold">
                {testimonial.name}
              </p>
              <p className="text-text-muted text-sm">
                {testimonial.title}, {testimonial.company}
              </p>
            </FadeInWhenVisible>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInWhenVisible>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Want Results Like These?
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              Let&apos;s talk about what we can build for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/pricing"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-[var(--radius-button)] transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See Our Packages
              </motion.a>
              <Link
                href="/work"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                View More Case Studies
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </>
  );
}
