import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — The Numbers Behind the Work | Modern Web Systems",
  description:
    "Published research with the math shown: why 70% of digital transformations fail, what $3.70-per-$1 AI ROI actually requires, and what every second of load time costs in revenue.",
  openGraph: {
    title: "Blog — The Numbers Behind the Work | Modern Web Systems",
    description:
      "Published analysis with the math shown. Sources linked, no fluff.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
