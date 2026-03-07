"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import DrawCheckmark from "@/components/ui/DrawCheckmark";

type FormStatus = "idle" | "sending" | "sent" | "error";

interface ContactFormProps {
  /** Show the extended version with Project Type and Budget Range */
  extended?: boolean;
}

export default function ContactForm({ extended = false }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission — replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <DrawCheckmark size={32} className="text-accent" />
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-2">
          Message Sent
        </h3>
        <p className="text-text-secondary">
          We&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  const inputClasses =
    "w-full bg-bg-card border border-border rounded-[var(--radius-button)] px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-colors duration-200 font-[family-name:var(--font-body)]";

  const selectClasses =
    "w-full bg-bg-card border border-border rounded-[var(--radius-button)] px-4 py-3 text-text-primary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-colors duration-200 font-[family-name:var(--font-body)] appearance-none cursor-pointer";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="sr-only">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Company name (optional)"
          className={inputClasses}
        />
      </div>

      {extended && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="relative">
            <label htmlFor="projectType" className="sr-only">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              className={selectClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Project type
              </option>
              <option value="website">Website / Web App</option>
              <option value="ai">AI Integration</option>
              <option value="automation">Automation & Systems</option>
              <option value="multiple">Multiple Services</option>
              <option value="other">Other / Not Sure</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <label htmlFor="budget" className="sr-only">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              className={selectClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Budget range
              </option>
              <option value="15-25k">$15K - $25K</option>
              <option value="25-50k">$25K - $50K</option>
              <option value="50-100k">$50K - $100K</option>
              <option value="100k+">$100K+</option>
              <option value="unsure">Not sure yet</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={extended ? 5 : 4}
          placeholder="Tell us about your project..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
