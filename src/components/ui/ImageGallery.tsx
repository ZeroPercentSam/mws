"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ImageGalleryProps {
  /** Array of CSS gradient strings for abstract visuals */
  gradients: string[];
  labels?: string[];
}

export default function ImageGallery({ gradients, labels }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gradients.map((gradient, i) => (
          <motion.button
            key={i}
            layoutId={`gallery-${i}`}
            onClick={() => setSelectedIndex(i)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border border-border hover:border-border-hover transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            style={{
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: gradient }}
            />
            {labels?.[i] && (
              <div className="absolute bottom-2 left-3 right-3">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/60">
                  {labels[i]}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 bg-bg-primary/90 backdrop-blur-md z-50 cursor-pointer"
            />

            {/* Expanded view */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                layoutId={`gallery-${selectedIndex}`}
                className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-border"
                style={{
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="w-full h-full"
                  style={{ background: gradients[selectedIndex] }}
                />
              </motion.div>

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 text-text-muted text-sm"
              >
                Click anywhere to close
              </motion.p>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
