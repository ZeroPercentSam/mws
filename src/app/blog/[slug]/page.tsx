"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import BlogContent from "@/components/ui/BlogContent";
import CTABanner from "@/components/ui/CTABanner";
import ReadingProgress from "@/components/ui/ReadingProgress";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import { BLOG_POSTS, BLOG_CATEGORY_LABELS } from "@/lib/constants";
import { eyebrowCls, BLOG_TINTS } from "@/lib/design";
import { STAG_GRID } from "@/lib/animations";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.relatedSlugs
    ?.map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter(Boolean) ?? [];

  return (
    <>
      {/* signature: scroll-linked reading-progress seam */}
      <ReadingProgress />

      {/* Hero */}
      <header className="relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0" aria-hidden>
          {/* Per-post gradient wash */}
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{ background: post.gradient }}
          />
          {/* Fine grid, fading toward the article body */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)",
            }}
          />
          {/* Warm orange glow, top-right */}
          <div
            className="absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,0,0.22) 0%, rgba(255,107,0,0.06) 35%, transparent 70%)",
            }}
          />
          {/* Blend the header into the page background */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg-primary" />
        </div>

        {/* Content — CSS hero-rise: the article h1 is the LCP, it must
            never wait on hydration */}
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-8 pt-32 md:pt-40 pb-14 md:pb-20">
          <div className="hero-rise flex items-center gap-3">
            <Link
              href="/blog"
              className="text-xs uppercase tracking-[0.2em] text-text-muted hover:text-accent transition-colors duration-200 font-semibold"
            >
              Blog
            </Link>
            <span className="text-text-muted">/</span>
            <span
              className="text-xs uppercase tracking-[0.2em] font-semibold"
              style={{
                color:
                  BLOG_TINTS[post.category as keyof typeof BLOG_TINTS] ??
                  "var(--color-accent)",
              }}
            >
              {BLOG_CATEGORY_LABELS[post.category] || post.category}
            </span>
          </div>

          <h1
            className="hero-rise font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-5 max-w-4xl leading-[1.08]"
            style={{ animationDelay: "0.08s" }}
          >
            {post.title}
          </h1>

          <p
            className="hero-rise mt-6 max-w-2xl text-lg md:text-xl text-text-secondary leading-relaxed"
            style={{ animationDelay: "0.16s" }}
          >
            {post.excerpt}
          </p>

          <div
            className="hero-rise flex items-center gap-4 mt-9"
            style={{ animationDelay: "0.26s" }}
          >
            <div className="w-11 h-11 rounded-full bg-accent/15 ring-1 ring-accent/30 flex items-center justify-center">
              <span className="text-accent text-sm font-bold">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <p className="text-text-primary text-sm font-semibold">
                {post.author}
              </p>
              <p className="text-text-muted text-xs">
                {post.authorRole} &middot;{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                &middot; {post.readTime}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <BlogContent sections={post.content} />
        </div>
      </SectionWrapper>

      {/* Related — wins-strip language */}
      {relatedPosts.length > 0 && (
        <section className="bg-bg-secondary">
          <SectionWrapper className="!py-16 md:!py-20">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>Keep reading</span>
            </FadeInWhenVisible>
            <StaggerChildren
              className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2"
              stagger={STAG_GRID}
            >
              {relatedPosts.map((related) => {
                const tint =
                  BLOG_TINTS[related!.category as keyof typeof BLOG_TINTS] ??
                  "var(--color-accent)";
                return (
                  <StaggerItem key={related!.slug} className="min-w-0">
                    <Link
                      href={`/blog/${related!.slug}`}
                      className="flex h-full items-baseline gap-3 rounded-lg border border-border bg-bg-card px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-hover"
                    >
                      <span className="shrink-0 font-[family-name:var(--font-heading)] text-sm font-extrabold text-accent">
                        {related!.readTime}
                      </span>
                      <span className="min-w-0 truncate text-sm text-text-secondary">
                        {related!.title}
                      </span>
                      <span
                        className="ml-auto shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: tint, borderColor: `${tint}40` }}
                      >
                        {BLOG_CATEGORY_LABELS[related!.category] || related!.category}
                      </span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </SectionWrapper>
        </section>
      )}

      {/* CTA */}
      <CTABanner
        heading="Put these numbers to work."
        subtext="The same math drives every build plan we write. Get yours — scope, price, timeline."
        buttonText="Get my build plan"
        buttonHref="/contact"
      />
    </>
  );
}
