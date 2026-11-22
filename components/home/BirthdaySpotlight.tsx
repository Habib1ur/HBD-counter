"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, PartyPopper, Heart, Users, Clock } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { padZero } from "@/lib/date-utils";

export function BirthdaySpotlight() {
  const { countdown: friend, isMounted } = useCountdown();

  if (!isMounted || !friend) {
    return (
      <section id="spotlight" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-96 rounded-3xl bg-white/[0.04] animate-pulse border border-white/10" />
      </section>
    );
  }

  const isToday = friend.isToday;

  return (
    <section id="spotlight" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Background radial spotlight glow */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[90%] h-96 rounded-full blur-[140px] pointer-events-none opacity-40 transition-all duration-700"
        style={{
          background: isToday
            ? "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(59, 130, 246, 0.25) 50%, transparent 70%)"
            : `radial-gradient(circle, ${friend.profileAccent}45 0%, rgba(37, 99, 235, 0.2) 50%, transparent 70%)`,
        }}
      />

      {/* Section Sub-heading */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge variant={isToday ? "live" : "cyan"} icon={<Sparkles className="w-3 h-3" />}>
            {isToday ? "TODAY IS THE BIG DAY" : "NEXT IN THE ORBIT"}
          </Badge>
        </div>

        <Link
          href="/friends"
          className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors group"
        >
          <span>View all upcoming</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3D TILT SPOTLIGHT CARD */}
      <TiltCard
        maxTilt={5}
        spotlightColor={`${friend.profileAccent}25`}
        className="bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-transparent dark:from-[#0f1b33]/85 dark:via-[#091022]/90 dark:to-[#050811]/95 backdrop-blur-3xl border border-white/[0.16] shadow-glass-lg p-6 sm:p-10 lg:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: FRIEND DETAILS */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Status & Double Birthday Tag */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-sky-400 font-semibold">
                {isToday ? "Celebrating Today" : "Approaching Birthday"}
              </span>
              {friend.isDoubleBirthday && (
                <Badge variant="gold">
                  Double Birthday (Nov 8)
                </Badge>
              )}
            </div>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-[2px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 shadow-neon-blue shrink-0 overflow-hidden">
                <Image
                  src={friend.avatar}
                  alt={friend.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {friend.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-slate-300 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>{friend.formattedBirthday}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-sky-300 font-mono text-xs">{friend.role}</span>
                </div>
              </div>
            </div>

            {/* Description / Greeting */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {isToday ? friend.personalizedGreeting : friend.shortDescription}
            </p>

            {/* Traits Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {friend.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.05] border border-white/[0.08] text-slate-300"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href={`/celebrate/${friend.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PartyPopper className="w-4 h-4" />
                <span>{isToday ? `Join ${friend.name}'s Party` : `View Celebration Page`}</span>
              </Link>

              <Link
                href={`/friends/${friend.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 border border-white/[0.14] font-medium text-sm transition-all"
              >
                <span>View Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE COUNTDOWN OR CELEBRATION HERO */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {isToday ? (
              <div className="w-full text-center py-8 px-6 rounded-3xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 border border-pink-500/30 backdrop-blur-xl">
                <PartyPopper className="w-12 h-12 text-pink-400 mx-auto animate-bounce mb-3" />
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  HAPPY BIRTHDAY, {friend.name.toUpperCase()}!
                </h3>
                <p className="mt-2 text-base text-pink-200 font-light">
                  Today is your day! The entire universe celebrates you.
                </p>
                <div className="mt-6 flex justify-center">
                  <Link
                    href={`/celebrate/${friend.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Enter Celebration Hall
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-mono mb-4 text-center">
                  Countdown to Midnight in Bangladesh (Asia/Dhaka)
                </span>

                {/* 4 COUNTDOWN BLOCKS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                  {[
                    { label: "DAYS", value: friend.daysRemaining },
                    { label: "HOURS", value: friend.hoursRemaining },
                    { label: "MINUTES", value: friend.minutesRemaining },
                    { label: "SECONDS", value: friend.secondsRemaining },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-white/[0.04] dark:bg-white/[0.02] border border-white/[0.12] backdrop-blur-xl shadow-glass-sm group hover:border-blue-400/40 transition-colors"
                    >
                      {/* Top subtle highlight */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                      <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        {padZero(unit.value)}
                      </span>
                      <span className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-sky-400">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Target Date: {friend.formattedBirthday} at 12:00 AM (BST)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </section>
  );
}
