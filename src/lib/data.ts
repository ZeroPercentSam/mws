// ─── Client Logos (for trust ticker) ───
export const CLIENT_LOGOS = [
  { name: "Meridian Capital", industry: "Finance" },
  { name: "Voxel Labs", industry: "Technology" },
  { name: "Horizon Health", industry: "Healthcare" },
  { name: "Apex Logistics", industry: "Logistics" },
  { name: "NovaBrew Co.", industry: "F&B" },
  { name: "Stratos Energy", industry: "Energy" },
  { name: "Pinnacle Realty", industry: "Real Estate" },
  { name: "CloudNine SaaS", industry: "SaaS" },
];

// ─── Testimonials ───
export const TESTIMONIALS = [
  {
    quote:
      "Modern Web Systems completely transformed our digital presence. Our leads increased by 340% in the first quarter after launch.",
    name: "Sarah Chen",
    title: "CEO",
    company: "Meridian Capital",
    metric: "340% more leads",
  },
  {
    quote:
      "The AI chatbot they built handles 80% of our customer inquiries automatically. Our support team can finally focus on complex issues.",
    name: "Marcus Thompson",
    title: "COO",
    company: "Horizon Health",
    metric: "80% automated",
  },
  {
    quote:
      "We went from spending 20 hours a week on manual data entry to zero. The automation systems they built are flawless.",
    name: "Elena Rodriguez",
    title: "Operations Director",
    company: "Apex Logistics",
    metric: "20hrs saved/week",
  },
  {
    quote:
      "Their strategic consulting helped us identify $2M in operational savings we didn't even know existed. Incredible ROI.",
    name: "James Park",
    title: "CFO",
    company: "Stratos Energy",
    metric: "$2M saved",
  },
  {
    quote:
      "The website they built us ranks #1 for every major keyword in our market. Revenue from organic traffic tripled.",
    name: "Olivia Foster",
    title: "Marketing Director",
    company: "NovaBrew Co.",
    metric: "3x organic revenue",
  },
  {
    quote:
      "From concept to launch in 6 weeks. Their speed and quality is unmatched. We've already engaged them for three more projects.",
    name: "David Kim",
    title: "CTO",
    company: "CloudNine SaaS",
    metric: "6-week delivery",
  },
];

// ─── Case Studies ───
export const CASE_STUDIES = [
  {
    slug: "meridian-capital-digital-transformation",
    title: "Meridian Capital",
    subtitle: "Complete Digital Transformation",
    category: "Websites",
    industry: "Financial Services",
    heroImage: "/work/meridian.jpg",
    challenge:
      "Meridian Capital's website was built in 2018 and hadn't been updated since. Page load times exceeded 8 seconds, mobile experience was broken, and they were losing potential clients to competitors with modern digital presences.",
    solution:
      "We designed and developed a high-performance Next.js application with AI-powered lead qualification, real-time portfolio analytics dashboards, and a content management system that their team could operate independently.",
    results: [
      { metric: "340%", label: "Increase in Qualified Leads" },
      { metric: "0.8s", label: "Average Page Load Time" },
      { metric: "12x", label: "Organic Search Traffic Growth" },
      { metric: "4.2M", label: "Revenue Attributed to Website" },
    ],
    tags: ["Next.js", "AI Lead Scoring", "SEO", "Analytics Dashboard"],
    testimonial: 0,
    duration: "8 weeks",
    featured: true,
  },
  {
    slug: "horizon-health-ai-automation",
    title: "Horizon Health",
    subtitle: "AI-Powered Patient Experience",
    category: "AI",
    industry: "Healthcare",
    heroImage: "/work/horizon.jpg",
    challenge:
      "Horizon Health's support team was overwhelmed with repetitive patient inquiries. Wait times averaged 45 minutes, satisfaction scores were plummeting, and they were hemorrhaging staff to burnout.",
    solution:
      "We built a HIPAA-compliant AI chatbot that handles appointment scheduling, prescription refills, insurance questions, and symptom triage. The system integrates with their EHR and escalates complex cases to human agents with full context.",
    results: [
      { metric: "80%", label: "Inquiries Automated" },
      { metric: "2min", label: "Average Response Time (from 45min)" },
      { metric: "96%", label: "Patient Satisfaction Score" },
      { metric: "60%", label: "Reduction in Support Costs" },
    ],
    tags: ["AI Chatbot", "HIPAA Compliant", "EHR Integration", "NLP"],
    testimonial: 1,
    duration: "12 weeks",
    featured: true,
  },
  {
    slug: "apex-logistics-workflow-automation",
    title: "Apex Logistics",
    subtitle: "End-to-End Workflow Automation",
    category: "Automation",
    industry: "Logistics & Supply Chain",
    heroImage: "/work/apex.jpg",
    challenge:
      "Apex Logistics relied on manual spreadsheets, emails, and phone calls to coordinate shipments across 200+ routes. Human error caused delivery failures costing $500K annually. Dispatch was 100% manual.",
    solution:
      "We architected a fully automated dispatch and tracking system that integrates with their fleet GPS, warehouse management, and customer portals. AI-powered route optimization reduced fuel costs and delivery times simultaneously.",
    results: [
      { metric: "20hrs", label: "Saved Per Week Per Employee" },
      { metric: "94%", label: "Reduction in Dispatch Errors" },
      { metric: "$1.2M", label: "Annual Cost Savings" },
      { metric: "35%", label: "Faster Average Delivery Time" },
    ],
    tags: ["Workflow Automation", "Route Optimization", "Real-time Tracking", "API Integration"],
    testimonial: 2,
    duration: "16 weeks",
    featured: true,
  },
  {
    slug: "stratos-energy-consulting",
    title: "Stratos Energy",
    subtitle: "Strategic Operations Overhaul",
    category: "Automation",
    industry: "Energy & Utilities",
    heroImage: "/work/stratos.jpg",
    challenge:
      "Stratos Energy had 47 disconnected software tools across departments, creating data silos, duplicate work, and zero visibility into operational efficiency. Leadership couldn't get accurate reports without weeks of manual compilation.",
    solution:
      "We conducted a full operations audit, consolidated their tech stack from 47 tools to 12, built custom integrations between remaining systems, and implemented real-time analytics dashboards for executive decision-making.",
    results: [
      { metric: "$2M", label: "Identified Operational Savings" },
      { metric: "47→12", label: "Tool Consolidation" },
      { metric: "Real-time", label: "Executive Dashboard Reporting" },
      { metric: "3x", label: "Faster Decision-Making Cycles" },
    ],
    tags: ["Operations Consulting", "System Integration", "Analytics", "Process Optimization"],
    testimonial: 3,
    duration: "10 weeks",
    featured: false,
  },
  {
    slug: "novabrew-brand-seo",
    title: "NovaBrew Co.",
    subtitle: "Brand & SEO Domination",
    category: "Websites",
    industry: "Food & Beverage",
    heroImage: "/work/novabrew.jpg",
    challenge:
      "NovaBrew was invisible online. Despite having exceptional products and a loyal local following, they had zero organic search presence and were spending $15K/month on paid ads with diminishing returns.",
    solution:
      "We built a visually stunning e-commerce platform with programmatic SEO, local search optimization, and an AI-powered product recommendation engine. Content strategy included automated blog generation from their product data.",
    results: [
      { metric: "#1", label: "Google Ranking for Core Keywords" },
      { metric: "3x", label: "Organic Revenue Growth" },
      { metric: "$0", label: "Paid Ad Spend (from $15K/mo)" },
      { metric: "425%", label: "Increase in Online Orders" },
    ],
    tags: ["E-commerce", "SEO Strategy", "AI Recommendations", "Brand Identity"],
    testimonial: 4,
    duration: "10 weeks",
    featured: false,
  },
  {
    slug: "cloudnine-saas-platform",
    title: "CloudNine SaaS",
    subtitle: "Rapid Product Launch",
    category: "Websites",
    industry: "Technology / SaaS",
    heroImage: "/work/cloudnine.jpg",
    challenge:
      "CloudNine had a revolutionary SaaS product but no go-to-market presence. They needed a marketing site, onboarding flow, and integration hub built in record time to capitalize on a market window before competitors caught up.",
    solution:
      "We delivered a complete marketing website, interactive product demos, customer onboarding automation, and a developer documentation portal — all in 6 weeks. The site was optimized for conversion with A/B tested landing pages.",
    results: [
      { metric: "6 weeks", label: "Concept to Launch" },
      { metric: "1,200", label: "Signups in First Month" },
      { metric: "8.5%", label: "Landing Page Conversion Rate" },
      { metric: "4.9★", label: "Average User Rating" },
    ],
    tags: ["SaaS Marketing", "Onboarding Automation", "A/B Testing", "Developer Docs"],
    testimonial: 5,
    duration: "6 weeks",
    featured: true,
  },
];

// ─── Team Members ───
export const TEAM = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Former systems architect at Google. 15+ years building enterprise-scale digital products. Obsessed with the intersection of business strategy and technology.",
    specialties: ["Strategy", "Architecture", "AI"],
  },
  {
    name: "Jordan Patel",
    role: "Head of Engineering",
    bio: "Full-stack engineer with a background in distributed systems. Led engineering teams at Stripe and Shopify before joining MWS.",
    specialties: ["React", "Node.js", "Infrastructure"],
  },
  {
    name: "Maya Santos",
    role: "Lead Designer",
    bio: "Award-winning designer specializing in conversion-focused interfaces. Previously at IDEO and Figma. Believes every pixel should earn its place.",
    specialties: ["UI/UX", "Brand", "Motion"],
  },
  {
    name: "Ryan Okoro",
    role: "AI & Automation Lead",
    bio: "Machine learning engineer and automation specialist. Built AI systems processing 100M+ requests daily. Masters in CS from MIT.",
    specialties: ["ML/AI", "NLP", "Automation"],
  },
  {
    name: "Sophia Lin",
    role: "SEO & Growth Strategist",
    bio: "Data-driven growth marketer who's generated $50M+ in organic revenue across 200+ client engagements. Former head of SEO at HubSpot.",
    specialties: ["SEO", "Analytics", "Content"],
  },
  {
    name: "Daniel Okafor",
    role: "Solutions Architect",
    bio: "Systems integration specialist with deep expertise in enterprise workflows. Certified in Salesforce, HubSpot, and 20+ automation platforms.",
    specialties: ["Integration", "CRM", "Workflows"],
  },
];

// ─── Company Values ───
export const VALUES = [
  {
    title: "Results Over Everything",
    description:
      "We don't measure success by deliverables — we measure it by the business impact we create. Every decision is driven by ROI.",
    icon: "target",
  },
  {
    title: "Radical Transparency",
    description:
      "No black boxes, no jargon, no hidden fees. You see everything we do, understand why we do it, and own every asset we create.",
    icon: "eye",
  },
  {
    title: "Relentless Innovation",
    description:
      "We adopt new technology before it becomes mainstream. Our clients gain competitive advantages that others don't even know exist yet.",
    icon: "bolt",
  },
  {
    title: "Partnership, Not Vendor",
    description:
      "We don't disappear after launch. We embed ourselves in your growth journey, continuously optimizing and scaling what we build.",
    icon: "handshake",
  },
];

// ─── Company Timeline ───
export const TIMELINE = [
  {
    year: "2019",
    title: "Founded",
    description: "Started as a boutique web development studio with 2 clients and a mission to build websites that actually drive revenue.",
  },
  {
    year: "2020",
    title: "AI Integration",
    description: "Became one of the first agencies to integrate AI into client websites and business systems, delivering measurable automation ROI.",
  },
  {
    year: "2021",
    title: "50+ Clients",
    description: "Crossed 50 active clients across finance, healthcare, logistics, and SaaS. Expanded team to 12 specialists.",
  },
  {
    year: "2022",
    title: "Automation Division",
    description: "Launched dedicated automation consulting practice, helping enterprises eliminate operational inefficiency at scale.",
  },
  {
    year: "2023",
    title: "$10M+ Client Revenue",
    description: "Our clients collectively generated over $10M in revenue directly attributable to systems and websites we built.",
  },
  {
    year: "2024",
    title: "AI-First Agency",
    description: "Restructured as an AI-first consultancy, embedding intelligent systems into every service offering.",
  },
  {
    year: "2025",
    title: "The Future",
    description: "Expanding globally with enterprise partnerships, proprietary AI tools, and a relentless focus on client transformation.",
  },
];

// ─── Service Detail Pages ───
export const SERVICE_DETAILS = [
  {
    slug: "websites",
    title: "Powerful Websites",
    subtitle: "Built for Performance. Designed for Conversion.",
    description:
      "Every website we build is a revenue engine — blazing fast, search-optimized, and designed to convert visitors into customers. No templates, no compromises.",
    features: [
      {
        title: "Performance-First Architecture",
        description:
          "Sub-second load times with Next.js, edge caching, and optimized asset delivery. Speed isn't a feature — it's the foundation.",
        icon: "zap",
      },
      {
        title: "SEO from the Ground Up",
        description:
          "Technical SEO, structured data, programmatic content, and performance optimization that puts you at the top of search results.",
        icon: "search",
      },
      {
        title: "Conversion-Optimized Design",
        description:
          "Every element is tested and refined to guide visitors toward action. A/B tested layouts, strategic CTAs, and friction-free user flows.",
        icon: "target",
      },
      {
        title: "CMS & Content Management",
        description:
          "Headless CMS integration that gives your team full control over content without touching code. Update, publish, and iterate independently.",
        icon: "edit",
      },
      {
        title: "Responsive & Accessible",
        description:
          "Pixel-perfect on every device, WCAG 2.1 AA compliant, and built with progressive enhancement for maximum reach.",
        icon: "device",
      },
      {
        title: "Analytics & Insights",
        description:
          "Real-time dashboards showing exactly how your site performs. Traffic, conversions, revenue attribution — all in one place.",
        icon: "chart",
      },
    ],
    stats: [
      { value: "0.8s", label: "Avg. Load Time" },
      { value: "95+", label: "Lighthouse Score" },
      { value: "3x", label: "More Conversions" },
    ],
    process: [
      "Discovery & UX research",
      "Wireframing & architecture",
      "Visual design & prototyping",
      "Development & integration",
      "Testing & optimization",
      "Launch & monitoring",
    ],
    caseStudySlugs: ["meridian-capital-digital-transformation", "novabrew-brand-seo", "cloudnine-saas-platform"],
  },
  {
    slug: "ai",
    title: "AI Intelligence",
    subtitle: "Smarter Systems. Sharper Decisions.",
    description:
      "We don't just talk about AI — we deploy it. From intelligent chatbots to predictive analytics, we build AI systems that give your business an unfair advantage.",
    features: [
      {
        title: "AI Chatbots & Virtual Agents",
        description:
          "Conversational AI that qualifies leads, handles support, and books meetings — 24/7, with human-level understanding.",
        icon: "bot",
      },
      {
        title: "Predictive Analytics",
        description:
          "Machine learning models that forecast demand, identify churn risk, and surface opportunities before your competitors see them.",
        icon: "brain",
      },
      {
        title: "Personalization Engines",
        description:
          "Dynamic content and product recommendations powered by user behavior analysis. Every visitor gets a tailored experience.",
        icon: "user",
      },
      {
        title: "Document Intelligence",
        description:
          "Automated document processing, data extraction, and classification. Turn unstructured data into actionable insights.",
        icon: "file",
      },
      {
        title: "Competitive Intelligence",
        description:
          "AI-powered market monitoring that tracks competitor pricing, content, and positioning in real-time.",
        icon: "eye",
      },
      {
        title: "Custom Model Training",
        description:
          "Fine-tuned AI models trained on your specific data, industry, and use cases for maximum accuracy and relevance.",
        icon: "cpu",
      },
    ],
    stats: [
      { value: "80%", label: "Task Automation" },
      { value: "24/7", label: "Availability" },
      { value: "10x", label: "Faster Processing" },
    ],
    process: [
      "Data audit & opportunity mapping",
      "Model selection & architecture",
      "Training & fine-tuning",
      "Integration & deployment",
      "Monitoring & optimization",
      "Scaling & expansion",
    ],
    caseStudySlugs: ["horizon-health-ai-automation"],
  },
  {
    slug: "automation",
    title: "Automation & Systems",
    subtitle: "Eliminate Busywork. Scale Without Limits.",
    description:
      "We architect the systems that let your business run on autopilot. From CRM pipelines to invoice processing, every manual process is a candidate for automation.",
    features: [
      {
        title: "Workflow Automation",
        description:
          "End-to-end process automation that connects your tools, eliminates manual work, and scales with your business.",
        icon: "flow",
      },
      {
        title: "System Integration",
        description:
          "Seamless connections between 500+ tools and platforms. No more copy-pasting between apps or maintaining spreadsheet bridges.",
        icon: "link",
      },
      {
        title: "CRM & Sales Automation",
        description:
          "Automated lead scoring, pipeline management, follow-up sequences, and reporting that keeps your sales machine running.",
        icon: "funnel",
      },
      {
        title: "Operations Dashboard",
        description:
          "Real-time visibility into every automated process. Track throughput, catch errors, and optimize continuously.",
        icon: "dashboard",
      },
      {
        title: "Data Pipeline Engineering",
        description:
          "Reliable data pipelines that clean, transform, and deliver data where it's needed — on time, every time.",
        icon: "database",
      },
      {
        title: "Custom API Development",
        description:
          "Bespoke APIs that bridge gaps between systems, enable new integrations, and future-proof your tech stack.",
        icon: "code",
      },
    ],
    stats: [
      { value: "40%", label: "Cost Reduction" },
      { value: "500+", label: "Tool Integrations" },
      { value: "99.9%", label: "Uptime SLA" },
    ],
    process: [
      "Process mapping & audit",
      "Automation architecture",
      "Integration development",
      "Testing & validation",
      "Deployment & training",
      "Ongoing optimization",
    ],
    caseStudySlugs: ["apex-logistics-workflow-automation", "stratos-energy-consulting"],
  },
];

// ─── Blog Posts ───
export const BLOG_POSTS = [
  {
    slug: "why-your-website-is-costing-you-money",
    title: "Why Your Website Is Costing You Money (And What to Do About It)",
    excerpt:
      "If your website takes more than 3 seconds to load, you're losing 53% of mobile visitors. Here's the performance playbook we use to build sites that convert.",
    category: "Websites",
    readTime: "7 min",
    date: "2025-12-15",
    featured: true,
  },
  {
    slug: "ai-chatbots-vs-traditional-support",
    title: "AI Chatbots vs. Traditional Support: The Numbers Don't Lie",
    excerpt:
      "We analyzed 10,000 customer interactions across our client base. AI chatbots resolved issues 4x faster with higher satisfaction scores. Here's the data.",
    category: "AI",
    readTime: "10 min",
    date: "2025-11-28",
    featured: true,
  },
  {
    slug: "automation-roi-calculator",
    title: "The True ROI of Business Automation (With Real Numbers)",
    excerpt:
      "Most businesses underestimate automation ROI by 60%. We break down the hidden savings in time, error reduction, and opportunity cost.",
    category: "Automation",
    readTime: "8 min",
    date: "2025-11-10",
    featured: false,
  },
  {
    slug: "seo-is-not-dead",
    title: "SEO Isn't Dead — You're Just Doing It Wrong",
    excerpt:
      "AI overviews, zero-click searches, and algorithm updates haven't killed SEO. But the old playbook is obsolete. Here's what works in 2025.",
    category: "Websites",
    readTime: "12 min",
    date: "2025-10-22",
    featured: true,
  },
  {
    slug: "from-47-tools-to-12",
    title: "How We Helped a Company Go From 47 Tools to 12 (And Saved $2M)",
    excerpt:
      "A deep dive into our operations audit methodology and how consolidating a bloated tech stack unlocked millions in savings for Stratos Energy.",
    category: "Automation",
    readTime: "15 min",
    date: "2025-10-05",
    featured: false,
  },
  {
    slug: "next-js-vs-wordpress-2025",
    title: "Next.js vs WordPress in 2025: A Data-Driven Comparison",
    excerpt:
      "We rebuilt 5 WordPress sites in Next.js and tracked everything. Load times, SEO rankings, conversion rates, maintenance costs — here are the results.",
    category: "Websites",
    readTime: "9 min",
    date: "2025-09-18",
    featured: false,
  },
];

// ─── Pricing Tiers ───
export const PRICING_TIERS = [
  {
    name: "Launch",
    description: "For businesses ready to establish a powerful digital presence.",
    price: "8K",
    priceNote: "starting at",
    highlight: false,
    features: [
      "Custom website (up to 8 pages)",
      "Mobile-responsive design",
      "Basic SEO optimization",
      "Contact form & lead capture",
      "Analytics dashboard setup",
      "30-day post-launch support",
      "CMS integration",
    ],
    cta: "Get Started",
    ideal: "Startups & small businesses",
  },
  {
    name: "Growth",
    description: "For businesses ready to accelerate with AI and automation.",
    price: "25K",
    priceNote: "starting at",
    highlight: true,
    features: [
      "Everything in Launch, plus:",
      "AI chatbot integration",
      "Advanced SEO & content strategy",
      "Workflow automation (up to 5 flows)",
      "CRM integration & setup",
      "A/B testing framework",
      "90-day optimization & support",
      "Monthly performance reports",
    ],
    cta: "Most Popular",
    ideal: "Growing companies",
  },
  {
    name: "Enterprise",
    description: "For organizations requiring full-scale digital transformation.",
    price: "Custom",
    priceNote: "tailored to scope",
    highlight: false,
    features: [
      "Everything in Growth, plus:",
      "Custom AI model development",
      "Enterprise system integration",
      "Unlimited automation workflows",
      "Dedicated account manager",
      "Priority support & SLA",
      "Quarterly strategy reviews",
      "Custom analytics & BI dashboards",
    ],
    cta: "Contact Us",
    ideal: "Enterprise & scale-ups",
  },
];

// ─── FAQ ───
export const FAQ = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects are delivered in 6-16 weeks depending on complexity. A marketing website typically takes 6-8 weeks, while a full automation suite can take 12-16 weeks. We provide detailed timelines during the discovery phase.",
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer:
      "We work with growth-stage startups, mid-market companies, and enterprises. Our sweet spot is businesses generating $1M-$50M in revenue who are ready to invest in technology as a competitive advantage.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We're technology-agnostic but have strong preferences for proven, scalable tools: Next.js, React, TypeScript, Node.js, Python for AI/ML, and best-in-class automation platforms. We choose the stack that best fits your needs.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Every project includes post-launch support (30-90 days depending on tier). We also offer retainer packages for ongoing optimization, feature development, and strategic consulting.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We define clear KPIs during discovery — revenue growth, cost reduction, time saved, conversion rates — and track them rigorously. You get dashboards showing exactly how our work is impacting your business.",
  },
  {
    question: "What makes you different from other agencies?",
    answer:
      "We're not a traditional agency. We combine business consulting, AI engineering, and automation expertise under one roof. We don't just build — we architect systems designed for measurable business impact.",
  },
];

// ─── Navigation ───
export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services/websites" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];
