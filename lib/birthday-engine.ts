import { Friend, FriendWithCountdown } from "@/types/friend";
import { CountdownTime, BirthdayCelebrationState } from "@/types/birthday";
import { FRIENDS_DATA } from "@/data/friends";
import {
  getBangladeshDateParts,
  createBangladeshTimestamp,
  formatDayMonth,
} from "./timezone";

/**
 * Calculates countdown details for a single friend in Asia/Dhaka.
 */
export function calculateFriendCountdown(
  friend: Friend,
  now: Date = new Date()
): FriendWithCountdown {
  const bdParts = getBangladeshDateParts(now);
  const nowMs = now.getTime();

  // Check if today is the birthday in Dhaka
  const isToday =
    bdParts.month === friend.birthdayMonth && bdParts.day === friend.birthdayDay;

  // Determine the next birthday timestamp (at 00:00:00 Dhaka time)
  let targetYear = bdParts.year;
  const thisYearBirthdayStart = createBangladeshTimestamp(
    targetYear,
    friend.birthdayMonth,
    friend.birthdayDay,
    0,
    0,
    0
  );
  const thisYearBirthdayEnd = createBangladeshTimestamp(
    targetYear,
    friend.birthdayMonth,
    friend.birthdayDay + 1,
    0,
    0,
    0
  );

  let targetTimestamp: number;

  if (nowMs < thisYearBirthdayStart) {
    // Birthday is later this year
    targetTimestamp = thisYearBirthdayStart;
  } else if (nowMs >= thisYearBirthdayStart && nowMs < thisYearBirthdayEnd) {
    // Birthday is TODAY!
    targetTimestamp = thisYearBirthdayStart;
  } else {
    // Birthday passed this year, rolls over to next year
    targetYear += 1;
    targetTimestamp = createBangladeshTimestamp(
      targetYear,
      friend.birthdayMonth,
      friend.birthdayDay,
      0,
      0,
      0
    );
  }

  const diff = isToday ? 0 : Math.max(0, targetTimestamp - nowMs);

  const daysRemaining = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutesRemaining = Math.floor((diff / (1000 * 60)) % 60);
  const secondsRemaining = Math.floor((diff / 1000) % 60);

  return {
    ...friend,
    daysRemaining,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    isToday,
    nextBirthdayDate: new Date(targetTimestamp),
    formattedBirthday: formatDayMonth(friend.birthdayDay, friend.birthdayMonth),
  };
}

/**
 * Returns raw countdown breakdown to a target timestamp.
 */
export function getCountdownTime(targetTimestamp: number, now: Date = new Date()): CountdownTime {
  const diff = targetTimestamp - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMilliseconds: 0, isToday: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, totalMilliseconds: diff, isToday: false };
}

/**
 * Returns all friends with their live countdowns sorted by next upcoming birthday.
 * Friends whose birthday is today come first!
 */
export function getFriendsWithCountdowns(now: Date = new Date()): FriendWithCountdown[] {
  const friendsWithCd = FRIENDS_DATA.map((friend) => calculateFriendCountdown(friend, now));

  // Sort: birthdays today first, then by earliest upcoming birthday timestamp
  return friendsWithCd.sort((a, b) => {
    if (a.isToday && !b.isToday) return -1;
    if (!a.isToday && b.isToday) return 1;

    // Both today or both not today: sort by nextBirthdayDate
    const aTime = a.nextBirthdayDate.getTime();
    const bTime = b.nextBirthdayDate.getTime();

    if (aTime !== bTime) {
      return aTime - bTime;
    }

    // Tie-breaker (e.g. Mim and Shiam on same day): alphabetical by name
    return a.name.localeCompare(b.name);
  });
}

/**
 * Detects current birthday celebration state for Bangladesh time.
 */
export function getBirthdayCelebrationState(now: Date = new Date()): BirthdayCelebrationState {
  const sorted = getFriendsWithCountdowns(now);
  const celebratingFriends = sorted.filter((f) => f.isToday);
  const isAnyBirthdayToday = celebratingFriends.length > 0;
  const isDoubleBirthday = celebratingFriends.length > 1;

  // Next upcoming friend is either celebrating now, or the first in the sorted queue
  const nextUpcomingFriend = sorted[0];

  return {
    isAnyBirthdayToday,
    isDoubleBirthday,
    celebratingFriends,
    nextUpcomingFriend,
    allFriendsSorted: sorted,
  };
}
