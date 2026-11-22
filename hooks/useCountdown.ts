"use client";

import { useState, useEffect } from "react";
import { Friend, FriendWithCountdown } from "@/types/friend";
import { calculateFriendCountdown, getFriendsWithCountdowns } from "@/lib/birthday-engine";

export function useCountdown(friend?: Friend): {
  countdown: FriendWithCountdown | null;
  allFriends: FriendWithCountdown[];
  isMounted: boolean;
} {
  const [isMounted, setIsMounted] = useState(false);
  const [allFriends, setAllFriends] = useState<FriendWithCountdown[]>([]);
  const [countdown, setCountdown] = useState<FriendWithCountdown | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const update = () => {
      const now = new Date();
      const friends = getFriendsWithCountdowns(now);
      setAllFriends(friends);

      if (friend) {
        setCountdown(calculateFriendCountdown(friend, now));
      } else if (friends.length > 0) {
        setCountdown(friends[0]);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [friend?.slug]);

  return { countdown, allFriends, isMounted };
}
