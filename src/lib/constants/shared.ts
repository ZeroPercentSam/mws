import type { ClientLogo, Testimonial, NavLink } from "@/lib/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export const CLIENTS: ClientLogo[] = [
  { name: "Meridian Corp", abbreviation: "MC" },
  { name: "Apex Dynamics", abbreviation: "AD" },
  { name: "Velox Systems", abbreviation: "VS" },
  { name: "NovaBridge", abbreviation: "NB" },
  { name: "Quantum Reach", abbreviation: "QR" },
  { name: "Stratos Digital", abbreviation: "SD" },
  { name: "Ironclad Analytics", abbreviation: "IA" },
  { name: "Pinnacle Group", abbreviation: "PG" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Modern Web Systems didn't just build us a website — they transformed our entire digital strategy. Our organic traffic increased 312% in six months, and the automation systems they built save our team 20 hours every week.",
    name: "Sarah Chen",
    title: "CEO",
    company: "Meridian Corp",
  },
  {
    quote:
      "The AI chatbot they deployed handles 73% of our customer inquiries without human intervention. That's not a small improvement — that's a paradigm shift for our support team.",
    name: "Marcus Webb",
    title: "VP of Operations",
    company: "Apex Dynamics",
  },
  {
    quote:
      "We went from spending three days on monthly reporting to having real-time dashboards that update automatically. The ROI was clear within the first month.",
    name: "Elena Rodriguez",
    title: "Head of Marketing",
    company: "Velox Systems",
  },
  {
    quote:
      "Working with MWS felt like having a world-class tech team on demand. They understood our business challenges before we even finished explaining them.",
    name: "David Park",
    title: "Founder",
    company: "NovaBridge",
  },
];
