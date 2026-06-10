"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "mws-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // rAF defers the visibility flip past hydration (and past the lint rule's
    // sync-setState-in-effect cascade concern)
    const id = requestAnimationFrame(() => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
      } catch {
        // storage unavailable (private mode etc.) — show nothing rather than nag every load
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // if storage fails, dismiss for this session only
    }
    setVisible(false);
  };

  // Both buttons get identical visual weight on purpose: consent symmetry —
  // an emphasized "Accept" next to a muted "Decline" is a dark pattern.
  const buttonClasses =
    "flex-1 rounded-[var(--radius-button)] border border-border bg-white/5 px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-border-hover cursor-pointer";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          role="region"
          aria-label="Cookie and storage notice"
          className="fixed bottom-4 inset-x-4 z-50 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-sm print:hidden"
        >
          <div className="rounded-[var(--radius-card)] border border-border bg-bg-card p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <p className="text-sm text-text-secondary leading-relaxed">
              <span className="font-semibold text-text-primary">
                No tracking here.
              </span>{" "}
              We use no analytics or ad cookies. Our host may set minimal
              infrastructure cookies, and we store one flag in your browser to
              remember this choice.{" "}
              <Link
                href="/privacy#cookies-and-local-storage"
                className="text-text-primary underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
              >
                Privacy policy
              </Link>
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => choose("accepted")}
                className={buttonClasses}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => choose("declined")}
                className={buttonClasses}
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
