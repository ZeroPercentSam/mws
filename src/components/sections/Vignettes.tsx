"use client";

import { motion } from "motion/react";
import { EASE, DUR_POP, DIST_SM, PULSE } from "@/lib/animations";

/* Service vignettes — tiny fake-UI that shows the product (homepage S5
   language; /services deep-dives render the extended variants). All
   variants participate in an ancestor hidden/visible motion root. */

export function VignettePerf({ extended = false }: { extended?: boolean }) {
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
      {extended && (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: DUR_POP, ease: EASE, delay: 1.3 },
            },
          }}
          className="mt-2.5 flex items-center gap-3 border-t border-border pt-2.5"
        >
          {["LCP", "CLS", "INP"].map((m) => (
            <span key={m} className="flex items-center gap-1.5 text-[9px] text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {m}
            </span>
          ))}
          <span className="ml-auto text-[9px] text-text-muted">budgeted per page</span>
        </motion.div>
      )}
      <p className="mt-2 text-[10px] text-text-muted">Performance budget, every build</p>
    </div>
  );
}

export function VignetteAI({ extended = false }: { extended?: boolean }) {
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
      {extended && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: DIST_SM / 2, scale: 0.96 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: DUR_POP, ease: EASE, delay: 0.9 },
            },
          }}
          className="flex justify-start"
        >
          <span
            className="rounded-lg rounded-bl-sm border px-2.5 py-1.5 text-[10px] text-text-primary"
            style={{ borderColor: "rgba(74,158,203,0.4)", backgroundColor: "rgba(74,158,203,0.12)" }}
          >
            Booked your fitting for Thursday — confirmation sent.
          </span>
        </motion.div>
      )}
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

export function VignettePipeline({ extended = false }: { extended?: boolean }) {
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
      {extended && (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: DUR_POP, ease: EASE, delay: 1.7 },
            },
          }}
          className="mt-2.5 flex items-center gap-2 border-t border-border pt-2.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A961]" />
          <span className="text-[9px] text-text-muted">
            Bad input caught → corrected → resumed. No human paged.
          </span>
        </motion.div>
      )}
      <p className="mt-2.5 text-[10px] text-text-muted">
        Zero hands between request and payment
      </p>
    </div>
  );
}

export const VIGNETTES: Record<string, React.ReactNode> = {
  websites: <VignettePerf />,
  ai: <VignetteAI />,
  automation: <VignettePipeline />,
};

export const VIGNETTES_EXTENDED: Record<string, React.ReactNode> = {
  websites: <VignettePerf extended />,
  ai: <VignetteAI extended />,
  automation: <VignettePipeline extended />,
};
