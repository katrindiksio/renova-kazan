"use client";

import { Check } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  formatPhone,
  isValidArea,
  isValidPhone,
  type LeadPayload,
} from "@/lib/lead";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ChoiceGroup } from "./choice-group";

const { lead } = site;
const { fields, errors } = lead;

type FieldName = "name" | "phone" | "area";
type Status = "idle" | "sending" | "sent" | "failed";

const inputClass =
  "type-body h-12 w-full rounded-full border border-border bg-background px-5 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

type TextFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<"input">;

function TextField({ id, label, error, className, ...props }: TextFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="type-caption text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="type-caption text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm({ className }: { className?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [housing, setHousing] = useState("");
  const [repair, setRepair] = useState("");
  const [invalid, setInvalid] = useState<Partial<Record<FieldName, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");

  const id = (field: string) => `${uid}-${field}`;

  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!name.trim()) next.name = errors.name;
    if (!isValidPhone(phone)) next.phone = errors.phone;
    if (!isValidArea(Number(area))) next.area = errors.area;
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate();
    setInvalid(found);
    const first = (["name", "phone", "area"] as const).find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLInputElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }

    const payload: LeadPayload = {
      name: name.trim(),
      phone,
      area: Number(area),
      housing: housing || null,
      repair: repair || null,
    };

    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const reset = () => {
    setName("");
    setPhone("");
    setArea("");
    setHousing("");
    setRepair("");
    setInvalid({});
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-start gap-5 rounded-card bg-card p-5 md:p-8",
          className,
        )}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check aria-hidden className="size-6" strokeWidth={2.5} />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="type-h3 text-foreground">{lead.success.title}</h3>
          <p className="type-body text-muted-foreground">{lead.success.text}</p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="type-button cursor-pointer text-primary underline-offset-4 hover:underline"
        >
          {lead.success.again}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col gap-6 rounded-card bg-card p-5 md:p-8",
        className,
      )}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={id("name")}
          label={fields.name.label}
          placeholder={fields.name.placeholder}
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={invalid.name}
        />
        <TextField
          id={id("phone")}
          label={fields.phone.label}
          placeholder={fields.phone.placeholder}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(formatPhone(event.target.value))}
          error={invalid.phone}
        />
        <TextField
          id={id("area")}
          label={fields.area.label}
          placeholder={fields.area.placeholder}
          name="area"
          type="number"
          inputMode="numeric"
          min={fields.area.min}
          max={fields.area.max}
          value={area}
          onChange={(event) => setArea(event.target.value)}
          error={invalid.area}
          className="sm:col-span-2"
        />
      </div>

      <ChoiceGroup
        legend={fields.housing.label}
        name={`${uid}-housing`}
        value={housing}
        onChange={setHousing}
        options={fields.housing.options}
      />
      <ChoiceGroup
        legend={fields.repair.label}
        name={`${uid}-repair`}
        value={repair}
        onChange={setRepair}
        options={fields.repair.options}
      />

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          size="xl"
          disabled={status === "sending"}
          className="w-full"
        >
          {status === "sending" ? lead.submitting : lead.submit}
        </Button>
        {status === "failed" && (
          <p role="alert" className="type-caption text-destructive">
            {errors.submit}
          </p>
        )}
        <p className="type-caption text-muted-foreground">{lead.consent}</p>
      </div>
    </form>
  );
}
