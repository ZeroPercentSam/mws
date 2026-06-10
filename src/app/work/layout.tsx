import type { Metadata } from "next";
import { CASE_STUDIES } from "@/lib/constants";
import { fmt, metric, siteMetric } from "@/lib/derive";

// every count templated from constants — a re-tally can't leave a stale
// claim here
const description = `${CASE_STUDIES.length} live builds across ${siteMetric("Industries Served").value} industries: a ${fmt(metric("osint4all", "Tools Cataloged"))}-tool intelligence directory, a license-gated pharma platform, an AI suit configurator with ${fmt(metric("alpha-gentlemen-suits", "Fabric Swatches"))} fabrics. Everything here is in production and measured — no mockups.`;

export const metadata: Metadata = {
  title: "Work — Live Builds, Measured Results | Modern Web Systems",
  description,
  openGraph: {
    title: "Work — Live Builds, Measured Results | Modern Web Systems",
    description: "No mockups. Live systems, in production, doing their job.",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
