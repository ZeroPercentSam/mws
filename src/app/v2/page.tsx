import type { Metadata } from "next";
import V2Client from "./v2-client";

// Preview route for the homepage redesign — noindexed until it replaces "/".
export const metadata: Metadata = {
  title: "Modern Web Systems | Websites, AI & Automation That Pay for Themselves",
  description:
    "A systems-driven studio shipping high-performance websites, AI intelligence, and business automation for established businesses — in weeks, not quarters.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function HomepageV2() {
  return <V2Client />;
}
