"use client";

import { motion } from "motion/react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import LiveBadge from "@/components/ui/LiveBadge";
import { OCEAN_BORDER } from "@/lib/design";
import {
  fadeInUp,
  EASE,
  DUR_REVEAL,
  STAG_FLOW,
  LAG_CAPTION,
  VIEW_TIGHT,
} from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";
import type { MetricItem } from "@/lib/types";

/* Build-log stamp: result metrics print sequentially like log lines —
   check draws, counter counts, caption lands. Closes with a LIVE badge
   when the system has a public URL. */
export default function BuildLogStamp({
  results,
  liveUrl,
  liveLabel,
  tint,
}: {
  results: MetricItem[];
  liveUrl?: string;
  liveLabel: string;
  tint: string;
}) {
  const instant = useInstantEntrance();
  const T = (t: object) => (instant ? INSTANT_TRANSITION : t);

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={VIEW_TIGHT}>
      <div
        className="overflow-hidden rounded-[var(--radius-card)] border"
        style={{ borderColor: OCEAN_BORDER }}
      >
        {results.map((m, i) => (
          <div
            key={m.label}
            className="flex items-start gap-4 border-b bg-[#0A1622] px-5 py-5 transition-colors duration-200 last:border-b-0 hover:bg-[#0E1C2C] md:items-center md:gap-6 md:px-7"
            style={{ borderColor: OCEAN_BORDER }}
          >
            {/* check stamp — delay must live INSIDE the variant */}
            <motion.svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              className="mt-1 shrink-0 md:mt-0"
              style={{ color: tint }}
              aria-hidden
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
                    transition: instant
                      ? INSTANT_TRANSITION
                      : { duration: DUR_REVEAL, ease: EASE, delay: i * STAG_FLOW },
                  },
                }}
              />
            </motion.svg>

            <p className="w-28 shrink-0 font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-accent md:w-40 md:text-3xl">
              <AnimatedCounter target={m.value} suffix={m.suffix} />
            </p>

            <motion.div
              variants={fadeInUp}
              transition={T({
                duration: DUR_REVEAL,
                ease: EASE,
                delay: i * STAG_FLOW + LAG_CAPTION,
              })}
              className="min-w-0"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-primary md:text-sm">
                {m.label}
              </p>
              {m.description && (
                <p className="mt-1 text-xs leading-relaxed text-text-secondary md:text-sm">
                  {m.description}
                </p>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {liveUrl && (
        <div className="mt-6 text-center">
          <LiveBadge
            label={`${liveLabel} ↗`}
            href={liveUrl}
            tint="#7ED957"
            delay={results.length * STAG_FLOW}
          />
        </div>
      )}
    </motion.div>
  );
}
