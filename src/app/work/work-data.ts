// /work copy. Numbers derive from lib/constants via lib/derive; card fronts
// are pure projections of CASE_STUDIES. Strings without numbers are fresh.
import { CASE_STUDIES, WORK_METRICS } from "@/lib/constants";
import { WORK_CATEGORY_TINTS } from "@/lib/design";
import { fmt, siteMetric } from "@/lib/derive";

export const WORK_HERO = {
  eyebrow: "Live work",
  /* fresh copy */
  heading: "No mockups. Live systems.",
  subline: `${CASE_STUDIES.length} builds across ${siteMetric("Industries Served").value} industries — every card below links to a system that is live, in production, and doing its job.`,
} as const;

// featured-first, otherwise source order (stable sort)
export const CARD_FRONTS = [...CASE_STUDIES]
  .sort((a, b) => Number(b.featured) - Number(a.featured))
  .map((s) => ({
    slug: s.slug,
    client: s.client,
    title: s.title,
    category: s.category,
    description: s.description,
    liveUrl: s.liveUrl,
    gradient: s.gradient,
    metric: fmt(s.results[0]),
    metricLabel: s.results[0].label,
    tint: WORK_CATEGORY_TINTS[s.category as keyof typeof WORK_CATEGORY_TINTS],
  }));

export const WORK_RIBBON = {
  metrics: WORK_METRICS,
  /* fresh copy */
  caption: "Tallied across every engagement — and still counting.",
} as const;

/* fresh copy */
export const WORK_CTA = {
  heading: "Your build could be the next card.",
  subtext:
    "Tell us the system your business is missing. The build plan shows exactly what we'd ship and what it costs.",
  buttonText: "Get my build plan",
} as const;

export const WORK_CATEGORIES = ["all", "websites", "ecommerce", "platforms"];
