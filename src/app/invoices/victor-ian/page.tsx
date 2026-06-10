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
// (MDSEIGCQ-0001 for the full $2,000 was voided 2026-06-10; split into
// $1,000 now + $1,000 on completion. The completion invoice sits in Stripe
// as draft in_1TgnbpCzuo5EmjWWuHL4wnU7 — finalize it when the build ships.)
const INVOICE = {
  url: "https://invoice.stripe.com/i/acct_1NZ1pCCzuo5EmjWW/live_YWNjdF8xTloxcENDenVvNUVtaldXLF9VZzl1Y3QzeWZZWGJRWFdMbXlyQzlXZUxac1ZTM0ZDLDE3MTY0NDQwMQ0200UYcmzMXs?s=ap",
  amountLabel: "$1,000",
  totalLabel: "$2,000",
  number: "MDSEIGCQ-0002",
  dueLabel: "June 10, 2026",
  terms: "$1,000 to start today · $1,000 on completion",
};

export default function VictorIanProposalPage() {
  return <ProposalClient invoice={INVOICE} />;
}
