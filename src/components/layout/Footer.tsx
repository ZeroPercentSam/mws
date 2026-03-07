"use client";

import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Top: Brand + Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-text-primary"
            >
              {SITE.name}
            </Link>
            <p className="mt-4 text-text-secondary text-sm leading-relaxed max-w-xs">
              Business consulting, AI-powered websites, and automation systems that
              transform how you compete.
            </p>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services#websites"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                >
                  Powerful Websites
                </Link>
              </li>
              <li>
                <Link
                  href="/services#ai"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                >
                  AI Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/services#automation"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                >
                  Automation & Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@modernwebsystems.com"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                >
                  hello@modernwebsystems.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                >
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright + Legal */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-text-muted hover:text-text-primary text-xs transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-text-primary text-xs transition-colors duration-200"
            >
              Terms of Service
            </a>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-text-muted hover:text-accent text-xs transition-colors duration-200 cursor-pointer"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
