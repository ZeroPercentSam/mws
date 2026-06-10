"use client";

import { motion } from "motion/react";
import Link from "next/link";
import LineIcon from "@/components/ui/LineIcon";
import { DUR_TAP } from "@/lib/animations";

/* Primary CTA with finite glow pulse (proposal PayButton pattern).
   Per-value transition keeps hover at DUR_TAP. */
export default function GlowCTA({ label, href }: { label: string; href: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: DUR_TAP, ease: "easeOut" }}
      className="relative inline-block rounded-[var(--radius-button)] shadow-[0_0_32px_rgba(255,107,0,0.25)]"
    >
      {/* glow pulse on a separate layer: opacity is compositor-friendly,
          unlike animating boxShadow (paint). Pre-blurred radial gradient,
          NOT filter:blur — a live 40px blur re-renders on iOS scroll
          frames (flicker; same fix as the old orb background) */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.7, 0] }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 2.2, repeat: 1, ease: "easeInOut" }}
        className="absolute -inset-10 -z-10"
        style={{
          background:
            "radial-gradient(ellipse closest-side, rgba(255,107,0,0.45) 0%, rgba(255,107,0,0.18) 45%, transparent 75%)",
        }}
      />
      <Link
        href={href}
        className="inline-flex items-center gap-3 rounded-[var(--radius-button)] bg-gradient-to-r from-accent to-accent-light px-8 py-4 font-bold text-white md:px-10"
      >
        {label}
        <LineIcon name="arrow" className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
