/**
 * Designed gradient panel used wherever a blog post needs a visual block
 * (listing cards, related-article thumbnails). Replaces the old baked-text
 * OG JPGs: a per-post gradient wash + fine grid + corner sheen + bottom depth,
 * so the live card/post title is the only text on screen.
 */
interface GradientThumbProps {
  gradient: string;
  className?: string;
}

const GRID =
  "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)," +
  "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)";

export default function GradientThumb({
  gradient,
  className = "",
}: GradientThumbProps) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      {/* Per-post gradient base */}
      <div className="absolute inset-0" style={{ background: gradient }} />
      {/* Fine grid texture */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{ backgroundImage: GRID, backgroundSize: "32px 32px" }}
      />
      {/* Top-left light sheen for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 0% 0%, rgba(255,255,255,0.14), transparent 55%)",
        }}
      />
      {/* Bottom shade so overlaid pills/edges read cleanly */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}
