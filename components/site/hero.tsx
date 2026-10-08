import Image from "next/image";
import { site } from "@/lib/site";
import { Advantages } from "./advantages";
import { Container } from "./container";
import { CtaGroup, CtaLink } from "./cta";
import { Eyebrow, Heading, Lead } from "./typography";

const { hero, cta } = site;
const [first, second, third] = hero.title;

export function Hero() {
  return (
    <Container as="section" id="top" className="pb-inset">
      <div className="relative isolate flex min-h-hero flex-col justify-between gap-[var(--hero-gap)] rounded-hero px-[var(--hero-pad)] pb-0 pt-hero-y md:pb-hero-y">
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-hero">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: hero.image.objectPosition }}
          />
          <div className="absolute inset-0 bg-[rgb(12_16_22/0.36)]" />
        </div>

        <div className="my-auto max-w-heading max-md:mb-0">
          <Eyebrow tone="onPhoto">{hero.eyebrow}</Eyebrow>

          <Heading level="h1" tone="onPhoto" className="mt-stack-eyebrow">
            {first}
            <br className="md:hidden" /> {second}
            <br className="hidden md:block" /> {third}
          </Heading>

          <Lead tone="onPhoto" className="mt-stack-title">
            {hero.lead.join(" ")}
          </Lead>

          <CtaGroup className="mt-stack-cta">
            <CtaLink href={cta.primary.href} width="fixed">
              {cta.primary.label}
            </CtaLink>
            <CtaLink href={cta.secondary.href} variant="onPhoto" width="fixed">
              {cta.secondary.label}
            </CtaLink>
          </CtaGroup>
        </div>

        <Advantages />
      </div>
    </Container>
  );
}
