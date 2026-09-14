"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";
import { EASE, fadeInUp, scaleIn, defaultViewport } from "@/lib/animations";
import { eyebrowCls, headingCls } from "@/lib/design";

interface InvoiceFacts {
  url: string;
  totalLabel: string;
  depositLabel: string;
  remainingLabel: string;
  number: string;
  dueLabel: string;
  terms: string;
}

export interface ProposalFacts {
  preparedFor: string;
  date: string;
  ref: string;
  invoice: InvoiceFacts;
  upkeepLabel: string;
}

/* ------------------------------------------------------------------ */
/*  Page-local palette: Patriot navy + brand red, scoped to this page. */
/*  The site accent (orange) stays on buttons, eyebrows and rules.     */
/* ------------------------------------------------------------------ */
const BAND = "#070D1C";
const NAVY_BORDER = "rgba(120,150,220,0.22)";
const CELL = "#0A1120";

/* Result colours — shared by the inspection pills and checklist dots. */
type Status = "pass" | "partial" | "fail";
const STATUS: Record<Status, { label: string; fg: string; bg: string; bd: string }> = {
  pass: { label: "Pass", fg: "#6FD9A2", bg: "rgba(63,191,127,0.12)", bd: "rgba(63,191,127,0.35)" },
  partial: { label: "Partial", fg: "#F0BF5A", bg: "rgba(224,163,58,0.12)", bd: "rgba(224,163,58,0.35)" },
  fail: { label: "Fail", fg: "#FF8A8A", bg: "rgba(230,51,41,0.14)", bd: "rgba(230,51,41,0.40)" },
};

/* ------------------------------------------------------------------ */
/*  Peak divider — a chromatogram seam between sections                */
/*  (same role as the wave on the Victor & Ian page, lab-appropriate)  */
/* ------------------------------------------------------------------ */
function PeakDivider({
  bg,
  fill,
  flip = false,
}: {
  bg: string;
  fill: string;
  flip?: boolean;
}) {
  const front =
    "M-60,72 L120,72 C160,72 170,32 200,32 C230,32 240,72 280,72 L520,72 C556,72 566,16 600,16 C634,16 644,72 680,72 L900,72 C936,72 946,42 980,42 C1014,42 1024,72 1060,72 L1500,72 L1500,90 L-60,90 Z";
  const back =
    "M-60,76 L260,76 C300,76 310,40 340,40 C370,40 380,76 420,76 L760,76 C800,76 810,26 845,26 C880,26 890,76 930,76 L1200,76 C1240,76 1250,50 1285,50 C1320,50 1330,76 1370,76 L1500,76 L1500,90 L-60,90 Z";
  return (
    <div
      aria-hidden
      className={`relative h-16 md:h-20 overflow-hidden ${flip ? "rotate-180" : ""}`}
      style={{ backgroundColor: bg }}
    >
      {/* Overscan (left -3% / width 106%) so the ±24px drift never exposes
          the svg's clipped edge; whileInView keeps the loop off when offscreen. */}
      <motion.svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-[-3%] h-full w-[106%] opacity-40"
        initial={{ x: 0 }}
        whileInView={{ x: [0, -24, 0] }}
        transition={{ duration: 13, ease: "easeInOut", repeat: Infinity }}
      >
        <path d={back} style={{ fill }} />
      </motion.svg>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={front} style={{ fill }} />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LabGlow — hero backdrop orbs (Patriot navy + brand red + accent)   */
/* ------------------------------------------------------------------ */
function LabGlow() {
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
            "radial-gradient(circle, rgba(16,43,145,0.45) 0%, rgba(16,43,145,0.10) 40%, transparent 70%)",
          animation: "orb-float-1 20s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
      <div
        className={`${shared} top-1/3 right-0 w-[280px] h-[280px] md:w-[480px] md:h-[480px] opacity-25`}
        style={{
          background:
            "radial-gradient(circle, rgba(230,51,41,0.30) 0%, rgba(230,51,41,0.06) 40%, transparent 70%)",
          animation: "orb-float-2 24s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
      <div
        className={`${shared} bottom-0 left-1/3 w-[320px] h-[320px] md:w-[560px] md:h-[560px] opacity-20`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.28) 0%, rgba(255,107,0,0.05) 40%, transparent 70%)",
          animation: "orb-float-3 26s ease-in-out infinite",
          ...gpuStyle,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Peptide watermark for the letter (replaces the V&I compass rose)   */
/* ------------------------------------------------------------------ */
function MoleculeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path d="M100 26 L164 63 L164 137 L100 174 L36 137 L36 63 Z" strokeWidth="1" />
      <path d="M100 56 L138 78 L138 122 L100 144 L62 122 L62 78 Z" strokeWidth="0.5" />
      <path d="M100 26 L100 56M164 63 L138 78M164 137 L138 122M100 174 L100 144M36 137 L62 122M36 63 L62 78" strokeWidth="0.5" />
      <path d="M18 100 L36 100M164 100 L182 100" strokeWidth="1" />
      <circle cx="18" cy="100" r="5" strokeWidth="1" />
      <circle cx="182" cy="100" r="5" strokeWidth="1" />
      <circle cx="100" cy="100" r="7" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Tiny line icons                                                    */
/* ------------------------------------------------------------------ */
type IconName = "userPlus" | "card" | "truck" | "vial" | "search" | "mail" | "check";

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  userPlus: (
    <>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M18 6v6M15 9h6" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6 14.5h4" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 7h11v9h-11z" />
      <path d="M13.5 10.5H18l3 3V16h-7.5" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  vial: (
    <>
      <path d="M9 2.5h6" />
      <path d="M10 2.5v13a2 2 0 0 0 4 0v-13" />
      <path d="M10 11.5h4" />
      <path d="M12 19.5v2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 7.5l9.5 6.5 9.5-6.5" />
    </>
  ),
  check: <path d="M5 13l4 4L19 7" />,
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
/*  Section 3 · The inspection                                         */
/* ------------------------------------------------------------------ */
const INSPECTION: { title: string; result: string; status: Status }[] = [
  {
    title: "Card payments",
    result:
      "14 approved NMI transactions since 5 September, with address and CVV checks on. The three declines were the card issuer's, not the site.",
    status: "pass",
  },
  {
    title: "Order → ShipStation → tracking",
    result:
      "Every paid order exported within the hour, USPS tracking written back automatically, and the shipped email sent with it.",
    status: "pass",
  },
  {
    title: "Email deliverability",
    result:
      "patriotbio.com quarantines unauthenticated mail and Omnisend is not authorised to send for it. Welcome and marketing email is at real risk.",
    status: "fail",
  },
  {
    title: "Account & checkout",
    result:
      "An account is required, but the popup is the plugin's default text and a second, broken login form prints raw code on every page.",
    status: "fail",
  },
  {
    title: "COA library",
    result:
      "One document per batch, a newer file replaces the old one, batch numbers blank on all 30 products, and batch search returns nothing.",
    status: "fail",
  },
  {
    title: "Search & homepage cards",
    result:
      "No search box outside the shop page. On the homepage only the small “Select options” button is a link — not the image, name or price.",
    status: "fail",
  },
  {
    title: "SEO basics",
    result:
      "No SEO plugin: 0 of 58 pages carry a description or share image, the homepage has 40 main headings, and there is no favicon.",
    status: "fail",
  },
  {
    title: "Admin hygiene",
    result:
      "The previous developer is still an administrator, a live “testing” coupon gives 100% off (used four times), and 13 test orders sit in the system.",
    status: "fail",
  },
];

/* ------------------------------------------------------------------ */
/*  Section 4 · The fix — customer journey after the work              */
/* ------------------------------------------------------------------ */
const FLOW_STEPS: { title: string; caption: string; icon: IconName }[] = [
  {
    title: "Creates an account",
    caption:
      "The welcome popup, in your words. 10% comes off their first order automatically — once, and only for a first order.",
    icon: "userPlus",
  },
  {
    title: "Pays by card",
    caption:
      "NMI on the checkout you designed, keeping the address fields the fraud checks need.",
    icon: "card",
  },
  {
    title: "Ships and tracks itself",
    caption:
      "ShipStation pulls the order, the label writes tracking back, and the customer gets the email. This part already works.",
    icon: "truck",
  },
  {
    title: "Finds their COA",
    caption:
      "A batch number into search takes them to a batch page that keeps every document, for good.",
    icon: "vial",
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
        className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-accent"
        style={{ backgroundColor: "#0B142A", border: `1px solid ${NAVY_BORDER}` }}
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

function FlowCaption({
  index,
  step,
}: {
  index: number;
  step: (typeof FLOW_STEPS)[number];
}) {
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
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
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
function MiniPopup() {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ backgroundColor: CELL, borderColor: NAVY_BORDER }}
    >
      <div className="flex items-center justify-between px-1 pb-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          Checkout
        </span>
        <span className="text-[10px] text-text-muted">Create account</span>
      </div>
      <div className="rounded-md bg-white/5 px-3 py-3">
        <p className="text-xs leading-relaxed text-text-primary">
          Welcome! Create your account before continuing to checkout and enjoy 10% off
          your first order.
        </p>
        <div className="mt-3 space-y-1.5">
          <div className="h-5 rounded bg-white/[0.06]" />
          <div className="h-5 rounded bg-white/[0.06]" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold text-white">
            Create account
          </span>
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, ease: EASE, delay: 0.9 },
              },
            }}
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
            style={{
              color: STATUS.pass.fg,
              backgroundColor: STATUS.pass.bg,
              border: `1px solid ${STATUS.pass.bd}`,
            }}
          >
            10% applied
          </motion.span>
        </div>
      </div>
    </div>
  );
}

const COA_DOCS = ["COA · PB-2409-A.pdf", "HPLC report.pdf", "Endotoxin + sterility.pdf"];

function MiniCOA() {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ backgroundColor: CELL, borderColor: NAVY_BORDER }}
    >
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          Epithalon 10MG
        </span>
        <span className="text-[10px] text-text-muted">3 batches</span>
      </div>
      <div className="flex flex-wrap gap-1.5 px-1">
        {["PB-2409-A", "PB-2408-C", "PB-2407-B"].map((batch, i) => (
          <motion.span
            key={batch}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, ease: EASE, delay: 0.2 + i * 0.12 },
              },
            }}
            className="rounded-full px-2.5 py-1 text-[10px] font-medium"
            style={{
              color: i === 0 ? "#FFFFFF" : "var(--color-text-secondary)",
              backgroundColor: i === 0 ? "rgba(255,107,0,0.85)" : "rgba(255,255,255,0.05)",
            }}
          >
            {batch}
          </motion.span>
        ))}
      </div>
      <div className="mt-2.5 space-y-1.5">
        {COA_DOCS.map((doc, i) => (
          <motion.div
            key={doc}
            variants={{
              hidden: { opacity: 0, x: -8 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.35, ease: EASE, delay: 0.7 + i * 0.18 },
              },
            }}
            className="flex items-center gap-2 rounded-md bg-white/[0.04] px-2.5 py-2"
          >
            <span className="text-accent shrink-0">
              <TileIcon name="vial" className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] text-text-secondary truncate">{doc}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const SEARCH_QUERY = "PB-2409-A";

function MiniSearch() {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ backgroundColor: CELL, borderColor: NAVY_BORDER }}
    >
      <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2.5">
        <span className="text-text-muted shrink-0">
          <TileIcon name="search" className="w-4 h-4" />
        </span>
        <span className="text-xs text-text-primary">
          <span className="sr-only">{SEARCH_QUERY}</span>
          {SEARCH_QUERY.split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              aria-hidden
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.08, delay: 0.25 + i * 0.07 },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: [1, 0, 1, 0, 1],
              transition: { duration: 1.4, delay: 0.25 },
            },
          }}
          className="inline-block h-3.5 w-px bg-accent"
        />
      </div>
      <div className="mt-2 space-y-1.5">
        {[
          { label: "Batch PB-2409-A", meta: "Epithalon 10MG · 3 documents" },
          { label: "Epithalon 10MG", meta: "Product · in stock" },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            variants={{
              hidden: { opacity: 0, y: -6 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.35, ease: EASE, delay: 1.15 + i * 0.15 },
              },
            }}
            className="rounded-md bg-white/[0.04] px-3 py-2"
          >
            <p className="text-[11px] font-medium text-text-primary truncate">{row.label}</p>
            <p className="text-[10px] text-text-muted truncate">{row.meta}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MiniInbox() {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ backgroundColor: CELL, borderColor: NAVY_BORDER }}
    >
      <div className="flex items-start gap-3 rounded-md bg-white/5 px-3 py-3">
        <span className="mt-0.5 text-accent shrink-0">
          <TileIcon name="mail" className="w-5 h-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-text-muted">From:</p>
          <p className="text-xs font-semibold text-text-primary truncate">
            Patriot Bio &lt;hello@patriotbio.com&gt;
          </p>
          <p className="mt-1 text-[11px] text-text-secondary truncate">
            Welcome — here&rsquo;s your 10% off
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["SPF PASS", "DKIM PASS", "DMARC PASS"].map((badge, i) => (
              <motion.span
                key={badge}
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.35, ease: EASE, delay: 0.6 + i * 0.2 },
                  },
                }}
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide"
                style={{
                  color: STATUS.pass.fg,
                  backgroundColor: STATUS.pass.bg,
                  border: `1px solid ${STATUS.pass.bd}`,
                }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 px-1 text-[10px] text-text-muted">Inbox, not spam.</p>
    </div>
  );
}

const FEATURES: { title: string; caption: string; vignette: React.ReactNode }[] = [
  {
    title: "The welcome offer, automatic",
    caption:
      "Your wording in the popup, the 10% applied the moment the account exists — and never again on a second order.",
    vignette: <MiniPopup />,
  },
  {
    title: "A COA library that keeps history",
    caption:
      "Unlimited batches per product, unlimited documents per batch, bulk upload, and a printable address for every batch.",
    vignette: <MiniCOA />,
  },
  {
    title: "Search that finds a batch",
    caption:
      "In the desktop header and the mobile menu, covering products, certificates by batch number, and research pages.",
    vignette: <MiniSearch />,
  },
  {
    title: "Email that reaches the inbox",
    caption:
      "Omnisend authorised to send as patriotbio.com, so the welcome flow and every campaign pass authentication.",
    vignette: <MiniInbox />,
  },
];

/* ------------------------------------------------------------------ */
/*  Section 5 · The 23-point checklist                                 */
/* ------------------------------------------------------------------ */
const CHECKLIST_23: { n: number; label: string; status: Status }[] = [
  { n: 1, label: "Custom domain", status: "pass" },
  { n: 2, label: "Clean page sources", status: "fail" },
  { n: 3, label: "Custom 404 page", status: "fail" },
  { n: 4, label: "Unique page titles", status: "partial" },
  { n: 5, label: "Meta descriptions", status: "fail" },
  { n: 6, label: "Canonical tags", status: "partial" },
  { n: 7, label: "One heading per page", status: "fail" },
  { n: 8, label: "Sitemap.xml", status: "partial" },
  { n: 9, label: "Robots.txt", status: "pass" },
  { n: 10, label: "llms.txt", status: "fail" },
  { n: 11, label: "Favicon", status: "fail" },
  { n: 12, label: "Internal links", status: "partial" },
  { n: 13, label: "Breadcrumbs", status: "partial" },
  { n: 14, label: "Structured data", status: "partial" },
  { n: 15, label: "Local business schema", status: "fail" },
  { n: 16, label: "Social share images", status: "fail" },
  { n: 17, label: "Alt text on images", status: "fail" },
  { n: 18, label: "No console errors", status: "pass" },
  { n: 19, label: "No production source maps", status: "partial" },
  { n: 20, label: "Lean JavaScript bundles", status: "fail" },
  { n: 21, label: "Real browser-tab titles", status: "pass" },
  { n: 22, label: "No placeholder text", status: "fail" },
  { n: 23, label: "Verified by a full test order", status: "partial" },
];

/* ------------------------------------------------------------------ */
/*  Section 6 · The plan                                               */
/* ------------------------------------------------------------------ */
const TIMELINE: { days: string; title: string; detail: string }[] = [
  {
    days: "Day 1 · AM",
    title: "Safety net + stop the bleed",
    detail:
      "Backups, every snippet under version control, the 13 test orders cancelled once stock counts are confirmed, old admin access closed, Omnisend authorised to send. The testing coupon stays live until you sign off on it.",
  },
  {
    days: "Day 1 · PM → Day 2",
    title: "Account gate, designed checkout, COA v2",
    detail:
      "The welcome popup and the automatic 10%, the checkout you approved, and a COA library with unlimited batches, documents and bulk upload.",
  },
  {
    days: "Day 3 · AM",
    title: "Search, homepage, SEO",
    detail:
      "Header search across products, batches and research; clickable product cards; titles, descriptions, schema, favicon and a real 404 page.",
  },
  {
    days: "Day 3 · PM",
    title: "Clean-up + the full test order",
    detail:
      "Dead plugins and 3.9 GB of stale backups gone, custom code in one maintained plugin — then we buy something with a real card, together.",
  },
];

/* ------------------------------------------------------------------ */
/*  Section 7 · What we need from you                                  */
/* ------------------------------------------------------------------ */
const ASKS: { text: string; done: boolean }[] = [
  {
    text: "Access to the Figma design file — the handover link sits under hello@patriotbio.com.",
    done: true,
  },
  {
    text: "Confirmation of who owns the Elementor Pro, AST Pro and migration-plugin licences, and the 10Web account. All four should be in Patriot Bio's name.",
    done: true,
  },
  {
    text: "Your OK to remove the previous developer's administrator account — taken after the backup, not before.",
    done: true,
  },
  {
    text: "The business phone number and postal address to publish — a card-network requirement for this type of store.",
    done: true,
  },
  {
    text: "Confirmation that the affiliate programme in the banner is real and staying.",
    done: true,
  },
  {
    text: "GoDaddy DNS access, or ten minutes on a call to add the Omnisend and sender-subdomain records together.",
    done: false,
  },
  {
    text: "Current physical stock counts for the products the 13 test orders touched, so cancelling them leaves inventory correct.",
    done: false,
  },
  {
    text: "Certificates for the 12 products that have none, and the batch numbers for the 18 PDFs already uploaded.",
    done: false,
  },
  {
    text: "Written sign-off to retire the testing coupon once your backend testing is finished.",
    done: false,
  },
  {
    text: "A decision on collecting California sales tax (currently off).",
    done: false,
  },
  {
    text: "Corrected descriptions for the 8 products whose copy mentions liquids or capsules, and the spelling \u201cCagrilintide\u201d.",
    done: false,
  },
  {
    text: "Google Analytics or ad-pixel accounts, if you want tracking installed — there is none today.",
    done: false,
  },
];

const ASKS_DONE = ASKS.filter((a) => a.done).length;

/* ------------------------------------------------------------------ */
/*  Section 8 · Investment checklist                                   */
/* ------------------------------------------------------------------ */
const INCLUDED = [
  "Designed checkout, account gate and the automatic 10% welcome offer",
  "COA library v2 — unlimited batches and documents, with bulk upload",
  "Site-wide search across products, batches and research pages",
  "Homepage and mobile conversion fixes",
  "Full SEO pass — titles, descriptions, schema, favicon, sitemap, 404",
  "Security and clean-up: access, coupons, test orders, dead plugins",
  "The full test order, together — plus an updated operations guide",
];

/* ------------------------------------------------------------------ */
/*  Pay button (only when the Stripe invoice exists)                   */
/* ------------------------------------------------------------------ */
function PayButton({ url, label }: { url: string; label: string }) {
  return (
    <motion.a
      href={url}
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
      Pay Invoice Now{label ? ` — ${label}` : ""}
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

/* Counts derive from the tables above, so a headline pill can never drift
   out of sync with the rows it summarises. */
const tally = (rows: { status: Status }[]) =>
  rows.reduce(
    (acc, row) => ({ ...acc, [row.status]: acc[row.status] + 1 }),
    { pass: 0, partial: 0, fail: 0 } as Record<Status, number>,
  );

const TALLY = tally(CHECKLIST_23);
const INSPECTION_TALLY = tally(INSPECTION);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ProposalClient({ proposal }: { proposal: ProposalFacts }) {
  const { invoice, upkeepLabel } = proposal;
  const hasTotal = invoice.totalLabel !== "";
  const hasTerms = invoice.terms !== "";
  const hasInvoice = invoice.url !== "";
  const footnote = [
    invoice.number ? `Invoice ${invoice.number}` : `Proposal ${proposal.ref}`,
    invoice.depositLabel && invoice.dueLabel
      ? `${invoice.depositLabel} due ${invoice.dueLabel}`
      : "",
    invoice.remainingLabel ? `remaining ${invoice.remainingLabel} on completion` : "",
    "Findings verified on the live site, 13 September 2026",
  ]
    .filter(Boolean)
    .join(" · ");

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
              "linear-gradient(180deg, var(--color-bg-primary) 0%, #060B18 55%, #0A1330 100%)",
          }}
        />
        <LabGlow />
        <SectionWrapper className="!py-0 relative z-10">
          <div className="max-w-4xl">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>
                Modern Web Systems · Private Proposal · {proposal.date}
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.1}>
              <p className="mt-4 text-text-secondary text-lg">
                Prepared for{" "}
                <span className="text-text-primary font-semibold">
                  {proposal.preparedFor}
                </span>
              </p>
            </FadeInWhenVisible>
            <div className="mt-4">
              <AnimatedHeading
                text="Across the finish line, then on autopilot."
                as="h1"
                className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
                accentLastPeriod
              />
            </div>
            <FadeInWhenVisible delay={0.35}>
              <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                A full repair of patriotbio.com: the checkout and account flow you
                designed, a COA library that never loses a document, site search,
                clean SEO, and every integration verified with a real order. Three
                days, with the store trading throughout.
              </p>
            </FadeInWhenVisible>
            <StaggerChildren className="mt-8 flex flex-wrap gap-3" stagger={0.1}>
              {["14 real orders already paid", "8 phases · 3 days", "Zero downtime"].map(
                (chip) => (
                  <StaggerItem key={chip}>
                    <span
                      className="inline-block rounded-full bg-white/[0.04] px-4 py-1.5 text-sm text-text-secondary"
                      style={{ border: `1px solid ${NAVY_BORDER}` }}
                    >
                      {chip}
                    </span>
                  </StaggerItem>
                ),
              )}
            </StaggerChildren>
            <FadeInWhenVisible delay={0.55} className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary" href="#investment">
                View Investment
              </Button>
              <Button variant="secondary" href="#plan">
                See the plan
              </Button>
            </FadeInWhenVisible>
          </div>
        </SectionWrapper>
        <div className="relative z-10 mt-16 md:mt-24">
          <PeakDivider bg="transparent" fill="var(--color-bg-primary)" />
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
                <MoleculeMark className="absolute -right-10 -top-10 w-64 h-64 text-white opacity-[0.04]" />
                <span className={eyebrowCls}>Executive Summary</span>
                <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold tracking-tight">
                  Katelen —
                </h2>
                <div className="mt-5 space-y-4 text-text-secondary leading-relaxed md:text-lg">
                  <p>
                    Thank you for the note from London, and for handing the site over
                    exactly as it is. Before writing a word of this I went through all
                    58 public pages of patriotbio.com, all 25 orders and their history,
                    the store configuration, your DNS, and every line of code the last
                    developer left behind.
                  </p>
                  <p>
                    The best news in this document is the boring part:{" "}
                    <span className="relative inline-block font-semibold text-text-primary">
                      the plumbing already works
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] origin-left bg-accent"
                      />
                    </span>
                    . Fourteen real cards have been charged since 5 September, every
                    paid order reached ShipStation, and every label sent your customer
                    a tracking email. That was the part I was most worried about, and
                    it is fine.
                  </p>
                  <p>
                    What is missing is everything on top of it: the account and checkout
                    experience you designed, the 10% welcome offer that never fires, a
                    certificate library that overwrites a document the moment you add a
                    second one, and no way for anyone to search your own site. There is
                    also a coupon called &ldquo;testing&rdquo; giving 100% off, still live,
                    and one paid order (#2378) still waiting to ship.
                  </p>
                  <p>
                    Here is the plan — eight phases, three days, your store trading the
                    whole time. Then the part I am looking forward to:
                    the full test order, with you on the call, from creating the account
                    to the tracking email landing in your inbox.
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
      {/* 3 · The inspection                                          */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper id="inspection">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>The Inspection</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text="What we tested, and what we found."
                className={headingCls}
              />
            </div>
          </div>
          <FadeInWhenVisible delay={0.2}>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              {INSPECTION_TALLY.pass} pass · {INSPECTION_TALLY.fail} fail
            </span>
          </FadeInWhenVisible>
        </div>
        <StaggerChildren
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {INSPECTION.map((item) => {
            const s = STATUS[item.status];
            return (
              <StaggerItem key={item.title} className="min-w-0">
                <GlowCard className="h-full">
                  <div className="flex h-full flex-col p-6">
                    <span
                      className="self-start rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: s.fg, backgroundColor: s.bg, border: `1px solid ${s.bd}` }}
                    >
                      {s.label}
                    </span>
                    <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {item.result}
                    </p>
                  </div>
                </GlowCard>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
        <FadeInWhenVisible delay={0.2} className="mt-8">
          <p className="text-sm text-text-muted">
            Verified on the live site, 13 September 2026 — not taken from the handover
            documents.
          </p>
        </FadeInWhenVisible>
      </SectionWrapper>

      {/* ---------------------------------------------------------- */}
      {/* 4 · The fix                                                 */}
      {/* ---------------------------------------------------------- */}
      <PeakDivider bg="var(--color-bg-primary)" fill={BAND} />
      <div id="platform" style={{ backgroundColor: BAND }}>
        <SectionWrapper className="!py-20 md:!py-28">
          <div className="text-center max-w-3xl mx-auto">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>The Fix</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text="One customer, start to certificate."
                className={headingCls}
              />
            </div>
            <FadeInWhenVisible delay={0.2}>
              <p className="mt-5 text-text-secondary md:text-lg leading-relaxed">
                This is the journey after the work is done — the same store, with
                nothing left for you to chase by hand.
              </p>
            </FadeInWhenVisible>
          </div>
          <div className="mt-16 md:mt-20">
            <FlowDiagram />
          </div>
          <StaggerChildren
            className="mt-16 md:mt-20 grid gap-6 md:grid-cols-2"
            stagger={0.12}
          >
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
      <PeakDivider bg="var(--color-bg-primary)" fill={BAND} flip />

      {/* ---------------------------------------------------------- */}
      {/* 5 · The 23-point checklist                                  */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper id="checklist">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>The 23-Point Checklist</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text="Does it look finished? Not yet."
                className={headingCls}
              />
            </div>
          </div>
          <FadeInWhenVisible delay={0.2}>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              Today: {TALLY.pass} pass · {TALLY.partial} partial · {TALLY.fail} fail →{" "}
              {CHECKLIST_23.length} pass on delivery
            </span>
          </FadeInWhenVisible>
        </div>
        <StaggerChildren
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          stagger={0.03}
        >
          {CHECKLIST_23.map((item) => (
            <StaggerItem key={item.n}>
              <div className="flex h-full items-start gap-2.5 rounded-lg border border-border bg-bg-card px-4 py-3.5 transition-all duration-200 hover:border-border-hover hover:-translate-y-0.5">
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: STATUS[item.status].fg }}
                />
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold tracking-[0.12em] text-text-muted">
                    {String(item.n).padStart(2, "0")}
                  </span>
                  <span className="block text-sm text-text-primary leading-snug">
                    {item.label}
                    <span className="sr-only">
                      {" "}— {STATUS[item.status].label} today
                    </span>
                  </span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <FadeInWhenVisible delay={0.2} className="mt-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted">
            {(Object.keys(STATUS) as Status[]).map((key) => (
              <span key={key} className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: STATUS[key].fg }}
                />
                {STATUS[key].label} today
              </span>
            ))}
          </div>
        </FadeInWhenVisible>
      </SectionWrapper>

      {/* ---------------------------------------------------------- */}
      {/* 6 · The plan                                                */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper id="plan">
        <div className="text-center max-w-3xl mx-auto">
          <FadeInWhenVisible>
            <span className={eyebrowCls}>The Plan</span>
          </FadeInWhenVisible>
          <div className="mt-3">
            <AnimatedHeading
              text="Eight phases, three days."
              className={headingCls}
            />
          </div>
          <FadeInWhenVisible delay={0.2}>
            <p className="mt-5 text-text-secondary md:text-lg leading-relaxed">
              In this order, because each phase protects the next. A backup before every
              change, nothing deleted without your written OK, and a short written update
              at the end of each phase.
            </p>
          </FadeInWhenVisible>
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
            Then: the test order, together.
          </p>
        </FadeInWhenVisible>
      </SectionWrapper>

      {/* ---------------------------------------------------------- */}
      {/* 7 · What we need from you                                   */}
      {/* ---------------------------------------------------------- */}
      <SectionWrapper id="from-you" className="!pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>What We Need From You</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading text="What is still outstanding." className={headingCls} />
            </div>
          </div>
          <FadeInWhenVisible delay={0.2}>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              {ASKS_DONE} of {ASKS.length} answered
            </span>
          </FadeInWhenVisible>
        </div>
        <StaggerChildren className="mt-10 grid gap-x-10 gap-y-0 md:grid-cols-2" stagger={0.05}>
          {ASKS.map((ask, i) => (
            <StaggerItem key={ask.text}>
              <div className="flex items-start gap-4 border-t border-border py-4">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={
                    ask.done
                      ? {
                          color: STATUS.pass.fg,
                          backgroundColor: STATUS.pass.bg,
                          border: `1px solid ${STATUS.pass.bd}`,
                        }
                      : {
                          color: "var(--color-accent)",
                          backgroundColor: "rgba(255,107,0,0.10)",
                          border: "1px solid rgba(255,107,0,0.40)",
                        }
                  }
                >
                  {ask.done ? <TileIcon name="check" className="w-3.5 h-3.5" /> : i + 1}
                  <span className="sr-only">
                    {ask.done ? "Received" : "Still outstanding"}
                  </span>
                </span>
                <p
                  className={`text-sm md:text-base leading-relaxed ${
                    ask.done ? "text-text-muted" : "text-text-secondary"
                  }`}
                >
                  {ask.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      {/* ---------------------------------------------------------- */}
      {/* 8 · Investment                                              */}
      {/* ---------------------------------------------------------- */}
      <PeakDivider bg="var(--color-bg-primary)" fill={BAND} />
      <div
        id="investment"
        style={{
          background: `linear-gradient(180deg, ${BAND} 0%, #0A1330 45%, var(--color-bg-primary) 100%)`,
        }}
      >
        <SectionWrapper className="!py-20 md:!py-28">
          <div className="text-center max-w-3xl mx-auto">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>The Investment</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading text="One programme, priced by phase." className={headingCls} />
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
                    className={`font-[family-name:var(--font-heading)] font-extrabold tracking-tight ${
                      hasTotal ? "text-6xl md:text-7xl" : "text-4xl md:text-5xl"
                    }`}
                  >
                    {hasTotal ? invoice.totalLabel : "Phase by phase"}
                  </motion.p>
                  <p className="mt-2 text-text-secondary">
                    {hasTotal
                      ? "Complete programme — total"
                      : "Fees are set out phase by phase in the covering email"}
                  </p>
                  <p className="mt-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                    {hasTerms ? invoice.terms : "Stop after any phase with a working site"}
                  </p>
                  <div className="my-8 h-px bg-border" />
                  <ul className="space-y-4 text-left">
                    {INCLUDED.map((item, i) => (
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
                                transition: { duration: 0.6, ease: EASE, delay: i * 0.12 },
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
                  {upkeepLabel ? (
                    <>
                      <span className="font-semibold text-text-primary">
                        + {upkeepLabel} upkeep
                      </span>{" "}
                      — hosting, updates, monitoring and support: everything, handled.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-text-primary">
                        Monthly upkeep
                      </span>{" "}
                      — hosting, updates, monitoring and support — quoted with the final
                      scope.
                    </>
                  )}
                </p>
              </div>
            </FadeInWhenVisible>
          </div>

          <div className="mt-14 md:mt-16 text-center">
            <FadeInWhenVisible>
              {hasInvoice ? (
                <PayButton
                  url={invoice.url}
                  label={invoice.depositLabel || invoice.totalLabel}
                />
              ) : (
                <p className="inline-block rounded-[var(--radius-button)] border border-border bg-white/[0.03] px-10 py-5 text-lg font-semibold text-text-secondary md:px-14">
                  Invoice link follows once scope is agreed
                </p>
              )}
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="mt-5 text-sm text-text-muted">{footnote}</p>
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
            Looking forward to the test order. <span className="text-accent">— Sam</span>
          </p>
          <p className="mt-4 text-sm text-text-muted">
            This proposal is private to Patriot Bio · Prepared {proposal.date} · Modern
            Web Systems
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
