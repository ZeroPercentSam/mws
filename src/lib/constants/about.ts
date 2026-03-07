import type { TeamMember, Value } from "@/lib/types";

export const STORY = {
  headline: "Built Different. On Purpose.",
  paragraphs: [
    "Modern Web Systems started with a simple observation: most businesses are running 2024 operations on 2015 technology. Not because better solutions don't exist — but because the technology industry has made everything unnecessarily complicated, expensive, and slow.",
    "We exist to change that. We're a focused team of strategists, developers, and designers who believe that smart technology should be accessible to every serious business — not just the ones with six-figure IT budgets and 12-month implementation timelines.",
    "Every engagement starts with understanding your business, not selling you technology. We ask hard questions, challenge assumptions, and design solutions that solve real problems — not problems we invented to sell you more software.",
  ],
  pullQuote:
    "We don't build technology for technology's sake. We build it because your business has real problems that deserve real solutions.",
};

export const VALUES: Value[] = [
  {
    title: "Relentless Quality",
    description:
      "We don't ship 'good enough.' Every line of code, every design decision, every automation logic is held to a standard that most companies reserve for their flagship products. Your digital infrastructure deserves obsessive attention to detail.",
    icon: "precision",
  },
  {
    title: "Honest Partnership",
    description:
      "If something won't work, we'll tell you. If a simpler solution exists, we'll recommend it — even if it means a smaller project for us. Our reputation is built on trust, not upselling.",
    icon: "handshake",
  },
  {
    title: "Results Over Hype",
    description:
      "We measure everything. Vanity metrics don't impress us — revenue impact does. Every project has clear KPIs defined before we start, and we hold ourselves accountable to hitting them.",
    icon: "chart",
  },
  {
    title: "Future-Ready",
    description:
      "Technology evolves fast. Everything we build is designed to adapt — modular architectures, clean code, documented systems. When the next breakthrough arrives, your infrastructure is ready for it.",
    icon: "rocket",
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Sam Ovington",
    role: "Founder & Lead Strategist",
    bio: "Former tech lead turned business strategist. Sam founded MWS after watching too many talented businesses lose ground to competitors with better technology. He leads every engagement with a focus on business outcomes, not just technical deliverables.",
    initials: "SO",
    gradient: "linear-gradient(135deg, #FF6B00, #FF8533)",
    socials: { linkedin: "#" },
  },
  {
    name: "Alex Rivera",
    role: "Head of Engineering",
    bio: "Full-stack engineer with a decade of experience shipping high-performance web applications. Alex architects the technical foundations that make our projects fast, scalable, and maintainable long after we've delivered them.",
    initials: "AR",
    gradient: "linear-gradient(135deg, #FF8533, #FFa333)",
    socials: { linkedin: "#" },
  },
  {
    name: "Jordan Blake",
    role: "AI & Automation Lead",
    bio: "Machine learning engineer and automation architect. Jordan designs the intelligent systems and workflow automations that give our clients an unfair advantage. Believes deeply that AI should augment human capability, not replace it.",
    initials: "JB",
    gradient: "linear-gradient(135deg, #cc5500, #FF6B00)",
    socials: { linkedin: "#" },
  },
  {
    name: "Maya Patel",
    role: "Creative Director",
    bio: "Brand strategist and designer who believes that great design is invisible — it just works. Maya shapes every visual touchpoint to communicate authority, trust, and sophistication. No templates. No shortcuts.",
    initials: "MP",
    gradient: "linear-gradient(135deg, #FF6B00, #cc5500)",
    socials: { linkedin: "#" },
  },
];
