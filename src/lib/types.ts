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
  category: "websites" | "ai" | "automation";
  description: string;
  challenge: string;
  approach: string;
  technologies: string[];
  results: MetricItem[];
  testimonial?: Testimonial;
  featured: boolean;
  gradient: string; // CSS gradient for abstract thumbnail
  heroGradient: string; // CSS gradient for hero section
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
