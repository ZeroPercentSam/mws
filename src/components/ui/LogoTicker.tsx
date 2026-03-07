"use client";

import { CLIENT_LOGOS } from "@/lib/data";

export default function LogoTicker() {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div className="relative overflow-hidden py-12 border-y border-border">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />

      <div className="flex animate-ticker">
        {logos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex-shrink-0 px-12 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center">
              <span className="text-accent font-bold text-xs font-[family-name:var(--font-heading)]">
                {logo.name.charAt(0)}
              </span>
            </div>
            <span className="text-text-muted text-sm font-medium whitespace-nowrap">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
