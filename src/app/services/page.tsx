"use client";

/* ====================================================================
 * /SERVICES — MOTION CONTRACT (homepage rules apply)
 * Signature moment: the StackRig build sequence (load-driven, like
 * HeroRig — runs on mobile; flicker is a mid-scroll phenomenon).
 * Everything below the fold is transform/opacity-only, fires once,
 * instant-gated on mobile via transition swaps (never variant swaps).
 * Finite loops only; timings from lib/animations tokens.
 * ==================================================================== */

import { motion, MotionConfig } from "motion/react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CTABanner from "@/components/ui/CTABanner";
import DrawCheckmark from "@/components/ui/DrawCheckmark";
import { WarmBand } from "@/components/ui/Band";
import { VIGNETTES_EXTENDED } from "@/components/sections/Vignettes";
import { TECH_STACK, FAQ_ITEMS } from "@/lib/constants";
import { eyebrowCls, chipCls, headingCls, SERVICE_TINTS } from "@/lib/design";
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
import {
  SERVICES_HERO,
  DEEP_DIVES,
  ENGAGEMENT,
  SERVICES_FAQ_INTRO,
  SERVICES_CTA,
} from "./services-data";

/* ------------------------------------------------------------------ */
/*  StackRig — THE signature moment: three systems assembling into     */
/*  one stack (site pane / AI layer / automation rail)                 */
/* ------------------------------------------------------------------ */
const rigPop = (delay: number) => ({
  hidden: { opacity: 0, y: DIST_SM },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_POP, ease: EASE, delay },
  },
});

function StackRig() {
  return (
    <motion.div
      aria-hidden
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      {/* ambient glow bed — static, pre-blurred (no filter) */}
      <div
        className="absolute -inset-8 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.16) 0%, rgba(74,158,203,0.10) 45%, transparent 70%)",
        }}
      />

      {/* Beat 1 — site pane (websites, #FF6B00) */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: DUR_REVEAL, ease: EASE, delay: 0.4 },
          },
        }}
        className="relative rounded-2xl border border-border bg-[#0B0F14] shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            visible: {
              scaleX: 1,
              transition: { duration: DUR_DRAW, ease: EASE, delay: 0.7 },
            },
          }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent via-accent-light to-accent z-10"
        />
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="ml-3 h-5 flex-1 rounded-md bg-white/5 px-2.5 flex items-center">
            <span className="text-[9px] text-text-muted tracking-wide">
              yourbusiness.com
            </span>
          </div>
        </div>
        <div className="space-y-2.5 p-5 pb-4">
          <motion.div variants={rigPop(0.8)} className="h-5 w-3/4 rounded bg-white/10">
            <div className="h-full w-1/2 rounded bg-gradient-to-r from-white/60 to-white/20" />
          </motion.div>
          <motion.div variants={rigPop(0.95)} className="h-3 w-2/3 rounded bg-white/5" />
          <motion.div variants={rigPop(1.1)} className="relative h-14 rounded-lg bg-white/5 overflow-hidden">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: DUR_REVEAL, ease: EASE, delay: 1.35 },
                },
              }}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,107,0,0.28) 0%, rgba(10,34,54,0.8) 100%)",
              }}
            />
            <motion.span
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: DUR_REVEAL, ease: EASE, delay: 1.5 },
                },
              }}
              className="absolute bottom-2.5 left-3 h-5 w-16 rounded-md bg-accent"
            />
          </motion.div>
        </div>

        {/* Beat 3 — automation rail along the pane's bottom (#C9A961) */}
        <div className="relative border-t border-border px-5 py-3.5">
          <div className="relative flex items-center justify-between px-1">
            {["Lead", "Build", "Invoice"].map((label) => (
              <motion.div
                key={label}
                variants={rigPop(2.1 + 0.12 * ["Lead", "Build", "Invoice"].indexOf(label))}
                className="relative z-10 flex items-center gap-1.5"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(201,169,97,0.35)] bg-[#15110A]">
                  <span className="h-1 w-1 rounded-full bg-[#C9A961]" />
                </span>
                <span className="text-[9px] text-text-muted">{label}</span>
              </motion.div>
            ))}
            <div className="absolute left-6 right-6 top-2.5 h-px bg-white/10" />
            <motion.span
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                visible: {
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 1.2, ease: EASE, delay: 2.4 },
                },
              }}
              className="absolute left-6 right-6 top-2.5 h-px origin-left bg-gradient-to-r from-[rgba(201,169,97,0.2)] via-[#C9A961] to-[#C9A961]"
            />
          </div>
        </div>
      </motion.div>

      {/* Beat 2 — AI layer card overlapping the pane (#4A9ECB) */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: DIST_SM },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: DUR_REVEAL, ease: EASE, delay: 1.5 },
          },
        }}
        className="absolute -right-3 top-16 w-[58%] rounded-xl border bg-[#0A1420] p-3 shadow-2xl md:-right-6"
        style={{ borderColor: "rgba(74,158,203,0.35)" }}
      >
        <div className="flex justify-end">
          <span className="rounded-lg rounded-br-sm bg-white/8 px-2 py-1 text-[9px] text-text-secondary">
            Open on Sundays?
          </span>
        </div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: DIST_SM / 2 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: DUR_POP, ease: EASE, delay: 1.9 },
            },
          }}
          className="mt-1.5 flex justify-start"
        >
          <span
            className="rounded-lg rounded-bl-sm border px-2 py-1 text-[9px] text-text-primary"
            style={{
              borderColor: "rgba(74,158,203,0.4)",
              backgroundColor: "rgba(74,158,203,0.12)",
            }}
          >
            Yes — booked you for 10am. Confirmation sent.
          </span>
        </motion.div>
        <svg viewBox="0 0 120 18" fill="none" className="mt-1.5 h-4 w-full">
          <motion.path
            d="M2 15 L24 12 L44 13 L66 7 L88 9 L118 2"
            stroke="#4A9ECB"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.9, ease: EASE, delay: 2.1 },
              },
            }}
          />
        </svg>
      </motion.div>

      {/* Beat 4 — "one system" badge */}
      <motion.div
        variants={rigPop(2.9)}
        className="absolute -bottom-5 -left-3 md:-left-6 flex items-center gap-3 rounded-xl border border-border bg-bg-card px-4 py-3 shadow-2xl"
      >
        <span className="relative flex h-8 w-8 items-center justify-center">
          <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 -rotate-90">
            <circle cx="16" cy="16" r="13" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <motion.circle
              cx="16"
              cy="16"
              r="13"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 1, ease: EASE, delay: 3.0 },
                },
              }}
            />
          </svg>
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 1 },
              visible: {
                opacity: [0.6, 0],
                scale: [1, 1.8],
                transition: { ...PULSE, delay: 3.6 },
              },
            }}
            className="absolute inset-0 rounded-full border border-accent"
          />
        </span>
        <div>
          <p className="text-xs font-bold text-text-primary">One system</p>
          <p className="text-[10px] text-text-muted">Site · AI · automation</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Deep-dive section — one per service, tint-coded                    */
/* ------------------------------------------------------------------ */
function DeepDive({
  dive,
  index,
}: {
  dive: (typeof DEEP_DIVES)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <section
      id={dive.id}
      className={`relative overflow-hidden py-20 md:py-28 ${index % 2 !== 0 ? "bg-bg-secondary" : ""}`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Narrative column */}
          <div className={`md:col-span-5 ${!isEven ? "md:order-2" : ""}`}>
            <FadeInWhenVisible>
              <span
                className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: dive.tint }}
              >
                {dive.number} · {dive.window}
              </span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text={dive.title}
                className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-extrabold tracking-tight"
              />
            </div>
            <FadeInWhenVisible delay={0.15}>
              <p className="mt-2 text-lg font-semibold text-text-primary">{dive.tagline}</p>
              <p className="mt-4 leading-relaxed text-text-secondary">{dive.intro}</p>
            </FadeInWhenVisible>

            {/* Proof chips — every number derived, every chip links */}
            <StaggerChildren className="mt-6 flex flex-wrap gap-2" stagger={STAG_GRID}>
              {dive.proof.map((p) => (
                <StaggerItem key={p.href + p.label} className="min-w-0">
                  <Link
                    href={p.href}
                    className={`${chipCls} inline-block transition-colors duration-200 hover:border-border-hover`}
                    style={{ color: dive.tint, borderColor: `${dive.tint}40` }}
                  >
                    {p.label}
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>

            {/* Deliverables */}
            <div className="mt-8 space-y-3">
              {dive.deliverables.map((item, i) => (
                <FadeInWhenVisible key={item} delay={0.1 + i * 0.05}>
                  <div className="flex items-center gap-3">
                    {/* DrawCheckmark strokes currentColor — tint via wrapper */}
                    <span className="flex-shrink-0" style={{ color: dive.tint }}>
                      <DrawCheckmark size={18} delay={i * 0.08} />
                    </span>
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>

          {/* Vignette + features column */}
          <div className={`md:col-span-7 ${!isEven ? "md:order-1" : ""}`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEW_TIGHT}
              className="mb-6 max-w-sm"
            >
              {VIGNETTES_EXTENDED[dive.key]}
            </motion.div>
            <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={STAG_CARD / 1.5}>
              {dive.features.map((feature) => (
                <StaggerItem key={feature.title} className="min-w-0">
                  <GlowCard className="h-full">
                    <div className="relative h-full p-6">
                      <div
                        aria-hidden
                        className="absolute inset-x-5 top-0 h-[2px] rounded-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${dive.tint}, transparent)`,
                        }}
                      />
                      <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary">
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ServicesPage() {
  return (
    <MotionConfig reducedMotion="user">
      {/* ======================================================== */}
      {/* HERO + STACK RIG                                          */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,107,0,0.14), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 75%, rgba(74,158,203,0.10), transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <p className={`hero-rise ${eyebrowCls}`}>{SERVICES_HERO.eyebrow}</p>
            <h1
              className="hero-rise mt-5 font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.06] tracking-tight md:text-6xl"
              style={{ animationDelay: "0.08s" }}
            >
              {SERVICES_HERO.headlineLines[0]}
              <br />
              {SERVICES_HERO.headlineLines[1]}
              <br />
              <span className="inline-block bg-gradient-to-r from-accent via-accent-light to-[#FFB347] bg-clip-text text-transparent [backface-visibility:hidden] [transform:translateZ(0)]">
                {SERVICES_HERO.headlineAccent}
              </span>
            </h1>
            <p
              className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
              style={{ animationDelay: "0.16s" }}
            >
              {SERVICES_HERO.subline}
            </p>
            <div
              className="hero-rise mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "0.28s" }}
            >
              <Button variant="primary" href="/contact">
                {SERVICES_HERO.ctaPrimary}
              </Button>
              <Button variant="secondary" href="/work">
                {SERVICES_HERO.ctaSecondary}
              </Button>
            </div>
            <p
              className="hero-rise mt-5 text-sm text-text-muted"
              style={{ animationDelay: "0.36s" }}
            >
              {SERVICES_HERO.risk}
            </p>
          </div>
          <StackRig />
        </div>
      </section>

      {/* ======================================================== */}
      {/* DEEP DIVES (01 · 02 · 03)                                 */}
      {/* ======================================================== */}
      {DEEP_DIVES.map((dive, i) => (
        <DeepDive key={dive.key} dive={dive} index={i} />
      ))}

      {/* ======================================================== */}
      {/* ENGAGEMENT AT A GLANCE (warm band)                        */}
      {/* ======================================================== */}
      <WarmBand>
        <div className="mx-auto max-w-3xl text-center">
          <FadeInWhenVisible>
            <span className={eyebrowCls}>{ENGAGEMENT.eyebrow}</span>
          </FadeInWhenVisible>
          <div className="mt-3">
            <AnimatedHeading text={ENGAGEMENT.heading} className={headingCls} />
          </div>
          <FadeInWhenVisible delay={0.2}>
            <p className="mt-5 leading-relaxed text-text-secondary md:text-lg">
              {ENGAGEMENT.intro}
            </p>
          </FadeInWhenVisible>
        </div>

        <StaggerChildren className="mt-12 grid gap-4 md:grid-cols-3" stagger={STAG_CARD}>
          {ENGAGEMENT.rows.map((row) => (
            <StaggerItem key={row.service} className="min-w-0">
              <div className="h-full rounded-[var(--radius-card)] border border-border bg-[#15100B] p-7">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: SERVICE_TINTS[row.key as keyof typeof SERVICE_TINTS] }}
                >
                  {row.window}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-bold">
                  {row.service}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{row.range}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeInWhenVisible delay={0.15} className="mx-auto mt-8 max-w-2xl text-center">
          <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight md:text-3xl">
            {ENGAGEMENT.floorPrefix}
            <span className="text-accent">{ENGAGEMENT.floorAmount}</span>
          </p>
          <p className="mt-2 text-sm text-text-muted">{ENGAGEMENT.floorNote}</p>
          <div className="mt-5 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3.5">
            <p className="text-sm leading-relaxed text-text-primary">{ENGAGEMENT.retainers}</p>
          </div>
        </FadeInWhenVisible>

        <StaggerChildren
          className="mt-12 flex flex-wrap justify-center gap-2"
          stagger={STAG_GRID / 2}
        >
          {Object.values(TECH_STACK)
            .flat()
            .map((tech) => (
              <StaggerItem key={tech}>
                <span className={`inline-block ${chipCls} text-text-muted`}>{tech}</span>
              </StaggerItem>
            ))}
        </StaggerChildren>
      </WarmBand>

      {/* ======================================================== */}
      {/* FAQ                                                       */}
      {/* ======================================================== */}
      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <FadeInWhenVisible>
              <span className={eyebrowCls}>{SERVICES_FAQ_INTRO.eyebrow}</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text={SERVICES_FAQ_INTRO.heading}
                className={headingCls}
                accentLastPeriod
              />
            </div>
            <FadeInWhenVisible delay={0.2}>
              <p className="mt-4 text-text-secondary">{SERVICES_FAQ_INTRO.lede}</p>
            </FadeInWhenVisible>
          </div>
          <FadeInWhenVisible delay={0.1}>
            <Accordion items={FAQ_ITEMS} />
          </FadeInWhenVisible>
        </div>
      </SectionWrapper>

      {/* ======================================================== */}
      {/* CTA                                                       */}
      {/* ======================================================== */}
      <CTABanner
        heading={SERVICES_CTA.heading}
        subtext={SERVICES_CTA.subtext}
        buttonText={SERVICES_CTA.buttonText}
        buttonHref="/contact"
      />
    </MotionConfig>
  );
}
