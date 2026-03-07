"use client";

import { CLIENTS } from "@/lib/constants";

export default function LogoMarquee() {
  // Duplicate the array for seamless infinite scroll
  const logos = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden group">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center gap-16 md:gap-24 group-hover:[animation-play-state:paused]"
        style={{
          animation: "marquee 40s linear infinite",
          width: "max-content",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        {logos.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex-shrink-0 opacity-30 hover:opacity-70 transition-opacity duration-300 select-none"
          >
            <span className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold tracking-tight text-text-primary whitespace-nowrap">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
