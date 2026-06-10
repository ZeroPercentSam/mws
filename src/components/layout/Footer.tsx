"use client";

import Link from "next/link";
import GlowCTA from "@/components/ui/GlowCTA";
import Seam from "@/components/ui/Seam";
import { SITE, NAV_LINKS, METRICS } from "@/lib/constants";
import { BAND_WARM, BLUEPRINT, chipCls } from "@/lib/design";
import { TRIPTYCH, HERO } from "@/app/home-data";

/* Blueprint Close — warm-band footer in the homepage language. Renders on
   every route incl. legal + invoices, so it stays weight-appropriate:
   static metrics chips, no counters/entrances; the only motion is
   GlowCTA's self-contained finite pulse. */

const SERVICE_HREFS: Record<string, string> = {
  websites: "/services#websites",
  ai: "/services#ai",
  automation: "/services#automation",
};

const colHeadCls =
  "text-xs font-semibold uppercase tracking-[0.2em] text-text-muted";
const linkCls =
  "text-text-secondary hover:text-text-primary text-sm transition-colors duration-200";

export default function Footer() {
  return (
    <footer>
      <Seam />
      <div className="relative" style={{ backgroundColor: BAND_WARM }}>
        <div aria-hidden className="absolute inset-0 hidden md:block" style={BLUEPRINT} />
        <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
          {/* Columns */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <Link
                href="/"
                className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-text-primary"
              >
                {SITE.name}
              </Link>
              {/* fresh copy */}
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
                Websites, AI, and automation that pay for themselves — shipped
                in days, not months.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className={`${colHeadCls} mb-4`}>Studio</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkCls}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className={linkCls}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className={`${colHeadCls} mb-4`}>What we build</h4>
              <ul className="space-y-3">
                {TRIPTYCH.items.map((item) => (
                  <li key={item.key}>
                    <Link href={SERVICE_HREFS[item.key] ?? "/services"} className={linkCls}>
                      <span
                        aria-hidden
                        className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                        style={{ backgroundColor: item.tint }}
                      />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className={`${colHeadCls} mb-4`}>Start</h4>
              <a
                href={`mailto:${SITE.email}`}
                className="block text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {SITE.email}
              </a>
              <div className="mt-5">
                <GlowCTA size="sm" label={HERO.ctaPrimary} href="/contact" />
              </div>
            </div>
          </div>

          {/* Metrics strip — static chips, weight-appropriate for legal pages */}
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {METRICS.map((m) => (
              <span key={m.label} className={`${chipCls} text-text-muted`}>
                <span className="font-semibold text-text-secondary">
                  {m.value}
                  {m.suffix}
                </span>{" "}
                {m.label}
              </span>
            ))}
          </div>

          {/* Legal row */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy#what-we-collect"
                className="text-xs text-text-muted transition-colors duration-200 hover:text-text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-text-muted transition-colors duration-200 hover:text-text-primary"
              >
                Terms of Service
              </Link>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="cursor-pointer text-xs text-text-muted transition-colors duration-200 hover:text-accent"
              >
                Back to top &uarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
