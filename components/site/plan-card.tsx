import Image from "next/image";
import { site } from "@/lib/site";
import { CtaLink } from "./cta";

type Plan = (typeof site.pricing.plans)[number];

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article data-reveal className="flex flex-col overflow-hidden rounded-card bg-card md:flex-row lg:flex-col">
      <div className="relative aspect-[4/3] shrink-0 md:aspect-auto md:w-2/5 lg:aspect-[4/3] lg:w-full">
        <Image
          src={plan.image.src}
          alt={plan.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 40vw, 100vw"
          className="object-cover"
          style={{ objectPosition: plan.image.objectPosition }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
        <div className="flex flex-col gap-3">
          <h3 className="type-h3 text-foreground">{plan.name}</h3>
          <p className="type-price text-primary">{plan.price}</p>
        </div>

        <dl className="flex flex-col gap-1.5 border-t border-border pt-5">
          <dt className="type-caption text-muted-foreground">
            {plan.worksLabel}
          </dt>
          <dd className="type-h3 text-foreground">{plan.worksValue}</dd>
          <dd className="type-caption text-muted-foreground">
            {plan.worksNote}
          </dd>
        </dl>

        <p className="type-body text-foreground">
          <span className="text-muted-foreground">Срок: </span>
          {plan.term}
        </p>

        <CtaLink
          href={site.cta.primary.href}
          className="mt-auto w-full"
        >
          {site.cta.primary.label}
        </CtaLink>
      </div>
    </article>
  );
}
