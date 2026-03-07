"use client";

/**
 * Animated gradient orbs for the hero background.
 *
 * iOS Safari flickers badly when CSS `filter: blur()` is combined with
 * keyframe animations — it forces constant CPU repainting instead of
 * GPU compositing. The fix: use wider, softer radial-gradients that
 * look blurred without needing the filter, and force GPU layers with
 * `will-change` + `translate3d` + `backface-visibility: hidden`.
 *
 * On mobile we also shrink the orbs and slow the animation to reduce
 * the compositing workload.
 */
export default function OrbBackground() {
  const shared =
    "absolute rounded-full will-change-transform" as const;

  const gpuStyle: React.CSSProperties = {
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    transform: "translate3d(0,0,0)",
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orb — orange */}
      <div
        className={`${shared} top-1/4 left-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-25`}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 0, 0.35) 0%, rgba(255, 107, 0, 0.08) 40%, transparent 70%)",
          animation: "orb-float-1 18s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
      {/* Secondary orb — warm orange */}
      <div
        className={`${shared} top-1/2 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] opacity-20`}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 133, 51, 0.3) 0%, rgba(255, 133, 51, 0.06) 40%, transparent 70%)",
          animation: "orb-float-2 22s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
      {/* Tertiary orb — subtle amber */}
      <div
        className={`${shared} bottom-1/3 left-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] opacity-15`}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 160, 50, 0.25) 0%, rgba(255, 160, 50, 0.05) 40%, transparent 70%)",
          animation: "orb-float-3 25s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
    </div>
  );
}
