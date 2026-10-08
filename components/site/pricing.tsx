import { site } from "@/lib/site";
import { PlanCard } from "./plan-card";
import { Section } from "./section";
import { Heading, Lead } from "./typography";

const { pricing } = site;

export function Pricing() {
  return (
    <Section id="prices">
      <div data-reveal className="flex flex-col gap-3 md:gap-4">
        <Heading level="h2" className="max-w-heading text-balance">
          {pricing.title}
        </Heading>
        <Lead>{pricing.lead}</Lead>
      </div>

      <div className="mt-8 grid gap-3 md:mt-12 md:gap-6 lg:grid-cols-3">
        {pricing.plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </Section>
  );
}
