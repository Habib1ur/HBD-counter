"use client";

import { useState, useEffect } from "react";
import { BirthdayCelebrationState } from "@/types/birthday";
import { getBirthdayCelebrationState } from "@/lib/birthday-engine";

export function useBirthdayMode(): {
  celebrationState: BirthdayCelebrationState | null;
  isMounted: boolean;
} {
  const [isMounted, setIsMounted] = useState(false);
  const [celebrationState, setCelebrationState] = useState<BirthdayCelebrationState | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const check = () => {
      setCelebrationState(getBirthdayCelebrationState(new Date()));
    };

    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  return { celebrationState, isMounted };
}
