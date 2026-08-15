import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Current local date/time formatted for a `datetime-local` input default. */
export function nowForDateTimeInput() {
  const now = new Date()
  const offsetMs = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 16)
}

/** Formats an ISO date or `datetime-local` string for display in report tables. */
export function formatRecordDate(date: string) {
  const parsed = new Date(date.includes("T") ? date : `${date}T00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
