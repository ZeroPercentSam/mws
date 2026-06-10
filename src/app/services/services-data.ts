// /services copy. Every displayed number derives from lib/constants through
// lib/derive (typo = build-time crash) or quotes a published blog stat with
// its source post linked. Strings without numbers are fresh copy.
import { SERVICE_DETAILS, PRICING, DELIVERY_WINDOWS } from "@/lib/constants";
import { SERVICE_TINTS } from "@/lib/design";
import { metric, fmt, leadStat } from "@/lib/derive";
import { HERO } from "@/app/home-data";

const sd = (n: number) => SERVICE_DETAILS[n];
const aiRoi = leadStat("real-roi-of-ai-in-business"); // "$3.70" / per-$1 label

/* fresh copy */
export const SERVICES_HERO = {
  eyebrow: "What we build",
  headlineLines: ["Three systems.", "One operating advantage —"],
  headlineAccent: "priced and shipped like products.",
  subline:
    "Websites, AI, and automation built as one stack: fixed scope, fixed price, and measured against KPIs we agree on before work begins.",
  ctaPrimary: HERO.ctaPrimary,
  ctaSecondary: HERO.ctaSecondary,
  risk: HERO.risk,
} as const;

export const DEEP_DIVES = [
  {
    key: "websites",
    id: "websites",
    tint: SERVICE_TINTS.websites,
    number: sd(0).number,
    title: sd(0).title,
    window: DELIVERY_WINDOWS.websites,
    /* fresh copy */
    tagline: "Built for the seconds that decide deals.",
    intro:
      "Buyers compare you in open tabs before they ever call. We engineer the site that wins that comparison — fast, conversion-ordered, and measured from launch day, not brochure-ware.",
    deliverables: sd(0).deliverables,
    features: sd(0).features,
    proof: [
      {
        label: `${fmt(metric("exotics-by-the-bay", "Pages Built"))} pages · ${fmt(metric("exotics-by-the-bay", "Florida Locations"))} Florida cities, one build`,
        href: "/work/exotics-by-the-bay",
      },
      {
        label: `$${fmt(metric("adare-wellness", "Top Membership Tier"))} top membership tier sold through it`,
        href: "/work/adare-wellness",
      },
      {
        label: `FDA ${fmt(metric("lubecision", "FDA Pathway"))} regulatory pathway site`,
        href: "/work/lubecision",
      },
    ],
  },
  {
    key: "ai",
    id: "ai",
    tint: SERVICE_TINTS.ai,
    number: sd(1).number,
    title: sd(1).title,
    window: DELIVERY_WINDOWS.ai,
    /* fresh copy */
    tagline: "Selling while you're closed.",
    intro:
      "Chatbots, configurators, and personalization that work your pipeline around the clock — in production for real clients, not in slide decks.",
    deliverables: sd(1).deliverables,
    features: sd(1).features,
    proof: [
      {
        label: `${fmt(metric("alpha-gentlemen-suits", "Fabric Swatches"))} fabric swatches, AI-configurable`,
        href: "/work/alpha-gentlemen-suits",
      },
      {
        label: `${fmt(metric("alpha-gentlemen-suits", "AI-Powered Tools"))} AI tools live in one storefront`,
        href: "/work/alpha-gentlemen-suits",
      },
      {
        label: `${aiRoi.value} returned per $1 invested in AI`,
        href: "/blog/real-roi-of-ai-in-business",
      },
    ],
  },
  {
    key: "automation",
    id: "automation",
    tint: SERVICE_TINTS.automation,
    number: sd(2).number,
    title: sd(2).title,
    window: DELIVERY_WINDOWS.automation,
    /* fresh copy */
    tagline: "Your repeatable work, made automatic.",
    intro:
      "The quotes, follow-ups, and handoffs your team retypes every week become systems that run themselves — compliance included, errors caught before customers see them.",
    deliverables: sd(2).deliverables,
    features: sd(2).features,
    proof: [
      {
        label: `${fmt(metric("clariven-labs", "Order Accuracy"))} order accuracy in production`,
        href: "/work/clariven-labs",
      },
      {
        label: `${fmt(metric("osint4all", "Tools Cataloged"))} tools status-tracked automatically`,
        href: "/work/osint4all",
      },
      {
        label: "State-blocking compliance live, by architecture",
        href: "/work/purity-science",
      },
    ],
  },
] as const;

// ranges looked up by label (not index) so reordering either array can't
// silently mispair a price with a service
const range = (label: string) => {
  const r = PRICING.ranges.find((x) => x.label === label);
  if (!r) throw new Error(`services-data: no PRICING range "${label}"`);
  return r.range;
};

export const ENGAGEMENT = {
  eyebrow: PRICING.eyebrow,
  heading: PRICING.heading,
  rows: [
    { key: "websites", service: sd(0).title, window: DELIVERY_WINDOWS.websites, range: range("Websites") },
    { key: "ai", service: sd(1).title, window: DELIVERY_WINDOWS.ai, range: range("AI implementations") },
    { key: "automation", service: sd(2).title, window: DELIVERY_WINDOWS.automation, range: range("Automation suites") },
  ],
  floorPrefix: PRICING.floorPrefix,
  floorAmount: PRICING.floorAmount,
  floorNote: PRICING.floorNote,
  retainers: PRICING.retainers,
  /* fresh copy */
  intro: "No mystery quotes. Windows and ranges below are what engagements actually look like.",
} as const;

/* fresh copy */
export const SERVICES_FAQ_INTRO = {
  eyebrow: "Questions, answered",
  heading: "Straight answers.",
  lede: "Price, timelines, fit, and what happens after launch — the things you're actually weighing.",
} as const;

/* fresh copy */
export const SERVICES_CTA = {
  heading: "One call. One plan. Three systems.",
  subtext:
    "Tell us what's slowing the business down. The build plan shows what we'd ship, when, and for exactly how much.",
  buttonText: HERO.ctaPrimary,
} as const;
