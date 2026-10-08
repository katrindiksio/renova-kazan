import { CalculatorSection } from "@/components/site/calculator-section";
import { Contractor } from "@/components/site/contractor";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { Included } from "@/components/site/included";
import { LeadSection } from "@/components/site/lead-section";
import { Navbar } from "@/components/site/navbar";
import { Payments } from "@/components/site/payments";
import { Pricing } from "@/components/site/pricing";
import { Projects } from "@/components/site/projects";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { Situations } from "@/components/site/situations";
import { Report } from "@/components/site/report";
import { Warranty } from "@/components/site/warranty";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <ScrollReveal />
      <main>
        <Hero />
        <Contractor />
        <Pricing />
        <CalculatorSection />
        <Included />
        <Payments />
        <Warranty />
        <Report />
        <Projects />
        <Situations />
        <Faq />
        <LeadSection />
      </main>
    </div>
  );
}
