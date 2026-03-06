"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center px-6 md:px-8 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-text-primary"
        >
          {SITE.name}
        </a>
        <Button href="#contact" variant="primary" className="text-sm px-5 py-2">
          Get in Touch
        </Button>
      </div>
    </motion.nav>
  );
}
