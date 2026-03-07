"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import GlowCard from "@/components/ui/GlowCard";
import TextReveal from "@/components/ui/TextReveal";
import { TEAM, VALUES, TIMELINE } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageHero
        label="About Us"
        title="We Build What Others Can't."
        description="A team of strategists, engineers, and designers on a mission to make every business we touch unfairly competitive."
      />

      {/* Mission text reveal */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <TextReveal text="We believe technology should be a competitive weapon, not a line item. Every business deserves AI-powered systems, blazing-fast websites, and automation that eliminates busywork — not just the ones with million-dollar budgets." />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
              What Drives Us
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-16">
              Our Values
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.12}>
            {VALUES.map((value) => (
              <StaggerItem key={value.title}>
                <GlowCard>
                  <div className="p-8 md:p-10">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                      <ValueIcon icon={value.icon} />
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-[15px]">
                      {value.description}
                    </p>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeInWhenVisible>
            <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
              Our Journey
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-16">
              Building Since Day One
            </h2>
          </FadeInWhenVisible>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <AnimatedTimeline />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
                The People
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
                Meet the Team
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            stagger={0.1}
          >
            {TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <div className="group relative bg-bg-card border border-border rounded-[var(--radius-card)] p-8 overflow-hidden transition-all duration-300 hover:border-border-hover hover:-translate-y-1">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Avatar placeholder */}
                    <div className="w-16 h-16 rounded-full bg-bg-secondary border border-border flex items-center justify-center mb-6">
                      <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-accent">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-accent text-sm font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((s) => (
                        <span
                          key={s}
                          className="text-xs text-text-muted bg-bg-secondary border border-border rounded-full px-3 py-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInWhenVisible>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              We&apos;re selective about the projects we take on — because every client deserves our full attention.
            </p>
            <motion.a
              href="/pricing"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-[var(--radius-button)] transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Packages
            </motion.a>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </>
  );
}

function AnimatedTimeline() {
  return (
    <div className="space-y-12">
      {TIMELINE.map((item, i) => (
        <TimelineItem key={item.year} item={item} index={i} />
      ))}
    </div>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ opacity, y }}
        className={`flex items-start gap-8 pl-12 md:pl-0 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Content */}
        <div
          className={`flex-1 ${
            isEven ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
          }`}
        >
          <span className="text-accent font-[family-name:var(--font-heading)] text-sm font-bold tracking-wider">
            {item.year}
          </span>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mt-1 mb-2">
            {item.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Center dot (hidden on mobile) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-bg-primary mt-1" />

        {/* Spacer for the other side */}
        <div className="hidden md:block flex-1" />
      </motion.div>

      {/* Mobile dot */}
      <div className="md:hidden absolute left-4 top-1 w-3 h-3 rounded-full bg-accent border-4 border-bg-primary -translate-x-1/2" />
    </div>
  );
}

function ValueIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    target: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    eye: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    bolt: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
      </svg>
    ),
    handshake: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
      </svg>
    ),
  };
  return icons[icon] || null;
}
