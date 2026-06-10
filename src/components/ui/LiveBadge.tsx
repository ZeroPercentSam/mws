"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { PULSE } from "@/lib/animations";
import { useInstantEntrance, INSTANT_TRANSITION } from "@/lib/use-instant-entrance";

/* Live-status badge with one finite pulse ring (HeroRig launch-badge /
   OpsFlow last-node pattern). Participates in an ancestor's
   hidden/visible variant tree — render inside a motion root. */
export default function LiveBadge({
  label,
  href,
  tint = "var(--color-accent)",
  delay = 0,
}: {
  label: string;
  href?: string;
  tint?: string;
  delay?: number;
}) {
  // mobile: same tree, pulse animates to opacity 0 (never unmount —
  // element-presence deltas mismatch the SSR'd tree)
  const instant = useInstantEntrance();

  const body = (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={instant ? INSTANT_TRANSITION : { duration: 0.45, delay }}
      className="inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em]"
      style={{ borderColor: `${tint}55`, color: tint, backgroundColor: "rgba(5,5,5,0.6)" }}
    >
      <span className="relative flex h-2 w-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tint }} />
        <motion.span
          aria-hidden
          variants={{
            hidden: { opacity: 0, scale: 1 },
            visible: instant
              ? { opacity: 0, transition: INSTANT_TRANSITION }
              : {
                  opacity: [0.7, 0],
                  scale: [1, 2.2],
                  transition: { ...PULSE, delay: delay + 0.3 },
                },
          }}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: tint }}
        />
      </span>
      {label}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {body}
      </Link>
    );
  }
  return body;
}
