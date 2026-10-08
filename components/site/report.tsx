import {
  Camera,
  DoorOpen,
  FileCheck,
  LayoutDashboard,
  Phone,
  Video,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/lib/site";
import { Section } from "./section";
import { Heading, Lead } from "./typography";

const { report } = site;

const icons: Record<(typeof report.items)[number]["icon"], LucideIcon> = {
  camera: Camera,
  cabinet: LayoutDashboard,
  phone: Phone,
  video: Video,
  acceptance: FileCheck,
  door: DoorOpen,
};

export function Report() {
  return (
    <Section id="report">
      <div data-reveal className="flex flex-col gap-3 md:gap-4">
        <Heading level="h2" className="max-w-heading text-balance">
          {report.title}
        </Heading>
        <Lead>{report.lead}</Lead>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-3">
        {report.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li
              key={item.title}
              data-reveal
              className="flex flex-col gap-3 rounded-card bg-card p-5 md:p-8"
            >
              <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="type-h3">{item.title}</h3>
              <p className="type-body text-muted-foreground">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
