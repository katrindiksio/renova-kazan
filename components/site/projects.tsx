import { site } from "@/lib/site";
import { CompareSlider } from "./compare-slider";
import { CtaLink } from "./cta";
import { Section } from "./section";
import { Heading } from "./typography";

const { projects } = site;

export function Projects() {
  return (
    <Section id="projects">
      <Heading level="h2" data-reveal className="max-w-heading text-balance">
        {projects.title}
      </Heading>

      <ul className="mt-8 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {projects.items.map((item, index) => (
          <li
            key={item.flat}
            data-reveal
            className="flex flex-col overflow-hidden rounded-card bg-card"
          >
            <CompareSlider
              before={`/projects/${index + 1}-before.jpg`}
              after={`/projects/${index + 1}-after.jpg`}
              beforeAlt={`${item.flat}: до ремонта`}
              afterAlt={`${item.flat}: после ремонта`}
              beforeLabel={projects.before}
              afterLabel={projects.after}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />

            <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
              <div className="flex flex-col items-start gap-3">
                <span className="type-caption rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  {item.repair}
                </span>
                <h3 className="type-h3 text-foreground">{item.flat}</h3>
              </div>

              <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div className="flex flex-col gap-1">
                  <dt className="type-caption text-muted-foreground">
                    {projects.budgetLabel}
                  </dt>
                  <dd className="type-body font-semibold text-foreground">
                    {item.budget}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="type-caption text-muted-foreground">
                    {projects.termLabel}
                  </dt>
                  <dd className="type-body font-semibold text-foreground">
                    {item.term}
                  </dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-8 flex justify-center md:mt-12">
        <CtaLink href={projects.cta.href} width="fixed">
          {projects.cta.label}
        </CtaLink>
      </div>
    </Section>
  );
}
