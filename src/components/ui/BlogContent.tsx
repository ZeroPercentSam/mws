"use client";

import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import { BAND_WARM, OCEAN_CELL, OCEAN_BORDER, chipCls } from "@/lib/design";
import type { BlogSection } from "@/lib/types";

interface BlogContentProps {
  sections: BlogSection[];
}

/* Article prose renders STATIC — an entire article of staggered reveals
   is the animated-body-text smell. Only the stat cards (furniture, not
   prose) get an entrance. */
export default function BlogContent({ sections }: BlogContentProps) {
  return (
    <div className="space-y-6">
      {sections.map((section, i) =>
        section.type === "stat" ? (
          <FadeInWhenVisible key={i}>{renderSection(section)}</FadeInWhenVisible>
        ) : (
          <div key={i}>{renderSection(section)}</div>
        ),
      )}
    </div>
  );
}

function renderSection(section: BlogSection) {
  switch (section.type) {
    case "paragraph":
      return (
        <p className="text-text-secondary leading-relaxed text-lg">
          {section.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary mt-12 mb-2">
          {section.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-text-primary mt-8 mb-1">
          {section.text}
        </h3>
      );

    case "list":
      return (
        <ul className="space-y-3 pl-1">
          {section.items?.map((item, j) => (
            <li key={j} className="flex gap-3 text-text-secondary leading-relaxed text-lg">
              <span className="text-accent mt-1.5 flex-shrink-0">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                  <rect width="8" height="8" rx="2" />
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout":
      // warm-band language: BAND_WARM fill + accent spine
      return (
        <div
          className="my-8 rounded-r-lg border-l-2 border-accent px-6 py-5"
          style={{ backgroundColor: BAND_WARM }}
        >
          <p className="text-text-primary leading-relaxed text-lg font-medium">
            {section.text}
          </p>
        </div>
      );

    case "stat":
      // deep-ocean counter-card language (figures are strings — no counter)
      return (
        <div
          className="my-8 rounded-[var(--radius-card)] border p-7"
          style={{ backgroundColor: OCEAN_CELL, borderColor: OCEAN_BORDER }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            In this analysis
          </p>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="font-[family-name:var(--font-heading)] text-5xl font-extrabold text-accent md:text-6xl">
              {section.stat?.value}
            </span>
            <span className="max-w-xs text-sm uppercase tracking-wider text-text-secondary">
              {section.stat?.label}
            </span>
          </div>
        </div>
      );

    case "quote":
      return (
        <blockquote className="relative py-8 my-8 border-y border-border">
          <span className="absolute -top-5 left-0 text-6xl text-accent/30 font-serif leading-none">
            &ldquo;
          </span>
          <p className="text-xl md:text-2xl text-text-primary leading-relaxed font-medium italic pl-2">
            {section.text}
          </p>
          {section.source && (
            <cite className="mt-4 inline-block not-italic">
              <span className={`${chipCls} text-text-muted`}>{section.source}</span>
            </cite>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}
