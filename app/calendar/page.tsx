"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sparkles, PartyPopper, Users, ArrowRight } from "lucide-react";
import { FRIENDS_DATA, MONTH_NAMES } from "@/data/friends";
import { useBangladeshTime } from "@/hooks/useBangladeshTime";
import { useCountdown } from "@/hooks/useCountdown";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";

export default function CalendarPage() {
  const { timeInfo, isMounted } = useBangladeshTime();
  const { allFriends } = useCountdown();

  // Current month in Dhaka (1-12)
  const currentDhakaMonth = timeInfo?.month ?? new Date().getMonth() + 1;
  const currentDhakaDay = timeInfo?.day ?? new Date().getDate();

  const [selectedMonth, setSelectedMonth] = useState<number>(currentDhakaMonth);
  const [selectedFriendSlug, setSelectedFriendSlug] = useState<string | null>(null);

  // Helper: days in month
  const getDaysInMonth = (month: number, year: number = 2026) => {
    return new Date(year, month, 0).getDate();
  };

  // Helper: first day of month (0 = Sun, 1 = Mon...)
  const getFirstDayOfWeek = (month: number, year: number = 2026) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedMonth);
  const firstDay = getFirstDayOfWeek(selectedMonth);

  // Friends born in selected month
  const friendsInMonth = FRIENDS_DATA.filter((f) => f.birthdayMonth === selectedMonth);

  const prevMonth = () => {
    setSelectedMonth((m) => (m === 1 ? 12 : m - 1));
  };

  const nextMonth = () => {
    setSelectedMonth((m) => (m === 12 ? 1 : m + 1));
  };

  const selectedFriend = FRIENDS_DATA.find((f) => f.slug === selectedFriendSlug);

  return (
    <div className="pt-32 sm:pt-40 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <Badge variant="cyan" icon={<CalendarIcon className="w-3.5 h-3.5" />}>
          ANNUAL ORBIT CALENDAR
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3">
          Birthday Horizon
        </h1>
        <p className="text-sm text-slate-300 mt-2 font-light">
          Track milestones and special constellations throughout the year in Bangladesh Standard Time.
        </p>
      </div>

      {/* MONTH NAVIGATION BAR */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] dark:bg-white/[0.02] border border-white/[0.1] backdrop-blur-xl mb-8 shadow-glass-sm">
        <button
          onClick={prevMonth}
          className="p-2 rounded-xl hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {MONTH_NAMES[selectedMonth - 1]}
          </h2>
          {selectedMonth === currentDhakaMonth && (
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30">
              Current Month
            </span>
          )}
        </div>

        <button
          onClick={nextMonth}
          className="p-2 rounded-xl hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* QUICK MONTH PILLS (12 MONTHS) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {MONTH_NAMES.map((name, idx) => {
          const monthNum = idx + 1;
          const hasBirthday = FRIENDS_DATA.some((f) => f.birthdayMonth === monthNum);
          const isSelected = selectedMonth === monthNum;
          const isCurrent = currentDhakaMonth === monthNum;

          return (
            <button
              key={name}
              onClick={() => setSelectedMonth(monthNum)}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                isSelected
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-blue-400/40"
                  : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.08]"
              }`}
            >
              <span>{name.substring(0, 3)}</span>
              {hasBirthday && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1.5 inline-block" />
              )}
              {isCurrent && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1 inline-block" />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CALENDAR GRID */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white/[0.04] dark:bg-[#0c1427]/80 backdrop-blur-2xl border border-white/[0.12] shadow-glass">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-mono font-bold text-slate-400 mb-3">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Day Tiles */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
            {/* Empty slots for leading days */}
            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-2xl bg-white/[0.01]" />
            ))}

            {/* Days in Month */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isToday =
                selectedMonth === currentDhakaMonth && day === currentDhakaDay;
              const friendsBirthday = FRIENDS_DATA.filter(
                (f) => f.birthdayMonth === selectedMonth && f.birthdayDay === day
              );
              const hasFriend = friendsBirthday.length > 0;
              const isDouble = friendsBirthday.length > 1;

              return (
                <div
                  key={day}
                  onClick={() => {
                    if (hasFriend) {
                      setSelectedFriendSlug(friendsBirthday[0].slug);
                    }
                  }}
                  className={`relative flex flex-col justify-between p-2 rounded-2xl transition-all h-16 sm:h-24 ${
                    hasFriend
                      ? "cursor-pointer bg-blue-500/15 border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105"
                      : isToday
                      ? "bg-white/[0.08] border border-blue-400/40"
                      : "bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold ${
                        isToday ? "text-cyan-300" : hasFriend ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {day}
                    </span>

                    {isToday && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    )}
                  </div>

                  {/* Friend Birthday Badge */}
                  {hasFriend && (
                    <div className="mt-auto">
                      <div className="flex items-center -space-x-2">
                        {friendsBirthday.map((f) => (
                          <div
                            key={f.slug}
                            className="w-6 h-6 rounded-full border border-white/60 overflow-hidden shadow-sm"
                            title={`${f.name}'s Birthday`}
                          >
                            <Image
                              src={f.avatar}
                              alt={f.name}
                              width={24}
                              height={24}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-sky-200 truncate block mt-0.5">
                        {isDouble ? "Double B'day!" : friendsBirthday[0].name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDE DETAILS: MONTH SUMMARY & SELECTED FRIEND */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Friends born in this month */}
          <div className="p-6 rounded-3xl bg-white/[0.04] dark:bg-[#0c1427]/80 backdrop-blur-2xl border border-white/[0.12] shadow-glass">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-4">
              <PartyPopper className="w-4 h-4 text-cyan-400" />
              <span>{MONTH_NAMES[selectedMonth - 1]} Birthdays</span>
            </h3>

            {friendsInMonth.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                No friend birthdays in {MONTH_NAMES[selectedMonth - 1]}. Browse other months!
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {friendsInMonth.map((f) => (
                  <div
                    key={f.slug}
                    onClick={() => setSelectedFriendSlug(f.slug)}
                    className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={f.avatar}
                        alt={f.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-xl object-cover border border-white/20"
                      />
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                          {f.name}
                        </div>
                        <div className="text-xs text-sky-400 font-mono">
                          {f.birthdayDay} {MONTH_NAMES[f.birthdayMonth - 1]}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Friend Spotlight Drawer */}
          {selectedFriend && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-gradient-to-b from-blue-900/30 to-black/40 border border-blue-400/40 backdrop-blur-2xl shadow-neon-blue"
            >
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={selectedFriend.avatar}
                  alt={selectedFriend.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-2xl object-cover border border-cyan-400"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{selectedFriend.name}</h4>
                  <span className="text-xs text-sky-300 font-mono">
                    {selectedFriend.birthdayDay} {MONTH_NAMES[selectedFriend.birthdayMonth - 1]}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-200 mb-4 line-clamp-3">
                {selectedFriend.shortDescription}
              </p>

              <div className="flex items-center gap-2">
                <Link
                  href={`/friends/${selectedFriend.slug}`}
                  className="flex-1 py-2 text-center rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                >
                  View Profile
                </Link>
                <Link
                  href={`/celebrate/${selectedFriend.slug}`}
                  className="flex-1 py-2 text-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md"
                >
                  Celebrate
                </Link>
              </div>
            </motion.div>
          )}

          {/* All 7 Friends Summary Pill List */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              All Seven In Chronological Order
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              {[...FRIENDS_DATA]
                .sort((a, b) => a.birthdayMonth - b.birthdayMonth || a.birthdayDay - b.birthdayDay)
                .map((f) => (
                  <Link
                    key={f.slug}
                    href={`/friends/${f.slug}`}
                    className="flex items-center justify-between py-1 text-slate-300 hover:text-sky-300 transition-colors"
                  >
                    <span>{f.name}</span>
                    <span className="font-mono text-slate-500">
                      {f.birthdayDay} {MONTH_NAMES[f.birthdayMonth - 1].substring(0, 3)}
                      {f.isDoubleBirthday && " ✦ Double"}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
