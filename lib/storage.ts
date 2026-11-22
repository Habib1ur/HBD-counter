import { WishMessage } from "@/types/birthday";

const WISHES_STORAGE_KEY = "friends_universe_wishes_v1";
const THEME_STORAGE_KEY = "friends_universe_theme_v1";

const DEFAULT_WISHES: WishMessage[] = [
  {
    id: "wish-seed-1",
    friendSlug: "habib",
    authorName: "Nafi",
    message: "Happy birthday Habib! Keep coding the future and inspiring everyone around you. Let's make this year unforgettable!",
    createdAt: "2026-10-15T00:05:00.000Z",
  },
  {
    id: "wish-seed-2",
    friendSlug: "mim",
    authorName: "Shiam",
    message: "Happy double birthday twin! Another year of sharing the best day of the year together. Proud of everything you achieve!",
    createdAt: "2026-11-08T00:01:00.000Z",
  },
  {
    id: "wish-seed-3",
    friendSlug: "shiam",
    authorName: "Mim",
    message: "Happy double birthday Shiam! Here's to November 8th and our unbeatable cosmic bond. Keep shining bright!",
    createdAt: "2026-11-08T00:02:00.000Z",
  },
  {
    id: "wish-seed-4",
    friendSlug: "shaira",
    authorName: "Neha",
    message: "Happy Birthday Shaira! Your laughter is literally therapy for all of us. Never lose that magical spark!",
    createdAt: "2026-02-17T01:30:00.000Z",
  },
];

export function getStoredWishes(): WishMessage[] {
  if (typeof window === "undefined") return DEFAULT_WISHES;
  try {
    const raw = localStorage.getItem(WISHES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(DEFAULT_WISHES));
      return DEFAULT_WISHES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_WISHES;
  }
}

export function saveWish(wish: Omit<WishMessage, "id" | "createdAt">): WishMessage {
  const current = getStoredWishes();
  const newWish: WishMessage = {
    ...wish,
    id: `wish-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newWish, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
  }
  return newWish;
}

export function deleteWish(wishId: string): WishMessage[] {
  const current = getStoredWishes();
  const updated = current.filter((w) => w.id !== wishId);
  if (typeof window !== "undefined") {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function getStoredTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function setStoredTheme(theme: "dark" | "light"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.error("Failed to store theme", err);
  }
}
