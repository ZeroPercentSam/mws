"use client";

/* ====================================================================
 * /ABOUT — MOTION CONTRACT (homepage rules)
 * Signature: the Studio OS diagram (load-driven, HeroRig precedent —
 * runs on mobile). Everything below: transform/opacity, once-fired,
 * instant-gated via transition swaps only. Finite loops only.
 * ==================================================================== */

import { motion, MotionConfig } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import GlowCard from "@/components/ui/GlowCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CTABanner from "@/components/ui/CTABanner";
import LineIcon from "@/components/ui/LineIcon";
import { WarmBand, OceanBand } from "@/components/ui/Band";
import { METRICS } from "@/lib/constants";
import { eyebrowCls, chipCls, headingCls } from "@/lib/design";
import {
  EASE,
  DUR_POP,
  DUR_REVEAL,
  DUR_DRAW,
  DIST_SM,
  STAG_GRID,
  STAG_CARD,
  PULSE,
  VIEW_TIGHT,
} from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";
import {
  ABOUT_HERO,
  STUDIO_OS,
  FACTS,
  STORY,
  VALUES,
  ABOUT_CTA,
} from "./about-data";

/* ------------------------------------------------------------------ */
/*  StudioOS — THE signature: briefs flow through the pipeline and     */
/*  fan out into the ten real shipped platforms                        */
/* ------------------------------------------------------------------ */
const osPop = (delay: number) => ({
  hidden: { opacity: 0, y: DIST_SM },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_POP, ease: EASE, delay },
  },
});

const railV = (delay: number) => ({
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: DUR_DRAW * 0.5, ease: EASE, delay },
  },
});

function StudioOS() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative mx-auto mt-14 max-w-4xl"
    >
      {/* glow bed — static, pre-blurred */}
      <div
        aria-hidden
        className="absolute -inset-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse closest-side, rgba(255,107,0,0.12) 0%, rgba(74,158,203,0.08) 50%, transparent 75%)",
        }}
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.97 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: DUR_REVEAL, ease: EASE, delay: 0.2 },
          },
        }}
        className="relative rounded-2xl border border-border bg-[#0B0F14] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:p-8"
      >
        {/* B2 — brief inputs */}
        <div aria-hidden className="flex flex-wrap justify-center gap-2">
          {STUDIO_OS.inputs.map((label, i) => (
            <motion.span
              key={label}
              variants={osPop(0.5 + i * STAG_GRID)}
              className={`${chipCls} text-text-secondary`}
            >
              {label}
            </motion.span>
          ))}
        </div>

        {/* B3 — rail into the pipeline */}
        <motion.div
          aria-hidden
          variants={railV(0.9)}
          className="mx-auto my-4 h-8 w-px origin-top bg-gradient-to-b from-accent/30 via-accent to-accent-light"
        />

        {/* B4 — process nodes */}
        <div aria-hidden className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-6">
          {STUDIO_OS.nodes.map((node, i) => (
            <motion.div
              key={node.title}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: DUR_POP,
                    ease: EASE,
                    delay: 1.2 + i * STAG_CARD,
                  },
                },
              }}
              className="relative flex max-w-xs items-start gap-3 rounded-xl border border-accent/25 bg-[#160B02] px-4 py-3"
            >
              <span className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent">
                <LineIcon name={node.icon} className="h-4 w-4" />
                {/* B7 — single finite pulse on the review node */}
                {i === 1 && (
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, scale: 1 },
                      visible: {
                        opacity: [0.7, 0],
                        scale: [1, 1.9],
                        transition: { ...PULSE, delay: 3.4 },
                      },
                    }}
                    className="absolute inset-0 rounded-full border border-accent"
                  />
                )}
              </span>
              <span>
                <span className="block text-sm font-bold text-text-primary">
                  {node.title}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                  {node.caption}
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* B5 — rail out to the shipped grid */}
        <motion.div
          aria-hidden
          variants={railV(1.6)}
          className="mx-auto my-4 h-8 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-light/40"
        />

        {/* B6 — ten real platforms light up */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {STUDIO_OS.tiles.map((tile, i) => (
            <motion.div
              key={tile.slug}
              variants={{
                hidden: { opacity: 0.15 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: DUR_REVEAL,
                    ease: EASE,
                    delay: 2.0 + i * STAG_GRID,
                  },
                },
              }}
            >
              <Link
                href={`/work/${tile.slug}`}
                className="group relative block aspect-video overflow-hidden rounded-lg border border-border transition-colors duration-200 hover:border-border-hover"
              >
                <Image
                  src={`/work/screenshots/${tile.slug}/thumb.jpg`}
                  alt={`${tile.client} — live build`}
                  fill
                  sizes="(max-width: 640px) 50vw, 12vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={osPop(3.2)}
          className="mt-5 text-center text-xs text-text-muted"
        >
          {STUDIO_OS.caption}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AboutClient() {
  const instant = useInstantEntrance();
  const T = (t: object) => (instant ? INSTANT_TRANSITION : t);

  return (
    <MotionConfig reducedMotion="user">
      {/* ======================================================== */}
      {/* HERO + STUDIO OS                                          */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 70% 15%, rgba(255,107,0,0.13), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 80%, rgba(74,158,203,0.09), transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <div className="max-w-3xl">
            <p className={`hero-rise ${eyebrowCls}`}>{ABOUT_HERO.eyebrow}</p>
            <h1
              className="hero-rise mt-5 font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.06] tracking-tight md:text-6xl"
              style={{ animationDelay: "0.08s" }}
            >
              {ABOUT_HERO.headlineLines[0]}
              <br />
              {ABOUT_HERO.headlineLines[1]}
              <br />
              <span className="inline-block bg-gradient-to-r from-accent via-accent-light to-[#FFB347] bg-clip-text text-transparent [backface-visibility:hidden] [transform:translateZ(0)]">
                {ABOUT_HERO.headlineAccent}
              </span>
            </h1>
            <p
              className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
              style={{ animationDelay: "0.16s" }}
            >
              {ABOUT_HERO.subline}
            </p>
          </div>
          <StudioOS />
        </div>
      </section>

      {/* ======================================================== */}
      {/* STUDIO FACTS (ocean)                                      */}
      {/* ======================================================== */}
      <OceanBand sectionClassName="!py-16 md:!py-20">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInWhenVisible>
            <span className={eyebrowCls}>{FACTS.eyebrow}</span>
          </FadeInWhenVisible>
          <div className="mt-3">
            <AnimatedHeading text={FACTS.heading} className={headingCls} accentLastPeriod />
          </div>
        </div>
        <StaggerChildren
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4"
          stagger={STAG_CARD}
        >
          {METRICS.map((m) => (
            <StaggerItem key={m.label} className="text-center">
              <p className="font-[family-name:var(--font-heading)] text-4xl font-extrabold text-accent md:text-5xl">
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-2 text-sm text-text-secondary">{m.label}</p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </OceanBand>

      {/* ======================================================== */}
      {/* STORY (warm band)                                         */}
      {/* ======================================================== */}
      <WarmBand>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>{STORY.eyebrow}</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text={STORY.headline}
                className={headingCls}
                accentLastPeriod
              />
            </div>
            <div className="mt-8 space-y-6">
              {STORY.paragraphs.map((paragraph, i) => (
                <FadeInWhenVisible key={i} delay={0.1 + i * 0.1}>
                  <p className="text-lg leading-relaxed text-text-secondary">{paragraph}</p>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
          <div className="flex items-center md:col-span-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEW_TIGHT}
              className="relative pl-6"
            >
              {/* scaleY, not height (layout prop) — tokenized + instant-gated */}
              <motion.div
                variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
                transition={T({ duration: DUR_REVEAL, ease: EASE, delay: 0.2 })}
                className="absolute left-0 top-0 h-full w-[2px] origin-top bg-accent"
              />
              <motion.blockquote
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={T({ duration: DUR_REVEAL, ease: EASE, delay: 0.35 })}
                className="text-xl font-medium leading-relaxed text-text-primary md:text-2xl"
              >
                &ldquo;{STORY.pullQuote}&rdquo;
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </WarmBand>

      {/* ======================================================== */}
      {/* VALUES (tinted)                                           */}
      {/* ======================================================== */}
      <SectionWrapper>
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <FadeInWhenVisible>
            <span className={eyebrowCls}>What we stand for</span>
          </FadeInWhenVisible>
          <div className="mt-3">
            <AnimatedHeading text="The operating rules." className={headingCls} accentLastPeriod />
          </div>
        </div>
        <StaggerChildren
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={STAG_CARD / 1.5}
        >
          {VALUES.map((value) => (
            <StaggerItem key={value.title} className="min-w-0">
              <GlowCard className="h-full">
                <div className="relative h-full p-6 md:p-7">
                  <div
                    aria-hidden
                    className="absolute inset-x-5 top-0 h-[2px] rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${value.tint}, transparent)`,
                    }}
                  />
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${value.tint}1a`, color: value.tint }}
                  >
                    <LineIcon name={value.icon} />
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                    {value.body}
                  </p>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      <CTABanner
        heading={ABOUT_CTA.heading}
        subtext={ABOUT_CTA.subtext}
        buttonText={ABOUT_CTA.buttonText}
        buttonHref="/contact"
      />
    </MotionConfig>
  );
}
