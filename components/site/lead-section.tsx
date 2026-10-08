import { site } from "@/lib/site";
import { LeadForm } from "./lead-form";
import { Section } from "./section";
import { Heading, Lead } from "./typography";

const { lead } = site;

export function LeadSection() {
  return (
    <Section id="contacts">
      <div className="grid gap-8 md:gap-12 lg:grid-cols-12 lg:items-start lg:gap-6">
        <div
          data-reveal
          className="flex flex-col gap-3 md:gap-4 lg:col-span-5 lg:sticky lg:top-24"
        >
          <Heading level="h2" className="text-balance">
            {lead.title}
          </Heading>
          <Lead className="max-w-none">{lead.lead}</Lead>
        </div>

        <div data-reveal className="lg:col-span-7">
          <LeadForm />
        </div>
      </div>
    </Section>
  );
}
