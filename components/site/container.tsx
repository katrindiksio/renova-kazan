import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Единый контейнер сайта: max-w-site и боковое поле px-inset (12 / 16 / 24 px). */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={cn("mx-auto w-full max-w-site px-inset", className)}
      {...props}
    />
  );
}
