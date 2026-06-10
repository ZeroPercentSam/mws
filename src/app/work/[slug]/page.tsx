"use client";

/* /work/[slug] — the Case File. Static dossier hero (the old scroll
   parallax was a continuous-motion violation), warm approach band,
   ocean BuildLogStamp signature, real screenshots. */

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import TechStack from "@/components/ui/TechStack";
import NextProject from "@/components/ui/NextProject";
import CTABanner from "@/components/ui/CTABanner";
import ImageGallery from "@/components/ui/ImageGallery";
import Button from "@/components/ui/Button";
import BuildLogStamp from "@/components/sections/BuildLogStamp";
import { WarmBand, OceanBand } from "@/components/ui/Band";
import { CASE_STUDIES } from "@/lib/constants";
import { eyebrowCls, headingCls } from "@/lib/design";
import {
  CASE_LABELS,
  tintFor,
  galleryFor,
  buildRecordFor,
} from "./case-data";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const currentIndex = CASE_STUDIES.findIndex((s) => s.slug === slug);
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];
  const tint = tintFor(study);
  const gallery = galleryFor(study);
  const record = buildRecordFor(study);

  const chips = [
    { label: study.client, tinted: false },
    { label: study.industry, tinted: false },
    { label: study.category, tinted: true },
  ].filter((c): c is { label: string; tinted: boolean } => Boolean(c.label));

  return (
    <>
      {/* ======================================================== */}
      {/* DOSSIER HERO — static, CSS text entrance                  */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 70% 15%, ${tint}1f, transparent 60%)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 opacity-15" style={{ background: study.heroGradient }} />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className={`hero-rise ${eyebrowCls}`}>
              <Link href="/work" className="hover:text-accent-light transition-colors">
                Work
              </Link>{" "}
              / {study.category}
            </p>
            <div
              className="hero-rise mt-5 flex flex-wrap gap-2"
              style={{ animationDelay: "0.06s" }}
            >
              {chips.map((c) => (
                <span
                  key={c.label}
                  className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                  style={
                    c.tinted
                      ? {
                          color: tint,
                          borderColor: `${tint}55`,
                          backgroundColor: "rgba(5,5,5,0.6)",
                        }
                      : {
                          color: "var(--color-text-secondary)",
                          borderColor: "var(--color-border)",
                          backgroundColor: "rgba(255,255,255,0.03)",
                        }
                  }
                >
                  {c.label}
                </span>
              ))}
            </div>
            <h1
              className="hero-rise mt-5 font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-[1.08] tracking-tight md:text-5xl"
              style={{ animationDelay: "0.12s" }}
            >
              {study.title}
            </h1>
            <p
              className="hero-rise mt-5 max-w-xl text-lg leading-relaxed text-text-secondary"
              style={{ animationDelay: "0.2s" }}
            >
              {study.description}
            </p>
            <div
              className="hero-rise mt-8 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "0.3s" }}
            >
              {study.liveUrl && (
                <Button variant="primary" href={study.liveUrl}>
                  View it live ↗
                </Button>
              )}
              <Button variant="secondary" href="/contact">
                Get a build like this
              </Button>
            </div>
          </div>

          {/* hero screenshot in a static chrome frame */}
          <div
            className="hero-rise relative overflow-hidden rounded-2xl border border-border bg-[#0B0F14] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "0.18s" }}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="ml-3 flex h-5 flex-1 items-center rounded-md bg-white/5 px-2.5">
                {/* never fabricate a domain — generic label when not public */}
                <span className="truncate text-[9px] tracking-wide text-text-muted">
                  {study.liveUrl?.replace(/^https?:\/\//, "") ?? "live build — private"}
                </span>
              </div>
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src={`/work/screenshots/${study.slug}/hero.jpg`}
                alt={`${study.client} — live homepage`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* THE CHALLENGE                                             */}
      {/* ======================================================== */}
      <SectionWrapper>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>{CASE_LABELS.challenge.eyebrow}</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text={CASE_LABELS.challenge.heading}
                className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold tracking-tight"
                accentLastPeriod
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <FadeInWhenVisible delay={0.15}>
              <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
                {study.challenge.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </SectionWrapper>

      {/* ======================================================== */}
      {/* THE APPROACH (warm band) + tech chips                     */}
      {/* ======================================================== */}
      <WarmBand>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:order-2 md:col-span-4">
            <FadeInWhenVisible>
              <span className={eyebrowCls}>{CASE_LABELS.approach.eyebrow}</span>
            </FadeInWhenVisible>
            <div className="mt-3">
              <AnimatedHeading
                text={CASE_LABELS.approach.heading}
                className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold tracking-tight"
                accentLastPeriod
              />
            </div>
          </div>
          <div className="md:order-1 md:col-span-8">
            <FadeInWhenVisible delay={0.15}>
              <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
                {study.approach.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <TechStack technologies={study.technologies} />
        </div>
      </WarmBand>

      {/* ======================================================== */}
      {/* BUILD-LOG STAMP (signature, ocean band)                   */}
      {/* ======================================================== */}
      <OceanBand>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <FadeInWhenVisible>
            <span className={eyebrowCls}>{CASE_LABELS.results.eyebrow}</span>
          </FadeInWhenVisible>
          <div className="mt-3">
            <AnimatedHeading text={CASE_LABELS.results.heading} className={headingCls} accentLastPeriod />
          </div>
        </div>
        <div className="mx-auto max-w-4xl">
          <BuildLogStamp
            results={study.results}
            liveUrl={study.liveUrl}
            liveLabel={CASE_LABELS.liveLabel}
            tint={tint}
          />
        </div>
      </OceanBand>

      {/* ======================================================== */}
      {/* SCREENS                                                   */}
      {/* ======================================================== */}
      <SectionWrapper>
        <FadeInWhenVisible>
          <span className={eyebrowCls}>{CASE_LABELS.gallery.eyebrow}</span>
        </FadeInWhenVisible>
        <div className="mb-10 mt-3">
          <AnimatedHeading
            text={CASE_LABELS.gallery.heading}
            className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold tracking-tight"
            accentLastPeriod
          />
        </div>
        <FadeInWhenVisible delay={0.2}>
          <ImageGallery
            gradients={gallery.gradients}
            labels={gallery.labels}
            screenshots={gallery.screenshots}
          />
        </FadeInWhenVisible>
      </SectionWrapper>

      {/* ======================================================== */}
      {/* BUILD RECORD (only when a studio record exists)           */}
      {/* ======================================================== */}
      {record && (
        <section className="bg-bg-secondary">
          <SectionWrapper>
            <div className="mx-auto max-w-3xl">
              <FadeInWhenVisible>
                <span className={eyebrowCls}>{CASE_LABELS.record.eyebrow}</span>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.15}>
                <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 md:p-8">
                  <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                    {record.quote}
                  </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-xs text-text-muted">
                      <span className="font-semibold text-text-primary">{record.name}</span>
                      {" "}· {record.title} · {record.company}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* Next + CTA */}
      <SectionWrapper>
        <NextProject study={nextStudy} />
      </SectionWrapper>

      <CTABanner
        heading={CASE_LABELS.cta.heading}
        subtext={CASE_LABELS.cta.subtext}
        buttonText={CASE_LABELS.cta.buttonText}
        buttonHref="/contact"
      />
    </>
  );
}
