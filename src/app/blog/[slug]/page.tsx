"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import BlogContent from "@/components/ui/BlogContent";
import CTABanner from "@/components/ui/CTABanner";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.relatedSlugs
    ?.map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter(Boolean) ?? [];

  const categoryLabels: Record<string, string> = {
    websites: "Websites",
    ai: "AI Intelligence",
    automation: "Automation",
    strategy: "Strategy",
  };

  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <>
      {/* Hero */}
      <div ref={heroRef} className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: post.gradient,
            scale: heroScale,
            opacity: heroOpacity,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-8 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
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
                {categoryLabels[post.category] || post.category}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.35 }}
              className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl lg:text-6xl font-800 tracking-tight mt-4 max-w-4xl leading-[1.1]"
            >
              {post.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.5 }}
              className="flex items-center gap-4 mt-6"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-sm font-bold">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-text-primary text-sm font-medium">
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
        </div>
      </div>

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
                    <div
                      className="h-32 transition-transform duration-500 group-hover:scale-105"
                      style={{ background: related!.gradient }}
                    />
                    <div className="p-5">
                      <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                        {categoryLabels[related!.category] || related!.category}{" "}
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
