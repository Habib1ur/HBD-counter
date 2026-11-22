import { formatDayMonth } from "./timezone";

export function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function formatOrdinal(day: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = day % 100;
  return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

export function formatBirthdayDisplay(day: number, month: number): string {
  return formatDayMonth(day, month);
}
