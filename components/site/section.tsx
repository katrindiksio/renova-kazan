import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * Базовая секция лендинга после Hero: общий контейнер и вертикальный
 * отступ py-section. Hero собирается отдельно (фото на весь блок).
 */
export function Section({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section className={cn("py-section", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
