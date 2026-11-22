export interface Friend {
  id: string;
  name: string;
  slug: string;
  birthdayDay: number; // 1 - 31
  birthdayMonth: number; // 1 - 12 (1 = Jan, 2 = Feb, ..., 12 = Dec)
  profileAccent: string; // Hex color e.g. #3B82F6
  secondaryAccent?: string;
  gradient: string; // e.g. "from-blue-600/30 via-indigo-600/20 to-cyan-500/10"
  avatar: string; // Image URL or SVG identifier
  shortDescription: string;
  personalizedGreeting: string;
  nickname?: string;
  role?: string;
  favoriteQuote?: string;
  traits: string[];
  isDoubleBirthday?: boolean;
}

export interface FriendWithCountdown extends Friend {
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  isToday: boolean;
  nextBirthdayDate: Date;
  nextAgeEstimate?: number;
  formattedBirthday: string;
}
