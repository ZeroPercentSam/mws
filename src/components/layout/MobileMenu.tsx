"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="md:hidden overflow-hidden border-b border-border"
          style={{
            backgroundColor: "rgba(5, 5, 5, 0.95)",
            WebkitBackdropFilter: "blur(24px)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`text-lg font-medium transition-colors duration-200 block py-2 ${
                    pathname === link.href
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.3 }}
              className="pt-2"
            >
              <Button href="/contact" variant="primary" className="text-sm w-full">
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
