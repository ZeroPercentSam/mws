"use client";

/* ====================================================================
 * MWS HOMEPAGE — MOTION CONTRACT
 * --------------------------------------------------------------------
 * 1. ONE signature moment: the HeroRig build sequence. Everything else
 *    is transform/opacity-only, fires once (viewport once:true).
 * 2. No animated body text (NN/g) — words people read never move after
 *    their single entrance reveal.
 * 3. Every loop is finite (repeat: 2) and whileInView-gated where it
 *    sits below the fold. Ambient budget: logo marquee (existing CSS),
 *    hero morph ×2, two pulse rings ×2.
 * 4. All timings/easings/distances come from the named interaction
 *    tokens in lib/animations — no literal animation numbers here.
 * 5. <MotionConfig reducedMotion="user"> covers JS-driven motion;
 *    globals.css already neutralizes CSS keyframes.
 * 6. Known-gotcha guards (see inline comments): drawPath-style variants
 *    carry their own transition (a sibling transition prop would be
 *    ignored); never animate pathLength over strokeDasharray; min-w-0
 *    on grid items containing truncating text; overflow-hidden only on
 *    sections, never a page root.
 * ==================================================================== */

import { motion, MotionConfig } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";
import LogoMarquee from "@/components/ui/LogoMarquee";
import Accordion from "@/components/ui/Accordion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlowCTA from "@/components/ui/GlowCTA";
import LineIcon, { type IconName } from "@/components/ui/LineIcon";
import Seam from "@/components/ui/Seam";
import OpsFlow from "@/components/sections/OpsFlow";
import ContactForm from "@/components/form/ContactForm";
import { METRICS, TESTIMONIALS, TECH_STACK, CASE_STUDIES } from "@/lib/constants";
import {
  fadeInUp,
  scaleIn,
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
  HERO,
  RIG_THEMES,
  PAIN,
  MATH_STATS,
  RESULT_CARDS,
  WINS,
  TRIPTYCH,
  OPS,
  BUILD_LOG,
  PRICING,
  HOME_FAQ,
  FINAL_CTA,
} from "./home-data";

/* ------------------------------------------------------------------ */
/*  Page-local visual constants                                        */
/* ------------------------------------------------------------------ */
const BAND_WARM = "#0D0703";

/* Blueprint grid texture for the two warm bands — static, zero cost */
const BLUEPRINT: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 48px)",
  maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
};

const eyebrowCls =
  "text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent";
const chipCls =
  "rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs";
const headingCls =
  "font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-extrabold tracking-tight";

/* ------------------------------------------------------------------ */
/*  S1 · HeroRig — THE signature moment: a site that builds itself     */
/* ------------------------------------------------------------------ */
const rigBlock = (delay: number) => ({
  hidden: { opacity: 0, y: DIST_SM },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_POP, ease: EASE, delay },
  },
});

/* skeleton → designed crossfade (opacity only) */
const rigResolve = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR_REVEAL, ease: EASE, delay } },
});

function HeroRig() {
  const MORPH_START = 4.2;
  const MORPH_PER = 2.4;
  return (
    <motion.div
      aria-hidden
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      {/* ambient glow bed */}
      <div
        className="absolute -inset-8 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.18) 0%, rgba(56,130,180,0.10) 45%, transparent 70%)",
        }}
      />
      {/* Beat 1 — browser chrome */}
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
        {/* build progress sweep */}
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
        {/* chrome bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="ml-3 h-5 flex-1 rounded-md bg-white/5 px-2.5 flex items-center">
            <span className="text-[9px] text-text-muted tracking-wide">
              yourcompany.com
            </span>
          </div>
        </div>

        <div className="relative p-5 space-y-3">
          {/* Beat 2 — skeleton blocks in build order */}
          <motion.div variants={rigBlock(0.9)} className="h-6 w-full rounded-md bg-white/5 flex items-center gap-2 px-2">
            <span className="h-2 w-10 rounded bg-white/15" />
            <span className="ml-auto h-2 w-6 rounded bg-white/10" />
            <span className="h-2 w-6 rounded bg-white/10" />
            <motion.span variants={rigResolve(2.5)} className="h-3 w-12 rounded bg-accent/80" />
          </motion.div>

          <div className="space-y-2 pt-2">
            <motion.div variants={rigBlock(1.15)} className="relative h-5 w-4/5 rounded bg-white/10 overflow-hidden">
              <motion.div variants={rigResolve(2.7)} className="absolute inset-0 bg-gradient-to-r from-white/70 to-white/30" />
            </motion.div>
            <motion.div variants={rigBlock(1.3)} className="relative h-5 w-3/5 rounded bg-white/10 overflow-hidden">
              <motion.div variants={rigResolve(2.85)} className="absolute inset-0 bg-accent/70" />
            </motion.div>
            <motion.div variants={rigBlock(1.45)} className="h-3 w-2/3 rounded bg-white/5" />
          </div>

          <motion.div variants={rigBlock(1.65)} className="relative h-20 rounded-lg bg-white/5 overflow-hidden">
            <motion.div
              variants={rigResolve(3.0)}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,107,0,0.30) 0%, rgba(10,34,54,0.8) 100%)",
              }}
            />
            <motion.span
              variants={rigResolve(3.2)}
              className="absolute bottom-3 left-3 h-6 w-20 rounded-md bg-accent"
            />
          </motion.div>

          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={rigBlock(1.9 + i * 0.12)}
                className="relative h-12 rounded-md bg-white/5 overflow-hidden"
              >
                <motion.div
                  variants={rigResolve(3.3 + i * 0.1)}
                  className="absolute inset-x-2 top-2 h-1.5 rounded bg-accent/60"
                />
                <motion.div
                  variants={rigResolve(3.4 + i * 0.1)}
                  className="absolute inset-x-2 top-5 h-1 rounded bg-white/15"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Beat 4 — idle niche morph: chips swap on every breakpoint
            (opacity-only); the color-blend overlay stays md+ because iOS
            Safari flickers on mix-blend-mode during scroll. */}
        <div>
          {RIG_THEMES.map((theme, i) => (
            <motion.div
              key={theme.niche}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: [0, 1, 1, 0],
                  transition: {
                    duration: MORPH_PER,
                    times: [0, 0.12, 0.85, 1],
                    delay: MORPH_START + i * MORPH_PER,
                    repeat: 1,
                    repeatDelay: MORPH_PER * (RIG_THEMES.length - 1),
                    ease: "easeInOut",
                  },
                },
              }}
              /* whole beat md+ only: its long opacity timeline runs while
                 mobile users scroll the hero — iOS flicker trigger */
              className="pointer-events-none absolute inset-0 hidden md:block"
            >
              <div
                className="absolute inset-0 md:mix-blend-color"
                style={{ backgroundColor: theme.accent, opacity: 0.35 }}
              />
              <span
                className="absolute top-[60px] right-5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                style={{
                  color: theme.accent,
                  borderColor: `${theme.accent}55`,
                  backgroundColor: "rgba(5,5,5,0.7)",
                }}
              >
                {theme.niche}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Beat 3 — launch-ready badge */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: DIST_SM },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: DUR_POP, ease: EASE, delay: 2.4 },
          },
        }}
        className="absolute -bottom-5 -left-3 md:-left-6 flex items-center gap-3 rounded-xl border border-border bg-bg-card px-4 py-3 shadow-2xl"
      >
        <span className="relative flex h-8 w-8 items-center justify-center">
          <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 -rotate-90">
            <circle cx="16" cy="16" r="13" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            {/* plain stroke — never combine animated pathLength with a
                dasharray (motion rewrites stroke-dasharray) */}
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
                  transition: { duration: 1, ease: EASE, delay: 2.6 },
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
                transition: { ...PULSE, delay: 3.4 },
              },
            }}
            className="absolute inset-0 rounded-full border border-accent"
          />
        </span>
        <div>
          <p className="text-xs font-bold text-text-primary">Launch-ready</p>
          <p className="text-[10px] text-text-muted">Designed · built · measured</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  S5 · Service vignettes — tiny fake-UI that shows the product       */
/* ------------------------------------------------------------------ */
function VignettePerf() {
  return (
    <div className="rounded-lg border border-border bg-[#0B0F14] p-3">
      <div className="flex items-center gap-1.5 pb-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <div className="ml-2 h-4 flex-1 rounded bg-white/5" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 0.9, ease: EASE, delay: 0.3 },
              },
            }}
            className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-light"
          />
        </div>
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: DUR_POP, ease: EASE, delay: 1.1 },
            },
          }}
          className="text-xs font-bold text-accent tabular-nums"
        >
          &lt;2s
        </motion.span>
      </div>
      <p className="mt-2 text-[10px] text-text-muted">Performance budget, every build</p>
    </div>
  );
}

function VignetteAI() {
  return (
    <div className="rounded-lg border border-border bg-[#0B0F14] p-3 space-y-2">
      <div className="flex justify-end">
        <span className="rounded-lg rounded-br-sm bg-white/8 px-2.5 py-1.5 text-[10px] text-text-secondary">
          Do you have this in navy, slim cut?
        </span>
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: DIST_SM / 2, scale: 0.96 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: DUR_POP, ease: EASE, delay: 0.4 },
          },
        }}
        className="flex justify-start"
      >
        <span
          className="rounded-lg rounded-bl-sm border px-2.5 py-1.5 text-[10px] text-text-primary"
          style={{ borderColor: "rgba(74,158,203,0.4)", backgroundColor: "rgba(74,158,203,0.12)" }}
        >
          Yes — 3 fabrics in stock. Want to try it on virtually?
        </span>
      </motion.div>
      <svg viewBox="0 0 120 22" fill="none" className="h-5 w-full">
        <motion.path
          d="M2 18 L24 14 L44 16 L66 9 L88 11 L118 3"
          stroke="#4A9ECB"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.9, ease: EASE, delay: 0.7 },
            },
          }}
        />
      </svg>
    </div>
  );
}

function VignettePipeline() {
  return (
    <div className="rounded-lg border border-border bg-[#0B0F14] p-3">
      <div className="relative flex items-center justify-between px-1">
        {["Lead", "Approve", "Invoice"].map((label) => (
          <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(201,169,97,0.35)] bg-[#15110A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A961]" />
            </span>
            <span className="text-[9px] text-text-muted">{label}</span>
          </div>
        ))}
        {/* connector track + transform-only fill (animating `left` is a
            layout property -> mobile jank; scaleX stays on the compositor) */}
        <div className="absolute left-8 right-8 top-3.5 h-px bg-white/10" />
        <motion.span
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 1,
              transition: { duration: 1.2, ease: EASE, delay: 0.4 },
            },
          }}
          className="absolute left-8 right-8 top-3.5 h-px origin-left bg-gradient-to-r from-[rgba(201,169,97,0.2)] via-[#C9A961] to-[#C9A961]"
        />
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 1 },
            visible: {
              opacity: [0.7, 0],
              scale: [1, 2],
              transition: { ...PULSE, delay: 1.5 },
            },
          }}
          className="absolute right-7 top-2.5 h-3 w-3 rounded-full border border-[#C9A961]"
        />
      </div>
      <p className="mt-2.5 text-[10px] text-text-muted">
        Zero hands between request and payment
      </p>
    </div>
  );
}

const VIGNETTES: Record<string, React.ReactNode> = {
  websites: <VignettePerf />,
  ai: <VignetteAI />,
  automation: <VignettePipeline />,
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const slugByClient = new Map(CASE_STUDIES.map((c) => [c.client, c.slug]));

export default function HomeClient() {
  // mobile: timed scroll entrances flicker on iOS Safari — snap instead
  const instant = useInstantEntrance();
  const T = (t: object) => (instant ? INSTANT_TRANSITION : t);
  return (
    <MotionConfig reducedMotion="user">
      <div>
        {/* Hero text entrance — CSS so the LCP heading never waits on JS;
            placed BEFORE the hero so streamed rendering can't paint
            unstyled text first. globals.css reduced-motion neutralizes it. */}
        {/* fill:backwards, from-only keyframe: `both`/`forwards` HOLDS the
            animated transform forever (computed matrix(1,0,0,1,0,0), never
            "none") — five permanently composited hero elements on iOS.
            backwards still hides pre-delay, then releases to base styles. */}
        <style>{`
          @keyframes hero-rise {
            from { opacity: 0; transform: translate3d(0, 16px, 0); }
          }
          .hero-rise { animation: hero-rise 0.5s ${`cubic-bezier(${EASE.join(",")})`} backwards; }
        `}</style>
        {/* ======================================================== */}
        {/* S1 · HERO                                                 */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,107,0,0.14), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 75%, rgba(56,130,180,0.13), transparent 60%)",
            }}
          />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            {/* Text column — CSS entrance (LCP must not wait on hydration) */}
            <div>
              <p className="hero-rise text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {HERO.eyebrow}
              </p>
              <h1
                className="hero-rise mt-5 font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.06] tracking-tight md:text-6xl lg:text-[4.2rem]"
                style={{ animationDelay: "0.08s" }}
              >
                {HERO.headlineLines[0]}
                <br />
                {HERO.headlineLines[1]}
                <br />
                <span className="inline-block bg-gradient-to-r from-accent via-accent-light to-[#FFB347] bg-clip-text text-transparent [backface-visibility:hidden] [transform:translateZ(0)]">{HERO.headlineAccent}</span>
              </h1>
              <p
                className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
                style={{ animationDelay: "0.16s" }}
              >
                {HERO.subline}
              </p>
              <div
                className="hero-rise mt-9 flex flex-wrap items-center gap-4"
                style={{ animationDelay: "0.28s" }}
              >
                <Button variant="primary" href="/contact">
                  {HERO.ctaPrimary}
                </Button>
                <Button variant="secondary" href="/work">
                  {HERO.ctaSecondary}
                </Button>
              </div>
              <p
                className="hero-rise mt-5 text-sm text-text-muted"
                style={{ animationDelay: "0.36s" }}
              >
                {HERO.risk}
              </p>
            </div>
            {/* Signature moment */}
            <HeroRig />
          </div>
        </section>

        {/* ======================================================== */}
        {/* S2 · PROOF BAR                                            */}
        {/* ======================================================== */}
        <section className="border-y border-border bg-bg-secondary py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <LogoMarquee />
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
          </div>
        </section>

        {/* ======================================================== */}
        {/* S3 · PAIN (PAS)                                           */}
        {/* ======================================================== */}
        <SectionWrapper>
          <FadeInWhenVisible>
            <span className={eyebrowCls}>{PAIN.eyebrow}</span>
          </FadeInWhenVisible>
          <div className="mt-3 max-w-2xl">
            <AnimatedHeading text={PAIN.heading} className={headingCls} />
          </div>
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3" stagger={STAG_CARD}>
            {PAIN.cards.map((card) => (
              <StaggerItem key={card.title} className="min-w-0">
                <GlowCard className="h-full">
                  <div className="p-7 md:p-8">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <LineIcon name={card.icon as IconName} />
                    </span>
                    <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold md:text-xl">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-text-secondary md:text-base">
                      {card.body}
                    </p>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </SectionWrapper>

        {/* ======================================================== */}
        {/* S4 · RESULTS GALLERY                                      */}
        {/* ======================================================== */}
        <SectionWrapper>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <FadeInWhenVisible>
                <span className={eyebrowCls}>Live work</span>
              </FadeInWhenVisible>
              <div className="mt-3">
                <AnimatedHeading text="Built. Launched. Measured." className={headingCls} />
              </div>
              <FadeInWhenVisible delay={0.2}>
                <p className="mt-4 text-text-secondary md:text-lg">
                  We don&rsquo;t show mockups. Everything below is live, in
                  production, doing its job.
                </p>
              </FadeInWhenVisible>
            </div>
          </div>
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3" stagger={STAG_CARD}>
            {RESULT_CARDS.map((card) => (
              <StaggerItem key={card.slug} className="min-w-0">
                <Link href={`/work/${card.slug}`} className="block h-full group">
                  <GlowCard className="h-full">
                    <div className="flex h-full flex-col p-7 md:p-8">
                      <motion.p
                        variants={scaleIn}
                        transition={T({ duration: DUR_REVEAL, ease: EASE })}
                        className="font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-tight text-accent md:text-5xl"
                      >
                        {card.metric}
                      </motion.p>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">
                        {card.metricLabel}
                      </p>
                      <p className="mt-3 text-sm text-text-secondary">{card.sub}</p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                        {card.story}
                      </p>
                      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-lg border border-border">
                        <Image
                          src={`/work/screenshots/${card.slug}/thumb.jpg`}
                          alt={`${card.client} — live platform screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <p className="min-w-0 truncate text-sm font-semibold text-text-primary">
                          {card.client}
                        </p>
                        <span className={`shrink-0 ${chipCls} text-text-secondary`}>
                          {card.niche}
                        </span>
                      </div>
                    </div>
                  </GlowCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {/* Wins strip */}
          <StaggerChildren
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            stagger={STAG_GRID}
          >
            {WINS.map((w) => (
              /* min-w-0: chips truncate — without it the grid track inherits
                 the unwrapped min-content width (proposal lesson) */
              <StaggerItem key={w.slug} className="min-w-0">
                <Link
                  href={`/work/${w.slug}`}
                  className="flex h-full items-baseline gap-2.5 rounded-lg border border-border bg-bg-card px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-hover"
                >
                  <span className="shrink-0 font-[family-name:var(--font-heading)] text-base font-extrabold text-accent">
                    {w.metric}
                  </span>
                  <span className="min-w-0 truncate text-sm text-text-secondary">
                    {w.tail} — {w.client}
                  </span>
                </Link>
              </StaggerItem>
            ))}
            <StaggerItem className="min-w-0 sm:col-span-2 lg:col-span-1">
              <Link
                href="/work"
                className="flex h-full items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3.5 text-sm font-semibold text-accent transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/15"
              >
                {`View all ${CASE_STUDIES.length} live platforms`}
                <LineIcon name="arrow" className="h-4 w-4" />
              </Link>
            </StaggerItem>
          </StaggerChildren>
        </SectionWrapper>

        {/* ======================================================== */}
        {/* S5 · SERVICES TRIPTYCH                                    */}
        {/* ======================================================== */}
        <SectionWrapper className="!pt-8">
          <FadeInWhenVisible>
            <span className={eyebrowCls}>{TRIPTYCH.eyebrow}</span>
          </FadeInWhenVisible>
          <div className="mt-3 max-w-2xl">
            <AnimatedHeading text={TRIPTYCH.heading} className={headingCls} />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TRIPTYCH.items.map((item, i) => (
              <motion.div
                key={item.key}
                initial="hidden"
                whileInView="visible"
                viewport={VIEW_TIGHT}
                className="min-w-0 h-full"
              >
                <GlowCard className="h-full">
                  <motion.div
                    variants={fadeInUp}
                    transition={T({ duration: DUR_REVEAL, ease: EASE, delay: i * STAG_CARD })}
                    className="relative flex h-full flex-col p-7 md:p-8"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-x-6 top-0 h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${item.tint}, transparent)`,
                      }}
                    />
                    {VIGNETTES[item.key]}
                    <h3 className="mt-6 flex items-center gap-2.5 font-[family-name:var(--font-heading)] text-xl font-bold md:text-2xl">
                      <span
                        aria-hidden
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: item.tint }}
                      />
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                      {item.body}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.chips.map((chip) => (
                        <span key={chip} className={`${chipCls} text-text-secondary`}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* ======================================================== */}
        {/* S6 · OPERATING MODEL (warm band)                          */}
        {/* ======================================================== */}
        <Seam />
        <div className="relative" style={{ backgroundColor: BAND_WARM }}>
          <div aria-hidden className="absolute inset-0 hidden md:block" style={BLUEPRINT} />
          <SectionWrapper className="relative !py-20 md:!py-28">
            <div className="mx-auto max-w-3xl text-center">
              <FadeInWhenVisible>
                <span className={eyebrowCls}>{OPS.eyebrow}</span>
              </FadeInWhenVisible>
              <div className="mt-3">
                <AnimatedHeading text={OPS.heading} className={headingCls} />
              </div>
              <FadeInWhenVisible delay={0.2}>
                <p className="mt-5 leading-relaxed text-text-secondary md:text-lg">
                  {OPS.intro}
                </p>
              </FadeInWhenVisible>
            </div>

            <div className="mt-16 md:mt-20">
              <OpsFlow steps={OPS.steps} />
            </div>

            <FadeInWhenVisible delay={0.2} className="mt-10 text-center">
              <p className="text-sm text-text-muted">{OPS.timeline}</p>
            </FadeInWhenVisible>

            <StaggerChildren className="mt-16 grid gap-6 md:grid-cols-3" stagger={STAG_CARD}>
              {OPS.mechanisms.map((m) => (
                <StaggerItem key={m.title} className="min-w-0">
                  <div className="h-full rounded-[var(--radius-card)] border border-border bg-[#15100B] p-7">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold">
                      {m.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                      {m.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <StaggerChildren
              className="mt-12 flex flex-wrap justify-center gap-2"
              stagger={STAG_GRID / 2}
            >
              {Object.values(TECH_STACK)
                .flat()
                .map((tech) => (
                  <StaggerItem key={tech}>
                    <span className={`inline-block ${chipCls} text-text-muted`}>
                      {tech}
                    </span>
                  </StaggerItem>
                ))}
            </StaggerChildren>
          </SectionWrapper>
        </div>
        <Seam />

        {/* ======================================================== */}
        {/* S7 · THE MATH — deep-ocean band for contrast              */}
        {/* ======================================================== */}
        <Seam />
        <div
          style={{
            background:
              "linear-gradient(180deg, var(--color-bg-primary) 0%, #071321 35%, #0A2236 100%)",
          }}
        >
        <SectionWrapper>
          <FadeInWhenVisible>
            <span className={eyebrowCls}>The math</span>
          </FadeInWhenVisible>
          <div className="mt-3 max-w-2xl">
            <AnimatedHeading
              text="The numbers behind the urgency."
              className={headingCls}
            />
          </div>
          <StaggerChildren
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-[rgba(120,180,220,0.2)] bg-[rgba(120,180,220,0.2)] sm:grid-cols-2 lg:grid-cols-4"
            stagger={STAG_CARD}
          >
            {MATH_STATS.map((stat) => (
              <StaggerItem key={stat.figure} className="min-w-0">
                <Link
                  href={stat.href}
                  className="block h-full bg-[#0A1622] p-7 transition-colors duration-200 hover:bg-[#0E1C2C]"
                >
                  <motion.p
                    variants={scaleIn}
                    transition={T({ duration: DUR_REVEAL, ease: EASE })}
                    className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-accent md:text-4xl"
                  >
                    {stat.figure}
                  </motion.p>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                    {stat.line}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-text-muted">
                    Read the analysis →
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </SectionWrapper>
        </div>
        <Seam />

        {/* ======================================================== */}
        {/* S8 · BUILD LOG (honest social proof)                      */}
        {/* ======================================================== */}
        <section className="bg-bg-secondary">
          <SectionWrapper>
            <FadeInWhenVisible>
              <span className={eyebrowCls}>{BUILD_LOG.eyebrow}</span>
            </FadeInWhenVisible>
            <div className="mt-3 max-w-2xl">
              <AnimatedHeading text={BUILD_LOG.heading} className={headingCls} />
            </div>
            <FadeInWhenVisible delay={0.2}>
              <p className="mt-4 max-w-2xl text-text-secondary md:text-lg">
                {BUILD_LOG.intro}
              </p>
            </FadeInWhenVisible>
            <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2" stagger={STAG_CARD}>
              {TESTIMONIALS.map((t) => {
                const slug = slugByClient.get(t.name);
                const body = (
                  <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-bg-card p-7 transition-colors duration-200 hover:border-border-hover md:p-8">
                    <p className="flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                      {t.quote}
                    </p>
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <p className="min-w-0 truncate text-xs text-text-muted">
                        <span className="font-semibold text-text-primary">{t.name}</span>
                        {" "}· {t.title} · {t.company}
                      </p>
                      {slug && (
                        <span className="shrink-0 text-xs font-semibold text-accent">
                          See the build →
                        </span>
                      )}
                    </div>
                  </div>
                );
                return (
                  <StaggerItem key={t.name} className="min-w-0">
                    {slug ? (
                      <Link href={`/work/${slug}`} className="block h-full">
                        {body}
                      </Link>
                    ) : (
                      body
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </SectionWrapper>
        </section>

        {/* ======================================================== */}
        {/* S9 · INVESTMENT (warm band)                               */}
        {/* ======================================================== */}
        <Seam />
        <div className="relative" style={{ backgroundColor: BAND_WARM }}>
          <div aria-hidden className="absolute inset-0 hidden md:block" style={BLUEPRINT} />
          <SectionWrapper className="relative !py-20 md:!py-28">
            <div className="mx-auto max-w-3xl text-center">
              <FadeInWhenVisible>
                <span className={eyebrowCls}>{PRICING.eyebrow}</span>
              </FadeInWhenVisible>
              <div className="mt-3">
                <AnimatedHeading text={PRICING.heading} className={headingCls} />
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <GlowCard className="min-w-0">
                <div className="p-8 md:p-10">
                  <p className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight md:text-4xl">
                    {PRICING.floorPrefix}
                    <span className="text-accent">{PRICING.floorAmount}</span>
                  </p>
                  <p className="mt-2 text-sm text-text-muted">{PRICING.floorNote}</p>
                  <div className="my-7 h-px bg-border" />
                  <ul className="space-y-4">
                    {PRICING.ranges.map((row) => (
                      <li key={row.label} className="flex items-baseline justify-between gap-4">
                        <span className="text-text-secondary">{row.label}</span>
                        <span className="shrink-0 font-semibold text-text-primary">
                          {row.range}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3.5">
                    <p className="text-sm leading-relaxed text-text-primary">
                      {PRICING.retainers}
                    </p>
                  </div>
                </div>
              </GlowCard>
              <GlowCard className="min-w-0">
                <div className="flex h-full flex-col p-8 md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                    Built-in risk reversal
                  </p>
                  <ul className="mt-6 flex-1 space-y-5">
                    {PRICING.risk.map((item, i) => (
                      <li key={item} className="flex items-start gap-3">
                        {/* delay lives INSIDE the variant — a transition prop
                            beside a drawPath-style variant is ignored */}
                        <motion.svg
                          initial="hidden"
                          whileInView="visible"
                          viewport={VIEW_TIGHT}
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="none"
                          className="mt-0.5 shrink-0 text-accent"
                        >
                          <motion.path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={
                              instant
                                ? {
                                    hidden: { opacity: 0 },
                                    visible: {
                                      opacity: 1,
                                      transition: INSTANT_TRANSITION,
                                    },
                                  }
                                : {
                                    hidden: { pathLength: 0, opacity: 0 },
                                    visible: {
                                      pathLength: 1,
                                      opacity: 1,
                                      transition: {
                                        duration: DUR_REVEAL,
                                        ease: EASE,
                                        delay: i * STAG_CARD,
                                      },
                                    },
                                  }
                            }
                          />
                        </motion.svg>
                        <span className="text-sm leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </div>
            <div className="mt-12 text-center">
              <FadeInWhenVisible>
                <GlowCTA label={HERO.ctaPrimary} href="/contact" />
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.2}>
                <p className="mt-4 text-sm text-text-muted">{HERO.risk}</p>
              </FadeInWhenVisible>
            </div>
          </SectionWrapper>
        </div>
        <Seam />

        {/* ======================================================== */}
        {/* S10 · FAQ                                                 */}
        {/* ======================================================== */}
        <SectionWrapper>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <FadeInWhenVisible>
                <span className={eyebrowCls}>Questions, answered</span>
              </FadeInWhenVisible>
              <div className="mt-3">
                <AnimatedHeading
                  text="The things you're actually wondering."
                  className={headingCls}
                />
              </div>
              <FadeInWhenVisible delay={0.2}>
                <p className="mt-4 text-text-secondary">
                  Straight answers — price, capacity, timelines, and what
                  happens after launch.
                </p>
              </FadeInWhenVisible>
            </div>
            <FadeInWhenVisible delay={0.1}>
              <Accordion items={[...HOME_FAQ]} />
            </FadeInWhenVisible>
          </div>
        </SectionWrapper>

        {/* ======================================================== */}
        {/* S11 · FINAL CTA + CONTACT                                 */}
        {/* ======================================================== */}
        {/* id: the pre-redesign homepage exposed /#contact — keep external
            deep links landing on the form */}
        <section
          id="contact"
          className="border-t border-border"
          style={{
            background:
              "linear-gradient(180deg, #0D0703 0%, rgba(255,107,0,0.05) 35%, var(--color-bg-primary) 100%)",
          }}
        >
          <SectionWrapper>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <FadeInWhenVisible>
                  <span className={eyebrowCls}>Start here</span>
                </FadeInWhenVisible>
                <div className="mt-3">
                  <AnimatedHeading
                    text={FINAL_CTA.heading}
                    className={headingCls}
                    accentLastPeriod
                  />
                </div>
                <FadeInWhenVisible delay={0.2}>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-text-secondary">
                    {FINAL_CTA.subtext}
                  </p>
                </FadeInWhenVisible>
                <FadeInWhenVisible delay={0.3}>
                  <ul className="mt-8 space-y-3">
                    {PRICING.risk.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeInWhenVisible>
              </div>
              <FadeInWhenVisible delay={0.15}>
                <div className="rounded-[var(--radius-card)] border border-border bg-bg-card p-6 md:p-8">
                  <ContactForm submitLabel="Send it — get my build plan" />
                  <p className="mt-4 text-xs text-text-muted">{FINAL_CTA.formNote}</p>
                </div>
              </FadeInWhenVisible>
            </div>
          </SectionWrapper>
        </section>

      </div>
    </MotionConfig>
  );
}
