// Display-value derivation helpers. Page-data files build their copy through
// these so every published number traces back to lib/constants — nothing is
// retyped at the page layer. Lookups throw at module load: a typo'd slug or
// label is a build-time crash, not a silently wrong claim.
import { CASE_STUDIES, METRICS, BLOG_POSTS } from "@/lib/constants";
import type { CaseStudy, MetricItem, BlogPost } from "@/lib/types";

export function study(slug: string): CaseStudy {
  const s = CASE_STUDIES.find((c) => c.slug === slug);
  if (!s) throw new Error(`derive: unknown case study slug "${slug}"`);
  return s;
}

export function metric(slug: string, label: string): MetricItem {
  const m = study(slug).results.find((r) => r.label === label);
  if (!m) throw new Error(`derive: no metric "${label}" on "${slug}"`);
  return m;
}

export const fmt = (m: MetricItem, prefix = "") =>
  `${prefix}${m.value.toLocaleString("en-US")}${m.suffix}`;

export function siteMetric(label: string): MetricItem {
  const m = METRICS.find((x) => x.label === label);
  if (!m) throw new Error(`derive: no site metric "${label}"`);
  return m;
}

export function post(slug: string): BlogPost {
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`derive: unknown blog post slug "${slug}"`);
  return p;
}

type StatBlock = { value: string; label: string };

export function tryLeadStat(slug: string): StatBlock | undefined {
  const block = post(slug).content.find((s) => s.type === "stat");
  return block && "stat" in block ? (block.stat as StatBlock) : undefined;
}

export function leadStat(slug: string): StatBlock {
  const stat = tryLeadStat(slug);
  if (!stat) throw new Error(`derive: post "${slug}" has no stat block`);
  return stat;
}
