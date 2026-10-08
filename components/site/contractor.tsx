import { site } from "@/lib/site";
import { Section } from "./section";
import { Heading } from "./typography";

const { contractor } = site;

export function Contractor() {
  return (
    <Section id="contractor">
      <div className="flex flex-col items-center gap-2 text-center md:gap-0">
        <Heading level="statement" data-reveal>{contractor.title}</Heading>

        {contractor.paragraphs.map((text) => (
          <p key={text} data-reveal className="type-statement text-pretty text-muted-foreground">
            {text}
          </p>
        ))}
      </div>
    </Section>
  );
}
