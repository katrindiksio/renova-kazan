import type { ComponentPropsWithoutRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  variant?: "default" | "onPhoto";
  /** fixed — одинаковая ширина кнопок в паре (full на мобильном, 240 px от sm). */
  width?: "auto" | "fixed";
} & ComponentPropsWithoutRef<"a">;

/** Основная CTA-кнопка-ссылка: единый стиль xl (h-12, pill, 15/20 Manrope Medium). */
export function CtaLink({
  variant = "default",
  width = "auto",
  className,
  ...props
}: CtaLinkProps) {
  return (
    <a
      className={cn(
        buttonVariants({ variant, size: "xl" }),
        width === "fixed" && "w-full sm:w-60",
        className,
      )}
      {...props}
    />
  );
}

/** Пара CTA: колонка на мобильном, ряд от sm, gap 12 px. */
export function CtaGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 sm:flex-row", className)}
      {...props}
    />
  );
}
