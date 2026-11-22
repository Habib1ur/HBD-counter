import { Friend } from "./friend";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
  isToday: boolean;
}

export interface BangladeshTimeInfo {
  now: Date;
  formattedTime: string; // e.g. "10:45:22 PM"
  formattedDate: string; // e.g. "Sunday, 23 November 2026"
  timezone: string; // "Asia/Dhaka"
  utcOffset: string; // "+06:00"
  year: number;
  month: number; // 1-12
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BirthdayCelebrationState {
  isAnyBirthdayToday: boolean;
  isDoubleBirthday: boolean;
  celebratingFriends: Friend[];
  nextUpcomingFriend: Friend;
  allFriendsSorted: Friend[];
}

export interface WishMessage {
  id: string;
  friendSlug: string;
  authorName: string;
  message: string;
  createdAt: string;
  avatarSeed?: string;
}
