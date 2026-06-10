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

// Live Stripe hosted invoice — single source of truth for every invoice fact
// shown on the page. Re-issuing the invoice means updating only this object.
const INVOICE = {
  url: "https://invoice.stripe.com/i/acct_1NZ1pCCzuo5EmjWW/live_YWNjdF8xTloxcENDenVvNUVtaldXLF9VZzROc1ZqbEVHWEJiWUFYOWVFeFJVZmZPaUdFcm1tLDE3MTYyMzc4NQ0200AR7EfM9h?s=ap",
  amountLabel: "$2,000",
  number: "MDSEIGCQ-0001",
  dueLabel: "June 10, 2026",
};

export default function VictorIanProposalPage() {
  return <ProposalClient invoice={INVOICE} />;
}
