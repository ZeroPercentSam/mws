// /blog copy. Stats derive from the posts' own content blocks via
// lib/derive (tryLeadStat) — the strip self-heals as posts are added.
import { BLOG_POSTS } from "@/lib/constants";
import { tryLeadStat } from "@/lib/derive";

/* fresh copy */
export const BLOG_HERO = {
  eyebrow: "The research desk",
  heading: "The numbers behind the work.",
  subline:
    "Published analysis with the math shown — what load time, AI, and automation actually return. Sources linked, no fluff.",
} as const;

// newest featured post that carries a stat block (the Signal card needs one).
// Throws at module load — derive-layer contract: bad data is a build-time
// crash, never a silent prod render crash.
const featuredPick = [...BLOG_POSTS]
  .filter((p) => p.featured && tryLeadStat(p.slug))
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .map((p) => ({ post: p, stat: tryLeadStat(p.slug)! }))[0];
if (!featuredPick) {
  throw new Error(
    "blog-data: no featured post carries a stat block — FeaturedSignal needs one",
  );
}
export const FEATURED = featuredPick;

// one cell per post that opens with a stat (5 of 6 today)
export const SIGNAL_STRIP = BLOG_POSTS.map((p) => {
  const stat = tryLeadStat(p.slug);
  return stat
    ? { figure: stat.value, line: stat.label, href: `/blog/${p.slug}` }
    : null;
}).filter(Boolean) as { figure: string; line: string; href: string }[];

/* fresh copy */
export const BLOG_CTA = {
  heading: "Apply the math to your business.",
  subtext:
    "The same numbers drive every build plan we write. Get yours — scope, price, timeline.",
  buttonText: "Get my build plan",
} as const;
