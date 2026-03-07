"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import { CASE_STUDIES } from "@/lib/data";

const CATEGORIES = ["All", "Websites", "AI", "Automation"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === activeFilter);

  return (
    <>
      <Navbar />
      <PageHero
        label="Our Work"
        title="Results That Prove It."
        description="Every project tells a story of transformation. Real businesses, real challenges, real outcomes."
      />

      {/* Filter tabs */}
      <div className="px-6 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                activeFilter === cat
                  ? "text-white"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="work-filter"
                  className="absolute inset-0 bg-bg-card border border-border rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Case study grid */}
      <section className="px-6 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.map((cs, i) => (
                <motion.div
                  key={cs.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className={cs.featured ? "md:col-span-2" : ""}
                >
                  <Link href={`/work/${cs.slug}`} className="group block">
                    <div
                      className={`relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-card transition-all duration-500 group-hover:border-border-hover group-hover:-translate-y-1 ${
                        cs.featured ? "p-8 md:p-12" : "p-8"
                      }`}
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div
                        className={`relative z-10 ${
                          cs.featured
                            ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                            : ""
                        }`}
                      >
                        <div>
                          {/* Category & Industry */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
                              {cs.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="text-text-muted text-xs">
                              {cs.industry}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                            {cs.title}
                          </h3>
                          <p className="text-text-secondary text-[15px] mb-6">
                            {cs.subtitle}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {cs.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-text-muted bg-bg-secondary border border-border rounded-full px-3 py-1"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Duration */}
                          <div className="flex items-center gap-2 text-text-muted text-sm">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12,6 12,12 16,14" />
                            </svg>
                            {cs.duration}
                          </div>
                        </div>

                        {/* Results mini-grid */}
                        <div
                          className={`grid grid-cols-2 gap-4 ${
                            cs.featured ? "" : "mt-8"
                          }`}
                        >
                          {cs.results.map((r) => (
                            <div
                              key={r.label}
                              className="bg-bg-secondary/50 rounded-xl p-4 border border-border/50"
                            >
                              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-accent mb-1">
                                {r.metric}
                              </p>
                              <p className="text-text-muted text-xs leading-snug">
                                {r.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
            Your Project Next?
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s Build Something Extraordinary.
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Every case study started with a conversation. Start yours today.
          </p>
          <motion.a
            href="/pricing"
            className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-[var(--radius-button)] transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            See Our Packages
          </motion.a>
        </div>
      </section>

      <Footer />
    </>
  );
}
