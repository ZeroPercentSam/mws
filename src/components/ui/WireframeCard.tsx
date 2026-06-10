"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import {
  EASE,
  DUR_POP,
  DUR_REVEAL,
  DUR_DRAW,
  DIST_SM,
  STAG_GRID,
  defaultViewport,
} from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";

export interface WireframeCardData {
  slug: string;
  client: string;
  title: string;
  category: string;
  description: string;
  liveUrl?: string;
  gradient: string;
  metric: string;
  metricLabel: string;
  tint: string;
}

/* Wireframe-reveal project card: the thumb enters as skeleton blocks
   (HeroRig beat-2 vocabulary) and resolves into the live screenshot.
   Outer mount/exit wiring matches the old ProjectCard byte-for-byte so
   AnimatePresence popLayout filtering behaves identically. */
export default function WireframeCard({
  card,
  index,
}: {
  card: WireframeCardData;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const thumbSrc = `/work/screenshots/${card.slug}/thumb.jpg`;
  // column stagger only — row offset would delay below-fold cards pointlessly
  const lead = (index % 3) * STAG_GRID;
  const instant = useInstantEntrance();
  const T = (t: object) => (instant ? INSTANT_TRANSITION : t);

  const bar = (delay: number, cls: string) => (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: DIST_SM / 2 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={T({ duration: DUR_POP, ease: EASE, delay })}
      className={`block rounded bg-white/10 ${cls}`}
    />
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <Link href={`/work/${card.slug}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-lg hover:shadow-accent/5">
          {/* Metric-first front */}
          <div className="p-6 pb-5">
            <p className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-accent md:text-4xl">
              {card.metric}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              {card.metricLabel}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold leading-snug text-text-primary transition-colors duration-200 group-hover:text-accent">
              {card.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
              {card.description}
            </p>
          </div>

          {/* Wireframe -> live screenshot reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="relative mt-auto aspect-[16/10] overflow-hidden border-t border-border"
          >
            {/* image layer (under) */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={T({ duration: DUR_REVEAL, ease: EASE, delay: lead + 0.55 })}
              className="absolute inset-0"
            >
              {!imgError ? (
                <Image
                  src={thumbSrc}
                  alt={`${card.client} — live platform screenshot`}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0" style={{ background: card.gradient }} />
              )}
            </motion.div>

            {/* skeleton layer (over) — builds in, then fades to reveal */}
            <motion.div
              aria-hidden
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: [1, 1, 0] },
              }}
              transition={T({
                duration: DUR_DRAW * 0.7,
                times: [0, 0.55, 1],
                ease: EASE,
                delay: lead,
              })}
              className="absolute inset-0 bg-[#0B0F14] p-3"
            >
              <div className="flex items-center gap-1.5 pb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="ml-1.5 h-3 flex-1 rounded bg-white/5" />
              </div>
              {bar(lead + 0.05, "h-3 w-3/5")}
              <span className="block h-1.5" />
              {bar(lead + 0.15, "h-2 w-4/5 !bg-white/5")}
              <span className="block h-2" />
              {/* flex items-end, not child margins — mt inside a same-height
                  block margin-collapses through the parent */}
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: DIST_SM / 2 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={T({ duration: DUR_POP, ease: EASE, delay: lead + 0.25 })}
                className="flex h-12 items-end rounded bg-white/5 p-2"
              >
                <span className="block h-3 w-12 rounded bg-accent/70" />
              </motion.span>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {bar(lead + 0.32, "h-6")}
                {bar(lead + 0.38, "h-6")}
                {bar(lead + 0.44, "h-6")}
              </div>
            </motion.div>

            {/* chips over the frame */}
            <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
              {card.liveUrl && (
                <span
                  className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                  style={{
                    color: "#7ED957",
                    borderColor: "#7ED95755",
                    backgroundColor: "rgba(5,5,5,0.7)",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7ED957]" />
                  LIVE
                </span>
              )}
              <span
                className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  color: card.tint,
                  borderColor: `${card.tint}55`,
                  backgroundColor: "rgba(5,5,5,0.7)",
                }}
              >
                {card.category}
              </span>
            </div>
          </motion.div>

          {/* client row */}
          <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-3.5">
            <p className="min-w-0 truncate text-xs font-semibold uppercase tracking-wider text-text-muted">
              {card.client}
            </p>
            <span className="shrink-0 text-xs font-semibold text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              See the build →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
