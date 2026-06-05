import type { TeamMember, Value } from "@/lib/types";

export const STORY = {
  headline: "Built Different. On Purpose.",
  paragraphs: [
    "Modern Web Systems started with a simple observation: most businesses are running 2024 operations on 2015 technology. Not because better solutions don't exist — but because the technology industry has made everything unnecessarily complicated, expensive, and slow.",
    "I exist to change that. As a solo founder augmented by AI-driven workflows, I deliver the output of an entire agency with the focus and accountability of a single point of contact. No layers, no hand-offs, no diluted vision.",
    "Every engagement starts with understanding your business, not selling you technology. I ask hard questions, challenge assumptions, and design solutions that solve real problems — not problems I invented to sell you more software.",
  ],
  pullQuote:
    "I don't build technology for technology's sake. I build it because your business has real problems that deserve real solutions.",
};

export const VALUES: Value[] = [
  {
    title: "Relentless Quality",
    description:
      "I don't ship 'good enough.' Every line of code, every design decision, every automation logic is held to a standard that most companies reserve for their flagship products. Your digital infrastructure deserves obsessive attention to detail.",
    icon: "precision",
  },
  {
    title: "Honest Partnership",
    description:
      "If something won't work, I'll tell you. If a simpler solution exists, I'll recommend it — even if it means a smaller project for me. My reputation is built on trust, not upselling.",
    icon: "handshake",
  },
  {
    title: "Results Over Hype",
    description:
      "I measure everything. Vanity metrics don't impress me — revenue impact does. Every project has clear KPIs defined before I start, and I hold myself accountable to hitting them.",
    icon: "chart",
  },
  {
    title: "Future-Ready",
    description:
      "Technology evolves fast. Everything I build is designed to adapt — modular architectures, clean code, documented systems. When the next breakthrough arrives, your infrastructure is ready for it.",
    icon: "rocket",
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Sam Ovington",
    role: "Founder & Lead Strategist",
    bio: "Solo founder and full-stack engineer who builds with the output of an agency and the accountability of a single point of contact. 16+ projects shipped across luxury e-commerce, pharmaceutical platforms, real estate investment tools, and more — all on Next.js and Vercel, augmented by AI-driven development workflows.",
    initials: "SO",
    gradient: "linear-gradient(135deg, #FF6B00, #FF8533)",
    socials: { linkedin: "#" },
  },
];
