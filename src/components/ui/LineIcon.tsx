/* Shared stroke-icon set (proposal TileIcon pattern, promoted from the
   homepage). Add paths here rather than inlining one-off SVGs. */
export type IconName =
  | "browser"
  | "clock"
  | "trend"
  | "search"
  | "blueprint"
  | "build"
  | "rocket"
  | "arrow"
  | "target"
  | "shield"
  | "send";

const ICONS: Record<IconName, React.ReactNode> = {
  browser: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M6 7h.01M8.5 7h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 7-8" />
      <path d="M14 7h6v6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M21 21l-5-5" />
    </>
  ),
  blueprint: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M10 10v10" />
    </>
  ),
  build: (
    <>
      <path d="M14.5 4.5a4 4 0 0 0-5.6 5L4 14.4V20h5.6l4.9-4.9a4 4 0 0 0 5-5.6L16 13l-3-3z" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 16c5-3 7-8 7-12-4 0-9 2-12 7l-3 1 4 4 1 4z" />
      <path d="M6 15l-2 5 5-2" />
      <circle cx="14" cy="9" r="1.4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  send: (
    <>
      <path d="M21 3L10 14" />
      <path d="M21 3l-7 18-3.5-7.5L3 10l18-7z" />
    </>
  ),
};

export default function LineIcon({
  name,
  className = "w-5 h-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {ICONS[name]}
    </svg>
  );
}
