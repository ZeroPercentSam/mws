// Visual constants of the homepage design language, shared by every page.
// Class strings + band colors + the service/category tint palettes.

export const eyebrowCls =
  "text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent";
export const chipCls =
  "rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs";
export const headingCls =
  "font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-extrabold tracking-tight";

export const BAND_WARM = "#0D0703";

/* Blueprint grid texture for warm bands — static, zero cost (md+ only;
   mobile never pays for the texture) */
export const BLUEPRINT: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 48px)",
  maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
};

export const OCEAN_BG =
  "linear-gradient(180deg, var(--color-bg-primary) 0%, #071321 35%, #0A2236 100%)";
export const OCEAN_CELL = "#0A1622";
export const OCEAN_CELL_HOVER = "#0E1C2C";
export const OCEAN_BORDER = "rgba(120,180,220,0.2)";

export const SERVICE_TINTS = {
  websites: "#FF6B00",
  ai: "#4A9ECB",
  automation: "#C9A961",
} as const;

export const WORK_CATEGORY_TINTS = {
  websites: "#FF6B00",
  ecommerce: "#C9A961",
  platforms: "#4A9ECB",
} as const;

export const BLOG_TINTS = {
  websites: "#FF6B00",
  ai: "#4A9ECB",
  automation: "#C9A961",
  strategy: "#7E8CA0",
} as const;
