import type { CaseStudy } from "@/lib/types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "alpha-gentlemen-suits",
    title: "AI-Powered Bespoke Suit Configurator",
    client: "Alpha Gentlemen Suits",
    category: "ecommerce",
    industry: "Luxury Fashion",
    description:
      "A luxury e-commerce platform with AI-powered virtual try-on, camera-based body measurement, and an interactive suit configurator spanning 280+ premium fabric swatches.",
    challenge:
      "Alpha Gentlemen Suits needed a digital platform that could replicate the experience of walking into a high-end tailor — fabric selection, style customization, and precise fit — all through a screen. Off-the-shelf e-commerce platforms couldn't handle the complexity of a multi-panel suit configurator with real-time fabric previews, let alone AI-driven features like virtual try-on and body measurement.\n\nThe brand also needed to showcase 280+ fabric swatches from Italian and English mills (Holland & Sherry, Regio Italia, Savile Row London) with the visual fidelity that luxury buyers expect, while managing a membership system and admin portal for the business side.",
    approach:
      "We built a full custom Next.js application with an interactive multi-panel suit configurator — fabric selection with swatch filtering by collection and origin, style customization for lapels, buttons, trousers, and vests across 23 configurable options, and an accents panel for final touches.\n\nThe standout features are the three AI-powered tools: a virtual try-on system where users upload a photo and see the designed suit rendered on them, a camera-based body measurement tool that captures dimensions through the browser, and a smart quiz that guides users to their ideal fit. The platform includes a looks gallery for inspiration, a membership tier system, user authentication, and a full admin panel.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "OpenAI", "React"],
    results: [
      { value: 280, suffix: "+", label: "Fabric Swatches", description: "From Italian and English mills" },
      { value: 23, suffix: "", label: "Customization Options", description: "Full multi-panel configurator" },
      { value: 3, suffix: "", label: "AI-Powered Tools", description: "Virtual try-on, measurement, smart quiz" },
      { value: 20, suffix: "+", label: "Pages Shipped", description: "Configurator, looks, fabric guide, admin" },
    ],
    liveUrl: "https://ags-website-sams-projects-4db6d193.vercel.app",
    featured: true,
    gradient: "linear-gradient(135deg, #1a1a0a 0%, #2a1f00 30%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #0a0a05 0%, #1a1200 40%, #050505 100%)",
  },
  {
    slug: "exotics-by-the-bay",
    title: "Exotic Car Rental Fleet Platform",
    client: "Exotics By The Bay",
    category: "websites",
    industry: "Luxury Automotive",
    description:
      "A 28-page exotic car rental platform with fleet catalog, vehicle detail pages, multi-city booking across Florida, and premium add-on services including jets, yachts, and sprinters.",
    challenge:
      "Exotics By The Bay operates a fleet of high-end vehicles — Lamborghinis, Rolls Royces, Porsches, Ferraris — across three Florida locations (Tampa, Miami, Orlando). They needed a platform that showcased their fleet with the visual impact these vehicles deserve, while handling the operational complexity of multi-city availability, door/hotel/airport delivery options, and a growing range of premium services beyond cars.\n\nThe previous web presence didn't convey the luxury experience their clients expect, and there was no way to browse the fleet with real specifications, filter by brand, or explore the full service menu including private jets, yacht rentals, and wedding packages.",
    approach:
      "We designed a 28+ page platform built around the fleet experience. Each vehicle has a dedicated detail page with specifications (horsepower, engine type, daily rate), high-resolution photography, and direct booking CTAs. The fleet catalog supports brand-based filtering for quick browsing.\n\nBeyond the core fleet, we built dedicated pages for each premium service — jets, yachts, Sprinter rentals, wedding packages, and airport transfers — plus location-specific landing pages for Tampa, Miami, and Orlando with local contact info and delivery details. Google Analytics and Tag Manager integration provides full visibility into visitor behavior and conversion paths.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "Google Analytics", "Google Tag Manager"],
    results: [
      { value: 28, suffix: "+", label: "Pages Built", description: "Fleet, locations, services, blog" },
      { value: 15, suffix: "+", label: "Vehicles Listed", description: "With individual detail pages" },
      { value: 3, suffix: "", label: "Florida Locations", description: "Tampa, Miami, Orlando" },
      { value: 6, suffix: "", label: "Service Categories", description: "Cars, jets, yachts, sprinters, weddings, airport" },
    ],
    liveUrl: "https://exoticsbythebay.co",
    featured: true,
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #1a0a00 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #050510 0%, #0a0500 40%, #050505 100%)",
  },
  {
    slug: "purity-science",
    title: "License-Gated Pharmaceutical Platform",
    client: "Purity Science",
    category: "ecommerce",
    industry: "Pharmaceutical",
    description:
      "A B2B pharmaceutical e-commerce platform with license verification gating, COA per batch, 7-year lot tracking, and state-level compliance blocking for regulated peptide distribution.",
    challenge:
      "Purity Science supplies pharmaceutical-grade peptides to licensed clinics, medspas, and pharmacies. This isn't standard e-commerce — every transaction requires verification that the buyer holds an active medical or pharmacy license, product pricing must be hidden from unlicensed visitors, and every batch needs a Certificate of Analysis (COA) with HPLC purity, endotoxin levels, and mass spectrometry data.\n\nBeyond the storefront, the platform needed to block orders to states where certain compounds are restricted, maintain a 7-year chain of custody for every lot in the customer portal, and present all of this within a regulatory-compliant interface that builds trust with healthcare professionals.",
    approach:
      "We built a gated B2B platform where account access requires manual license verification with next-business-day turnaround. Product pricing is locked until credentials are verified. The product catalog covers 11 SKUs across growth, repair, and cosmetic categories, each with lot-specific COAs accessible through the customer portal.\n\nThe compliance layer includes automated order blocking by destination state, comprehensive regulatory disclaimers throughout, and cold-chain shipping logistics integrated into the fulfillment flow. The design emphasizes trust and professionalism — sample COAs displayed prominently, monospaced SKU codes, and clean medical aesthetics throughout.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "PostgreSQL", "React"],
    results: [
      { value: 11, suffix: "", label: "Product SKUs", description: "Across growth, repair, and cosmetic" },
      { value: 7, suffix: "yr", label: "Lot Tracking", description: "Chain of custody in customer portal" },
      { value: 99.4, suffix: "%", label: "Purity Standard", description: "HPLC verified per batch" },
      { value: 12, suffix: "", label: "Pages Built", description: "Products, science, compliance, portal" },
    ],
    liveUrl: "https://purityscience.com",
    featured: true,
    gradient: "linear-gradient(135deg, #FF6B00 0%, #FF8533 30%, #1a0a00 100%)",
    heroGradient: "linear-gradient(160deg, #1a0800 0%, #0a0500 40%, #050505 100%)",
  },
  {
    slug: "adare-wellness",
    title: "Luxury Longevity & Wellness Practice",
    client: "ADARE",
    category: "websites",
    industry: "Luxury Healthcare",
    description:
      "An ultra-premium concierge wellness practice website with 4 membership tiers, 6 service protocols, gender-segmented experiences, and privacy-first messaging.",
    challenge:
      "ADARE is an invitation-only longevity and wellness practice in Tampa Bay serving high-net-worth clients — venture capital partners, technology executives, professional athletes. The digital presence needed to communicate the same level of exclusivity and discretion as the practice itself, with Swiss-bank-level privacy messaging, membership tier pricing from $15K to $45K+ annually, and service descriptions that balance medical authority with luxury brand aesthetics.\n\nThe practice offers six distinct protocols (Cellular Optimization, Hormone Intelligence, Regenerative Aesthetics, Longevity Science, Peptide Protocols, Concierge Medicine) and needed gender-specific pages that speak directly to the different wellness journeys of male and female clients.",
    approach:
      "We designed an ultra-luxury website using Cormorant serif typography and a sophisticated dark palette that signals prestige from the first viewport. The language mirrors private banking — 'principals,' 'bespoke,' 'by introduction only' — reinforcing the invitation-based model.\n\nThe information architecture spans 10+ pages including dedicated service protocol pages, gender-specific pathways (For Men / For Women), a membership tier comparison with four levels, and comprehensive privacy messaging covering HIPAA compliance, private billing, NDA-bound staff, encrypted communications, and private entrances. The consultation request flow is designed to qualify prospects while maintaining the exclusive positioning.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "React"],
    results: [
      { value: 45, suffix: "K+", label: "Top Membership Tier", description: "Annual concierge wellness program" },
      { value: 6, suffix: "", label: "Service Protocols", description: "Cellular to concierge medicine" },
      { value: 10, suffix: "+", label: "Pages Shipped", description: "Services, membership, gender paths" },
      { value: 4, suffix: "", label: "Membership Tiers", description: "Essential through Bespoke" },
    ],
    liveUrl: "https://adaresite-sams-projects-4db6d193.vercel.app",
    featured: true,
    gradient: "linear-gradient(135deg, #0a1628 0%, #FF6B00 50%, #0a0a0a 100%)",
    heroGradient: "linear-gradient(160deg, #0a0f1a 0%, #08060a 40%, #050505 100%)",
  },
  {
    slug: "jmi-capital",
    title: "Real Estate Investment Platform",
    client: "JMI Capital",
    category: "platforms",
    industry: "Real Estate Investment",
    description:
      "A vertically integrated residential real estate investment platform with investor portal, deal flow management, and market data visualization for Jackson, Mississippi.",
    challenge:
      "JMI Capital (Jackson MS Investments) is a vertically integrated real estate firm founded in 2023 by Victor Bartley, focused on renovating and stabilizing single-family residences in Jackson, Mississippi. They needed a platform that serves two audiences: prospective investors evaluating the opportunity, and existing investors tracking their portfolio.\n\nThe platform needed to present compelling market thesis data (housing shortage projections, SFR rent growth, capital velocity metrics) alongside a secure investor portal for viewing live deal flow, submitting applications, and tracking property delivery progress across 110+ properties.",
    approach:
      "We built a dual-purpose platform: a public-facing investment thesis site and a gated investor portal. The public site presents the market opportunity with data visualizations — population trends, housing supply gaps, and JMI's track record metrics. A 9-step property lifecycle process page walks prospects through the full acquisition-to-exit workflow.\n\nThe authenticated section includes an investor login portal, deal viewing dashboard, and application flow for new investors. Property showcase galleries display renovated homes with before/after context. The design is corporate and data-forward — numbered sections, large heading typography, and statistics-first layouts that let the numbers build the case.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "PostgreSQL", "React"],
    results: [
      { value: 110, suffix: "+", label: "Properties Delivered", description: "Across Jackson, Mississippi" },
      { value: 80, suffix: "+", label: "Investor Network", description: "Active investor base" },
      { value: 9, suffix: "", label: "Lifecycle Steps", description: "Full property pipeline process" },
      { value: 11, suffix: "", label: "Pages Built", description: "Public site + investor portal" },
    ],
    liveUrl: "https://jmicapital.com",
    featured: false,
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #0a0a05 0%, #0a0800 40%, #050505 100%)",
  },
  {
    slug: "luxury-boutique",
    title: "Authenticated Luxury Marketplace",
    client: "Luxury Boutique",
    category: "ecommerce",
    industry: "Luxury Resale",
    description:
      "A pre-owned luxury marketplace with 6-stage authentication, 54 designer brands, tiered consignment payouts, and concierge service including in-home pickup.",
    challenge:
      "Luxury Boutique is an authenticated pre-owned luxury marketplace and consignment platform. The challenge was building a platform that instills the trust needed for five- and six-figure transactions in pre-owned luxury goods — Hermès, Chanel, Rolex, Patek Philippe, Richard Mille, and 49 other designer brands.\n\nThe platform needed to communicate authentication credibility through a rigorous verification process, support a tiered consignment system with commission structures that scale based on item value and seller loyalty, and deliver the editorial luxury aesthetic that high-end buyers expect. Press credibility from Vogue, Financial Times, and T Magazine needed prominent placement.",
    approach:
      "We built a full marketplace experience across 8+ pages. The core trust mechanism is a prominently featured 6-stage authentication process covering hardware, stitching, stamps, and materials with documentation. The consignment system supports tiered commissions — 30-90% seller payout based on price tier and brand category, with Silver/Gold/Platinum loyalty bonuses adding 2-6%.\n\nShopping categories span handbags, watches, jewelry, men's, women's, accessories, new arrivals, and sale items. A full 54-brand designer directory organizes the catalog. The concierge service includes in-home pickup for sellers. Payment options include direct deposit, check, or store credit with a 10% bonus incentive.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "React"],
    results: [
      { value: 54, suffix: "", label: "Designer Brands", description: "Hermès, Chanel, Rolex, and more" },
      { value: 6, suffix: "", label: "Auth Stages", description: "Hardware, stitching, stamps, materials" },
      { value: 8, suffix: "+", label: "Shopping Categories", description: "Handbags, watches, jewelry, apparel" },
      { value: 3, suffix: "", label: "Payout Options", description: "Direct deposit, check, store credit" },
    ],
    liveUrl: "https://luxuryboutique-sams-projects-4db6d193.vercel.app",
    featured: false,
    gradient: "linear-gradient(135deg, #1a0a00 0%, #0a1a0a 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #0a0a0a 0%, #0a0f0a 40%, #050505 100%)",
  },
  {
    slug: "osint4all",
    title: "OSINT Intelligence Directory",
    client: "OSINT4ALL",
    category: "platforms",
    industry: "Cybersecurity",
    description:
      "A searchable intelligence directory cataloging 1,411 OSINT tools across 77 categories with live/dead status tracking and jump navigation for investigators and security researchers.",
    challenge:
      "The open-source intelligence community relies on fragmented bookmark collections and start.me pages to track the hundreds of tools available for investigation work. These resources are difficult to search, impossible to verify for uptime, and poorly organized for the breadth of disciplines they cover — from social media forensics to cryptocurrency tracing to satellite imagery analysis.\n\nThe project needed to transform a sprawling bookmark collection into a proper web application with structured categories, real-time status verification, and the information density that OSINT professionals require.",
    approach:
      "We rebuilt the original start.me collection as a purpose-built Next.js application with 77 structured categories spanning communication, identity, social media platforms (Facebook, Twitter, YouTube, Reddit, LinkedIn, Instagram, Discord, Twitch, Telegram), technical infrastructure (Domain/IP/DNS, Search Engines), threat intelligence, cryptocurrency, IoT, public records, government databases, and more.\n\nEach of the 1,411 tools includes a description, direct URL link, and a status indicator (green/live, red/dead, yellow/unverified). The single-page architecture with jump-to-category navigation prioritizes information density and fast scanning — the design is deliberately utilitarian, optimizing for usability over decoration.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "React"],
    results: [
      { value: 1411, suffix: "", label: "Tools Cataloged", description: "With descriptions and direct links" },
      { value: 77, suffix: "", label: "Categories", description: "From social media to cryptocurrency" },
      { value: 1219, suffix: "", label: "Verified Live", description: "With real-time status tracking" },
      { value: 159, suffix: "", label: "Dead Tools Flagged", description: "Transparently marked" },
    ],
    liveUrl: "https://osint4all-sams-projects-4db6d193.vercel.app",
    featured: true,
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #0a0a1a 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #050a05 0%, #05050a 40%, #050505 100%)",
  },
  {
    slug: "lubecision",
    title: "FDA Medical Device Marketing Platform",
    client: "Lubecision",
    category: "websites",
    industry: "Medical Devices",
    description:
      "A regulatory-compliant marketing website for a medical device company pursuing FDA 510(k) clearance, with structured data markup, audience segmentation, and investigational disclaimers.",
    challenge:
      "Lubecision is developing a phospholipid anti-stick solution for electrosurgical and da Vinci robotic instrument tips — a medical device category that requires careful regulatory positioning. The website needed to present product information and clinical evidence while maintaining strict compliance with FDA regulations for investigational devices not yet cleared for market.\n\nThe platform also needed to serve two distinct audiences — surgeons evaluating the technology for clinical use, and procurement teams evaluating it for institutional purchase — with tailored messaging and conversion paths for each.",
    approach:
      "We built an 8+ page platform with schema.org structured data (MedicalDevice type) embedded throughout for search engine comprehension. Audience segmentation drives the information architecture — dedicated pathways for surgeons (clinical evidence, AORN surgical-energy-safety guidance) and procurement teams (specifications, institutional pricing) with distinct CTAs.\n\nRegulatory compliance is woven into every page — investigational device disclaimers, FDA non-approval statements, and proper handling of market data (2.7M+ da Vinci procedures in 2024, 17% annual growth, 7,500+ systems worldwide). The design balances clinical authority with accessibility, using a deep navy palette and clean typography that builds institutional trust.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "Schema.org", "React"],
    results: [
      { value: 2.7, suffix: "M+", label: "Market Procedures", description: "da Vinci procedures in 2024 alone" },
      { value: 2, suffix: "", label: "Buyer Personas", description: "Surgeons and procurement paths" },
      { value: 8, suffix: "+", label: "Pages Shipped", description: "Product, science, compliance, legal" },
      { value: 510, suffix: "(k)", label: "FDA Pathway", description: "Regulatory-compliant positioning" },
    ],
    liveUrl: "https://lubecision.com",
    featured: false,
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #0f1b3d 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #050510 0%, #0a0f1a 40%, #050505 100%)",
  },
  {
    slug: "clariven-labs",
    title: "Research Peptide Catalog & Portal",
    client: "Clariven Labs",
    category: "ecommerce",
    industry: "Peptide Research",
    description:
      "A B2B research peptide supplier platform with 50+ formulations across 8 therapeutic categories, consultation booking, client portal, and institutional audience segmentation.",
    challenge:
      "Clariven Labs supplies research-grade peptides to academic labs, biotech companies, CROs, and research institutions. The platform needed to present a 50+ peptide catalog organized by therapeutic research category while maintaining strict 'For Research Use Only' compliance messaging throughout. The catalog spans metabolic, growth hormone, tissue & repair, longevity, cognitive & neuroscience, immunology, bioregulators, and premium blends.\n\nBeyond the catalog, the platform needed to serve four distinct customer segments — academic labs, biotech & industry, research institutions, and enterprise — each with different ordering workflows and compliance requirements. A client portal for existing customers and a consultation booking flow for new prospects were essential.",
    approach:
      "We built a 20+ page platform with a category-filtered product catalog supporting individual product pages with detailed specifications. The 'Who We Serve' segmentation drives four distinct pathways with tailored messaging for each institutional type.\n\nThe consultation request form includes a dropdown for institution type (University/Academic Lab, Biotech/CRO, Research Institution, Other) to route inquiries effectively. Trust indicators are badge-style (≥98% Purity, cGMP Certified, USA Made, COA Verified) and appear consistently throughout. Animated stat counters (5M+ vials shipped, 99.7% order accuracy, 2hr avg response time) reinforce operational credibility.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "React"],
    results: [
      { value: 50, suffix: "+", label: "Peptide Formulations", description: "Across 8 research categories" },
      { value: 20, suffix: "+", label: "Pages Built", description: "Catalog, portal, segments, quality" },
      { value: 4, suffix: "", label: "Customer Segments", description: "Academic, biotech, research, enterprise" },
      { value: 99.7, suffix: "%", label: "Order Accuracy", description: "Operational metric displayed" },
    ],
    liveUrl: "https://clarivenlabs.com",
    featured: false,
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #0a1628 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #050505 0%, #0a0f1a 40%, #050505 100%)",
  },
  {
    slug: "queen-creek-offering",
    title: "Interactive Investment Deal Room",
    client: "Queen Creek",
    category: "platforms",
    industry: "Real Estate Investment",
    description:
      "A private investment offering platform with a live interactive financial calculator, waterfall distribution visualization, and capital stack analysis for a luxury Arizona build.",
    challenge:
      "Victor Bartley needed a private deal room for a luxury home build in Queen Creek, Arizona — a single-asset investment offering with a $3.45M capital stack, 14-month execution timeline, and exactly two investors at $450K each. The platform needed to present the financial structure with enough transparency and interactivity to close sophisticated investors, while maintaining proper securities disclosure language.\n\nThe key requirement was an interactive financial calculator that let prospective investors adjust assumptions (project costs, financing terms, exit price, timeline) and see the waterfall distribution recalculate in real-time — replacing the static spreadsheets typically used in private placement discussions.",
    approach:
      "We built a single-page deal room with anchor-based navigation across Market, Calculator, Allocation, Team, and Contact sections. The centerpiece is the live financial calculator with adjustable sliders for project costs, financing terms, exit price, and timeline that recalculates the waterfall distribution in real-time with a PDF baseline comparison and reset-to-baseline functionality.\n\nThe capital stack visualization breaks down the $3.45M structure ($850K lot, $2.6M build, $2.76M senior loan at 80% LTC/10%, $690K investor down, $200K draw buffer). Market data contextualizes the opportunity — Queen Creek population growth of 76%, luxury homes >$1M surging from 42 to 219 (421% increase). Team profiles with photos and a comprehensive investment disclaimer round out the package.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "React"],
    results: [
      { value: 3.45, suffix: "M", label: "Capital Stack", description: "Lot, build, senior loan, investor equity" },
      { value: 14, suffix: "mo", label: "Execution Timeline", description: "From acquisition to exit" },
      { value: 77.8, suffix: "%", label: "Projected ROI", description: "Per investor allocation" },
      { value: 1, suffix: "", label: "Live Calculator", description: "Interactive waterfall recalculation" },
    ],
    liveUrl: "https://queencreek-offering-sams-projects-4db6d193.vercel.app",
    featured: false,
    gradient: "linear-gradient(135deg, #1a1a0a 0%, #0a0a0a 50%, #FF6B00 100%)",
    heroGradient: "linear-gradient(160deg, #0a0a05 0%, #050505 60%, #0a0500 100%)",
  },
];

export const WORK_METRICS = [
  { value: 16, suffix: "+", label: "Projects Shipped" },
  { value: 8, suffix: "", label: "Industries Served" },
  { value: 10, suffix: "", label: "Live Client Businesses" },
  { value: 200, suffix: "+", label: "Pages Built" },
];
