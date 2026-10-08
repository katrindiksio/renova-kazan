import { site } from "@/lib/site";

const cornerFillet =
  "absolute size-[var(--hero-radius)] bg-[radial-gradient(circle_at_0_0,transparent_calc(var(--hero-radius)_-_0.5px),var(--background)_var(--hero-radius))]";

/**
 * Единый блок преимуществ в правом нижнем углу hero. Повторяет конструкцию
 * референса: панель цвета страницы «вырезает» угол фото, скругления стыков
 * делают два уголка-филе (cornerFillet).
 */
export function Advantages() {
  return (
    <div className="relative -mx-[calc(var(--hero-pad)+var(--inset))] bg-background px-[calc(var(--hero-pad)+var(--inset))] pb-[1.375rem] pt-6 md:absolute md:-bottom-0.5 md:-right-0.5 md:m-0 md:w-[calc(52%+2px)] md:rounded-tl-hero md:px-0 md:pb-[1.875rem] md:pl-8 md:pr-[2.125rem] md:pt-8 lg:w-[calc(46%+2px)] lg:pb-[2.125rem] lg:pl-10 lg:pr-[2.625rem] lg:pt-9">
      <span
        aria-hidden
        className={`${cornerFillet} -top-[var(--hero-radius)] right-0.5 hidden md:block`}
      />
      <span
        aria-hidden
        className={`${cornerFillet} -left-[var(--hero-radius)] bottom-0.5 hidden md:block`}
      />
      <ul className="grid grid-cols-3 gap-3 md:gap-6">
        {site.hero.advantages.map((item) => (
          <li key={item.label} className="flex min-w-0 flex-col items-center gap-1.5 text-center md:items-start md:text-left">
            <span className="type-stat text-foreground">
              {item.value}
            </span>
            <span className="type-caption text-muted-foreground">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
