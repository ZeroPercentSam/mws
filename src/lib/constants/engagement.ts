/* ------------------------------------------------------------------ */
/*  Engagement terms (locked by Sam: $5K floor + retainers)            */
/*  Single source for pricing + delivery windows across pages.         */
/* ------------------------------------------------------------------ */
export const PRICING = {
  eyebrow: "The investment",
  heading: "Serious work, priced plainly.",
  floorPrefix: "Engagements from ",
  floorAmount: "$5,000",
  floorNote: "Fixed scope, fixed price — agreed in writing before work begins.",
  ranges: [
    { label: "Websites", range: "Most land $15K–$50K" },
    { label: "AI implementations", range: "$20K–$75K" },
    { label: "Automation suites", range: "$25K–$100K+" },
  ],
  retainers:
    "Monthly retainers available — ongoing development, AI agent orchestration, and fractional CTO.",
  risk: [
    "30-day post-launch support on every project",
    "KPIs defined before a line of code is written",
    "Fixed scope, fixed price — no surprise invoices",
  ],
} as const;

// Delivery windows as published in OPS.timeline / TRIPTYCH chips.
export const DELIVERY_WINDOWS = {
  websites: "6–10 weeks",
  ai: "4–8 weeks",
  automation: "8–14 weeks",
} as const;
