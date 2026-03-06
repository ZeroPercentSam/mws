import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-text-muted hover:text-text-primary text-sm transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-text-muted hover:text-text-primary text-sm transition-colors duration-200"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
