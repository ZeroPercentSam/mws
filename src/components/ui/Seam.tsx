/* 1px gradient hairline between major bands (replaces decorative dividers). */
export default function Seam() {
  return (
    <div
      aria-hidden
      className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"
    />
  );
}
