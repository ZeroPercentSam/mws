"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center px-6 md:px-8 transition-all duration-300 ${
          scrolled
            ? "border-b border-border"
            : "bg-transparent"
        }`}
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          ...(scrolled || mobileOpen
            ? {
                backgroundColor: "rgba(5, 5, 5, 0.85)",
                WebkitBackdropFilter: "blur(24px)",
                backdropFilter: "blur(24px)",
              }
            : {}),
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-text-primary"
          >
            {SITE.name}
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/#contact" variant="primary" className="text-sm px-5 py-2">
              Get in Touch
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 w-full h-0.5 bg-text-primary origin-center"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-text-primary -translate-y-1/2"
                transition={{ duration: 0.15 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 w-full h-0.5 bg-text-primary origin-center"
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.05,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-[family-name:var(--font-heading)] text-3xl font-bold text-text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.3,
                  delay: NAV_LINKS.length * 0.05,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <Button
                  href="/#contact"
                  variant="primary"
                  className="text-sm px-8 py-3 mt-4"
                  onClick={() => setMobileOpen(false)}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
