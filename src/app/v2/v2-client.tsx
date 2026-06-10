"use client";

/* ====================================================================
 * MWS HOMEPAGE V2 — MOTION CONTRACT
 * --------------------------------------------------------------------
 * 1. ONE signature moment: the HeroRig build sequence. Everything else
 *    is transform/opacity-only, fires once (viewport once:true).
 * 2. No animated body text (NN/g) — words people read never move after
 *    their single entrance reveal.
 * 3. Every loop is finite (repeat: 2) and whileInView-gated where it
 *    sits below the fold. Ambient budget: logo marquee (existing CSS),
 *    hero morph ×2, two pulse rings ×2.
 * 4. All timings/easings/distances come from the named tokens below —
 *    no literal animation numbers in components.
 * 5. <MotionConfig reducedMotion="user"> covers JS-driven motion;
 *    globals.css already neutralizes CSS keyframes.
 * 6. Known-gotcha guards (see inline comments): drawPath-style variants
 *    carry their own transition (a sibling transition prop would be
 *    ignored); never animate pathLength over strokeDasharray; min-w-0
 *    on grid items containing truncating text; overflow-hidden only on
 *    sections, never a page root.
 * ==================================================================== */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  animate as motionAnimate,
} from "motion/react";
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
import ContactForm from "@/components/form/ContactForm";
import { METRICS, TESTIMONIALS, TECH_STACK, CASE_STUDIES } from "@/lib/constants";
import { fadeInUp, scaleIn } from "@/lib/animations";
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
  FAQ_V2,
  FINAL_CTA,
} from "./v2-data";

/* ------------------------------------------------------------------ */
/*  Interaction tokens                                                 */
/* ------------------------------------------------------------------ */
const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];
const DUR_TAP = 0.2;
const DUR_POP = 0.45;
const DUR_REVEAL = 0.6;
const DUR_DRAW = 1.8;
const DIST_SM = 12;
const STAG_GRID = 0.08;
const STAG_CARD = 0.15;
const STAG_FLOW = 0.35;
const LAG_CAPTION = 0.15;
const PULSE = { duration: 1.1, repeat: 2, ease: "easeOut" as const };
const VIEW_TIGHT = { once: true, amount: 0.5 } as const;
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
const headingCls =
  "font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-800 tracking-tight";

/* ------------------------------------------------------------------ */
/*  Seam — 1px gradient hairline (replaces decorative dividers)        */
/* ------------------------------------------------------------------ */
function Seam() {
  return (
    <div
      aria-hidden
      className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Icons (page-local path map, proposal TileIcon pattern)             */
/* ------------------------------------------------------------------ */
type IconName =
  | "browser"
  | "clock"
  | "trend"
  | "search"
  | "blueprint"
  | "build"
  | "rocket"
  | "arrow";

const ICONS: Record<IconName, React.ReactNode> = {
  browser: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M6 7h.01M8.5 7h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 7-8" />
      <path d="M14 7h6v6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M21 21l-5-5" />
    </>
  ),
  blueprint: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M10 10v10" />
    </>
  ),
  build: (
    <>
      <path d="M14.5 4.5a4 4 0 0 0-5.6 5L4 14.4V20h5.6l4.9-4.9a4 4 0 0 0 5-5.6L16 13l-3-3z" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 16c5-3 7-8 7-12-4 0-9 2-12 7l-3 1 4 4 1 4z" />
      <path d="M6 15l-2 5 5-2" />
      <circle cx="14" cy="9" r="1.4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

function V2Icon({ name, className = "w-5 h-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {ICONS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  V2Counter — animated count-up WITH locale commas (the shared       */
/*  AnimatedCounter drops them; promote this on rollout)               */
/* ------------------------------------------------------------------ */
function V2Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = motionAnimate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (latest) =>
        setDisplay(Math.round(latest).toLocaleString("en-US")),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  GlowCTA — primary CTA with finite glow pulse (proposal PayButton   */
/*  pattern). Per-value transition keeps hover at DUR_TAP.             */
/* ------------------------------------------------------------------ */
function GlowCTA({ label, href }: { label: string; href: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ boxShadow: "0 0 32px rgba(255,107,0,0.22)" }}
      whileInView={{
        boxShadow: [
          "0 0 32px rgba(255,107,0,0.22)",
          "0 0 64px rgba(255,107,0,0.45)",
          "0 0 32px rgba(255,107,0,0.22)",
        ],
      }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        boxShadow: { duration: 2.2, repeat: 2, ease: "easeInOut" },
        default: { duration: DUR_TAP, ease: "easeOut" },
      }}
      className="inline-block rounded-[var(--radius-button)]"
    >
      <Link
        href={href}
        className="inline-flex items-center gap-3 rounded-[var(--radius-button)] bg-gradient-to-r from-accent to-accent-light px-8 py-4 font-bold text-white md:px-10"
      >
        {label}
        <V2Icon name="arrow" className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

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

        {/* Beat 4 — idle niche morph (desktop only, repeat 2 then settles
            back to brand accent). Pure opacity layers, no state. */}
        <div className="hidden md:block">
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
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute inset-0 mix-blend-color"
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
        className="absolute -bottom-5 -left-3 md:-left-6 flex items-center gap-3 rounded-xl border border-border bg-bg-card/95 px-4 py-3 shadow-2xl backdrop-blur"
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
      <p className="mt-2 text-[10px] text-text-muted">First load, mid-range mobile</p>
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
        <span className="rounded-lg rounded-bl-sm border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-[10px] text-text-primary">
          Yes — 3 fabrics in stock. Want to try it on virtually?
        </span>
      </motion.div>
      <svg viewBox="0 0 120 22" fill="none" className="h-5 w-full">
        <motion.path
          d="M2 18 L24 14 L44 16 L66 9 L88 11 L118 3"
          stroke="var(--color-accent)"
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
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(120,180,220,0.3)] bg-[#0B1B2B]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[9px] text-text-muted">{label}</span>
          </div>
        ))}
        {/* connector track */}
        <div className="absolute left-8 right-8 top-3.5 h-px bg-white/10" />
        {/* traveling packet — finite, in-view gated by the card group */}
        <motion.span
          variants={{
            hidden: { left: "12%", opacity: 0 },
            visible: {
              left: ["12%", "82%"],
              opacity: [0, 1, 1, 0],
              transition: {
                duration: 1.6,
                ease: "easeInOut",
                delay: 0.4,
                repeat: 2,
                repeatDelay: 0.6,
                times: [0, 0.1, 0.9, 1],
              },
            },
          }}
          className="absolute top-[11px] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(255,107,0,0.8)]"
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
/*  S6 · OpsFlow — generalized proposal flow diagram                   */
/* ------------------------------------------------------------------ */
function FlowNode({ index, icon, isLast }: { index: number; icon: IconName; isLast: boolean }) {
  return (
    <div className="relative h-12 w-12 shrink-0">
      <motion.div
        variants={scaleIn}
        transition={{ duration: DUR_POP, ease: EASE, delay: STAG_FLOW * index }}
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-[#160B02] text-accent"
      >
        <V2Icon name={icon} />
      </motion.div>
      {isLast && (
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 1 },
            visible: {
              opacity: [0.7, 0],
              scale: [1, 1.9],
              transition: { ...PULSE, delay: STAG_FLOW * index + DUR_DRAW * 0.7 },
            },
          }}
          className="absolute inset-0 rounded-full border border-accent"
        />
      )}
    </div>
  );
}

function FlowCaption({ index, step }: { index: number; step: (typeof OPS.steps)[number] }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: DUR_REVEAL, ease: EASE, delay: STAG_FLOW * index + LAG_CAPTION }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
        Step {index + 1}
      </p>
      <h3 className="mt-1 font-semibold text-text-primary">{step.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{step.caption}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-accent/90">{step.artifact}</p>
    </motion.div>
  );
}

function OpsFlow() {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
      {/* Desktop */}
      <div className="relative hidden md:block">
        <div className="absolute left-[12.5%] right-[12.5%] top-6 h-px bg-white/10" />
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: DUR_DRAW, ease: EASE } },
          }}
          className="absolute left-[12.5%] right-[12.5%] top-6 h-px origin-left bg-gradient-to-r from-accent/40 via-accent to-accent-light"
        />
        <div className="grid grid-cols-4 gap-8">
          {OPS.steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <FlowNode index={i} icon={step.icon as IconName} isLast={i === OPS.steps.length - 1} />
              <div className="mt-5">
                <FlowCaption index={i} step={step} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile rail */}
      <div className="relative md:hidden">
        <div className="absolute bottom-6 left-6 top-6 w-px bg-white/10" />
        <motion.div
          variants={{
            hidden: { scaleY: 0 },
            visible: { scaleY: 1, transition: { duration: DUR_DRAW, ease: EASE } },
          }}
          className="absolute bottom-6 left-6 top-6 w-px origin-top bg-gradient-to-b from-accent/40 via-accent to-accent-light"
        />
        <div className="flex flex-col gap-10">
          {OPS.steps.map((step, i) => (
            <div key={step.title} className="flex gap-5">
              <FlowNode index={i} icon={step.icon as IconName} isLast={i === OPS.steps.length - 1} />
              <FlowCaption index={i} step={step} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function V2Client() {
  const slugByClient = new Map(CASE_STUDIES.map((c) => [c.client, c.slug]));

  return (
    <MotionConfig reducedMotion="user">
      <div>
        {/* ======================================================== */}
        {/* S1 · HERO                                                 */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,107,0,0.07), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(56,130,180,0.06), transparent 60%)",
            }}
          />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            {/* Text column — CSS entrance (LCP must not wait on hydration) */}
            <div>
              <p className="v2-rise text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {HERO.eyebrow}
              </p>
              <h1
                className="v2-rise mt-5 font-[family-name:var(--font-heading)] text-4xl font-800 leading-[1.06] tracking-tight md:text-6xl lg:text-[4.2rem]"
                style={{ animationDelay: "0.08s" }}
              >
                {HERO.headlineLines[0]}
                <br />
                {HERO.headlineLines[1]}
                <br />
                <span className="text-accent">{HERO.headlineAccent}</span>
              </h1>
              <p
                className="v2-rise mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
                style={{ animationDelay: "0.16s" }}
              >
                {HERO.subline}
              </p>
              <div
                className="v2-rise mt-9 flex flex-wrap items-center gap-4"
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
                className="v2-rise mt-5 text-sm text-text-muted"
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
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-800 text-accent md:text-5xl">
                    <V2Counter value={m.value} suffix={m.suffix} />
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
                      <V2Icon name={card.icon as IconName} />
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
                        transition={{ duration: DUR_REVEAL, ease: EASE }}
                        className="font-[family-name:var(--font-heading)] text-4xl font-800 tracking-tight text-accent md:text-5xl"
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
                        <span className="shrink-0 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-text-secondary">
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
                  <span className="shrink-0 font-[family-name:var(--font-heading)] text-base font-800 text-accent">
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
                View all 10 live platforms
                <V2Icon name="arrow" className="h-4 w-4" />
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
                    transition={{ duration: DUR_REVEAL, ease: EASE, delay: i * STAG_CARD }}
                    className="flex h-full flex-col p-7 md:p-8"
                  >
                    {VIGNETTES[item.key]}
                    <h3 className="mt-6 font-[family-name:var(--font-heading)] text-xl font-bold md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                      {item.body}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-text-secondary"
                        >
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
          <div aria-hidden className="absolute inset-0" style={BLUEPRINT} />
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
              <OpsFlow />
            </div>

            <FadeInWhenVisible delay={0.2} className="mt-10 text-center">
              <p className="text-sm text-text-muted">{OPS.timeline}</p>
            </FadeInWhenVisible>

            <StaggerChildren className="mt-16 grid gap-6 md:grid-cols-3" stagger={STAG_CARD}>
              {OPS.mechanisms.map((m) => (
                <StaggerItem key={m.title} className="min-w-0">
                  <div className="h-full rounded-[var(--radius-card)] border border-border bg-bg-card/60 p-7 backdrop-blur-sm">
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
                    <span className="inline-block rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-text-muted">
                      {tech}
                    </span>
                  </StaggerItem>
                ))}
            </StaggerChildren>
          </SectionWrapper>
        </div>
        <Seam />

        {/* ======================================================== */}
        {/* S7 · THE MATH                                             */}
        {/* ======================================================== */}
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
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
            stagger={STAG_CARD}
          >
            {MATH_STATS.map((stat) => (
              <StaggerItem key={stat.figure} className="min-w-0">
                <Link
                  href={stat.href}
                  className="block h-full bg-bg-card p-7 transition-colors duration-200 hover:bg-bg-card-hover"
                >
                  <motion.p
                    variants={scaleIn}
                    transition={{ duration: DUR_REVEAL, ease: EASE }}
                    className="font-[family-name:var(--font-heading)] text-3xl font-800 text-accent md:text-4xl"
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
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-text-primary">
                          {t.name}
                        </p>
                        <p className="truncate text-xs text-text-muted">
                          {t.title} · {t.company}
                        </p>
                      </div>
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
          <div aria-hidden className="absolute inset-0" style={BLUEPRINT} />
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
                  <p className="font-[family-name:var(--font-heading)] text-3xl font-800 tracking-tight md:text-4xl">
                    {PRICING.floor.split("$")[0]}
                    <span className="text-accent">${PRICING.floor.split("$")[1]}</span>
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
                            variants={{
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
                            }}
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
              <Accordion items={[...FAQ_V2]} />
            </FadeInWhenVisible>
          </div>
        </SectionWrapper>

        {/* ======================================================== */}
        {/* S11 · FINAL CTA + CONTACT                                 */}
        {/* ======================================================== */}
        <section className="border-t border-border bg-bg-secondary">
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
                  <ContactForm />
                  <p className="mt-4 text-xs text-text-muted">{FINAL_CTA.formNote}</p>
                </div>
              </FadeInWhenVisible>
            </div>
          </SectionWrapper>
        </section>

        {/* Hero text entrance — CSS so the LCP heading never waits on JS.
            globals.css's prefers-reduced-motion rule neutralizes this. */}
        <style>{`
          @keyframes v2-rise {
            from { opacity: 0; transform: translate3d(0, 16px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }
          .v2-rise { animation: v2-rise 0.5s ${`cubic-bezier(${EASE.join(",")})`} both; }
        `}</style>
      </div>
    </MotionConfig>
  );
}
