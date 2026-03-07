import Link from "next/link";
import { SITE } from "@/lib/constants";

const FOOTER_LINKS = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
  ],
  Services: [
    { label: "Websites", href: "/services/websites" },
    { label: "AI Intelligence", href: "/services/ai" },
    { label: "Automation", href: "/services/automation" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-text-primary"
            >
              {SITE.name}
            </Link>
            <p className="text-text-muted text-sm mt-3 leading-relaxed max-w-xs">
              Business consulting, AI-powered websites, and automation systems that transform how you compete.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-text-primary text-sm font-semibold mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-text-primary text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built with obsessive attention to detail.
          </p>
        </div>
      </div>
    </footer>
  );
}
