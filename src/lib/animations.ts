import type { Variants, Transition } from "motion/react";

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.4, 0.25, 1],
};

export const defaultViewport = {
  once: true,
  amount: 0.3,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer = (stagger = 0.15): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

// New animation variants for multi-page expansion

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Interaction tokens — promoted from the homepage redesign.          */
/*  All timings/easings/distances come from these named tokens;        */
/*  no literal animation numbers in components.                        */
/* ------------------------------------------------------------------ */
export const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];
export const DUR_TAP = 0.2;
export const DUR_POP = 0.45;
export const DUR_REVEAL = 0.6;
export const DUR_DRAW = 1.8;
export const DIST_SM = 12;
export const STAG_GRID = 0.08;
export const STAG_CARD = 0.15;
export const STAG_FLOW = 0.35;
export const LAG_CAPTION = 0.15;
// repeat is ADDITIONAL iterations: 1 => plays twice total
export const PULSE = { duration: 1.1, repeat: 1, ease: "easeOut" as const };
export const VIEW_TIGHT = { once: true, amount: 0.5 } as const;
