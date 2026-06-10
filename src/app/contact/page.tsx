import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact — Get Your Build Plan | Modern Web Systems",
  description:
    "One call. A written, fixed-price build plan — scope, price, timeline. Free scoping call; if we're not the right fit, we'll tell you.",
  openGraph: {
    title: "Contact — Get Your Build Plan | Modern Web Systems",
    description:
      "One call. A written, fixed-price build plan — scope, price, timeline.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
