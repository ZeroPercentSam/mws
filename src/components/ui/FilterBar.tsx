"use client";

import { motion } from "motion/react";

interface FilterBarProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export default function FilterBar({ categories, active, onSelect }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            active === cat
              ? "text-bg-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {active === cat && (
            <motion.span
              layoutId="activeFilter"
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 capitalize">
            {cat === "all" ? "All" : cat}
          </span>
        </button>
      ))}
    </div>
  );
}
