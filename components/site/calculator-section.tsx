import { site } from "@/lib/site";
import { Calculator } from "./calculator";
import { Section } from "./section";
import { Heading, Lead } from "./typography";

const { calculator } = site;

export function CalculatorSection() {
  return (
    <Section id="calculator">
      <div data-reveal className="flex flex-col gap-3 md:gap-4">
        <Heading level="h2" className="max-w-heading text-balance">
          {calculator.title}
        </Heading>
        <Lead>{calculator.lead}</Lead>
      </div>

      <Calculator />
    </Section>
  );
}
