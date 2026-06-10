// /about copy — voice of the studio ("we"), no founder name anywhere.
// Numbers derive via lib/derive; strings without numbers are fresh copy.
import { CASE_STUDIES } from "@/lib/constants";
import { SERVICE_TINTS } from "@/lib/design";
import { metric, fmt, siteMetric } from "@/lib/derive";
import { HERO, OPS } from "@/app/home-data";

const m = (label: string) => siteMetric(label);

/* fresh copy */
export const ABOUT_HERO = {
  eyebrow: "The studio",
  headlineLines: ["A studio built like", "the systems it sells —"],
  headlineAccent: "every brief runs through the machine.",
  subline: `${fmt(m("Projects Shipped"))} projects across ${fmt(m("Industries Served"))} industries, shipped by one studio with an AI-leveraged pipeline and senior judgment on every screen. This page shows the machine.`,
  risk: HERO.risk,
} as const;

export const STUDIO_OS = {
  /* fresh copy (labels only) */
  inputs: ["The brief", "Brand assets", "Goals & KPIs", "Deadline"],
  nodes: [
    {
      title: "AI-leveraged pipeline",
      caption: "AI does the repetition — scaffolding, variants, QA passes.",
      icon: "build" as const,
    },
    {
      title: "Senior review",
      caption: OPS.steps[2].caption, // "AI-leveraged production with senior review on every screen."
      icon: "shield" as const,
    },
  ],
  tiles: CASE_STUDIES.map((c) => ({ slug: c.slug, client: c.client })),
  caption: `${CASE_STUDIES.length} live platforms — every tile links to the build`,
} as const;

/* fresh copy */
export const FACTS = {
  eyebrow: "Studio facts",
  heading: "Counted, not claimed.",
} as const;

/* fresh copy — numbers interpolated from constants */
export const STORY = {
  eyebrow: "Our story",
  headline: "Built different. On purpose.",
  paragraphs: [
    "Modern Web Systems started with a simple observation: most businesses don't lose to better products — they lose to better systems. The competitor who responds first, follows up automatically, and ships improvements weekly wins, even with a worse offering.",
    `So we built a studio that runs the way those winners do. AI handles the repetition — scaffolding, variants, regression checks — while senior judgment makes every decision a customer will actually see. That operating model is how one studio catalogs ${fmt(metric("osint4all", "Tools Cataloged"))} intelligence tools, configures ${fmt(metric("alpha-gentlemen-suits", "Fabric Swatches"))} fabrics with AI, and ships ${fmt(m("Pages Built"))} pages without a single account manager in the chain.`,
    "The people who scope your build are the people who ship it. No telephone game, no handoffs, no junior pods learning on your invoice. That structure is the product — the websites, AI, and automation are what it produces.",
  ],
  pullQuote:
    "Most businesses don't lose to better products. They lose to better systems.",
} as const;

/* fresh copy — metric citations derived */
export const VALUES = [
  {
    title: "Measured, not promised",
    body: "KPIs are defined before a line of code is written, and every engagement is fixed-scope, fixed-price. If we can't measure it, we don't claim it.",
    icon: "target" as const,
    tint: SERVICE_TINTS.websites,
  },
  {
    title: "Compliance-grade care",
    body: `The same pipeline that ships fast holds ${fmt(metric("clariven-labs", "Order Accuracy"))} order accuracy in production and runs license-gated, state-blocking pharma compliance as architecture — not as a checkbox.`,
    icon: "shield" as const,
    tint: SERVICE_TINTS.ai,
  },
  {
    title: "Systems that compound",
    body: "Every build leaves you with owned infrastructure — analytics wired in, docs handed over, automation that keeps working while you sleep. Value accrues after launch, not just at it.",
    icon: "trend" as const,
    tint: SERVICE_TINTS.automation,
  },
  {
    title: "Days, not months",
    body: OPS.timeline,
    icon: "rocket" as const,
    tint: "#FF8533",
  },
] as const;

/* fresh copy */
export const ABOUT_CTA = {
  heading: "Put the machine on your problem.",
  subtext:
    "One call. A written, fixed-price build plan. Then the pipeline does what it does.",
  buttonText: HERO.ctaPrimary,
} as const;
