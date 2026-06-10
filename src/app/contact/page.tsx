"use client";

import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import ContactForm from "@/components/form/ContactForm";
import Accordion from "@/components/ui/Accordion";
import type { FAQItem } from "@/lib/types";

const CONTACT_FAQ: FAQItem[] = [
  {
    question: "What happens after I submit this form?",
    answer:
      "You'll get a confirmation email within minutes. Within 24 hours, a team member will review your project details and reach out to schedule a free 30-minute strategy call.",
  },
  {
    question: "Is the initial consultation free?",
    answer:
      "Yes. The first strategy call is always free — no strings attached. We'll discuss your business goals, current challenges, and whether we're the right fit. If we're not, we'll tell you and recommend alternatives.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Typical lead time is 2-3 weeks from signed agreement to project kickoff. For urgent needs, we can sometimes accelerate the timeline. Let us know your constraints and we'll do our best to accommodate.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. We work with businesses across North America, Europe, and Asia-Pacific. All communication happens over Slack, email, and video calls — timezone differences have never been a blocker for us.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        heading="Let's Build Together."
        subtext="Tell us about your project and we'll get back to you within 24 hours with a tailored plan of action."
        showGlow
      />

      {/* Contact Grid */}
      <SectionWrapper className="!pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <FadeInWhenVisible>
              <ContactForm extended />
            </FadeInWhenVisible>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <FadeInWhenVisible delay={0.2}>
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="border border-border rounded-[var(--radius-card)] bg-bg-card p-6 md:p-8">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-6">
                    Get in Touch
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:hello@modernwebsystems.com"
                        className="text-text-primary hover:text-accent transition-colors duration-200"
                      >
                        hello@modernwebsystems.com
                      </a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted mb-1">
                        Response Time
                      </p>
                      <p className="text-text-primary">
                        Within 24 hours
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted mb-1">
                        Based In
                      </p>
                      <p className="text-text-primary">
                        Remote-first, worldwide
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Highlight */}
                <div className="border border-border rounded-[var(--radius-card)] bg-bg-card p-6 md:p-8">
                  <span className="text-3xl text-accent leading-none font-serif">
                    &ldquo;
                  </span>
                  <p className="text-text-primary leading-relaxed mt-2">
                    We replaced the entire in-store tailor experience with AI —
                    virtual try-on, camera-based measurement, 280+ fabrics. Customers
                    design their custom suit without leaving their screen.
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-text-primary text-sm font-semibold">
                      Alpha Gentlemen Suits
                    </p>
                    <p className="text-text-muted text-xs">
                      E-Commerce Platform
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </SectionWrapper>

      {/* Mini FAQ */}
      <section className="bg-bg-secondary">
        <SectionWrapper>
          <FadeInWhenVisible>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-8 text-center">
                Before You Reach Out
              </h2>
              <Accordion items={CONTACT_FAQ} />
            </div>
          </FadeInWhenVisible>
        </SectionWrapper>
      </section>
    </>
  );
}
