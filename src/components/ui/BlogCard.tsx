"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const categoryLabels: Record<string, string> = {
    websites: "Websites",
    ai: "AI Intelligence",
    automation: "Automation",
    strategy: "Strategy",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden bg-bg-card transition-all duration-300 hover:border-border-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
          {/* Abstract gradient thumbnail */}
          <div className="relative h-48 md:h-56 overflow-hidden">
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{ background: post.gradient }}
            />
            {/* Category pill */}
            <div className="absolute top-4 left-4">
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-bg-primary/70 backdrop-blur-sm text-text-secondary px-3 py-1 rounded-full border border-border">
                {categoryLabels[post.category] || post.category}
              </span>
            </div>
            {/* Read time pill */}
            <div className="absolute top-4 right-4">
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-bg-primary/70 backdrop-blur-sm text-text-secondary px-3 py-1 rounded-full border border-border">
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
              {post.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xs font-bold">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-text-primary text-xs font-medium">
                  {post.author}
                </p>
                <p className="text-text-muted text-[10px]">
                  {post.authorRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
