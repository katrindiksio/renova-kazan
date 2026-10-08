import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { CtaLink } from "./cta";
import { Section } from "./section";
import { Heading, Lead } from "./typography";

const { payments } = site;

export function Payments() {
  return (
    <Section id="payments">
      <div data-reveal className="flex flex-col gap-3 md:gap-4">
        <Heading level="h2" className="max-w-heading text-balance">
          {payments.title}
        </Heading>
        <Lead>{payments.lead}</Lead>
      </div>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-6 xl:grid-cols-4">
        {payments.steps.map((step, index) => (
          <li
            key={step.percent}
            data-reveal
            className="flex flex-col gap-3 rounded-card bg-card p-5 md:p-8 xl:p-6"
          >
            <span
              aria-hidden
              className="mb-2 h-1 w-full rounded-full bg-primary"
            />
            <p className="type-eyebrow text-muted-foreground">
              {payments.stepLabel} {index + 1}
            </p>
            <p className="type-price text-primary">{step.percent}</p>
            <p className="type-body text-pretty text-foreground">{step.text}</p>
          </li>
        ))}
      </ol>

      <ul data-reveal className="mt-8 flex flex-col gap-4 md:mt-12 min-[1400px]:flex-row min-[1400px]:justify-between min-[1400px]:gap-x-8">
        {payments.notes.map((note) => (
          <li key={note} className="type-body flex items-start gap-3 min-[1400px]:whitespace-nowrap">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check aria-hidden className="size-3.5" strokeWidth={3} />
            </span>
            {note}
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-8 flex justify-center md:mt-12">
        <CtaLink href={payments.cta.href} width="fixed">
          {payments.cta.label}
        </CtaLink>
      </div>
    </Section>
  );
}
