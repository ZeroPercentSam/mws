"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface ImageGalleryProps {
  /** Array of CSS gradient strings for abstract visuals (fallback) */
  gradients: string[];
  labels?: string[];
  /** Array of real screenshot paths (e.g. /work/screenshots/slug/hero.jpg) */
  screenshots?: string[];
}

export default function ImageGallery({ gradients, labels, screenshots }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const hasScreenshots = screenshots && screenshots.length > 0;

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
            {hasScreenshots && screenshots[i] ? (
              <Image
                src={screenshots[i]}
                alt={labels?.[i] || `Project screenshot ${i + 1}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: gradient }}
              />
            )}
            {labels?.[i] && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-2 px-3">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80">
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
                className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-border"
                style={{
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                {hasScreenshots && screenshots[selectedIndex] ? (
                  <Image
                    src={screenshots[selectedIndex]}
                    alt={labels?.[selectedIndex] || `Project screenshot ${selectedIndex + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="90vw"
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: gradients[selectedIndex] }}
                  />
                )}
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
