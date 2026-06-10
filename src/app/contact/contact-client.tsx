"use client";

/* ====================================================================
 * /CONTACT — MOTION CONTRACT (homepage rules)
 * Signature: "After You Hit Send" — what happens to the message,
 * rendered as a rig. whileInView (sits beside/below the form), fully
 * instant-gated; identical tree across breakpoints. Finite loops only.
 * ==================================================================== */

import { motion, MotionConfig } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Accordion from "@/components/ui/Accordion";
import ContactForm from "@/components/form/ContactForm";
import LineIcon from "@/components/ui/LineIcon";
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
  CONTACT_HERO,
  AFTER_SEND,
  CONTACT_INFO,
  CONTACT_FAQ,
} from "./contact-data";

/* ------------------------------------------------------------------ */
/*  AfterYouHitSend — the signature                                    */
/* ------------------------------------------------------------------ */
function AfterYouHitSend() {
  const instant = useInstantEntrance();
  const T = (t: object) => (instant ? INSTANT_TRANSITION : t);
  const pop = (delay: number) => ({
    variants: {
      hidden: { opacity: 0, y: DIST_SM },
      visible: { opacity: 1, y: 0 },
    },
    transition: T({ duration: DUR_POP, ease: EASE, delay }),
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEW_TIGHT}
      className="relative"
    >
      <span className={eyebrowCls}>{AFTER_SEND.eyebrow}</span>

      {/* B1 send glyph + B2 rail */}
      <div aria-hidden className="mt-6 flex items-center gap-3">
        <motion.span
          {...pop(0.2)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"
        >
          <LineIcon name="send" className="h-4 w-4" />
        </motion.span>
        <div className="relative h-px flex-1 bg-white/10">
          <motion.div
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            transition={T({ duration: DUR_DRAW * 0.7, ease: EASE, delay: 0.4 })}
            className="absolute inset-0 origin-left bg-gradient-to-r from-accent/30 via-accent to-accent-light"
          />
        </div>
      </div>

      {/* B3 build-plan document */}
      <motion.div
        aria-hidden
        variants={{
          hidden: { opacity: 0, scale: 0.96 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={T({ duration: DUR_REVEAL, ease: EASE, delay: 1.0 })}
        className="mt-4 rounded-2xl border border-border bg-[#0B0F14] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {AFTER_SEND.docTitle}
          </span>
          {/* B7 ready check + single pulse */}
          <span className="relative flex h-6 w-6 items-center justify-center">
            <motion.svg width={18} height={18} viewBox="0 0 24 24" fill="none" className="text-accent">
              <motion.path
                d="M5 13L9 17L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: instant
                      ? INSTANT_TRANSITION
                      : { duration: DUR_REVEAL, ease: EASE, delay: 2.6 },
                  },
                }}
              />
            </motion.svg>
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 1 },
                visible: instant
                  ? { opacity: 0, transition: INSTANT_TRANSITION }
                  : {
                      opacity: [0.7, 0],
                      scale: [1, 2],
                      transition: { ...PULSE, delay: 3.2 },
                    },
              }}
              className="absolute inset-0 rounded-full border border-accent"
            />
          </span>
        </div>
        <div className="mt-4 space-y-3.5">
          {AFTER_SEND.rows.map((label, i) => (
            <motion.div key={label} {...pop(1.2 + i * STAG_CARD)} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                {label}
              </span>
              <div className="relative h-3 flex-1 overflow-hidden rounded bg-white/5">
                {/* B5 — bars resolve; abstract only, no invented figures */}
                <motion.div
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  transition={T({ duration: DUR_REVEAL, ease: EASE, delay: 1.9 + i * STAG_CARD })}
                  className="absolute inset-y-0 left-0 rounded bg-gradient-to-r from-accent/60 to-accent/20"
                  style={{ width: `${78 - i * 16}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p {...pop(2.3)} className="mt-4 text-xs leading-relaxed text-accent/90">
          {AFTER_SEND.caption}
        </motion.p>
      </motion.div>

      {/* B6 — the four steps, as chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {AFTER_SEND.steps.map((step, i) => (
          <motion.span
            key={step.title}
            {...pop(2.4 + i * STAG_GRID)}
            className={`${chipCls} inline-flex items-center gap-1.5 text-text-secondary`}
          >
            <LineIcon name={step.icon} className="h-3 w-3 text-accent" />
            {step.title}
          </motion.span>
        ))}
      </div>

      {/* static footer — locked claims only */}
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs uppercase tracking-wider text-text-muted">Email</p>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="mt-1 inline-block text-text-primary transition-colors duration-200 hover:text-accent"
        >
          {CONTACT_INFO.email}
        </a>
        <p className="mt-4 text-sm text-text-muted">{CONTACT_INFO.note}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ContactClient() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Hero — compact, CSS entrance */}
      <section className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,107,0,0.13), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 75%, rgba(74,158,203,0.09), transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <p className={`hero-rise ${eyebrowCls}`}>{CONTACT_HERO.eyebrow}</p>
          <h1
            className="hero-rise mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
            style={{ animationDelay: "0.08s" }}
          >
            {CONTACT_HERO.heading.replace(/\.$/, "")}
            <span className="text-accent">.</span>
          </h1>
          <p
            className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
            style={{ animationDelay: "0.16s" }}
          >
            {CONTACT_HERO.subline}
          </p>
        </div>
      </section>

      {/* Form + signature */}
      <SectionWrapper className="!pt-0">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInWhenVisible>
            <div className="rounded-[var(--radius-card)] border border-border bg-bg-card p-6 md:p-8">
              <ContactForm extended submitLabel="Send it — get my build plan" />
            </div>
          </FadeInWhenVisible>
          <AfterYouHitSend />
        </div>
      </SectionWrapper>

      {/* FAQ — locked-copy answers only */}
      <section className="bg-bg-secondary">
        <SectionWrapper className="!py-16 md:!py-20">
          <div className="mx-auto max-w-3xl">
            <FadeInWhenVisible>
              <div className="mb-8 text-center">
                <span className={eyebrowCls}>Before you reach out</span>
                <div className="mt-3">
                  <AnimatedHeading
                    text="The short answers."
                    className={headingCls}
                    accentLastPeriod
                  />
                </div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.1}>
              <Accordion items={CONTACT_FAQ} />
            </FadeInWhenVisible>
          </div>
        </SectionWrapper>
      </section>
    </MotionConfig>
  );
}
