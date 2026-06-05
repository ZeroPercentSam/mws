import type { ClientLogo, Testimonial, NavLink } from "@/lib/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const CLIENTS: ClientLogo[] = [
  { name: "Alpha Gentlemen Suits", abbreviation: "AGS" },
  { name: "Exotics By The Bay", abbreviation: "EBTB" },
  { name: "Purity Science", abbreviation: "PS" },
  { name: "ADARE", abbreviation: "AD" },
  { name: "JMI Capital", abbreviation: "JMI" },
  { name: "Luxury Boutique", abbreviation: "LB" },
  { name: "OSINT4ALL", abbreviation: "O4A" },
  { name: "Lubecision", abbreviation: "LBC" },
  { name: "Clariven Labs", abbreviation: "CL" },
  { name: "Queen Creek", abbreviation: "QC" },
  { name: "Bioveris", abbreviation: "BV" },
  { name: "Situ Travel", abbreviation: "ST" },
  { name: "ReelPulse", abbreviation: "RP" },
  { name: "ModelManager", abbreviation: "MM" },
  { name: "Luxury Pipeline", abbreviation: "LP" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We replaced the entire in-store tailor experience with AI. Virtual try-on, camera-based measurement, 280+ fabric swatches — customers design and visualize their custom suit without leaving their screen.",
    name: "Alpha Gentlemen Suits",
    title: "AI-Powered E-Commerce",
    company: "Luxury Fashion",
  },
  {
    quote:
      "A pharmaceutical platform where every buyer is license-verified, every batch has a COA, and orders are automatically blocked in restricted states. Compliance isn't an afterthought — it's the architecture.",
    name: "Purity Science",
    title: "Regulated B2B Platform",
    company: "Pharmaceutical",
  },
  {
    quote:
      "28 pages. Three Florida cities. Fleet catalog, jets, yachts, sprinters, wedding packages — all with vehicle specs, brand filtering, and Google Analytics tracking every conversion path.",
    name: "Exotics By The Bay",
    title: "Fleet Catalog & Booking",
    company: "Luxury Automotive",
  },
  {
    quote:
      "1,411 OSINT tools. 77 categories. Live/dead status tracking on every single one. We turned a chaotic bookmark collection into the definitive intelligence directory for the security community.",
    name: "OSINT4ALL",
    title: "Intelligence Directory",
    company: "Cybersecurity",
  },
];
