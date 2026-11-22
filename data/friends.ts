import { Friend } from "@/types/friend";

export const FRIENDS_DATA: Friend[] = [
  {
    id: "habib",
    name: "Habib",
    slug: "habib",
    birthdayDay: 15,
    birthdayMonth: 10, // October
    profileAccent: "#3B82F6", // Primary Blue
    secondaryAccent: "#60A5FA",
    gradient: "from-blue-600/30 via-indigo-600/20 to-sky-500/10",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    shortDescription: "The tech visionary, creative builder, and the compass who keeps every ambitious dream grounded.",
    personalizedGreeting: "Wishing Habib another epic orbit filled with groundbreaking breakthroughs, limitless code, and midnight inspirations!",
    nickname: "The Architect",
    role: "Visionary & Builder",
    favoriteQuote: "Simplicity is the prerequisite for reliability.",
    traits: ["Creative Technologist", "Deep Thinker", "Night Owl", "The Group Anchor"],
    isDoubleBirthday: false,
  },
  {
    id: "nafi",
    name: "Nafi",
    slug: "nafi",
    birthdayDay: 20,
    birthdayMonth: 11, // November
    profileAccent: "#22D3EE", // Cyan
    secondaryAccent: "#38BDF8",
    gradient: "from-cyan-500/30 via-blue-600/20 to-teal-400/10",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    shortDescription: "The calm strategist, steadfast confidant, and master of witty remarks when you least expect them.",
    personalizedGreeting: "Cheers to Nafi! May this year bring unstoppable momentum, supreme tranquility, and victories in every arena.",
    nickname: "The Strategist",
    role: "The Mastermind",
    favoriteQuote: "Keep your eyes on the stars and your feet on the ground.",
    traits: ["Strategic Thinker", "Loyal Confidant", "Caffeine Connoisseur", "Problem Solver"],
    isDoubleBirthday: false,
  },
  {
    id: "shaira",
    name: "Shaira",
    slug: "shaira",
    birthdayDay: 17,
    birthdayMonth: 2, // February
    profileAccent: "#EC4899", // Radiant Rose / Pink-Blue harmony
    secondaryAccent: "#F472B6",
    gradient: "from-pink-500/30 via-purple-600/20 to-blue-500/10",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    shortDescription: "The radiant spark of laughter, genuine warmth, and unforgettable stories that light up any room.",
    personalizedGreeting: "Happiest Birthday Shaira! May your days stay as luminous, joyful, and captivating as your infectious smile.",
    nickname: "The Luminary",
    role: "Heart of the Group",
    favoriteQuote: "Wherever you go, go with all your heart.",
    traits: ["Vibrant Energy", "Heart of Gold", "Laughter Catalyst", "Empathetic Listener"],
    isDoubleBirthday: false,
  },
  {
    id: "neha",
    name: "Neha",
    slug: "neha",
    birthdayDay: 12,
    birthdayMonth: 9, // September
    profileAccent: "#A855F7", // Electric Violet
    secondaryAccent: "#C084FC",
    gradient: "from-purple-600/30 via-indigo-600/20 to-cyan-400/10",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    shortDescription: "The soulful aesthetician, thoughtful listener, and creator of moments that touch the heart deeply.",
    personalizedGreeting: "To Neha on her special day: May your life be filled with poetry, serene horizons, and dreams that unfold beautifully.",
    nickname: "The Muse",
    role: "Creative Soul",
    favoriteQuote: "Creativity takes courage.",
    traits: ["Aesthetic Curator", "Soulful Thinker", "Quiet Strength", "Unmatched Empathy"],
    isDoubleBirthday: false,
  },
  {
    id: "mahi",
    name: "Mahi",
    slug: "mahi",
    birthdayDay: 1,
    birthdayMonth: 11, // November
    profileAccent: "#10B981", // Mint Emerald
    secondaryAccent: "#34D399",
    gradient: "from-emerald-500/30 via-teal-600/20 to-blue-600/10",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    shortDescription: "The spontaneous adventurer, energy dynamo, and bold spirit who turns ordinary days into legendary memories.",
    personalizedGreeting: "Happy Birthday Mahi! Here's to countless new expeditions, wild celebrations, and conquering every peak ahead.",
    nickname: "The Maverick",
    role: "Adventurer & Dynamo",
    favoriteQuote: "Life begins at the end of your comfort zone.",
    traits: ["Fearless Spirit", "High Energy", "Spontaneous Traveler", "True Friend"],
    isDoubleBirthday: false,
  },
  {
    id: "mim",
    name: "Mim",
    slug: "mim",
    birthdayDay: 8,
    birthdayMonth: 11, // November (Double Birthday with Shiam)
    profileAccent: "#F59E0B", // Golden Amber
    secondaryAccent: "#FBBF24",
    gradient: "from-amber-500/30 via-rose-500/20 to-blue-600/10",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    shortDescription: "The graceful luminary, thoughtful harmonizer, and one-half of the legendary November 8 double birthday celebration.",
    personalizedGreeting: "Happy Double Birthday Mim! May your universe blossom with boundless laughter, elegance, and treasured milestones.",
    nickname: "The Harmonizer",
    role: "Grace & Harmony",
    favoriteQuote: "Grace in her heart, fire in her soul.",
    traits: ["Gentle Grace", "Creative Vision", "Nov 8 Legend", "Loyal Companion"],
    isDoubleBirthday: true,
  },
  {
    id: "shiam",
    name: "Shiam",
    slug: "shiam",
    birthdayDay: 8,
    birthdayMonth: 11, // November (Double Birthday with Mim)
    profileAccent: "#38BDF8", // Sky Blue
    secondaryAccent: "#67E8F9",
    gradient: "from-sky-500/30 via-blue-600/20 to-indigo-600/10",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    shortDescription: "The sharp-witted powerhouse, charismatic ally, and co-star of the cosmic November 8 double birthday celebration.",
    personalizedGreeting: "Salutes to Shiam on your big day! May the year ahead bring towering success, thrilling triumphs, and unstoppable drive.",
    nickname: "The Catalyst",
    role: "Drive & Charisma",
    favoriteQuote: "Make each day your masterpiece.",
    traits: ["Quick Wit", "Fierce Loyalty", "Nov 8 Legend", "Natural Charisma"],
    isDoubleBirthday: true,
  },
];

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getFriendBySlug(slug: string): Friend | undefined {
  return FRIENDS_DATA.find((f) => f.slug.toLowerCase() === slug.toLowerCase());
}
