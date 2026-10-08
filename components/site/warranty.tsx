import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { Section } from "./section";
import { Heading, Lead } from "./typography";

const { warranty } = site;

export function Warranty() {
  return (
    <Section id="warranty">
      <div data-reveal className="flex flex-col gap-3 md:gap-4">
        <Heading level="h2" className="max-w-heading text-balance">
          {warranty.title}
        </Heading>
        <Lead>{warranty.lead}</Lead>
      </div>

      <div className="mt-8 grid gap-3 md:mt-12 md:gap-6 lg:grid-cols-3">
        <article data-reveal className="flex flex-col justify-between gap-10 rounded-card bg-primary p-5 text-primary-foreground md:p-8 lg:row-span-2 lg:gap-16 lg:p-6 xl:p-8">
          <p className="type-eyebrow text-primary-foreground/80">
            {warranty.main.label}
          </p>
          <div className="flex flex-col gap-3">
            <p className="type-stat">{warranty.main.value}</p>
            <p className="type-body text-primary-foreground/90">
              {warranty.main.text}
            </p>
          </div>
        </article>

        {warranty.cards.map((card) => (
          <article
            key={card.label}
            data-reveal
            className="flex flex-col gap-3 rounded-card bg-card p-5 md:p-8 lg:p-6 xl:p-8"
          >
            <p className="type-eyebrow text-muted-foreground">{card.label}</p>
            <p className="type-price text-primary">{card.value}</p>
            <p className="type-body text-muted-foreground">{card.text}</p>
          </article>
        ))}

        <div data-reveal className="flex items-center gap-4 rounded-card bg-card p-5 md:p-8 lg:col-span-2 lg:p-6 xl:p-8">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check aria-hidden className="size-5" strokeWidth={2.5} />
          </span>
          <p className="type-body text-foreground">{warranty.note}</p>
        </div>
      </div>
    </Section>
  );
}
