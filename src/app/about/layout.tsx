import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Modern Web Systems",
  description:
    "A focused team of strategists, engineers, and designers building digital solutions that actually move the needle. Learn about our story, values, and team.",
  openGraph: {
    title: "About | Modern Web Systems",
    description:
      "Meet the team behind Modern Web Systems. Strategists, engineers, and designers building solutions that matter.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
