import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { Heading } from "./typography";

const { included } = site;

/** От 1280 px: карточки 1–3 слева, 4–6 справа, фото по центру на все три ряда. */
const placement = [
  "xl:col-start-1 xl:row-start-1",
  "xl:col-start-1 xl:row-start-2",
  "xl:col-start-1 xl:row-start-3",
  "xl:col-start-3 xl:row-start-1",
  "xl:col-start-3 xl:row-start-2",
  "xl:col-start-3 xl:row-start-3",
];

export function Included() {
  return (
    <Section id="included">
      <Heading level="h2" data-reveal className="max-w-heading text-balance">
        {included.title}
      </Heading>

      <div className="mt-8 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1fr)]">
        <div data-reveal="scale" className="relative aspect-[4/3] overflow-hidden rounded-hero md:col-span-2 md:aspect-[16/7] xl:col-span-1 xl:col-start-2 xl:row-span-3 xl:row-start-1 xl:aspect-auto xl:min-h-[28rem]">
          <Image
            src={included.image.src}
            alt={included.image.alt}
            fill
            sizes="(min-width: 1280px) 45vw, 100vw"
            className="object-cover"
            style={{ objectPosition: included.image.objectPosition }}
          />
        </div>

        {included.items.map((item, index) => {
          const accent = index === 0;
          return (
            <article
              key={item.title}
              data-reveal
              className={cn(
                "flex flex-col gap-3 rounded-card p-5 md:p-8 xl:p-6",
                placement[index],
                accent
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground",
              )}
            >
              <h3 className="type-h3">{item.title}</h3>
              <p
                className={cn(
                  "type-body",
                  accent ? "text-primary-foreground/90" : "text-muted-foreground",
                )}
              >
                {item.text}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
