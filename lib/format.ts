export function formatDate(iso: string | null): string {
  if (!iso) return "Not announced";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

export function todayInBerlin(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
}

export type ProgramStatus = "OPENING_SOON" | "OPEN" | "CLOSED";

export function getStatus(
  start: string | null,
  end: string | null,
  today: string
): ProgramStatus | null {
  if (!start || !end) return null;
  if (start > today) return "OPENING_SOON";
  if (end < today) return "CLOSED";
  return "OPEN";
}