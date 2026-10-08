"use client";

import { MenuIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function MobileMenu({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Открыть меню"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-touch" }),
          className,
        )}
      >
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(88vw,360px)] p-6 pt-5">
        <SheetTitle className="text-lg font-bold">
          {site.brand.name}
        </SheetTitle>
        <nav aria-label="Основная навигация" className="mt-4 flex flex-col">
          {site.nav.map((item) => (
            <SheetClose
              key={item.href}
              render={<a href={item.href} />}
              nativeButton={false}
              className="border-b py-4 text-xl font-normal tracking-tight text-foreground"
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
        <SheetClose
          render={<a href={site.cta.primary.href} />}
          nativeButton={false}
          className={cn(buttonVariants({ size: "xl" }), "mt-auto w-full")}
        >
          {site.cta.primary.label}
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
