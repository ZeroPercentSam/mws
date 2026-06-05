"use client";

import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import type { BlogSection } from "@/lib/types";

interface BlogContentProps {
  sections: BlogSection[];
}

export default function BlogContent({ sections }: BlogContentProps) {
  return (
    <div className="space-y-6">
      {sections.map((section, i) => (
        <FadeInWhenVisible key={i} delay={Math.min(i * 0.03, 0.3)}>
          {renderSection(section)}
        </FadeInWhenVisible>
      ))}
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
        <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-text-primary mt-12 mb-2">
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
      return (
        <div className="border-l-2 border-accent bg-accent/5 rounded-r-lg px-6 py-5 my-8">
          <p className="text-text-primary leading-relaxed text-lg font-medium">
            {section.text}
          </p>
        </div>
      );

    case "stat":
      return (
        <div className="flex items-center gap-6 py-8 my-4">
          <div className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-extrabold text-accent">
            {section.stat?.value}
          </div>
          <div className="text-text-secondary text-sm uppercase tracking-wider max-w-xs">
            {section.stat?.label}
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
            <cite className="block mt-4 text-text-muted text-sm not-italic pl-2">
              — {section.source}
            </cite>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}
