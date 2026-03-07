"use client";

import { motion } from "motion/react";
import { defaultViewport, staggerContainer } from "@/lib/animations";

interface TechStackProps {
  technologies: string[];
}

export default function TechStack({ technologies }: TechStackProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer(0.05)}
      className="flex flex-wrap gap-2"
    >
      {technologies.map((tech) => (
        <motion.span
          key={tech}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(255, 107, 0, 0.15)",
          }}
          className="px-4 py-2 text-sm font-medium text-text-secondary bg-bg-secondary border border-border rounded-full transition-colors duration-200 hover:text-accent hover:border-accent/30 cursor-default"
        >
          {tech}
        </motion.span>
      ))}
    </motion.div>
  );
}
