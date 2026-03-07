"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer";
  const variants = {
    primary:
      "bg-accent hover:bg-accent-light text-white px-8 py-3.5 rounded-[var(--radius-button)]",
    secondary:
      "bg-transparent border border-border text-white hover:border-border-hover px-8 py-3.5 rounded-[var(--radius-button)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    // Internal links use Next.js Link for client-side navigation
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
