import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("rounded-card bg-card", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 cursor-pointer items-center justify-between gap-4 rounded-card text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/accordion-trigger:bg-primary/15"
        >
          <Plus className="size-4 group-aria-expanded/accordion-trigger:hidden" />
          <Minus className="hidden size-4 group-aria-expanded/accordion-trigger:block" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: Omit<AccordionPrimitive.Panel.Props, "className"> & {
  className?: string;
}) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={className}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
