import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Modern Web Systems",
  description:
    "Explore our portfolio of high-performance websites, AI integrations, and automation systems. Real projects with measurable results across 12+ industries.",
  openGraph: {
    title: "Our Work | Modern Web Systems",
    description:
      "Explore our portfolio of high-performance websites, AI integrations, and automation systems.",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
