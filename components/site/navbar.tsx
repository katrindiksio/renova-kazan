import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Brand } from "./brand";
import { Container } from "./container";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  return (
    <Container as="header">
      <div className="grid h-nav grid-cols-[1fr_auto] items-center gap-4 px-2 md:px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Brand />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="type-nav text-foreground/75 transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-1">
          <a
            href={site.cta.primary.href}
            className={cn(
              buttonVariants({ size: "nav" }),
              "hidden md:inline-flex",
            )}
          >
            {site.cta.primary.label}
          </a>
          <MobileMenu className="lg:hidden" />
        </div>
      </div>
    </Container>
  );
}
