import type { Metadata } from "next";
import { fmt, siteMetric } from "@/lib/derive";
import AboutClient from "./about-client";

// siteMetric throws on a renamed label — no silent "undefined" in the SERP
const description = `A systems-driven studio: AI-leveraged production, senior review on every screen. ${fmt(siteMetric("Projects Shipped"))} projects, ${fmt(siteMetric("Industries Served"))} industries, ${fmt(siteMetric("Pages Built"))} pages — one studio.`;

export const metadata: Metadata = {
  title: "About — A Studio Built Like the Systems It Sells | Modern Web Systems",
  description,
  openGraph: {
    title: "About — A Studio Built Like the Systems It Sells | Modern Web Systems",
    description,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
