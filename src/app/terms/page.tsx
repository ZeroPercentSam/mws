import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Modern Web Systems",
  description:
    "The terms that govern your use of the Modern Web Systems website.",
};

const EFFECTIVE_DATE = "June 10, 2026";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold text-text-primary">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-text-secondary leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Legal
        </span>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-extrabold tracking-tight">
          Terms of Service<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 text-text-muted text-sm">
          Effective date: {EFFECTIVE_DATE} · Last updated: {EFFECTIVE_DATE}
        </p>

        <div className="mt-14 space-y-12">
          <Section id="acceptance" title="1. Acceptance of these terms">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
              the website at modernwebsystems.com (the &ldquo;Site&rdquo;),
              operated by Modern Web Systems (&ldquo;MWS&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing or using the
              Site, you agree to these Terms. If you do not agree, please do
              not use the Site. A link to these Terms appears in the footer of
              every page.
            </p>
          </Section>

          <Section id="eligibility" title="2. Eligibility">
            <p>
              The Site is intended for users who are at least 18 years old, or
              minors using it under the supervision of a parent or legal
              guardian.
            </p>
          </Section>

          <Section id="use-of-site" title="3. Use of the Site">
            <p>
              The Site is provided for informational purposes: learning about
              our services, reading our writing, and getting in touch. You
              agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>use the Site for any unlawful purpose;</li>
              <li>
                interfere with or disrupt the Site, its servers, or its
                security features, or attempt to gain unauthorized access to
                any of them;
              </li>
              <li>
                scrape, harvest, or bulk-collect content or data from the Site
                by automated means without our written permission;
              </li>
              <li>
                reverse engineer or copy the Site&rsquo;s code or design for a
                competing purpose;
              </li>
              <li>
                misrepresent your affiliation with any person or entity when
                contacting us.
              </li>
            </ul>
          </Section>

          <Section id="intellectual-property" title="4. Intellectual property">
            <p>
              The Site and everything on it — text, design, graphics, code,
              logos, and the Modern Web Systems name and marks — are owned by
              MWS or used with permission, and are protected by copyright,
              trademark, and other laws. You may view, bookmark, and share
              links to the Site for personal, non-commercial purposes. Any
              other reproduction, republication, or distribution requires our
              prior written consent. Client names, marks, and vessels shown in
              portfolio or proposal materials remain the property of their
              respective owners.
            </p>
          </Section>

          <Section id="client-engagements" title="5. Client engagements are governed by separate agreements">
            <p>
              Content on the Site — including service descriptions, portfolio
              pieces, proposals, and any pricing shown — is informational and
              does not constitute a binding offer. Any services we provide are
              governed exclusively by a separately agreed service agreement,
              proposal acceptance, or statement of work between MWS and the
              client. If these Terms conflict with a signed client agreement,
              the client agreement controls for that engagement. Invoices
              linked from the Site relate to those separate agreements.
            </p>
          </Section>

          <Section id="third-party-links" title="6. Third-party links and services">
            <p>
              The Site links to third-party websites and services we do not
              control — including payment and invoice pages hosted by Stripe.
              Those sites have their own terms and privacy policies, which
              govern your use of them. Links do not imply endorsement, and we
              are not responsible for third-party content, services, or
              practices.
            </p>
          </Section>

          <Section id="privacy" title="7. Privacy">
            <p>
              Our{" "}
              <Link
                href="/privacy"
                className="text-text-primary underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
              >
                Privacy Policy
              </Link>{" "}
              explains what little data the Site processes and your rights over
              it. It is part of how we operate the Site, and worth the
              two-minute read.
            </p>
          </Section>

          <Section id="availability" title="8. Site availability and changes">
            <p>
              We may update, change, or remove Site content at any time without
              notice, and we may suspend or discontinue the Site (in whole or
              part) at our discretion. Content may occasionally be inaccurate
              or out of date; we make reasonable efforts to correct errors when
              we find them but do not guarantee continuous availability or
              accuracy.
            </p>
          </Section>

          <Section id="disclaimer" title="9. Disclaimer of warranties">
            <div className="rounded-[var(--radius-card)] border border-border bg-bg-card p-5">
              <p className="font-medium text-text-primary">
                THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
                AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
                IMPLIED — INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, OR
                UNINTERRUPTED AVAILABILITY. YOUR USE OF THE SITE IS AT YOUR
                SOLE RISK.
              </p>
            </div>
            <p>
              Some jurisdictions do not allow the exclusion of certain
              warranties, so portions of the above may not apply to you.
            </p>
          </Section>

          <Section id="liability" title="10. Limitation of liability">
            <div className="rounded-[var(--radius-card)] border border-border bg-bg-card p-5">
              <p className="font-medium text-text-primary">
                TO THE FULLEST EXTENT PERMITTED BY LAW, MWS WILL NOT BE LIABLE
                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES — INCLUDING LOST PROFITS, DATA, OR GOODWILL —
                ARISING FROM YOUR USE OF THE SITE. OUR TOTAL AGGREGATE
                LIABILITY ARISING OUT OF THE SITE WILL NOT EXCEED ONE HUNDRED
                US DOLLARS (US $100).
              </p>
            </div>
            <p>
              This limitation applies to the Site only. Liability arising under
              a signed client agreement is addressed in that agreement, not
              here. Some jurisdictions do not allow certain limitations of
              liability, so portions of the above may not apply to you.
            </p>
          </Section>

          <Section id="indemnification" title="11. Indemnification">
            <p>
              You agree to indemnify and hold MWS harmless from claims, damages,
              and expenses (including reasonable attorneys&rsquo; fees) arising
              out of your breach of these Terms or your unlawful use of the
              Site.
            </p>
          </Section>

          <Section id="governing-law" title="12. Governing law and venue">
            <p>
              These Terms are governed by the laws of the United States and of
              the State of Florida, without regard to conflict-of-law rules.
              Any dispute arising out of these Terms or the Site will be
              brought in the state or federal courts located in Florida, and
              you consent to their jurisdiction.
            </p>
          </Section>

          <Section id="changes" title="13. Changes to these terms">
            <p>
              We may revise these Terms from time to time. The current version
              is always posted here with its effective date. Your continued use
              of the Site after changes take effect constitutes acceptance of
              the revised Terms.
            </p>
          </Section>

          <Section id="misc" title="14. Severability and miscellaneous">
            <p>
              If any provision of these Terms is held unenforceable, it will be
              modified to the minimum extent necessary (or severed), and the
              remaining provisions will remain in full force. These Terms,
              together with the Privacy Policy, are the entire agreement
              between you and MWS regarding the Site. Our failure to enforce a
              provision is not a waiver of it. Nothing in these Terms creates
              any partnership, employment, or agency relationship between you
              and MWS.
            </p>
          </Section>

          <Section id="contact" title="15. Contact">
            <p>
              Questions about these Terms:{" "}
              <a
                href="mailto:hello@modernwebsystems.com"
                className="text-text-primary underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
              >
                hello@modernwebsystems.com
              </a>
              .
            </p>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            See also:{" "}
            <Link
              href="/privacy"
              className="text-text-secondary underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
