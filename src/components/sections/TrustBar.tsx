"use client";

import { motion } from "motion/react";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Enterprise-Grade Security",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: "SOC 2 Compliant",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    label: "99.9% Uptime SLA",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "50+ Happy Clients",
  },
];

export default function TrustBar() {
  return (
    <div className="border-y border-border py-8 px-6 md:px-8 bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <FadeInWhenVisible>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="flex items-center gap-2.5 text-text-muted"
              >
                <span className="text-accent">{item.icon}</span>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
