// Case-file labels + per-study derivations. No numbers originate here —
// everything displayed reads study.results / TESTIMONIALS.
import { TESTIMONIALS } from "@/lib/constants";
import { WORK_CATEGORY_TINTS } from "@/lib/design";
import type { CaseStudy } from "@/lib/types";

/* fresh copy */
export const CASE_LABELS = {
  challenge: { eyebrow: "The challenge", heading: "What they faced." },
  approach: { eyebrow: "The approach", heading: "How it shipped." },
  results: { eyebrow: "The results", heading: "Stamped on the build log." },
  gallery: { eyebrow: "The screens", heading: "Live, not mocked." },
  record: { eyebrow: "From the build log", heading: "The build record." },
  liveLabel: "LIVE — verify it yourself",
  cta: {
    heading: "Your numbers go here.",
    subtext:
      "Every figure above is measured on a live system. One call gets you the written plan for yours.",
    buttonText: "Get my build plan",
  },
} as const;

export const tintFor = (study: CaseStudy) =>
  WORK_CATEGORY_TINTS[study.category as keyof typeof WORK_CATEGORY_TINTS] ??
  "var(--color-accent)";

export const galleryFor = (study: CaseStudy) => ({
  screenshots: [
    `/work/screenshots/${study.slug}/hero.jpg`,
    `/work/screenshots/${study.slug}/content.jpg`,
    `/work/screenshots/${study.slug}/features.jpg`,
  ],
  labels: ["Homepage", "Key content", "Features"],
  gradients: [
    study.gradient,
    study.heroGradient,
    study.gradient.replace("135deg", "45deg"),
  ],
});

// build record: studio testimonial matched by client name (4 of 10 today)
export const buildRecordFor = (study: CaseStudy) =>
  study.testimonial ?? TESTIMONIALS.find((t) => t.name === study.client);
