export type LeadPayload = {
  name: string;
  phone: string;
  area: number;
  housing: string | null;
  repair: string | null;
};

export const AREA_RANGE = { min: 5, max: 500 } as const;

/** Национальная часть номера: без ведущей 7 или 8 (код страны / «8» внутри РФ). */
export const phoneDigits = (value: string) =>
  value.replace(/\D/g, "").replace(/^[78]/, "");

/** Приводит ввод к виду +7 (900) 123-45-67 по мере набора. */
export function formatPhone(value: string) {
  const digits = phoneDigits(value).slice(0, 10);
  if (digits.length === 0) return "";
  let out = `+7 (${digits.slice(0, 3)}`;
  if (digits.length > 3) out += `) ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
  return out;
}

export const isValidPhone = (value: string) => phoneDigits(value).length === 10;

export const isValidArea = (value: number) =>
  Number.isFinite(value) && value >= AREA_RANGE.min && value <= AREA_RANGE.max;
