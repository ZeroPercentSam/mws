"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        // transition-colors, NOT transition-all: an all-property CSS
        // transition on the same element motion animates (entrance y/opacity)
        // races motion's per-frame style writes — Safari flickers.
        // border-b is permanent; only its COLOR animates (border-width isn't
        // a color property, toggling the class would pop)
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          scrolled || mobileOpen ? "border-border" : "border-transparent bg-transparent"
        }`}
        style={
          // solid fill, no backdrop-filter: a live blur on a fixed bar
          // repaints over the page on every scroll frame on iOS (flicker)
          scrolled || mobileOpen
            ? { backgroundColor: "rgba(5, 5, 5, 0.97)" }
            : undefined
        }
      >
        <div className="h-16 md:h-20 flex items-center px-6 md:px-8 max-w-7xl mx-auto w-full justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-text-primary"
          >
            {SITE.name}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {/* Active indicator dot */}
                {(pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))) && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/contact" variant="primary" className="text-sm px-5 py-2">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 0 : -4,
              }}
              transition={{ duration: 0.2 }}
              className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
            />
            <motion.span
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? 0 : 4,
              }}
              transition={{ duration: 0.2 }}
              className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div className="fixed top-16 left-0 right-0 z-40 md:hidden">
        <MobileMenu
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          pathname={pathname}
        />
      </div>
    </>
  );
}
