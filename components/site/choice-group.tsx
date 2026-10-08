export type ChoiceOption = { id: string; label: string };

type ChoiceGroupProps = {
  legend: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly ChoiceOption[];
};

export function ChoiceGroup({
  legend,
  name,
  value,
  onChange,
  options,
}: ChoiceGroupProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="type-caption mb-3 text-muted-foreground">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <div key={option.id} className="relative">
            <input
              type="radio"
              name={name}
              id={`${name}-${option.id}`}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="peer sr-only"
            />
            <label
              htmlFor={`${name}-${option.id}`}
              className="type-button inline-flex h-11 cursor-pointer items-center rounded-full border border-border bg-background px-5 text-foreground transition-colors hover:bg-muted peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
