"use client";

import { motion } from "motion/react";
import LineIcon, { type IconName } from "@/components/ui/LineIcon";
import {
  fadeInUp,
  scaleIn,
  EASE,
  DUR_POP,
  DUR_REVEAL,
  DUR_DRAW,
  STAG_FLOW,
  LAG_CAPTION,
  PULSE,
} from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";

export interface FlowStep {
  title: string;
  caption: string;
  artifact: string;
  icon: IconName;
}

/* Mobile (`instant`): identical element tree and variants — ONLY timings
   collapse to duration 0. Swapping variants or elements leaves the SSR'd
   hidden styles (transforms, scaleX(0) rails) permanently applied, because
   motion only clears style keys its current variants own. */

function FlowNode({
  index,
  icon,
  isLast,
  instant,
}: {
  index: number;
  icon: IconName;
  isLast: boolean;
  instant: boolean;
}) {
  return (
    <div className="relative h-12 w-12 shrink-0">
      <motion.div
        variants={scaleIn}
        transition={
          instant
            ? INSTANT_TRANSITION
            : { duration: DUR_POP, ease: EASE, delay: STAG_FLOW * index }
        }
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-[#160B02] text-accent"
      >
        <LineIcon name={icon} />
      </motion.div>
      {isLast && (
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 1 },
            visible: instant
              ? { opacity: 0, transition: INSTANT_TRANSITION }
              : {
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

function FlowCaption({
  index,
  step,
  instant,
}: {
  index: number;
  step: FlowStep;
  instant: boolean;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={
        instant
          ? INSTANT_TRANSITION
          : { duration: DUR_REVEAL, ease: EASE, delay: STAG_FLOW * index + LAG_CAPTION }
      }
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

export default function OpsFlow({ steps }: { steps: readonly FlowStep[] }) {
  const instant = useInstantEntrance();
  // connector endpoints sit at the centers of the first/last columns
  const railInset = `${100 / (2 * steps.length)}%`;
  const cols = { gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` };
  const railX = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: instant ? INSTANT_TRANSITION : { duration: DUR_DRAW, ease: EASE },
    },
  };
  const railY = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: instant ? INSTANT_TRANSITION : { duration: DUR_DRAW, ease: EASE },
    },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
      {/* Desktop */}
      <div className="relative hidden md:block">
        <div
          className="absolute top-6 h-px bg-white/10"
          style={{ left: railInset, right: railInset }}
        />
        <motion.div
          variants={railX}
          className="absolute top-6 h-px origin-left bg-gradient-to-r from-accent/40 via-accent to-accent-light"
          style={{ left: railInset, right: railInset }}
        />
        <div className="grid gap-8" style={cols}>
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <FlowNode index={i} icon={step.icon} isLast={i === steps.length - 1} instant={instant} />
              <div className="mt-5">
                <FlowCaption index={i} step={step} instant={instant} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile rail */}
      <div className="relative md:hidden">
        <div className="absolute bottom-6 left-6 top-6 w-px bg-white/10" />
        <motion.div
          variants={railY}
          className="absolute bottom-6 left-6 top-6 w-px origin-top bg-gradient-to-b from-accent/40 via-accent to-accent-light"
        />
        <div className="flex flex-col gap-10">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-5">
              <FlowNode index={i} icon={step.icon} isLast={i === steps.length - 1} instant={instant} />
              <FlowCaption index={i} step={step} instant={instant} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
