"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { CaseStudy } from "@/lib/types";

interface NextProjectProps {
  study: CaseStudy;
}

export default function NextProject({ study }: NextProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <Link href={`/work/${study.slug}`} className="group block">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-card p-8 md:p-12 transition-all duration-300 hover:border-border-hover"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
            style={{ background: study.gradient }}
          />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">
              Next Project
            </p>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-text-primary group-hover:text-accent transition-colors duration-200">
              {study.title}
            </h3>
            <p className="text-text-secondary mt-2">{study.client}</p>
            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium mt-4 group-hover:gap-3 transition-all duration-200">
              View Case Study
              <span>&rarr;</span>
            </span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
