import type { ServiceDetail, FAQItem } from "@/lib/types";

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    number: "01",
    title: "Powerful Websites",
    tagline: "Built for performance. Designed for conversion.",
    description:
      "Every website we build starts with strategy and ends with measurable results. We don't create brochure sites — we engineer digital platforms that attract, engage, and convert your ideal customers. From architecture to deployment, every decision is driven by data and designed for growth.",
    deliverables: [
      "Custom responsive design",
      "Performance-first architecture",
      "Technical SEO implementation",
      "Content management system",
      "Analytics & conversion tracking",
      "Ongoing optimization support",
    ],
    features: [
      {
        title: "Lightning Performance",
        description:
          "Sub-2-second load times through edge caching, image optimization, and modern frameworks. Speed isn't a feature — it's the foundation.",
        icon: "bolt",
      },
      {
        title: "Conversion Architecture",
        description:
          "Every page, every section, every micro-interaction is engineered to guide visitors toward your most important actions.",
        icon: "target",
      },
      {
        title: "Search Dominance",
        description:
          "Technical SEO baked into the architecture from day one. Structured data, semantic HTML, and performance optimization that search engines reward.",
        icon: "search",
      },
      {
        title: "Scalable CMS",
        description:
          "Content management that your team actually enjoys using. Publish, update, and optimize without touching code.",
        icon: "layers",
      },
    ],
  },
  {
    number: "02",
    title: "AI Intelligence",
    tagline: "Smarter systems. Exponential advantage.",
    description:
      "AI isn't a buzzword in our vocabulary — it's a practical tool that creates measurable competitive advantage. We build intelligent systems that learn from your data, automate complex decisions, and deliver personalized experiences at scale. The result: your business operates faster, smarter, and more efficiently than competitors still doing things manually.",
    deliverables: [
      "AI strategy & assessment",
      "Custom chatbot development",
      "Predictive analytics models",
      "Recommendation engines",
      "Natural language processing",
      "Ongoing model training & optimization",
    ],
    features: [
      {
        title: "Intelligent Chatbots",
        description:
          "Conversational AI that understands context, resolves issues, and knows when to escalate. Not scripted robots — genuine intelligence.",
        icon: "chat",
      },
      {
        title: "Predictive Models",
        description:
          "Machine learning models that forecast trends, identify risks, and surface opportunities before your competitors see them.",
        icon: "brain",
      },
      {
        title: "Personalization Engines",
        description:
          "Dynamic experiences that adapt to each user. Product recommendations, content curation, and interface optimization driven by behavior data.",
        icon: "user",
      },
      {
        title: "Data Intelligence",
        description:
          "Transform raw data into actionable insights. Automated analysis, anomaly detection, and real-time reporting that powers smarter decisions.",
        icon: "chart",
      },
    ],
  },
  {
    number: "03",
    title: "Automation & Systems",
    tagline: "Eliminate the manual. Amplify the human.",
    description:
      "Your team's time is your most valuable resource. We identify the repetitive, manual processes that drain productivity and replace them with intelligent automation. The goal isn't to replace people — it's to free them to do work that actually requires human creativity, judgment, and relationship-building.",
    deliverables: [
      "Workflow audit & mapping",
      "Integration architecture",
      "Automated pipelines",
      "Real-time dashboards",
      "Error handling & monitoring",
      "Documentation & team training",
    ],
    features: [
      {
        title: "Workflow Orchestration",
        description:
          "Complex multi-step processes automated end-to-end. From lead capture to fulfillment, every handoff is seamless.",
        icon: "workflow",
      },
      {
        title: "Platform Integration",
        description:
          "Connect the tools your team already uses. CRM, accounting, project management, communication — unified into one flow.",
        icon: "link",
      },
      {
        title: "Real-Time Dashboards",
        description:
          "Live visibility into every metric that matters. No more waiting for monthly reports or digging through spreadsheets.",
        icon: "dashboard",
      },
      {
        title: "Error-Proof Systems",
        description:
          "Built-in validation, error handling, and monitoring. When something breaks, the system catches it before your customers do.",
        icon: "shield",
      },
    ],
  },
];

export const TECH_STACK = {
  Frontend: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Motion"],
  "AI & ML": ["OpenAI GPT-4", "LangChain", "Custom Models", "Python", "TensorFlow"],
  Automation: ["n8n", "Zapier", "Custom APIs", "Webhooks", "Cron Jobs"],
  Infrastructure: ["Vercel", "PostgreSQL", "Redis", "AWS", "Cloudflare"],
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A website rebuild typically takes 6-10 weeks. AI integrations range from 4-8 weeks. Full automation suites can take 8-14 weeks. We'll give you a detailed timeline during the Strategy phase — and we stick to it.",
  },
  {
    question: "What does a project typically cost?",
    answer:
      "Our engagements start at $15,000 for focused projects and scale based on complexity. Website builds typically range from $15K-$50K. AI implementations from $20K-$75K. Full automation suites from $25K-$100K+. We scope precisely so there are no surprises.",
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer:
      "We work best with established businesses doing $1M+ in annual revenue who are ready to invest in serious digital infrastructure. If you're pre-revenue or looking for a basic template site, we're probably not the right fit — and we'll tell you that upfront.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We don't disappear after deployment. Every project includes a 30-day post-launch support period. Beyond that, we offer ongoing optimization retainers for clients who want continuous improvement, monitoring, and strategic guidance.",
  },
  {
    question: "Can you work with our existing tools and platforms?",
    answer:
      "Absolutely. We specialize in integration. Whether you're on Salesforce, HubSpot, Shopify, QuickBooks, or custom internal tools — we build systems that connect what you have rather than forcing you to start from scratch.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We define specific, measurable KPIs before writing a single line of code. Traffic growth, conversion rates, time saved, cost reduction, revenue impact — we track what matters to your business and report on it transparently.",
  },
];
