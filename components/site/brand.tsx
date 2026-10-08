import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={site.brand.name}
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap text-[17px] font-bold tracking-tight text-foreground",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-[10px] bg-primary"
      >
        <span className="size-3 rounded-[3px] border-2 border-white" />
      </span>
      {site.brand.name}
    </Link>
  );
}
