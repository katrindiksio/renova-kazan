import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

export type Tone = "default" | "onPhoto";

const headingLevel = {
  h1: "type-display",
  h2: "type-h2",
  h3: "type-h3",
  statement: "type-statement font-semibold",
} as const;

const headingTone: Record<Tone, string> = {
  default: "text-foreground",
  onPhoto: "text-white",
};

const leadTone: Record<Tone, string> = {
  default: "text-muted-foreground",
  onPhoto: "text-white/90",
};

type HeadingProps = {
  level?: keyof typeof headingLevel;
  as?: ElementType;
  tone?: Tone;
} & Omit<ComponentPropsWithoutRef<"h2">, "ref">;

export function Heading({
  level = "h2",
  as,
  tone = "default",
  className,
  ...props
}: HeadingProps) {
  const Tag: ElementType = as ?? (level === "statement" ? "h2" : level);
  return (
    <Tag
      className={cn(headingLevel[level], headingTone[tone], className)}
      {...props}
    />
  );
}

export function Lead({
  tone = "default",
  className,
  ...props
}: { tone?: Tone } & ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("type-lead max-w-lead", leadTone[tone], className)}
      {...props}
    />
  );
}

export function Eyebrow({
  tone = "default",
  className,
  children,
  ...props
}: { tone?: Tone } & ComponentPropsWithoutRef<"p">) {
  const onPhoto = tone === "onPhoto";
  return (
    <p
      className={cn(
        "type-eyebrow flex items-center gap-2.5",
        onPhoto ? "text-white/90" : "text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          onPhoto ? "bg-white" : "bg-primary",
        )}
      />
      {children}
    </p>
  );
}
