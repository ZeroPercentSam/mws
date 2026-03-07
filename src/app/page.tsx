import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import CaseStudyPreview from "@/components/sections/CaseStudyPreview";
import BentoGrid from "@/components/sections/BentoGrid";
import Process from "@/components/sections/Process";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Results from "@/components/sections/Results";
import CTABannerSection from "@/components/sections/CTABannerSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoBar />
      <Problem />
      <Services />
      <CaseStudyPreview />
      <BentoGrid />
      <Process />
      <TestimonialsSection />
      <Results />
      <CTABannerSection />
      <Contact />
    </>
  );
}
