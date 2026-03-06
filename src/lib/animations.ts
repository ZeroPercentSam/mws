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
