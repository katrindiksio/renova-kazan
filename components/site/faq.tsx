import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site";
import { Section } from "./section";
import { Heading } from "./typography";

const { faq } = site;

export function Faq() {
  return (
    <Section id="faq">
      <Heading level="h2" data-reveal className="max-w-heading text-balance">
        {faq.title}
      </Heading>

      <Accordion className="mt-8 gap-3 md:mt-12 md:gap-4">
        {faq.items.map((item, index) => (
          <AccordionItem key={item.question} value={index} data-reveal>
            <AccordionTrigger className="p-5 md:p-6">
              <span className="type-lead font-medium text-foreground">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="type-lead max-w-none px-5 pb-5 text-muted-foreground md:px-6 md:pb-6">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
