// /contact copy. Claims are assembled from locked copy only (OPS, HERO,
// HOME_FAQ, PRICING) — no invented response times, lead times, or coverage.
import { SITE } from "@/lib/constants";
import { HERO, OPS, HOME_FAQ } from "@/app/home-data";
import type { FAQItem } from "@/lib/types";

/* fresh copy */
export const CONTACT_HERO = {
  eyebrow: "Start here",
  heading: "One call. A written build plan.",
  subline:
    "Tell us what's slowing the business down. You get a written, fixed-price plan — scope, price, timeline — then you decide.",
} as const;

export const AFTER_SEND = {
  /* fresh copy (labels) */
  eyebrow: "After you hit send",
  docTitle: "BUILD PLAN",
  rows: ["Scope", "Price", "Timeline"],
  caption: OPS.steps[0].artifact, // "You get: a written build plan — scope, price, timeline."
  steps: OPS.steps,
} as const;

export const CONTACT_INFO = {
  email: SITE.email,
  note: HERO.risk,
} as const;

// answers assembled from locked copy only
export const CONTACT_FAQ: FAQItem[] = [
  {
    question: "What happens after I hit send?",
    answer: `${OPS.steps[0].caption} ${OPS.steps[0].artifact}`,
  },
  {
    question: "What does this cost?",
    answer: HOME_FAQ[0].answer,
  },
  {
    question: "How fast is “days, not months”?",
    answer: OPS.timeline,
  },
  {
    question: "What if we're not a fit?",
    answer: `${HERO.risk} No pressure pitch, no newsletter — if we're not the right team for it, we'll say so and point you somewhere better.`,
  },
];
