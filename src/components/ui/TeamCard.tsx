"use client";

import { motion } from "motion/react";
import { clipReveal, defaultViewport } from "@/lib/animations";
import type { TeamMember } from "@/lib/types";

interface TeamCardProps {
  member: TeamMember;
  delay?: number;
}

export default function TeamCard({ member, delay = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="group"
    >
      <div className="border border-border rounded-[var(--radius-card)] overflow-hidden bg-bg-card transition-all duration-300 hover:border-border-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
        {/* Avatar with clip-path curtain reveal */}
        <motion.div
          variants={clipReveal}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
            delay,
          }}
          className="relative h-64 md:h-72 overflow-hidden"
        >
          <div
            className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
            style={{ background: member.gradient }}
          />
          {/* Geometric initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-[family-name:var(--font-heading)] text-6xl md:text-7xl font-900 text-white/20 select-none">
              {member.initials}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.4, 0.25, 1],
              delay: delay + 0.2,
            }}
          >
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-200">
              {member.name}
            </h3>
            <p className="text-accent text-sm font-medium mt-1">
              {member.role}
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mt-3">
              {member.bio}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
