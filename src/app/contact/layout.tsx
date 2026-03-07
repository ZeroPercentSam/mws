import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Modern Web Systems",
  description:
    "Ready to transform your business? Tell us about your project and we'll get back to you within 24 hours with a tailored plan of action.",
  openGraph: {
    title: "Contact | Modern Web Systems",
    description:
      "Get in touch with Modern Web Systems. Free strategy consultation, 24-hour response time.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
