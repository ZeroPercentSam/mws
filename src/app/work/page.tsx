"use client";

/* /work — homepage design language. Signature: the WireframeCard grid
   (skeleton -> live screenshot reveal per card). Filter wiring
   (LayoutGroup/AnimatePresence popLayout) unchanged from the old page. */

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import FilterBar from "@/components/ui/FilterBar";
import WireframeCard from "@/components/ui/WireframeCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import CTABanner from "@/components/ui/CTABanner";
import { OceanBand } from "@/components/ui/Band";
import { eyebrowCls, OCEAN_CELL } from "@/lib/design";
import { STAG_CARD } from "@/lib/animations";
import {
  WORK_HERO,
  CARD_FRONTS,
  WORK_RIBBON,
  WORK_CTA,
  WORK_CATEGORIES,
} from "./work-data";

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? CARD_FRONTS
      : CARD_FRONTS.filter((c) => c.category === activeFilter);

  return (
    <>
      {/* Hero — compact, CSS entrance (LCP never waits on JS) */}
      <section className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,107,0,0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 75%, rgba(74,158,203,0.10), transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <p className={`hero-rise ${eyebrowCls}`}>{WORK_HERO.eyebrow}</p>
          <h1
            className="hero-rise mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
            style={{ animationDelay: "0.08s" }}
          >
            {WORK_HERO.heading.replace(/\.$/, "")}
            <span className="text-accent">.</span>
          </h1>
          <p
            className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
            style={{ animationDelay: "0.16s" }}
          >
            {WORK_HERO.subline}
          </p>
        </div>
      </section>

      {/* Filter + wireframe-reveal grid */}
      <SectionWrapper className="!pt-0">
        <FadeInWhenVisible>
          <div className="mb-10">
            <LayoutGroup>
              <FilterBar
                categories={WORK_CATEGORIES}
                active={activeFilter}
                onSelect={setActiveFilter}
              />
            </LayoutGroup>
          </div>
        </FadeInWhenVisible>

        <LayoutGroup>
          {/* cards must be DIRECT AnimatePresence children or popLayout
              exits never engage (a wrapper div makes it inert) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((card, i) => (
                <WireframeCard key={card.slug} card={card} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </SectionWrapper>

      {/* Results ribbon — deep-ocean band, MATH-grid language */}
      <OceanBand seamBottom={false}>
        <FadeInWhenVisible>
          <p className="text-center text-sm text-text-muted">{WORK_RIBBON.caption}</p>
        </FadeInWhenVisible>
        <StaggerChildren
          className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-[rgba(120,180,220,0.2)] bg-[rgba(120,180,220,0.2)] sm:grid-cols-2 lg:grid-cols-4"
          stagger={STAG_CARD}
        >
          {WORK_RIBBON.metrics.map((m) => (
            <StaggerItem key={m.label} className="min-w-0">
              <div className="h-full p-7 text-center" style={{ backgroundColor: OCEAN_CELL }}>
                <p className="font-[family-name:var(--font-heading)] text-4xl font-extrabold text-accent md:text-5xl">
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-text-secondary md:text-sm">
                  {m.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </OceanBand>

      <CTABanner
        heading={WORK_CTA.heading}
        subtext={WORK_CTA.subtext}
        buttonText={WORK_CTA.buttonText}
        buttonHref="/contact"
      />
    </>
  );
}
