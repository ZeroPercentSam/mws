import type { CaseStudy } from "@/lib/types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "meridian-corp-rebrand",
    title: "Digital Transformation & Brand Overhaul",
    client: "Meridian Corp",
    category: "websites",
    description:
      "A complete digital rebrand and website rebuild that turned a legacy B2B company into a modern market leader.",
    challenge:
      "Meridian Corp had been operating with a website built in 2018. It was slow, unresponsive on mobile, and invisible to search engines. Their competitors were outranking them on every key term, and their conversion rate had dropped below 1%. They needed more than a facelift — they needed a complete digital transformation.\n\nThe internal team had tried incremental updates, but the underlying architecture was too dated to support modern performance standards. Page load times exceeded 8 seconds on mobile, and the CMS was so cumbersome that content updates took days instead of minutes.",
    approach:
      "We started with a deep discovery phase, interviewing stakeholders across sales, marketing, and operations to understand not just their website needs, but their business objectives. From there, we designed a performance-first Next.js architecture with edge caching, image optimization, and a headless CMS that empowered their marketing team to publish content independently.\n\nThe design system we created wasn't just about aesthetics — every component was engineered for conversion. Micro-interactions guided users toward CTAs, the information architecture was restructured based on actual user journey data, and we implemented comprehensive technical SEO from day one.",
    technologies: ["Next.js", "Tailwind CSS", "Sanity CMS", "Vercel", "Google Analytics 4"],
    results: [
      { value: 312, suffix: "%", label: "Organic Traffic Increase", description: "Within 6 months of launch" },
      { value: 4.2, suffix: "x", label: "Conversion Rate", description: "From 0.8% to 3.4%" },
      { value: 1.2, suffix: "s", label: "Page Load Time", description: "Down from 8.3 seconds" },
      { value: 47, suffix: "%", label: "Bounce Rate Reduction", description: "Users engaging with more content" },
    ],
    testimonial: {
      quote: "Modern Web Systems didn't just build us a website — they transformed our entire digital strategy. Our organic traffic increased 312% in six months.",
      name: "Sarah Chen",
      title: "CEO",
      company: "Meridian Corp",
    },
    featured: true,
    gradient: "linear-gradient(135deg, #FF6B00 0%, #FF8533 30%, #1a0a00 100%)",
    heroGradient: "linear-gradient(160deg, #1a0800 0%, #0a0500 40%, #050505 100%)",
  },
  {
    slug: "apex-dynamics-ai-support",
    title: "AI-Powered Customer Support System",
    client: "Apex Dynamics",
    category: "ai",
    description:
      "An intelligent support system that handles 73% of customer inquiries autonomously while improving satisfaction scores.",
    challenge:
      "Apex Dynamics was drowning in support tickets. Their 12-person support team was handling over 2,000 inquiries per week, with average response times exceeding 4 hours. Customer satisfaction had dropped to 71%, and they were losing enterprise clients who expected faster, more consistent service.\n\nPrevious attempts at automation had failed — scripted chatbots frustrated users with rigid, unhelpful responses. Apex needed intelligence, not just automation.",
    approach:
      "We designed a multi-layered AI support system. The first layer uses natural language processing to understand customer intent and route inquiries to the right resolution path. For common questions (billing, account management, product features), the AI resolves the issue directly with personalized, context-aware responses.\n\nFor complex issues, the system intelligently escalates to human agents with a complete context summary — so the customer never has to repeat themselves. We also built a continuous learning pipeline that improves the AI's accuracy with every interaction.",
    technologies: ["OpenAI GPT-4", "LangChain", "Next.js", "PostgreSQL", "Vercel Edge Functions"],
    results: [
      { value: 73, suffix: "%", label: "Autonomous Resolution", description: "Inquiries handled without human intervention" },
      { value: 94, suffix: "%", label: "Satisfaction Score", description: "Up from 71%" },
      { value: 2, suffix: "min", label: "Avg Response Time", description: "Down from 4+ hours" },
      { value: 340, suffix: "K", label: "Annual Savings", description: "In support operations costs" },
    ],
    testimonial: {
      quote: "The AI chatbot they deployed handles 73% of our customer inquiries without human intervention. That's a paradigm shift for our support team.",
      name: "Marcus Webb",
      title: "VP of Operations",
      company: "Apex Dynamics",
    },
    featured: true,
    gradient: "linear-gradient(135deg, #0a1628 0%, #FF6B00 50%, #0a0a0a 100%)",
    heroGradient: "linear-gradient(160deg, #0a0f1a 0%, #08060a 40%, #050505 100%)",
  },
  {
    slug: "velox-systems-automation",
    title: "End-to-End Workflow Automation",
    client: "Velox Systems",
    category: "automation",
    description:
      "A comprehensive automation suite that eliminated 20+ hours of weekly manual work and connected 8 disparate business tools.",
    challenge:
      "Velox Systems ran their operations across 8 different platforms — from Salesforce to QuickBooks to custom spreadsheets. Nothing talked to anything else. Their operations team spent an estimated 20+ hours per week on manual data entry, reconciliation, and reporting.\n\nMonthly reporting alone took three full days because data had to be manually pulled from multiple sources, cross-referenced, and compiled into presentations. Errors were common, and the team was burning out.",
    approach:
      "We mapped every workflow, identified bottlenecks, and designed an integration architecture that connected all 8 platforms through a central automation hub. Using n8n for workflow orchestration and custom APIs where needed, we built automated pipelines for lead routing, invoice processing, inventory updates, and reporting.\n\nThe crown jewel was the real-time analytics dashboard — pulling data from all systems into a unified view that updates automatically. No more manual reporting. No more spreadsheet reconciliation.",
    technologies: ["n8n", "PostgreSQL", "Retool", "Custom APIs", "Salesforce", "QuickBooks"],
    results: [
      { value: 20, suffix: "+hrs", label: "Saved Weekly", description: "Eliminated manual data work" },
      { value: 8, suffix: "", label: "Platforms Connected", description: "Unified into one workflow" },
      { value: 99.7, suffix: "%", label: "Data Accuracy", description: "Up from ~91% with manual entry" },
      { value: 3, suffix: "days→3hrs", label: "Monthly Reporting", description: "From 3 days to 3 hours" },
    ],
    testimonial: {
      quote: "We went from spending three days on monthly reporting to having real-time dashboards that update automatically. The ROI was clear within the first month.",
      name: "Elena Rodriguez",
      title: "Head of Marketing",
      company: "Velox Systems",
    },
    featured: true,
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #0a0a05 0%, #0a0800 40%, #050505 100%)",
  },
  {
    slug: "novabridge-ecommerce",
    title: "AI-Enhanced E-Commerce Platform",
    client: "NovaBridge",
    category: "websites",
    description:
      "A custom e-commerce platform with AI-driven product recommendations that increased average order value by 41%.",
    challenge:
      "NovaBridge was losing ground to competitors with more sophisticated online shopping experiences. Their existing Shopify store was functional but generic — no personalization, no intelligent product recommendations, and a checkout flow that lost 68% of users at the cart stage.\n\nThey needed a platform that felt premium and personalized to each visitor while maintaining the operational simplicity their small team required.",
    approach:
      "We built a custom Next.js commerce frontend with a headless architecture that maintained Shopify as the backend for inventory and orders. The key innovation was the AI recommendation engine — analyzing browsing patterns, purchase history, and product relationships to serve personalized suggestions at every touchpoint.\n\nThe checkout was redesigned with a single-page flow, intelligent address completion, and one-click reordering for returning customers. Every interaction was optimized for conversion without sacrificing the premium brand experience.",
    technologies: ["Next.js", "Shopify Storefront API", "OpenAI", "Vercel", "Tailwind CSS"],
    results: [
      { value: 41, suffix: "%", label: "Avg Order Value Increase", description: "Through AI recommendations" },
      { value: 52, suffix: "%", label: "Cart Abandonment Drop", description: "From 68% to 33%" },
      { value: 2.8, suffix: "x", label: "Revenue Growth", description: "Year-over-year" },
      { value: 89, suffix: "%", label: "Recommendation Accuracy", description: "Users engaging with AI picks" },
    ],
    testimonial: {
      quote: "Working with MWS felt like having a world-class tech team on demand. They understood our business challenges before we even finished explaining them.",
      name: "David Park",
      title: "Founder",
      company: "NovaBridge",
    },
    featured: false,
    gradient: "linear-gradient(135deg, #1a0a00 0%, #0a1a0a 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #0a0a0a 0%, #0a0f0a 40%, #050505 100%)",
  },
  {
    slug: "quantum-reach-analytics",
    title: "Predictive Analytics Dashboard",
    client: "Quantum Reach",
    category: "ai",
    description:
      "A real-time analytics platform with predictive modeling that helped a SaaS company reduce churn by 34%.",
    challenge:
      "Quantum Reach had data everywhere but insights nowhere. Their SaaS platform generated millions of data points daily, but the team was making decisions based on month-old reports and gut feelings. Churn was climbing and they couldn't identify at-risk accounts until it was too late.",
    approach:
      "We built a real-time analytics platform that ingested data from their application, billing system, and support tickets into a unified data pipeline. The predictive churn model analyzed usage patterns, support interactions, and billing signals to flag at-risk accounts weeks before they would cancel.\n\nThe dashboard gave every team — product, sales, and customer success — actionable insights tailored to their role. Custom alerts triggered automated outreach campaigns for at-risk segments.",
    technologies: ["Python", "PostgreSQL", "Retool", "OpenAI", "Custom ML Models", "Next.js"],
    results: [
      { value: 34, suffix: "%", label: "Churn Reduction", description: "Within first quarter" },
      { value: 850, suffix: "K", label: "Revenue Saved", description: "From prevented cancellations" },
      { value: 15, suffix: "days", label: "Early Warning", description: "Average advance notice of at-risk accounts" },
      { value: 92, suffix: "%", label: "Prediction Accuracy", description: "For churn risk scoring" },
    ],
    featured: false,
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #FF6B00 40%, #0a0a0a 100%)",
    heroGradient: "linear-gradient(160deg, #050510 0%, #0a0508 40%, #050505 100%)",
  },
  {
    slug: "stratos-digital-operations",
    title: "Operations Automation Suite",
    client: "Stratos Digital",
    category: "automation",
    description:
      "A full-stack operations automation that connected sales, fulfillment, and finance into one seamless pipeline.",
    challenge:
      "Stratos Digital was a fast-growing agency that had outgrown their manual processes. New client onboarding took 5 days of back-and-forth emails, project tracking lived in spreadsheets, and invoicing was a monthly nightmare that required two full-time staff.\n\nThey were growing at 40% year-over-year but their operations infrastructure was built for a team half their size.",
    approach:
      "We designed an end-to-end operations automation that covered the full client lifecycle: automated onboarding sequences triggered by CRM stage changes, project creation with pre-configured task templates, time tracking integration, and automated invoicing based on project milestones.\n\nThe system reduced onboarding from 5 days to 4 hours and eliminated the need for dedicated invoicing staff entirely.",
    technologies: ["n8n", "Notion API", "Stripe", "HubSpot", "Custom Webhooks", "PostgreSQL"],
    results: [
      { value: 5, suffix: "d→4h", label: "Onboarding Time", description: "From 5 days to 4 hours" },
      { value: 2, suffix: "FTEs", label: "Freed Up", description: "From manual invoicing work" },
      { value: 180, suffix: "K", label: "Annual Savings", description: "In operational costs" },
      { value: 0, suffix: "", label: "Invoicing Errors", description: "Zero errors since automation launch" },
    ],
    featured: false,
    gradient: "linear-gradient(135deg, #1a1a0a 0%, #0a0a0a 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #0a0a05 0%, #050505 60%, #0a0500 100%)",
  },
];

export const WORK_METRICS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "", label: "Industries Served" },
  { value: 2.4, suffix: "M+", label: "Revenue Generated for Clients" },
  { value: 98, suffix: "%", label: "Client Retention Rate" },
];
