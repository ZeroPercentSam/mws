"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // transform-only: an opacity gate here holds every page's LCP hostage
      // to hydration (text sits invisible until JS runs)
      initial={{ y: 8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
