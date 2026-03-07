"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import GlowCard from "@/components/ui/GlowCard";
import CountUpOnScroll from "@/components/ui/CountUpOnScroll";
import { SERVICE_DETAILS, CASE_STUDIES } from "@/lib/data";

export default function ServicePage() {
  const params = useParams();
  const service = SERVICE_DETAILS.find((s) => s.slug === params.slug);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold mb-4">
              Service Not Found
            </h1>
            <Link href="/" className="text-accent hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedCaseStudies = CASE_STUDIES.filter((cs) =>
    service.caseStudySlugs.includes(cs.slug)
  );

  return (
    <>
      <Navbar />

      <PageHero
        label={service.title}
        title={service.subtitle}
        description={service.description}
      >
        <motion.a
          href="/pricing"
          className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-[var(--radius-button)] transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          See Pricing
        </motion.a>
      </PageHero>

      {/* Stats strip */}
      <section className="border-y border-border bg-bg-secondary">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-3 gap-8">
            {service.stats.map((stat, i) => (
              <FadeInWhenVisible key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-extrabold text-accent mb-2">
                    <CountUpOnScroll value={stat.value} />
                  </p>
                  <p className="text-text-secondary text-sm">{stat.label}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
              Capabilities
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-16">
              What&apos;s Included
            </h2>
          </FadeInWhenVisible>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            stagger={0.1}
          >
            {service.features.map((feature) => (
              <StaggerItem key={feature.title}>
                <GlowCard>
                  <div className="p-8">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                      <FeatureIcon icon={feature.icon} />
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
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
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
                Our Process
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
                How We Deliver
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="space-y-4" stagger={0.1}>
            {service.process.map((step, i) => (
              <StaggerItem key={step}>
                <div className="flex items-center gap-6 bg-bg-card border border-border rounded-[var(--radius-card)] p-6 group hover:border-border-hover transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-accent text-sm font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-text-primary font-medium">{step}</p>
                  <div className="ml-auto w-6 h-6 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-3 h-3 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Related case studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeInWhenVisible>
              <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
                Proven Results
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-16">
                See It in Action
              </h2>
            </FadeInWhenVisible>

            <StaggerChildren
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              stagger={0.15}
            >
              {relatedCaseStudies.map((cs) => (
                <StaggerItem key={cs.slug}>
                  <Link href={`/work/${cs.slug}`} className="group block">
                    <div className="bg-bg-card border border-border rounded-[var(--radius-card)] p-8 transition-all duration-300 group-hover:border-border-hover group-hover:-translate-y-1">
                      <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
                        {cs.category}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mt-3 mb-2 group-hover:text-accent transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-6">
                        {cs.subtitle}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {cs.results.slice(0, 2).map((r) => (
                          <div key={r.label}>
                            <p className="text-accent font-bold text-lg">
                              {r.metric}
                            </p>
                            <p className="text-text-muted text-xs">
                              {r.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* Service navigation */}
      <section className="py-16 px-6 md:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {SERVICE_DETAILS.filter((s) => s.slug !== service.slug).map(
              (s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="text-text-muted hover:text-accent text-sm transition-colors duration-200"
                >
                  Explore {s.title} →
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInWhenVisible>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              Let&apos;s discuss how {service.title.toLowerCase()} can transform your business.
            </p>
            <motion.a
              href="/pricing"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-[var(--radius-button)] transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See Our Packages
            </motion.a>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </>
  );
}

function FeatureIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    zap: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
      </svg>
    ),
    search: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    target: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    edit: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    device: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    chart: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    bot: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    ),
    brain: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
        <line x1="9" y1="22" x2="15" y2="22" />
      </svg>
    ),
    user: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    file: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" />
      </svg>
    ),
    eye: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    cpu: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      </svg>
    ),
    flow: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="16,3 21,3 21,8" /><line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21,16 21,21 16,21" /><line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
    link: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    funnel: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
      </svg>
    ),
    dashboard: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
    database: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    code: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
      </svg>
    ),
  };
  return iconMap[icon] || null;
}
