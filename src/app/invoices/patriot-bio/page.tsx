import type { Metadata } from "next";
import ProposalClient from "./proposal-client";

export const metadata: Metadata = {
  title: "Proposal — Patriot Bio | Modern Web Systems",
  description:
    "Private proposal: full repair of patriotbio.com — account gate and designed checkout, COA library v2, site search, SEO, and a verified test order.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// Single source of truth for every fact shown on the page.
// Money fields stay empty until Sam confirms them — the page renders the
// "invoice follows" copy instead of a total, terms pill or pay button.
const PROPOSAL = {
  preparedFor: "Katelen Weisenberger, CEO · Patriot Bio",
  date: "September 13, 2026",
  ref: "MWS-PB-0913",
  invoice: {
    url: "",
    totalLabel: "",
    depositLabel: "",
    remainingLabel: "",
    number: "",
    dueLabel: "",
    terms: "",
  },
  upkeepLabel: "",
};

export default function PatriotBioProposalPage() {
  return <ProposalClient proposal={PROPOSAL} />;
}
