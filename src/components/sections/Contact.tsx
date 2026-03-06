"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import ContactForm from "@/components/form/ContactForm";

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="bg-bg-secondary">
      <FadeInWhenVisible>
        <div className="text-center mb-12">
          <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
            Get Started
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Tell us about your project and we&apos;ll show you what&apos;s possible.
          </p>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <ContactForm />
      </FadeInWhenVisible>
    </SectionWrapper>
  );
}
