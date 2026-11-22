"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, PartyPopper, Sparkles, ArrowLeft, Clock, Quote, Heart, ShieldCheck } from "lucide-react";
import { Friend } from "@/types/friend";
import { useCountdown } from "@/hooks/useCountdown";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { padZero } from "@/lib/date-utils";

export function FriendProfileClient({ friend }: { friend: Friend }) {
  const { countdown, isMounted } = useCountdown(friend);
  const isToday = countdown?.isToday;

  return (
    <div className="relative pt-32 sm:pt-40 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Personalized Background Accent Ambient Glow */}
      <div
        className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[75vw] h-[50vh] rounded-full blur-[160px] opacity-25"
        style={{
          backgroundColor: friend.profileAccent,
        }}
      />

      {/* Back to Friends Navigation */}
      <div className="mb-8">
        <Link
          href="/friends"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Friends</span>
        </Link>
      </div>

      {/* HERO PROFILE CARD */}
      <TiltCard
        maxTilt={4}
        spotlightColor={`${friend.profileAccent}20`}
        className="bg-white/[0.05] dark:bg-[#0c1427]/85 backdrop-blur-3xl border border-white/[0.14] shadow-glass-lg p-6 sm:p-10 mb-10"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar with Custom Ring */}
          <div className="relative shrink-0">
            <div
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl p-1 shadow-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${friend.profileAccent}, #3B82F6)`,
              }}
            >
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={160}
                height={160}
                priority
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
            {friend.isDoubleBirthday && (
              <div className="absolute -bottom-2 -right-2">
                <Badge variant="gold">Nov 8 Double</Badge>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              <Badge variant="cyan" icon={<Sparkles className="w-3 h-3" />}>
                {friend.role || "Orbit Member"}
              </Badge>
              {isToday && (
                <Badge variant="live" icon={<PartyPopper className="w-3 h-3" />}>
                  Birthday Today!
                </Badge>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {friend.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-sky-300 font-mono">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>{countdown ? countdown.formattedBirthday : "Loading..."}</span>
              <span className="text-white/30">•</span>
              <span className="text-slate-400">Bangladesh Time</span>
            </div>

            <p className="text-base text-slate-300 max-w-xl leading-relaxed mt-2 font-sans">
              {friend.shortDescription}
            </p>

            {/* Personalized Greeting */}
            <div className="mt-2 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] w-full">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 block mb-1">
                Personalized Birthday Greeting
              </span>
              <p className="text-sm italic text-slate-200">
                &ldquo;{friend.personalizedGreeting}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* LIVE COUNTDOWN / CELEBRATION SECTION */}
      <div className="mb-10">
        <TiltCard
          maxTilt={3}
          spotlightColor={`${friend.profileAccent}15`}
          className="p-6 sm:p-8 bg-gradient-to-r from-blue-900/20 via-black/40 to-cyan-900/20 backdrop-blur-2xl border border-white/[0.12] shadow-glass"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                {isToday ? "Status: Today!" : "Countdown to Next Birthday"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {isToday
                  ? `Happy Birthday, ${friend.name}!`
                  : `Next orbit celebration approaching`}
              </h2>
            </div>

            {isToday ? (
              <Link
                href={`/celebrate/${friend.slug}`}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-105 transition-all"
              >
                Join Birthday Party Now
              </Link>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 font-mono text-center">
                {[
                  { label: "DAYS", val: countdown?.daysRemaining ?? 0 },
                  { label: "HOURS", val: countdown?.hoursRemaining ?? 0 },
                  { label: "MINS", val: countdown?.minutesRemaining ?? 0 },
                  { label: "SECS", val: countdown?.secondsRemaining ?? 0 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 sm:p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] min-w-[65px] sm:min-w-[80px]"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-white block">
                      {isMounted ? padZero(item.val) : "--"}
                    </span>
                    <span className="text-[10px] text-sky-400 font-bold uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TiltCard>
      </div>

      {/* TRAITS & QUOTE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Traits */}
        <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Signature Traits & Vibes</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {friend.traits.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.06] border border-white/10 text-slate-200"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Favorite Quote */}
        {friend.favoriteQuote && (
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-2">
              <Quote className="w-4 h-4 text-sky-400" />
              <span>Guiding Philosophy</span>
            </h3>
            <p className="text-base italic text-slate-200 my-auto">
              &ldquo;{friend.favoriteQuote}&rdquo;
            </p>
            <span className="text-xs text-sky-400 font-mono mt-2">— {friend.name}</span>
          </div>
        )}
      </div>

      {/* CELEBRATION CTA */}
      <div className="text-center">
        <Link
          href={`/celebrate/${friend.slug}`}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 transition-all"
        >
          <PartyPopper className="w-4 h-4" />
          <span>Open {friend.name}&apos;s Birthday Celebration Hall</span>
        </Link>
      </div>
    </div>
  );
}
