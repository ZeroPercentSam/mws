"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import { BLOG_POSTS } from "@/lib/data";

const CATEGORIES = ["All", "Websites", "AI", "Automation"];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeFilter);

  const featured = BLOG_POSTS.find((p) => p.featured);

  return (
    <>
      <Navbar />
      <PageHero
        label="Insights"
        title="Ideas That Move Businesses."
        description="Strategic thinking, technical deep-dives, and actionable insights from the team building the future of business technology."
      />

      {/* Featured post */}
      {featured && activeFilter === "All" && (
        <section className="px-6 md:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="group relative bg-bg-card border border-border rounded-[var(--radius-card)] p-8 md:p-12 overflow-hidden cursor-pointer transition-all duration-300 hover:border-border-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="text-text-muted text-xs">
                    {featured.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-text-muted text-xs">
                    {featured.readTime} read
                  </span>
                </div>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  {featured.title}
                </h2>

                <p className="text-text-secondary text-[15px] leading-relaxed mb-6 max-w-2xl">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-2 text-accent text-sm font-medium">
                  Read Article
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="absolute top-8 right-8 text-8xl font-extrabold text-white/[0.02] font-[family-name:var(--font-heading)] select-none pointer-events-none">
                01
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter tabs */}
      <div className="px-6 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                activeFilter === cat
                  ? "text-white"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="blog-filter"
                  className="absolute inset-0 bg-bg-card border border-border rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog grid */}
      <section className="px-6 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="group cursor-pointer"
                >
                  <div className="bg-bg-card border border-border rounded-[var(--radius-card)] p-8 h-full flex flex-col transition-all duration-300 group-hover:border-border-hover group-hover:-translate-y-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-accent text-xs font-semibold tracking-wider uppercase">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-text-muted text-xs">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3 group-hover:text-accent transition-colors duration-300 leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-text-muted text-xs">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-accent text-sm font-medium flex items-center gap-1">
                        Read
                        <svg
                          className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-bg-secondary">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
            Stay Ahead
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get Insights Delivered
          </h2>
          <p className="text-text-secondary mb-8">
            Join 2,000+ business leaders getting actionable AI and automation insights every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-bg-card border border-border rounded-[var(--radius-button)] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-200"
            />
            <motion.button
              className="bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-[var(--radius-button)] text-sm transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
