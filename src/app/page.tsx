import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Modern Web Systems | Websites, AI & Automation That Pay for Themselves",
  description:
    "A systems-driven studio shipping high-performance websites, AI intelligence, and business automation for established businesses — in days, not months.",
  // without this the homepage inherits the root layout's openGraph block,
  // whose copy is the superseded positioning
  openGraph: {
    title: "Modern Web Systems | Websites, AI & Automation That Pay for Themselves",
    description:
      "A systems-driven studio shipping high-performance websites, AI intelligence, and business automation for established businesses — in days, not months.",
    type: "website",
  },
};

export default function Home() {
  return <HomeClient />;
}
