import { site } from "@/lib/site";
import { Section } from "./section";
import { Heading } from "./typography";

const { situations } = site;

export function Situations() {
  return (
    <Section id="situations">
      <Heading level="h2" data-reveal className="max-w-heading text-balance">
        {situations.title}
      </Heading>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-6 xl:grid-cols-4">
        {situations.items.map((item) => (
          <li
            key={item.title}
            data-reveal
            className="flex flex-col gap-3 rounded-card bg-card p-5 md:p-8 xl:p-6"
          >
            <h3 className="type-h3 text-balance text-foreground">
              {item.title}
            </h3>
            <p className="type-body text-pretty text-muted-foreground">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
