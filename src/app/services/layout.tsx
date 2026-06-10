import type { Metadata } from "next";
import { PRICING, DELIVERY_WINDOWS } from "@/lib/constants/engagement";

// numbers templated from engagement.ts — a pricing/window change can't
// leave stale claims in the SERP/OG copy
const description = `Three systems, one operating advantage: high-performance websites in ${DELIVERY_WINDOWS.websites}, AI implementations in ${DELIVERY_WINDOWS.ai}, automation suites in ${DELIVERY_WINDOWS.automation}. Fixed scope, fixed price — engagements from ${PRICING.floorAmount}.`;

export const metadata: Metadata = {
  title: "Services — Websites, AI & Automation | Modern Web Systems",
  description,
  openGraph: {
    title: "Services — Websites, AI & Automation | Modern Web Systems",
    description:
      "Websites, AI, and automation — fixed-price systems shipped in weeks, not months.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
