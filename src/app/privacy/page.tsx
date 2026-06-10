import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Modern Web Systems",
  description:
    "How Modern Web Systems handles your data: no analytics, no tracking, no selling — just hosting logs and the emails you choose to send us.",
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

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Legal
        </span>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-800 tracking-tight">
          Privacy Policy<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 text-text-muted text-sm">
          Effective date: {EFFECTIVE_DATE} · Last updated: {EFFECTIVE_DATE}
        </p>

        <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-bg-card p-6">
          <p className="text-text-secondary leading-relaxed text-sm">
            The short version: this site doesn&rsquo;t track you. We run no
            analytics, set no advertising cookies, and have no user accounts or
            forms. The only personal data we touch is what our hosting provider
            logs to keep the site running, and whatever you choose to send us by
            email. We never sell or share personal information.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          <Section id="who-we-are" title="1. Who we are">
            <p>
              Modern Web Systems (&ldquo;MWS&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) operates the website at modernwebsystems.com
              (the &ldquo;Site&rdquo;), a marketing site for our web design,
              development, and automation services. This policy explains what
              data is processed when you visit the Site and what rights you
              have over it. It applies to the Site only — work we do for
              clients is governed by separate agreements.
            </p>
          </Section>

          <Section id="what-we-collect" title="2. What we collect">
            <p>Two categories, and nothing else:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-text-primary font-medium">
                  Hosting and server logs.
                </span>{" "}
                Our hosting provider (Vercel) automatically logs standard
                request data when you load a page: your IP address, browser
                user-agent, the pages requested, and timestamps. IP addresses
                can be personal data, and we treat them as such. We use these
                logs only to operate and secure the Site.
              </li>
              <li>
                <span className="text-text-primary font-medium">
                  Information you email us.
                </span>{" "}
                The Site&rsquo;s contact option is a plain email link. If you
                write to us, we receive your email address and whatever you
                include in your message — voluntarily and on your terms.
              </li>
            </ul>
            <p>
              We have no user accounts, no contact forms, no analytics, no
              advertising or tracking scripts, and we do not collect sensitive
              personal information of any kind.
            </p>
          </Section>

          <Section id="how-we-use" title="3. How we use it (and our legal bases)">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Server logs — operating, securing, and debugging the Site. Under
                the GDPR, our legal basis is legitimate interest (Art. 6(1)(f)):
                running a functioning, secure website.
              </li>
              <li>
                Email you send us — responding to your inquiry and, if you
                engage us, taking steps toward that engagement. Legal bases:
                your consent (Art. 6(1)(a)) and pre-contractual steps (Art.
                6(1)(b)).
              </li>
            </ul>
            <p>
              We practice data minimization: if we don&rsquo;t need it, we
              don&rsquo;t collect it.
            </p>
          </Section>

          <Section id="cookies-and-local-storage" title="4. Cookies & local storage">
            <p>
              The Site&rsquo;s own code sets no cookies. Two technical details
              worth knowing:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Vercel, our host, may set minimal infrastructure cookies needed
                to serve the Site reliably. These are strictly necessary and
                contain no tracking.
              </li>
              <li>
                When you dismiss our cookie notice, we store a single flag in
                your browser&rsquo;s local storage so we don&rsquo;t ask you
                again. It contains your choice and nothing else. This kind of
                storage — remembering a preference you explicitly set — is
                exempt from consent requirements, but we tell you about it
                anyway.
              </li>
            </ul>
            <p>
              If we ever add analytics, it will load only after you opt in, and
              this policy will be updated first.
            </p>
          </Section>

          <Section id="third-parties" title="5. Third parties we rely on">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-text-primary font-medium">Vercel</span>{" "}
                — hosts the Site and processes server logs as described above.
                See Vercel&rsquo;s privacy documentation for their practices and
                retention.
              </li>
              <li>
                <span className="text-text-primary font-medium">Stripe</span>{" "}
                — some pages on this Site link to invoice and payment pages
                hosted by Stripe. Anything you do on those pages (including
                payment details) is collected by Stripe under{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
                >
                  Stripe&rsquo;s privacy policy
                </a>
                , not this one. We never see your card details.
              </li>
            </ul>
            <p>We share personal data with no one else.</p>
          </Section>

          <Section id="no-sale" title="6. We do not sell or share personal information">
            <p>
              We do not sell personal information, and we do not share it for
              cross-context behavioral advertising (the California
              CCPA/CPRA&rsquo;s definition of &ldquo;share&rdquo;). We have not
              done so in the preceding 12 months, and we have no plans to.
              Because of this, no &ldquo;Do Not Sell or Share&rdquo; opt-out is
              needed — there is nothing to opt out of.
            </p>
          </Section>

          <Section id="retention" title="7. How long we keep data">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Server logs are retained per Vercel&rsquo;s standard rotation
                windows — short-lived and automatic. The criterion: as long as
                needed for operations and security, no longer.
              </li>
              <li>
                Emails are kept as long as needed to handle your inquiry or any
                engagement that follows from it, then deleted.
              </li>
            </ul>
          </Section>

          <Section id="your-rights" title="8. Your rights">
            <p>
              If you are in the EU/EEA or UK (GDPR), you have the right to
              access, correct, delete, restrict, or object to the processing of
              your personal data; to data portability; to withdraw consent at
              any time; and to lodge a complaint with your supervisory
              authority.
            </p>
            <p>
              If you are a California resident, we voluntarily honor CCPA/CPRA
              rights regardless of whether the law&rsquo;s thresholds apply to
              a business of our size: the right to know what we hold about you,
              to correct it, to delete it, and to opt out of sale or sharing
              (not applicable — we do neither). We will never retaliate against
              you for exercising any right.
            </p>
            <p>
              In practice, the data we could possibly hold about you is your
              email correspondence — and we&rsquo;ll happily show you, correct
              it, or delete it on request.
            </p>
          </Section>

          <Section id="exercising-rights" title="9. How to exercise your rights">
            <p>
              Email{" "}
              <a
                href="mailto:hello@modernwebsystems.com"
                className="text-text-primary underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
              >
                hello@modernwebsystems.com
              </a>{" "}
              with your request. To protect you, we may ask you to confirm
              control of the email address the data relates to — that&rsquo;s
              the entire verification process. Requests are honored free of
              charge, normally within 30 days.
            </p>
          </Section>

          <Section id="children" title="10. Children">
            <p>
              The Site is not directed at children under 13, and we do not
              knowingly collect personal information from them. If you believe
              a child has sent us personal information, contact us and we will
              delete it.
            </p>
          </Section>

          <Section id="international" title="11. International visitors">
            <p>
              The Site is operated from the United States and hosted on US
              infrastructure. If you visit from elsewhere, your request data is
              processed in the US. We honor the rights in section 8 for all
              visitors, wherever you are.
            </p>
          </Section>

          <Section id="security" title="12. Security">
            <p>
              The Site is served over HTTPS, and we apply reasonable technical
              and organizational measures appropriate to the minimal data we
              handle. No website can promise perfect security — but our best
              protection is structural: we simply don&rsquo;t hold much of your
              data in the first place.
            </p>
          </Section>

          <Section id="changes" title="13. Changes to this policy">
            <p>
              When this policy changes, the new version is posted here with an
              updated date at the top. Material changes will be flagged
              prominently on the Site. We review this policy at least annually.
            </p>
          </Section>

          <Section id="contact" title="14. Contact">
            <p>
              Privacy questions, requests, or complaints:{" "}
              <a
                href="mailto:hello@modernwebsystems.com"
                className="text-text-primary underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
              >
                hello@modernwebsystems.com
              </a>
              . We&rsquo;d rather over-answer than under-answer.
            </p>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            See also:{" "}
            <Link
              href="/terms"
              className="text-text-secondary underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
