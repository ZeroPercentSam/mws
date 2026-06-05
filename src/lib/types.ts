export interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  description?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: "websites" | "ecommerce" | "platforms";
  industry?: string;
  description: string;
  challenge: string;
  approach: string;
  technologies: string[];
  results: MetricItem[];
  testimonial?: Testimonial;
  liveUrl?: string;
  featured: boolean;
  gradient: string;
  heroGradient: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export interface ServiceDetail {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  features: Array<{ title: string; description: string; icon: string }>;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string; // CSS gradient for avatar
  socials?: { linkedin?: string; twitter?: string };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ClientLogo {
  name: string;
  abbreviation?: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "websites" | "ai" | "automation" | "strategy";
  author: string;
  authorRole: string;
  date: string; // ISO date string
  readTime: string;
  gradient: string;
  featured: boolean;
  content: BlogSection[];
  relatedSlugs?: string[];
}

export interface BlogSection {
  type: "paragraph" | "heading" | "subheading" | "list" | "callout" | "stat" | "quote";
  text?: string;
  items?: string[];
  stat?: { value: string; label: string };
  source?: string;
}
