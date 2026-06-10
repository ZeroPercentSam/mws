"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import FilterBar from "@/components/ui/FilterBar";
import BlogCard from "@/components/ui/BlogCard";
import CTABanner from "@/components/ui/CTABanner";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/constants";

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <PageHero
        label="Insights"
        heading="Ideas That Move Needles."
        subtext="Actionable insights on web performance, AI implementation, automation strategy, and digital transformation. No fluff — just the thinking behind the work."
        showGlow
      />

      {/* Filter + Grid */}
      <SectionWrapper className="!pt-0">
        <FadeInWhenVisible>
          <div className="mb-10">
            <LayoutGroup>
              <FilterBar
                categories={[...BLOG_CATEGORIES]}
                active={activeFilter}
                onSelect={setActiveFilter}
              />
            </LayoutGroup>
          </div>
        </FadeInWhenVisible>

        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </AnimatePresence>
        </LayoutGroup>
      </SectionWrapper>

      {/* CTA */}
      <CTABanner
        heading="Have a Challenge in Mind."
        subtext="Let's discuss how we can solve it together."
        buttonText="Start a Conversation"
        buttonHref="/contact"
      />
    </>
  );
}
