"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CaseStudy } from "@/lib/types";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  const primaryMetric = study.results[0];

  return (
    <Link href={`/work/${study.slug}`} className="group block">
      <motion.div
        className="border border-border rounded-[var(--radius-card)] overflow-hidden bg-bg-card transition-all duration-300 hover:border-border-hover hover:-translate-y-1"
        whileHover={{ scale: 1.01 }}
        style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
      >
        {/* Abstract gradient thumbnail */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ background: study.gradient }}
          />
          {/* Category pill */}
          <div className="absolute top-4 left-4">
            <span className="text-[10px] uppercase tracking-wider font-semibold bg-bg-primary/70 backdrop-blur-sm text-text-secondary px-3 py-1 rounded-full border border-border">
              {study.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
            {study.client}
          </p>
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
            {study.title}
          </h3>
          {primaryMetric && (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-accent font-[family-name:var(--font-heading)]">
                {primaryMetric.value}{primaryMetric.suffix}
              </span>
              <span className="text-xs text-text-muted">{primaryMetric.label}</span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
