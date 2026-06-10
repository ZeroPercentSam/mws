import type { Metadata } from "next";
import ProposalClient from "./proposal-client";

export const metadata: Metadata = {
  title: "Proposal — Victor & Ian | Modern Web Systems",
  description:
    "Private proposal: charter website and booking platform for the 44' yacht and 33' boat.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// Live Stripe hosted invoice — MDSEIGCQ-0001, $2,000.00 USD, due June 10, 2026
const STRIPE_INVOICE_URL =
  "https://invoice.stripe.com/i/acct_1NZ1pCCzuo5EmjWW/live_YWNjdF8xTloxcENDenVvNUVtaldXLF9VZzROc1ZqbEVHWEJiWUFYOWVFeFJVZmZPaUdFcm1tLDE3MTYyMzc4NQ0200AR7EfM9h?s=ap";

export default function VictorIanProposalPage() {
  return <ProposalClient stripeInvoiceUrl={STRIPE_INVOICE_URL} />;
}
