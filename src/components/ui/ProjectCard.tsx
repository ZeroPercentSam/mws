"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CaseStudy } from "@/lib/types";

interface ProjectCardProps {
  study: CaseStudy;
}

export default function ProjectCard({ study }: ProjectCardProps) {
  const primaryMetric = study.results[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link href={`/work/${study.slug}`} className="group block">
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden bg-bg-card transition-all duration-300 hover:border-border-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
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
            <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
              {study.description}
            </p>
            {primaryMetric && (
              <div className="flex items-baseline gap-2 pt-4 border-t border-border">
                <span className="text-2xl font-800 text-accent font-[family-name:var(--font-heading)]">
                  {primaryMetric.value}{primaryMetric.suffix}
                </span>
                <span className="text-xs text-text-muted">{primaryMetric.label}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
