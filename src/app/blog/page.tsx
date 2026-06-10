"use client";

/* /blog — the Signal Board. Signature: FeaturedSignal stat-forward card.
   Filter wiring unchanged; cards are direct AnimatePresence children so
   popLayout exits actually engage. */

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import FilterBar from "@/components/ui/FilterBar";
import BlogCard from "@/components/ui/BlogCard";
import CTABanner from "@/components/ui/CTABanner";
import GlowCard from "@/components/ui/GlowCard";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import { OceanBand } from "@/components/ui/Band";
import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "@/lib/constants";
import { eyebrowCls, chipCls, BLOG_TINTS, OCEAN_CELL } from "@/lib/design";
import {
  EASE,
  DUR_REVEAL,
  DUR_DRAW,
  STAG_CARD,
  PULSE,
  VIEW_TIGHT,
  scaleIn,
} from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";
import { BLOG_HERO, FEATURED, SIGNAL_STRIP, BLOG_CTA } from "./blog-data";

/* ------------------------------------------------------------------ */
/*  FeaturedSignal — the signature: lead stat + sparkline + the post    */
/* ------------------------------------------------------------------ */
function FeaturedSignal() {
  const instant = useInstantEntrance();
  const T = (t: object) => (instant ? INSTANT_TRANSITION : t);
  const { post, stat } = FEATURED;
  const tint = BLOG_TINTS[post.category as keyof typeof BLOG_TINTS] ?? "var(--color-accent)";

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={VIEW_TIGHT}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <GlowCard>
          <div className="relative grid gap-8 p-7 md:grid-cols-[0.9fr_1.1fr] md:p-9">
            {/* signal sweep */}
            <motion.div
              aria-hidden
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={T({ duration: DUR_DRAW, ease: EASE })}
              className="absolute inset-x-7 top-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-accent/40 via-accent to-accent-light"
            />
            {/* stat panel */}
            <div>
              <span className={eyebrowCls}>Featured analysis</span>
              <motion.p
                variants={scaleIn}
                transition={T({ duration: DUR_REVEAL, ease: EASE, delay: 0.15 })}
                className="mt-4 font-[family-name:var(--font-heading)] text-5xl font-extrabold tracking-tight text-accent md:text-6xl"
              >
                {stat.value}
              </motion.p>
              <p className="mt-2 max-w-xs text-sm uppercase tracking-wider text-text-secondary">
                {stat.label}
              </p>
              <svg viewBox="0 0 220 36" fill="none" className="mt-6 h-9 w-full max-w-xs">
                <motion.path
                  d="M2 30 L40 24 L78 27 L118 14 L158 18 L218 4"
                  stroke={tint}
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: instant
                        ? INSTANT_TRANSITION
                        : { duration: 1.1, ease: EASE, delay: 0.4 },
                    },
                  }}
                />
                <motion.circle
                  cx="218"
                  cy="4"
                  r="3.5"
                  fill={tint}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: instant
                      ? { opacity: 1, transition: INSTANT_TRANSITION }
                      : { opacity: 1, transition: { duration: 0.3, delay: 1.4 } },
                  }}
                />
              </svg>
            </div>
            {/* post panel */}
            <div className="min-w-0">
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={T({ duration: DUR_REVEAL, ease: EASE, delay: 0.3 })}
                className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={`/blog/${post.slug}.webp`}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: tint,
                    borderColor: `${tint}55`,
                    backgroundColor: "rgba(5,5,5,0.6)",
                  }}
                >
                  {BLOG_CATEGORY_LABELS[post.category] || post.category}
                </span>
                <span className={`${chipCls} text-text-muted`}>{post.readTime}</span>
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-bold leading-snug transition-colors duration-200 group-hover:text-accent md:text-2xl">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary md:text-base">
                {post.excerpt}
              </p>
            </div>
          </div>
        </GlowCard>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  // featured post leads the page — keep it out of the "all" grid
  const filtered = BLOG_POSTS.filter((p) =>
    activeFilter === "all"
      ? p.slug !== FEATURED.post.slug
      : p.category === activeFilter,
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-32 md:pb-14 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,107,0,0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 75%, rgba(74,158,203,0.10), transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <p className={`hero-rise ${eyebrowCls}`}>{BLOG_HERO.eyebrow}</p>
          <h1
            className="hero-rise mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
            style={{ animationDelay: "0.08s" }}
          >
            {BLOG_HERO.heading.replace(/\.$/, "")}
            <span className="text-accent">.</span>
          </h1>
          <p
            className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
            style={{ animationDelay: "0.16s" }}
          >
            {BLOG_HERO.subline}
          </p>
        </div>
      </section>

      {/* Featured Signal */}
      <SectionWrapper className="!pt-0 !pb-12">
        <FeaturedSignal />
      </SectionWrapper>

      {/* Signal strip — every figure comes from a post's own stat block */}
      <OceanBand sectionClassName="!py-14 md:!py-16">
        <StaggerChildren
          className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-[rgba(120,180,220,0.2)] bg-[rgba(120,180,220,0.2)] sm:grid-cols-2 lg:grid-cols-5"
          stagger={STAG_CARD / 1.5}
        >
          {SIGNAL_STRIP.map((cell) => (
            <StaggerItem key={cell.href} className="min-w-0">
              <Link
                href={cell.href}
                className="block h-full p-6 transition-colors duration-200 hover:bg-[#0E1C2C]"
                style={{ backgroundColor: OCEAN_CELL }}
              >
                <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-accent">
                  {cell.figure}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">{cell.line}</p>
                <p className="mt-3 text-[11px] font-semibold text-text-muted">
                  Read the analysis →
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </OceanBand>

      {/* Filter + grid */}
      <SectionWrapper>
        <FadeInWhenVisible>
          <div className="mb-10">
            <LayoutGroup>
              <FilterBar
                categories={[...BLOG_CATEGORIES]}
                active={activeFilter}
                onSelect={setActiveFilter}
              />
            </LayoutGroup>
          </div>
        </FadeInWhenVisible>

        <LayoutGroup>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </SectionWrapper>

      <CTABanner
        heading={BLOG_CTA.heading}
        subtext={BLOG_CTA.subtext}
        buttonText={BLOG_CTA.buttonText}
        buttonHref="/contact"
      />
    </>
  );
}
