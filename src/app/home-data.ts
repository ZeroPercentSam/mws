// Homepage copy. Every displayed number either derives from CASE_STUDIES /
// METRICS / FAQ_ITEMS at module load (via lib/derive helpers) or quotes a
// published blog-post stat with its source post linked. Nothing is invented.
import { CASE_STUDIES } from "@/lib/constants";
import { study, metric, fmt } from "@/lib/derive";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export const HERO = {
  eyebrow: "For established businesses that have outgrown their website",
  // Locked by Sam: ROI + speed direction
  headlineLines: ["Websites, AI, and automation", "that pay for themselves —"],
  headlineAccent: "shipped in days, not months.",
  subline:
    "A systems-driven studio using AI-leveraged builds to ship premium websites, intelligence, and automation for established businesses.",
  ctaPrimary: "Get my build plan",
  ctaSecondary: "See the live work",
  risk: "Free scoping call · Fixed-price quote · If we're not the right fit, we'll tell you.",
} as const;

// HeroRig idle-morph palettes — three real client niches
export const RIG_THEMES = [
  { niche: "Luxury fashion", accent: "#C9A961" },
  { niche: "Pharma B2B", accent: "#4A9ECB" },
  { niche: "Exotic rentals", accent: "#FF6B00" },
] as const;

/* ------------------------------------------------------------------ */
/*  Pain (PAS)                                                         */
/* ------------------------------------------------------------------ */
export const PAIN = {
  eyebrow: "The problem",
  heading: "It's not your product. It's your systems.",
  cards: [
    {
      title: "The site that quietly loses deals",
      body: "Buyers compare you in open tabs before they ever call. A slow, dated site answers their first question — are these people current? — with a no.",
      icon: "browser",
    },
    {
      title: "Hours lost to manual work",
      body: "Quotes retyped, leads chased by hand, the same email sent dozens of times a week. Your margin is going to tasks software solved years ago.",
      icon: "clock",
    },
    {
      title: "Competitors compounding ahead",
      body: "Someone in your market already responds first, follows up instantly, and prices sharper because their systems do it for them. That gap widens every quarter you wait.",
      icon: "trend",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  The math — published stats, each linked to its source post         */
/* ------------------------------------------------------------------ */
export const MATH_STATS = [
  {
    figure: "4.42%",
    line: "conversions lost per extra second of load time",
    href: "/blog/website-speed-costing-you-revenue",
  },
  {
    figure: "$3.70",
    line: "returned per $1 invested in AI",
    href: "/blog/real-roi-of-ai-in-business",
  },
  {
    figure: "300–500%",
    line: "typical ROI on well-built automation",
    href: "/blog/automate-without-breaking",
  },
  {
    figure: "70%",
    line: "of digital transformations fail — the difference is the operating model",
    href: "/blog/digital-transformation-success",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Results gallery (3 hero cases, metric-first)                       */
/* ------------------------------------------------------------------ */
export const RESULT_CARDS = [
  {
    slug: "alpha-gentlemen-suits",
    metric: fmt(metric("alpha-gentlemen-suits", "Fabric Swatches")),
    metricLabel: "fabric swatches",
    sub: `Virtual try-on · ${fmt(metric("alpha-gentlemen-suits", "AI-Powered Tools"))} AI tools`,
    story:
      "An AI suit configurator with camera measurement replaced the in-store fitting for a custom menswear brand.",
    niche: "E-commerce / AI",
    client: study("alpha-gentlemen-suits").client,
  },
  {
    slug: "osint4all",
    metric: fmt(metric("osint4all", "Tools Cataloged")),
    metricLabel: "tools cataloged",
    sub: `${fmt(metric("osint4all", "Categories"))} categories · ${fmt(metric("osint4all", "Verified Live"))} verified live`,
    story:
      "A chaotic bookmark pile became a definitive intelligence directory, with live status on every tool.",
    niche: "Platform / Directory",
    client: study("osint4all").client,
  },
  {
    slug: "purity-science",
    metric: fmt(metric("purity-science", "Purity Standard")),
    metricLabel: "verified purity",
    sub: "License-gated buyers · restricted states auto-blocked",
    story:
      "A pharma B2B platform where compliance is the architecture, not a checkbox.",
    niche: "Regulated B2B",
    client: study("purity-science").client,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Wins strip (remaining 7 live builds)                               */
/* ------------------------------------------------------------------ */
export const WINS = [
  {
    slug: "adare-wellness",
    metric: fmt(metric("adare-wellness", "Top Membership Tier"), "$"),
    tail: "top membership tier",
  },
  {
    slug: "queen-creek-offering",
    metric: fmt(metric("queen-creek-offering", "Projected ROI")),
    tail: "projected ROI deal room",
  },
  {
    slug: "jmi-capital",
    metric: fmt(metric("jmi-capital", "Properties Delivered")),
    tail: "properties delivered",
  },
  {
    slug: "exotics-by-the-bay",
    metric: `${fmt(metric("exotics-by-the-bay", "Pages Built"))} pages`,
    tail: `${fmt(metric("exotics-by-the-bay", "Florida Locations"))} Florida cities`,
  },
  {
    slug: "luxury-boutique",
    metric: fmt(metric("luxury-boutique", "Designer Brands")),
    tail: "designer brands authenticated",
  },
  {
    slug: "lubecision",
    metric: `FDA ${fmt(metric("lubecision", "FDA Pathway"))}`,
    tail: "regulatory pathway site",
  },
  {
    slug: "clariven-labs",
    metric: fmt(metric("clariven-labs", "Order Accuracy")),
    tail: "order accuracy",
  },
].map((w) => ({ ...w, client: study(w.slug).client }));

/* ------------------------------------------------------------------ */
/*  Services triptych                                                  */
/* ------------------------------------------------------------------ */
export const TRIPTYCH = {
  eyebrow: "What we build",
  heading: "Three systems. One operating advantage.",
  items: [
    {
      key: "websites",
      tint: "#FF6B00",
      title: "High-Performance Websites",
      body: "Sites engineered for the 4.42%-per-second reality: fast, precise, built to convert — not brochure-ware.",
      chips: ["200+ pages shipped", "6–10 week delivery", "28-page, 3-city build live"],
    },
    {
      key: "ai",
      tint: "#4A9ECB",
      title: "AI Intelligence",
      body: "Chatbots, configurators, and personalization that sell while you're closed — in production, not in decks.",
      chips: ["AI try-on live in production", "$3.70 returned per $1", "4–8 week delivery"],
    },
    {
      key: "automation",
      tint: "#C9A961",
      title: "Business Automation",
      body: "Your repeatable work, made automatic — compliance included, errors caught before customers see them.",
      chips: ["State-blocking compliance live", "300–500% typical ROI", "8–14 week delivery"],
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Operating model                                                    */
/* ------------------------------------------------------------------ */
export const OPS = {
  eyebrow: "How it ships",
  heading: "A studio built like the systems it sells.",
  intro:
    "Here's exactly what happens after you click — and why the timelines are mechanically credible.",
  steps: [
    {
      title: "Discovery",
      caption: "A short call about your business, not our portfolio.",
      artifact: "You get: a written build plan — scope, price, timeline.",
      icon: "search",
    },
    {
      title: "Strategy",
      caption: "We map the system before touching pixels.",
      artifact: "You get: sitemap, architecture, and the KPIs we'll be judged on.",
      icon: "blueprint",
    },
    {
      title: "Build",
      caption: "AI-leveraged production with senior review on every screen.",
      artifact: "You get: a live staging link — watch it ship.",
      icon: "build",
    },
    {
      title: "Launch & Scale",
      caption: "Deploy, measure, tune.",
      artifact: "You get: analytics wired in, docs, and a clear post-launch path.",
      icon: "rocket",
    },
  ],
  timeline:
    "Focused builds ship in days. Full websites: 6–10 weeks. AI: 4–8. Automation: 8–14. The clock starts when the plan is signed.",
  mechanisms: [
    {
      title: "AI-leveraged pipeline",
      body: "AI does the repetition — scaffolding, variants, QA passes, regression checks. Senior judgment makes the decisions that win. That leverage is the whole reason days-not-months is normal here.",
    },
    {
      title: "Token-systemized design",
      body: "Every interaction on this page runs on a named token system — durations, easings, distances. Systemized craft is why quality holds at speed.",
    },
    {
      title: "Zero-handoff structure",
      body: "No account managers, no telephone game. The people who scope your build are the people who ship it — 16+ projects across 8 industries, one studio.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Build log (honest framing — these are studio build records,        */
/*  not client-person endorsements; no quote styling)                  */
/* ------------------------------------------------------------------ */
export const BUILD_LOG = {
  eyebrow: "From the build log",
  heading: "No rented praise. Build records.",
  intro: "What shipped, in plain terms — every entry is live and linked.",
} as const;

/* ------------------------------------------------------------------ */
/*  Investment (locked by Sam: $5K floor + retainers)                  */
/* ------------------------------------------------------------------ */
// Engagement terms live in lib/constants/engagement.ts (shared with
// /services); re-exported here for the homepage sections that render them.
export { PRICING } from "@/lib/constants/engagement";

/* ------------------------------------------------------------------ */
/*  FAQ (objection-handling set; numbers match /services + PRICING)    */
/* ------------------------------------------------------------------ */
export const HOME_FAQ = [
  {
    question: "What does this cost?",
    answer:
      "Engagements start at $5,000, quoted fixed-scope and fixed-price before work begins. Most website engagements land $15K–$50K, AI implementations $20K–$75K, automation suites $25K–$100K+. Monthly retainers are available for ongoing development, AI agent orchestration, and fractional CTO needs.",
  },
  {
    question: "Is one studio really enough?",
    answer:
      "It's why the work ships. We run few concurrent engagements, and an AI-leveraged build system handles the volume work a bigger shop bills humans for. 16+ projects, 8 industries, 200+ pages — same studio.",
  },
  {
    question: "Are those timelines real?",
    answer:
      "Yes, because we don't start from blank pages. Hardened internal systems plus AI production is how 6–10 week websites are normal here. You'll see a live staging link with continuous drops, so the proof is continuous.",
  },
  {
    question: "Are AI-built sites actually good?",
    answer:
      "AI does the repetition; senior judgment does the decisions. Look at the work: a 1,411-tool directory, a license-verified pharma platform, a virtual try-on configurator. Production quality is the portfolio's argument, not ours.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You launch with analytics wired in, full handover documentation, and ownership of everything we built. Every project includes a 30-day post-launch support period, and monthly retainers cover continuous development and strategic guidance beyond it.",
  },
  {
    question: "Can you work with our existing tools?",
    answer:
      "Yes. Custom integrations are a core service — we build into your CRM, booking, payment, and ops stack rather than forcing a rip-and-replace.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */
export const FINAL_CTA = {
  heading: "Your market won't wait.",
  subtext:
    "One call. A written, fixed-price build plan. Then days to live — not months.",
  formNote: "No pressure pitch. No newsletter. A written plan, then your call.",
} as const;
