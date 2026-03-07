"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import { PRICING_TIERS, FAQ } from "@/lib/data";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <PageHero
        label="Pricing"
        title="Transparent Pricing. Real Value."
        description="No hidden fees, no surprise invoices. Choose the package that fits your ambition."
      />

      {/* Pricing cards */}
      <section className="px-6 md:px-8 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
            stagger={0.15}
          >
            {PRICING_TIERS.map((tier) => (
              <StaggerItem key={tier.name}>
                <div
                  className={`relative h-full bg-bg-card rounded-[var(--radius-card)] p-8 md:p-10 flex flex-col overflow-hidden transition-all duration-300 ${
                    tier.highlight
                      ? "border-2 border-accent shadow-[0_0_60px_-12px_rgba(255,107,0,0.15)]"
                      : "border border-border hover:border-border-hover"
                  }`}
                >
                  {/* Popular badge */}
                  {tier.highlight && (
                    <div className="absolute top-0 left-0 right-0">
                      <div className="bg-accent text-white text-xs font-bold tracking-wider uppercase text-center py-1.5">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className={tier.highlight ? "mt-6" : ""}>
                    {/* Tier name */}
                    <p className="text-text-muted text-xs tracking-[0.2em] uppercase font-semibold mb-2">
                      {tier.ideal}
                    </p>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-6">
                      {tier.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        {tier.price !== "Custom" && (
                          <span className="text-text-muted text-lg">$</span>
                        )}
                        <span className="font-[family-name:var(--font-heading)] text-5xl font-extrabold text-text-primary">
                          {tier.price}
                        </span>
                      </div>
                      <p className="text-text-muted text-xs mt-1">
                        {tier.priceNote}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feature) => {
                        const isHeader = feature.endsWith(":");
                        return (
                          <li
                            key={feature}
                            className={`flex items-start gap-3 text-sm ${
                              isHeader
                                ? "text-text-primary font-medium pt-2"
                                : "text-text-secondary"
                            }`}
                          >
                            {!isHeader && (
                              <svg
                                className="w-4 h-4 text-accent shrink-0 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                            <span>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* CTA */}
                    <motion.a
                      href="/#contact"
                      className={`block text-center font-semibold py-3.5 rounded-[var(--radius-button)] transition-colors duration-200 ${
                        tier.highlight
                          ? "bg-accent hover:bg-accent-light text-white"
                          : "bg-transparent border border-border text-white hover:border-border-hover"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tier.cta}
                    </motion.a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-16 px-6 md:px-8 border-y border-border bg-bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "$10M+", label: "Revenue Generated" },
              { value: "0", label: "Missed Deadlines" },
            ].map((stat) => (
              <FadeInWhenVisible key={stat.label}>
                <p className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-accent mb-1">
                  {stat.value}
                </p>
                <p className="text-text-muted text-xs uppercase tracking-wider">
                  {stat.label}
                </p>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
                FAQ
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight">
                Common Questions
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <FadeInWhenVisible key={item.question} delay={i * 0.05}>
                <FAQItem question={item.question} answer={item.answer} />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInWhenVisible>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Not Sure Which Plan Fits?
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              Book a free 30-minute consultation and we&apos;ll recommend the right approach for your business.
            </p>
            <motion.a
              href="/#contact"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-[var(--radius-button)] transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Free Consultation
            </motion.a>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-[var(--radius-card)] overflow-hidden transition-colors duration-200 hover:border-border-hover">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
      >
        <span className="font-[family-name:var(--font-heading)] font-semibold pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center"
        >
          <svg
            className="w-3 h-3 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-text-secondary text-sm leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
