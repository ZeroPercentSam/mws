"use client";

import { motion } from "motion/react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";
import { fadeInUp, scaleIn, defaultViewport } from "@/lib/animations";

interface InvoiceFacts {
  url: string;
  amountLabel: string;
  totalLabel: string;
  number: string;
  dueLabel: string;
  terms: string;
}

/* ------------------------------------------------------------------ */
/*  Page-local palette: deep-ocean blues, scoped to this proposal only */
/* ------------------------------------------------------------------ */
const BAND = "#07111C";

const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

const heading =
  "font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-extrabold tracking-tight";

/* ------------------------------------------------------------------ */
/*  Wave divider — animated SVG seam between sections                  */
/* ------------------------------------------------------------------ */
function WaveDivider({
  bg,
  fill,
  flip = false,
}: {
  bg: string;
  fill: string;
  flip?: boolean;
}) {
  const wave =
    "M-60,44 C180,84 420,4 720,44 C1020,84 1260,4 1500,44 L1500,90 L-60,90 Z";
  const waveBack =
    "M-60,52 C200,12 460,88 740,48 C1020,8 1280,82 1500,42 L1500,90 L-60,90 Z";
  return (
    <div
      aria-hidden
      className={`relative h-16 md:h-20 overflow-hidden ${flip ? "rotate-180" : ""}`}
      style={{ backgroundColor: bg }}
    >
      {/* Overscan (left -3% / width 106%) so the ±24px drift never exposes the
          svg's clipped edge; whileInView keeps the loop off when offscreen. */}
      <motion.svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-[-3%] h-full w-[106%] opacity-40"
        initial={{ x: 0 }}
        whileInView={{ x: [0, -24, 0] }}
        transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
      >
        <path d={waveBack} style={{ fill }} />
      </motion.svg>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={wave} style={{ fill }} />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SeaGlow — hero backdrop orbs (ocean blues + one sunset orange)     */
/* ------------------------------------------------------------------ */
function SeaGlow() {
  const shared = "absolute rounded-full will-change-transform";
  const gpuStyle: React.CSSProperties = {
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    transform: "translate3d(0,0,0)",
  };
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`${shared} top-1/4 -left-20 w-[350px] h-[350px] md:w-[600px] md:h-[600px] opacity-30`}
        style={{
          background:
            "radial-gradient(circle, rgba(56,130,180,0.35) 0%, rgba(56,130,180,0.08) 40%, transparent 70%)",
          animation: "orb-float-1 20s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
      <div
        className={`${shared} top-1/3 right-0 w-[280px] h-[280px] md:w-[480px] md:h-[480px] opacity-25`}
        style={{
          background:
            "radial-gradient(circle, rgba(30,90,140,0.35) 0%, rgba(30,90,140,0.07) 40%, transparent 70%)",
          animation: "orb-float-2 24s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
      <div
        className={`${shared} bottom-0 left-1/3 w-[320px] h-[320px] md:w-[560px] md:h-[560px] opacity-25`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.30) 0%, rgba(255,107,0,0.06) 40%, transparent 70%)",
          animation: "orb-float-3 26s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compass rose watermark for the letter                              */
/* ------------------------------------------------------------------ */
function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <circle cx="100" cy="100" r="90" strokeWidth="1" />
      <circle cx="100" cy="100" r="70" strokeWidth="0.5" />
      <path d="M100 10v180M10 100h180" strokeWidth="0.5" />
      <path
        d="M100 30 L112 100 L100 170 L88 100 Z M30 100 L100 88 L170 100 L100 112 Z"
        strokeWidth="1"
      />
      <circle cx="100" cy="100" r="6" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Tiny line icons for sitemap tiles & vignettes                      */
/* ------------------------------------------------------------------ */
type IconName =
  | "anchor"
  | "boat"
  | "wine"
  | "whiskey"
  | "sunset"
  | "rings"
  | "heart"
  | "gradcap"
  | "briefcase"
  | "cake"
  | "diamond"
  | "home"
  | "gallery"
  | "star"
  | "faq"
  | "calendar"
  | "bell"
  | "shield"
  | "send";

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  anchor: (
    <>
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v13" />
      <path d="M4 13a8 8 0 0 0 16 0" />
      <path d="M2 12l2 2M22 12l-2 2" />
    </>
  ),
  boat: (
    <>
      <path d="M3 15h18l-3 4H6z" />
      <path d="M7 15V9h6l4 6" />
    </>
  ),
  wine: (
    <>
      <path d="M8 3h8c0 5-2 8-4 8s-4-3-4-8z" />
      <path d="M12 11v8M8 21h8" />
    </>
  ),
  whiskey: (
    <>
      <path d="M6 4h12l-1.5 16h-9z" />
      <path d="M7.2 10h9.6" />
    </>
  ),
  sunset: (
    <>
      <path d="M5 16a7 7 0 0 1 14 0" />
      <path d="M2 16h20M12 4v3M5 8l2 2M19 8l-2 2" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.7-9.3-9A5 5 0 0 1 12 7.6 5 5 0 0 1 21.3 11c-1.8 4.3-9.3 9-9.3 9z" />
  ),
  gradcap: (
    <>
      <path d="M2 9l10-4 10 4-10 4z" />
      <path d="M6 11.5V16c0 1.6 12 1.6 12 0v-4.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V5h6v3" />
    </>
  ),
  cake: (
    <>
      <rect x="4" y="12" width="16" height="8" rx="1" />
      <path d="M4 15.5c2 1.5 4-1.5 6 0s4-1.5 6 0 4 0 4 0M12 12V8" />
    </>
  ),
  diamond: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  gallery: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M3 17l5-4 4 3 5-5 4 4" />
    </>
  ),
  star: (
    <path d="M12 3l2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8z" />
  ),
  faq: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 16.8v.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  send: (
    <>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </>
  ),
};

function TileIcon({
  name,
  className = "w-4 h-4",
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
      {ICON_PATHS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Booking-approval flow diagram                                      */
/* ------------------------------------------------------------------ */
const FLOW_STEPS: { title: string; caption: string; icon: IconName }[] = [
  {
    title: "Guest requests dates",
    caption: "From any boat, experience, or event page — dates, party size, occasion.",
    icon: "calendar",
  },
  {
    title: "You approve it",
    caption: "One tap in your portal. Every booking needs your sign-off — final say is always yours.",
    icon: "shield",
  },
  {
    title: "Invoice sends itself",
    caption: "The moment you approve, the guest gets a payment link. No chasing, no back-and-forth.",
    icon: "send",
  },
  {
    title: "Booked & notified",
    caption: "Calendar locks the dates, and custom alerts go out to you and your guest.",
    icon: "bell",
  },
];

function FlowNode({
  index,
  icon,
  isLast,
}: {
  index: number;
  icon: IconName;
  isLast: boolean;
}) {
  return (
    <div className="relative w-12 h-12 shrink-0">
      <motion.div
        variants={scaleIn}
        transition={{ duration: 0.45, ease: EASE, delay: 0.35 * index }}
        className="relative z-10 w-12 h-12 rounded-full bg-[#0B1B2B] border border-[rgba(120,180,220,0.25)] flex items-center justify-center text-accent"
      >
        <TileIcon name={icon} className="w-5 h-5" />
      </motion.div>
      {isLast && (
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 1 },
            visible: {
              opacity: [0.7, 0],
              scale: [1, 1.9],
              transition: { duration: 1.1, delay: 1.75, repeat: 2, ease: "easeOut" },
            },
          }}
          className="absolute inset-0 rounded-full border border-accent"
        />
      )}
    </div>
  );
}

function FlowCaption({ index, step }: { index: number; step: (typeof FLOW_STEPS)[number] }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.5, ease: EASE, delay: 0.35 * index + 0.15 }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
        Step {index + 1}
      </p>
      <h4 className="mt-1 font-semibold text-text-primary">{step.title}</h4>
      <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">{step.caption}</p>
    </motion.div>
  );
}

function FlowDiagram() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {/* Desktop: horizontal stepper */}
      <div className="hidden md:block relative">
        <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-white/10" />
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1.8, ease: EASE } },
          }}
          className="absolute top-6 left-[12.5%] right-[12.5%] h-px origin-left bg-gradient-to-r from-accent/40 via-accent to-accent-light"
        />
        <div className="grid grid-cols-4 gap-8">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <FlowNode index={i} icon={step.icon} isLast={i === FLOW_STEPS.length - 1} />
              <div className="mt-5">
                <FlowCaption index={i} step={step} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical rail */}
      <div className="md:hidden relative">
        <div className="absolute left-6 top-6 bottom-6 w-px bg-white/10" />
        <motion.div
          variants={{
            hidden: { scaleY: 0 },
            visible: { scaleY: 1, transition: { duration: 1.8, ease: EASE } },
          }}
          className="absolute left-6 top-6 bottom-6 w-px origin-top bg-gradient-to-b from-accent/40 via-accent to-accent-light"
        />
        <div className="flex flex-col gap-10">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-5">
              <FlowNode index={i} icon={step.icon} isLast={i === FLOW_STEPS.length - 1} />
              <FlowCaption index={i} step={step} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature vignettes (mini UI illustrations)                          */
/* ------------------------------------------------------------------ */
const BLOCKED_CELLS = [9, 10, 11, 17, 24];

function MiniCalendar() {
  return (
    <div className="rounded-lg border border-border bg-[#0B0F14] p-3">
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          June
        </span>
        <span className="text-[10px] text-text-muted">Owner view</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="relative h-3.5 rounded-[3px] bg-white/5">
            {BLOCKED_CELLS.includes(i) && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.4 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.3,
                      ease: EASE,
                      delay: 0.4 + BLOCKED_CELLS.indexOf(i) * 0.12,
                    },
                  },
                }}
                className="absolute inset-0 rounded-[3px] bg-accent/80"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniPortal() {
  return (
    <div className="rounded-lg border border-border bg-[#0B0F14] p-3 space-y-2">
      <div className="flex items-center justify-between gap-2 rounded-md bg-white/5 px-3 py-2.5">
        <div className="min-w-0">
          <p className="text-xs font-medium text-text-primary truncate">
            Wine Tasting — Jun 21
          </p>
          <p className="text-[10px] text-text-muted">44′ Yacht · 8 guests</p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <motion.span
            variants={{
              hidden: { scale: 1 },
              visible: {
                scale: [1, 1.08, 1, 1.08, 1],
                transition: { duration: 1.4, delay: 0.7 },
              },
            }}
            className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-white"
          >
            Approve
          </motion.span>
          <span className="rounded-full border border-border px-2.5 py-1 text-[10px] text-text-secondary">
            Decline
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 rounded-md bg-white/[0.03] px-3 py-2.5 opacity-60">
        <div className="min-w-0">
          <p className="text-xs font-medium text-text-primary truncate">
            Sunset Cruise — Jun 27
          </p>
          <p className="text-[10px] text-text-muted">33′ Boat · 4 guests</p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-[10px] text-text-secondary shrink-0">
          Pending
        </span>
      </div>
    </div>
  );
}

function MiniInvoice() {
  return (
    <div className="rounded-lg border border-border bg-[#0B0F14] p-3 flex items-center gap-4">
      <div className="w-20 shrink-0 rounded-md bg-white/5 p-2.5 space-y-1.5">
        <div className="h-1.5 w-3/4 rounded bg-white/20" />
        <div className="h-1.5 w-1/2 rounded bg-white/10" />
        <div className="h-1.5 w-2/3 rounded bg-white/10" />
        <div className="h-2 w-1/2 rounded bg-accent/70" />
      </div>
      <svg viewBox="0 0 120 40" fill="none" className="flex-1 h-10">
        {/* opacity reveal (not pathLength — motion's pathLength rewrites
            stroke-dasharray and would erase the dash pattern) */}
        <motion.path
          d="M4 20 H78"
          stroke="rgba(255,107,0,0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.6, ease: EASE, delay: 0.4 },
            },
          }}
        />
        <motion.g
          variants={{
            hidden: { opacity: 0, x: -12 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, ease: EASE, delay: 0.9 },
            },
          }}
        >
          <path
            d="M115 8 L88 22 L98 25 L101 33 L106 26 Z"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{
              stroke: "var(--color-accent-light)",
              fill: "var(--color-accent-glow)",
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

function MiniEnvelope() {
  return (
    <div className="rounded-lg border border-border bg-[#0B0F14] p-3 flex items-center gap-4">
      <div className="relative shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="w-12 h-12 text-text-secondary"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <motion.path
            d="M2 7l10 7 10-7"
            style={{ stroke: "var(--color-accent)" }}
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.7, ease: EASE, delay: 0.5 },
              },
            }}
          />
        </svg>
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.4, ease: EASE, delay: 1.1 },
            },
          }}
          className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white"
        >
          <TileIcon name="bell" className="w-3 h-3" />
        </motion.span>
      </div>
      <div className="min-w-0">
        <p className="text-xs text-text-muted">From:</p>
        <p className="text-sm font-semibold text-text-primary truncate">
          Your Charter Brand &lt;bookings@yourboats.com&gt;
        </p>
        <p className="mt-1 text-[11px] text-text-secondary">
          Your name on every email — not ours.
        </p>
      </div>
    </div>
  );
}

const FEATURES: { title: string; caption: string; vignette: React.ReactNode }[] = [
  {
    title: "Block off your days",
    caption:
      "Taking the boats out yourselves? One tap and those dates are gone from the public calendar.",
    vignette: <MiniCalendar />,
  },
  {
    title: "Approval portal",
    caption:
      "Every request lands in your portal. Nothing is confirmed until one of you says so.",
    vignette: <MiniPortal />,
  },
  {
    title: "Auto-invoice on approval",
    caption:
      "Approve a booking and the invoice link is already in the guest's inbox. No chasing payments.",
    vignette: <MiniInvoice />,
  },
  {
    title: "White-label everything",
    caption:
      "Confirmations, invoices, reminders, custom alerts — all branded as you, end to end.",
    vignette: <MiniEnvelope />,
  },
];

/* ------------------------------------------------------------------ */
/*  Fleet cards                                                        */
/* ------------------------------------------------------------------ */
function FleetCard({
  img,
  alt,
  title,
  tagline,
  chips,
}: {
  img: string;
  alt: string;
  title: string;
  tagline: string;
  chips: string[];
}) {
  return (
    <GlowCard className="group h-full">
      <div className="relative h-60 md:h-72 overflow-hidden rounded-t-[calc(var(--radius-card)-1px)]">
        {/* Gradient fallback (also the blend bed under the photo) */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #0A2236 0%, var(--color-bg-primary) 80%)" }}
        />
        <Image
          src={img}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(180deg, transparent, var(--color-bg-card))" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      </div>
      <div className="p-6 md:p-8">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-text-secondary">{tagline}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-text-secondary"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Sitemap showcase                                                   */
/* ------------------------------------------------------------------ */
const SITE_GROUPS: { group: string; pages: { label: string; icon: IconName }[] }[] = [
  {
    group: "The Boats",
    pages: [
      { label: "The 44′ Yacht", icon: "anchor" },
      { label: "The 33′ Boat", icon: "boat" },
    ],
  },
  {
    group: "Experiences",
    pages: [
      { label: "Wine Tasting", icon: "wine" },
      { label: "Whiskey Tasting", icon: "whiskey" },
      { label: "Sunset Cruise", icon: "sunset" },
    ],
  },
  {
    group: "Events",
    pages: [
      { label: "Weddings", icon: "rings" },
      { label: "Honeymoons", icon: "heart" },
      { label: "Graduations", icon: "gradcap" },
      { label: "Corporate Events", icon: "briefcase" },
      { label: "Birthdays", icon: "cake" },
      { label: "Proposals & Engagements", icon: "diamond" },
    ],
  },
  {
    group: "Essentials",
    pages: [
      { label: "Home", icon: "home" },
      { label: "Gallery", icon: "gallery" },
      { label: "Reviews", icon: "star" },
      { label: "FAQ", icon: "faq" },
      { label: "Request a Booking", icon: "calendar" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Timeline                                                           */
/* ------------------------------------------------------------------ */
const TIMELINE: { days: string; title: string; detail: string }[] = [
  {
    days: "Days 1–2",
    title: "Design & brand",
    detail: "Look, feel, and voice — built around your boats, not a template.",
  },
  {
    days: "Days 3–5",
    title: "Site + booking platform",
    detail: "Every page, the calendar, the approval portal, automatic invoicing.",
  },
  {
    days: "Day 6",
    title: "Emails, alerts & content",
    detail: "White-labeled emails, custom notifications, photos and copy in place.",
  },
  {
    days: "Day 7",
    title: "Launch & walkthrough",
    detail: "We go live, and I walk you both through running it from your phones.",
  },
];

/* ------------------------------------------------------------------ */
/*  Investment checklist                                               */
/* ------------------------------------------------------------------ */
const CHECKLIST = [
  "Complete website — every page in the sitemap above",
  "Booking platform with owner approval portal",
  "Automatic invoicing the moment you approve",
  "White-labeled emails + custom client alerts",
  "Designed, built, and live in one week",
];

/* ------------------------------------------------------------------ */
/*  Pay button                                                         */
/* ------------------------------------------------------------------ */
function PayButton({ invoice }: { invoice: InvoiceFacts }) {
  return (
    <motion.a
      href={invoice.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ boxShadow: "0 0 40px rgba(255,107,0,0.25)" }}
      whileInView={{
        boxShadow: [
          "0 0 40px rgba(255,107,0,0.25)",
          "0 0 80px rgba(255,107,0,0.5)",
          "0 0 40px rgba(255,107,0,0.25)",
        ],
      }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        boxShadow: { duration: 2.2, repeat: 2, ease: "easeInOut" },
        default: { duration: 0.2, ease: "easeOut" },
      }}
      className="inline-flex items-center gap-3 rounded-[var(--radius-button)] bg-gradient-to-r from-accent to-accent-light px-10 py-5 text-lg font-bold text-white md:px-14"
    >
      Pay Invoice Now — {invoice.amountLabel}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ProposalClient({ invoice }: { invoice: InvoiceFacts }) {
  return (
    <div>
      {/* ---------------------------------------------------------- */}
      {/* 1 · Hero                                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-32 md:pt-44 pb-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--color-bg-primary) 0%, #071321 55%, #0A2236 100%)",
          }}
        />
        <SeaGlow />
        <SectionWrapper className="!py-0 relative z-10">
          <div className="max-w-4xl">
            <FadeInWhenVisible>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Modern Web Systems · Private Proposal · June 10, 2026
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.1}>
              <p className="mt-4 text-text-secondary text-lg">
                Prepared for <span className="text-text-primary font-semibold">Victor &amp; Ian</span>
              </p>
            </FadeInWhenVisible>
            <div className="mt-4">
              <AnimatedHeading
                text="Your fleet, booked while you sleep."
                as="h1"
                className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
                accentLastPeriod
              />
            </div>
            <FadeInWhenVisible delay={0.35}>
              <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                A complete website and booking platform for your 44-foot yacht and
                33-foot boat — guests request, you approve, invoices send
                themselves. Live in one week.
              </p>
            </FadeInWhenVisible>
            <StaggerChildren className="mt-8 flex flex-wrap gap-3" stagger={0.1}>
              {["1-Week Build", "2 Vessels, One Brand", "Every Booking, Your Approval"].map(
                (chip) => (
                  <StaggerItem key={chip}>
                    <span className="inline-block rounded-full border border-[rgba(120,180,220,0.25)] bg-white/[0.04] px-4 py-1.5 text-sm text-text-secondary">
                      {chip}
                    </span>
                  </StaggerItem>
                ),
              )}
            </StaggerChildren>
            <FadeInWhenVisible delay={0.55} className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary" href="#investment">
                View Investment &amp; Pay
              </Button>
              <Button variant="secondary" href="#platform">
                See How It Works
              </Button>
            </FadeInWhenVisible>
          </div>
        </SectionWrapper>
        <div className="relative z-10 mt-16 md:mt-24">
          <WaveDivider bg="transparent" fill="var(--color-bg-primary)" />
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* 2 · Executive summary — a note from Sam                     */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper className="!pt-12 md:!pt-16">
        <div className="max-w-3xl mx-auto">
          <FadeInWhenVisible>
            <GlowCard>
              <div className="relative p-8 md:p-12 overflow-hidden">
                <CompassRose className="absolute -right-10 -top-10 w-64 h-64 text-white opacity-[0.04]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Executive Summary
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold tracking-tight">
                  Victor, Ian —
                </h2>
                <div className="mt-5 space-y-4 text-text-secondary leading-relaxed md:text-lg">
                  <p>
                    I had a lot of fun meeting you both the other day. Not every
                    conversation starts with a website and drifts into wine
                    tastings, whiskey, and a 44-foot yacht — I left genuinely
                    excited about what we can build together.
                  </p>
                  <p>
                    Here&rsquo;s the plan: I&rsquo;m going to design and build your complete
                    platform — the website, the booking engine, the approval
                    portal, the automated invoicing, all of it — and have it
                    finished{" "}
                    <span className="relative inline-block font-semibold text-text-primary">
                      within one week
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] origin-left bg-accent"
                      />
                    </span>
                    . You&rsquo;ll have final say on every booking, invoices that send
                    themselves, and a brand that looks as good online as your
                    boats look on the water.
                  </p>
                  <p>
                    And once we&rsquo;re live — I&rsquo;m holding you both to that boat day.
                    Here&rsquo;s to this being the first of many ventures together.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-border" />
                  <div className="text-right">
                    <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary">
                      — Sam
                    </p>
                    <p className="text-sm text-text-muted">Modern Web Systems</p>
                  </div>
                </div>
              </div>
            </GlowCard>
          </FadeInWhenVisible>
        </div>
      </SectionWrapper>

      {/* ---------------------------------------------------------- */}
      {/* 3 · The fleet                                               */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper>
        <FadeInWhenVisible>
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            The Fleet
          </span>
        </FadeInWhenVisible>
        <div className="mt-3 max-w-2xl">
          <AnimatedHeading text="Two vessels. One seamless brand." className={heading} />
        </div>
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.2}>
          <StaggerItem>
            <FleetCard
              img="/invoices/victor-ian/schaefer-450.jpg"
              alt="The 44-foot Schaefer 450 flybridge with navy hull at sea"
              title="The 44′ Yacht"
              tagline="Your flagship — charters, celebrations, and full-day events on the water."
              chips={["Schaefer 450", "Dedicated page", "Photo gallery", "Live booking calendar"]}
            />
          </StaggerItem>
          <StaggerItem>
            <FleetCard
              img="/invoices/victor-ian/schaefer-v33.jpg"
              alt="The 33-foot Schaefer V33 day boat on calm morning water"
              title="The 33′ Boat"
              tagline="Nimble and quick — day trips, sunset runs, and intimate outings."
              chips={["Schaefer V33", "Dedicated page", "Photo gallery", "Live booking calendar"]}
            />
          </StaggerItem>
        </StaggerChildren>
      </SectionWrapper>

      {/* ---------------------------------------------------------- */}
      {/* 4 · The platform                                            */}
      {/* ---------------------------------------------------------- */}
      <WaveDivider bg="var(--color-bg-primary)" fill={BAND} />
      <div id="platform" style={{ backgroundColor: BAND }}>
        <SectionWrapper className="!py-20 md:!py-28">
          <div className="text-center max-w-3xl mx-auto">
            <FadeInWhenVisible>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                The Platform
              </span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text="Your boats. Your calendar. Your final say."
                className={heading}
              />
            </div>
            <FadeInWhenVisible delay={0.2}>
              <p className="mt-5 text-text-secondary md:text-lg leading-relaxed">
                Nothing gets on the water without your approval — and once you
                approve, the platform does the rest.
              </p>
            </FadeInWhenVisible>
          </div>
          <div className="mt-16 md:mt-20">
            <FlowDiagram />
          </div>
          <StaggerChildren className="mt-16 md:mt-20 grid gap-6 md:grid-cols-2" stagger={0.12}>
            {FEATURES.map((feature) => (
              <StaggerItem key={feature.title} className="min-w-0">
                <GlowCard className="h-full">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="p-6 md:p-8"
                  >
                    {feature.vignette}
                    <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-text-secondary leading-relaxed">
                      {feature.caption}
                    </p>
                  </motion.div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </SectionWrapper>
      </div>
      <WaveDivider bg="var(--color-bg-primary)" fill={BAND} flip />

      {/* ---------------------------------------------------------- */}
      {/* 5 · The website                                             */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper id="website">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <FadeInWhenVisible>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                The Website
              </span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text="Every page your guests will ever need."
                className={heading}
              />
            </div>
          </div>
          <FadeInWhenVisible delay={0.2}>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              16 pages, designed &amp; built
            </span>
          </FadeInWhenVisible>
        </div>
        <div className="mt-12 space-y-10">
          {SITE_GROUPS.map((group) => (
            <div key={group.group}>
              <FadeInWhenVisible>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {group.group}
                </h3>
              </FadeInWhenVisible>
              <StaggerChildren
                className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
                stagger={0.05}
              >
                {group.pages.map((page) => (
                  <StaggerItem key={page.label}>
                    <div className="flex h-full items-center gap-2.5 rounded-lg border border-border bg-bg-card px-4 py-3.5 transition-all duration-200 hover:border-border-hover hover:-translate-y-0.5">
                      <span className="text-accent shrink-0">
                        <TileIcon name={page.icon} />
                      </span>
                      <span className="text-sm text-text-primary">{page.label}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          ))}
        </div>
        <FadeInWhenVisible delay={0.2} className="mt-10">
          <p className="text-sm text-text-muted">
            Every experience and event page doubles as a landing page — built to
            rank locally and convert visitors into booking requests.
          </p>
        </FadeInWhenVisible>
      </SectionWrapper>

      {/* ---------------------------------------------------------- */}
      {/* 6 · Timeline                                                */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper>
        <div className="text-center max-w-3xl mx-auto">
          <FadeInWhenVisible>
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              The Timeline
            </span>
          </FadeInWhenVisible>
          <div className="mt-3">
            <AnimatedHeading text="Dock to launch in seven days." className={heading} />
          </div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-14 md:mt-16"
        >
          {/* Desktop connector */}
          <div className="hidden md:block absolute top-2 left-[12.5%] right-[12.5%] h-px bg-white/10" />
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1.6, ease: EASE } },
            }}
            className="hidden md:block absolute top-2 left-[12.5%] right-[12.5%] h-px origin-left bg-gradient-to-r from-accent/30 via-accent/80 to-accent"
          />
          <div className="grid gap-8 md:grid-cols-4">
            {TIMELINE.map((milestone, i) => (
              <motion.div
                key={milestone.days}
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 * i }}
                className="relative md:text-center"
              >
                <motion.span
                  variants={scaleIn}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.3 * i }}
                  className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-accent bg-bg-primary"
                />
                <div className="md:pt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                    {milestone.days}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-bold">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {milestone.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <FadeInWhenVisible delay={0.4} className="mt-12 text-center">
          <p className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold text-accent">
            Then: boat day.
          </p>
        </FadeInWhenVisible>
      </SectionWrapper>

      {/* ---------------------------------------------------------- */}
      {/* 7 + 8 · Investment + Pay                                    */}
      {/* ---------------------------------------------------------- */}
      <WaveDivider bg="var(--color-bg-primary)" fill={BAND} />
      <div
        id="investment"
        style={{
          background: `linear-gradient(180deg, ${BAND} 0%, #0A2236 45%, var(--color-bg-primary) 100%)`,
        }}
      >
        <SectionWrapper className="!py-20 md:!py-28">
          <div className="text-center max-w-3xl mx-auto">
            <FadeInWhenVisible>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                The Investment
              </span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading text="Simple, all-in pricing." className={heading} />
            </div>
          </div>

          <div className="mt-12 max-w-xl mx-auto">
            <FadeInWhenVisible>
              <GlowCard>
                <div className="p-8 md:p-12 text-center">
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={scaleIn}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="font-[family-name:var(--font-heading)] text-6xl md:text-7xl font-extrabold tracking-tight"
                  >
                    {invoice.totalLabel}
                  </motion.p>
                  <p className="mt-2 text-text-secondary">
                    Complete build — total
                  </p>
                  <p className="mt-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                    {invoice.terms}
                  </p>
                  <div className="my-8 h-px bg-border" />
                  <ul className="space-y-4 text-left">
                    {CHECKLIST.map((item, i) => (
                      <li key={item} className="flex items-start gap-3">
                        {/* inline check: delay must live in the variant —
                            drawPath's embedded transition ignores the prop */}
                        <motion.svg
                          initial="hidden"
                          whileInView="visible"
                          viewport={defaultViewport}
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="none"
                          className="mt-0.5 shrink-0 text-accent"
                        >
                          <motion.path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={{
                              hidden: { pathLength: 0, opacity: 0 },
                              visible: {
                                pathLength: 1,
                                opacity: 1,
                                transition: {
                                  duration: 0.6,
                                  ease: EASE,
                                  delay: i * 0.12,
                                },
                              },
                            }}
                          />
                        </motion.svg>
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2} className="mt-6">
              <div className="rounded-[var(--radius-card)] border border-border bg-white/[0.03] px-6 py-5 text-center">
                <p className="text-text-secondary">
                  <span className="font-semibold text-text-primary">
                    + $100/month upkeep
                  </span>{" "}
                  — website, platform, hosting, updates: everything, handled.
                </p>
              </div>
            </FadeInWhenVisible>
          </div>

          <div className="mt-14 md:mt-16 text-center">
            <FadeInWhenVisible>
              <PayButton invoice={invoice} />
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="mt-5 text-sm text-text-muted">
                Secure checkout via Stripe · Invoice {invoice.number} ·{" "}
                {invoice.amountLabel} due {invoice.dueLabel} — remaining $1,000
                invoiced on completion
              </p>
            </FadeInWhenVisible>
          </div>
        </SectionWrapper>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* 9 · Footer note                                             */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper className="!py-16 md:!py-20">
        <FadeInWhenVisible className="text-center">
          <p className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold">
            Looking forward to the boat day. <span className="text-accent">— Sam</span>
          </p>
          <p className="mt-4 text-sm text-text-muted">
            This proposal is private to Victor &amp; Ian · Prepared June 10, 2026 ·
            Modern Web Systems
          </p>
        </FadeInWhenVisible>
      </SectionWrapper>

      {/* Print: hide site chrome, keep the document */}
      <style>{`@media print {
        nav, footer { display: none !important; }
        * { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
        body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      }`}</style>
    </div>
  );
}
