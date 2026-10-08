"use client";

import { useId, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ChoiceGroup } from "./choice-group";
import { CtaLink } from "./cta";

const { calculator, pricing } = site;
const { area: areaConfig, conditions, result } = calculator;

const money = (value: number) =>
  Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

export function Calculator() {
  const areaId = useId();
  const [areaRaw, setAreaRaw] = useState(String(areaConfig.initial));
  const [conditionId, setConditionId] = useState<string>(conditions[0].id);
  const [planName, setPlanName] = useState<string>(pricing.plans[0].name);

  const parsed = Number(areaRaw);
  const valid =
    areaRaw !== "" && parsed >= areaConfig.min && parsed <= areaConfig.max;
  const sliderValue = Math.min(
    Math.max(Number.isFinite(parsed) ? parsed : areaConfig.min, areaConfig.min),
    areaConfig.max,
  );

  const plan = pricing.plans.find((item) => item.name === planName)!;
  const condition = conditions.find((item) => item.id === conditionId)!;
  const perM2 = plan.rate * condition.coef;
  const total = valid ? perM2 * parsed : null;

  return (
    <div className="mt-8 grid gap-3 md:mt-12 md:gap-6 lg:grid-cols-12">
      <form
        data-reveal
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-8 rounded-card bg-card p-5 md:p-8 lg:col-span-7"
      >
        <div className="flex flex-col gap-3">
          <label
            htmlFor={areaId}
            className="type-caption text-muted-foreground"
          >
            {areaConfig.label}
          </label>
          <input
            id={areaId}
            type="number"
            inputMode="numeric"
            min={areaConfig.min}
            max={areaConfig.max}
            value={areaRaw}
            onChange={(event) => setAreaRaw(event.target.value)}
            aria-invalid={!valid}
            className="type-body h-12 w-full rounded-full border border-border bg-background px-5 text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
          />
          <input
            type="range"
            aria-label={areaConfig.label}
            min={areaConfig.min}
            max={areaConfig.max}
            value={sliderValue}
            onChange={(event) => setAreaRaw(event.target.value)}
            className="h-2 w-full cursor-pointer accent-primary"
          />
          {!valid && (
            <p className="type-caption text-destructive">
              Введите площадь от {areaConfig.min} до {areaConfig.max} м²
            </p>
          )}
        </div>

        <ChoiceGroup
          legend={calculator.conditionLabel}
          name="condition"
          value={conditionId}
          onChange={setConditionId}
          options={conditions}
        />

        <ChoiceGroup
          legend={calculator.repairLabel}
          name="repair"
          value={planName}
          onChange={setPlanName}
          options={pricing.plans.map((item) => ({
            id: item.name,
            label: item.name,
          }))}
        />
      </form>

      <div data-reveal className="flex flex-col gap-6 rounded-card bg-card p-5 md:p-8 lg:sticky lg:top-6 lg:col-span-5 lg:self-start">
        <div className="flex flex-col gap-3" aria-live="polite">
          <p className="type-caption text-muted-foreground">{result.label}</p>
          <p className={cn("type-h2", total === null ? "text-muted-foreground" : "text-primary")}>
            {total === null ? "—" : `от ${money(total)}\u00a0₽`}
          </p>
        </div>

        <dl className="flex flex-col gap-3 border-t border-border pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="type-body text-muted-foreground">{result.perM2}</dt>
            <dd className="type-body text-foreground">
              от {money(perM2)}&nbsp;₽/м²
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="type-body text-muted-foreground">{result.term}</dt>
            <dd className="type-body text-foreground">{plan.term}</dd>
          </div>
        </dl>

        <p className="type-caption text-muted-foreground">{result.note}</p>

        <CtaLink href={result.cta.href} className="w-full">
          {result.cta.label}
        </CtaLink>
      </div>
    </div>
  );
}
