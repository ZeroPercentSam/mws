import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import BentoGrid from "@/components/sections/BentoGrid";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Services />
      <BentoGrid />
      <Process />
      <Results />
      <Contact />
      <Footer />
    </>
  );
}
