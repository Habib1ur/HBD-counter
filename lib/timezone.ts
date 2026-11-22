/**
 * Accurate Timezone utilities for Asia/Dhaka (Bangladesh Standard Time, UTC+6)
 */

export const BANGLADESH_TIMEZONE = "Asia/Dhaka";
export const BANGLADESH_UTC_OFFSET_HOURS = 6;

/**
 * Returns current date/time parts in Asia/Dhaka
 */
export function getBangladeshDateParts(referenceDate: Date = new Date()): {
  year: number;
  month: number; // 1 - 12
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  // Use Intl.DateTimeFormat to reliably extract parts in Asia/Dhaka
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: BANGLADESH_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(referenceDate);
  let year = referenceDate.getUTCFullYear();
  let month = referenceDate.getUTCMonth() + 1;
  let day = referenceDate.getUTCDate();
  let hour = referenceDate.getUTCHours();
  let minute = referenceDate.getUTCMinutes();
  let second = referenceDate.getUTCSeconds();

  for (const part of parts) {
    if (part.type === "year") year = parseInt(part.value, 10);
    if (part.type === "month") month = parseInt(part.value, 10);
    if (part.type === "day") day = parseInt(part.value, 10);
    if (part.type === "hour") hour = parseInt(part.value, 10);
    if (part.type === "minute") minute = parseInt(part.value, 10);
    if (part.type === "second") second = parseInt(part.value, 10);
  }

  // Handle midnight 24 hour if returned
  if (hour === 24) hour = 0;

  return { year, month, day, hour, minute, second };
}

/**
 * Creates a UTC Date corresponding to a specific year, month, day, hour, minute in Bangladesh time (UTC+6).
 * e.g., 2026-10-15 00:00:00 Dhaka = 2026-10-14 18:00:00 UTC
 */
export function createBangladeshTimestamp(
  year: number,
  month: number, // 1 - 12
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): number {
  // Construct UTC timestamp by subtracting 6 hours
  return Date.UTC(year, month - 1, day, hour - BANGLADESH_UTC_OFFSET_HOURS, minute, second);
}

/**
 * Formats time in Bangladesh time (e.g., 10:45:22 PM)
 */
export function formatBangladeshTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BANGLADESH_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

/**
 * Formats date in Bangladesh time (e.g., Monday, 23 November 2026)
 */
export function formatBangladeshDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BANGLADESH_TIMEZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Returns formatted short date (e.g. 15 Oct, 20 Nov)
 */
export function formatDayMonth(day: number, month: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${day} ${months[month - 1]}`;
}
