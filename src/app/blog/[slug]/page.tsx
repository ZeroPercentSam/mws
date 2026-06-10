"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import BlogContent from "@/components/ui/BlogContent";
import CTABanner from "@/components/ui/CTABanner";
import GradientThumb from "@/components/ui/GradientThumb";
import { BLOG_POSTS, BLOG_CATEGORY_LABELS } from "@/lib/constants";

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

        {/* Content */}
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-8 pt-32 md:pt-40 pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/blog"
              className="text-xs uppercase tracking-[0.2em] text-text-muted hover:text-accent transition-colors duration-200 font-semibold"
            >
              Blog
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              {BLOG_CATEGORY_LABELS[post.category] || post.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-5 max-w-4xl leading-[1.08]"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.32 }}
            className="mt-6 max-w-2xl text-lg md:text-xl text-text-secondary leading-relaxed"
          >
            {post.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.45 }}
            className="flex items-center gap-4 mt-9"
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
          </motion.div>
        </div>
      </header>

      {/* Article Body */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <BlogContent sections={post.content} />
        </div>
      </SectionWrapper>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-bg-secondary">
          <SectionWrapper>
            <FadeInWhenVisible>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                Keep Reading
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mt-3 mb-10">
                Related Articles
              </h2>
            </FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <FadeInWhenVisible key={related!.slug} delay={0.1}>
                  <Link
                    href={`/blog/${related!.slug}`}
                    className="group block border border-border rounded-[var(--radius-card)] overflow-hidden bg-bg-card transition-all duration-300 hover:border-border-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <GradientThumb gradient={related!.gradient} />
                      <Image
                        src={`/blog/${related!.slug}.webp`}
                        alt={related!.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                        {BLOG_CATEGORY_LABELS[related!.category] || related!.category}{" "}
                        &middot; {related!.readTime}
                      </p>
                      <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-text-primary leading-snug group-hover:text-accent transition-colors duration-200">
                        {related!.title}
                      </h3>
                    </div>
                  </Link>
                </FadeInWhenVisible>
              ))}
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* CTA */}
      <CTABanner
        heading="Ready to Put This Into Practice."
        subtext="Let's discuss how these ideas apply to your business."
        buttonText="Start a Conversation"
        buttonHref="/contact"
      />
    </>
  );
}
