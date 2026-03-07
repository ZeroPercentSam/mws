import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import BentoGrid from "@/components/sections/BentoGrid";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import LogoTicker from "@/components/ui/LogoTicker";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Problem />
      <Services />
      <BentoGrid />
      <Process />
      <Results />
      <Testimonials />
      <TrustBar />
      <Contact />
      <Footer />
    </>
  );
}
