import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Modern Web Systems",
  description:
    "Powerful websites, AI intelligence, and workflow automation. Three pillars of digital transformation designed to solve real business problems with technology that works.",
  openGraph: {
    title: "Services | Modern Web Systems",
    description:
      "Powerful websites, AI intelligence, and workflow automation for businesses ready to grow.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
