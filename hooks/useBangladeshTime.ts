"use client";

import { useState, useEffect } from "react";
import {
  getBangladeshDateParts,
  formatBangladeshTime,
  formatBangladeshDate,
  BANGLADESH_TIMEZONE,
  BANGLADESH_UTC_OFFSET_HOURS,
} from "@/lib/timezone";
import { BangladeshTimeInfo } from "@/types/birthday";

export function useBangladeshTime(): {
  timeInfo: BangladeshTimeInfo | null;
  isMounted: boolean;
} {
  const [isMounted, setIsMounted] = useState(false);
  const [timeInfo, setTimeInfo] = useState<BangladeshTimeInfo | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const updateTime = () => {
      const now = new Date();
      const parts = getBangladeshDateParts(now);
      setTimeInfo({
        now,
        formattedTime: formatBangladeshTime(now),
        formattedDate: formatBangladeshDate(now),
        timezone: BANGLADESH_TIMEZONE,
        utcOffset: `+0${BANGLADESH_UTC_OFFSET_HOURS}:00`,
        year: parts.year,
        month: parts.month,
        day: parts.day,
        hours: parts.hour,
        minutes: parts.minute,
        seconds: parts.second,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return { timeInfo, isMounted };
}
