"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Calendar, PartyPopper, ArrowRight, Heart } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { useCountdown } from "@/hooks/useCountdown";
import { getFriendBySlug } from "@/data/friends";
import { padZero } from "@/lib/date-utils";

export function DoubleBirthdayBanner() {
  const mim = getFriendBySlug("mim");
  const shiam = getFriendBySlug("shiam");
  const { countdown: mimCountdown, isMounted } = useCountdown(mim);

  if (!mim || !shiam) return null;

  const isToday = mimCountdown?.isToday;

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <TiltCard
        maxTilt={4}
        spotlightColor="rgba(245, 158, 11, 0.2)"
        className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-blue-900/30 to-sky-500/10 dark:from-amber-950/30 dark:via-[#0c1427]/90 dark:to-sky-950/30 backdrop-blur-3xl border border-amber-500/30 p-6 sm:p-10 lg:p-12 shadow-[0_16px_40px_rgba(245,158,11,0.1)]"
      >
        {/* Glow orb */}
        <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/15 blur-[90px]" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-sky-500/15 blur-[90px]" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text & Dual Avatars */}
          <div className="flex flex-col gap-4 max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5" />}>
                NOVEMBER 8 • SPECIAL CONSTELLATION
              </Badge>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              TWO BIRTHDAYS. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-sky-300 bg-clip-text text-transparent">
                ONE BIG CELEBRATION.
              </span>
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Mim and Shiam share the exact same birthday on November 8th. Synchronized orbits, double the laughter, and a monumental annual celebration for the entire circle.
            </p>

            {/* Dual Avatars with Connected Ring */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center -space-x-3">
                <div className="relative w-14 h-14 rounded-full border-2 border-amber-400 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.5)] overflow-hidden">
                  <Image
                    src={mim.avatar}
                    alt={mim.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="relative w-14 h-14 rounded-full border-2 border-sky-400 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.5)] overflow-hidden">
                  <Image
                    src={shiam.avatar}
                    alt={shiam.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <div className="text-left">
                <div className="text-sm font-bold text-white">Mim & Shiam</div>
                <div className="text-xs text-amber-300/90 font-mono">
                  8 November • Synchronized Countdown
                </div>
              </div>
            </div>
          </div>

          {/* Right Synchronized Countdown or Today's Celebration */}
          <div className="flex flex-col items-center justify-center w-full lg:w-auto">
            {isToday ? (
              <div className="text-center p-6 rounded-2xl bg-white/[0.06] border border-amber-400/40">
                <PartyPopper className="w-10 h-10 text-amber-400 mx-auto animate-bounce mb-2" />
                <h4 className="text-xl font-black text-white">IT&apos;S NOVEMBER 8 TODAY!</h4>
                <p className="text-xs text-amber-200 mt-1">Both Mim & Shiam are celebrating right now!</p>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href="/celebrate/mim"
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-900 font-bold text-xs"
                  >
                    Celebrate Mim
                  </Link>
                  <Link
                    href="/celebrate/shiam"
                    className="px-4 py-2 rounded-xl bg-sky-500 text-slate-900 font-bold text-xs"
                  >
                    Celebrate Shiam
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Synchronized Orbit Clock
                </span>
                <div className="flex items-center gap-2 sm:gap-3 font-mono">
                  {[
                    { label: "D", val: mimCountdown?.daysRemaining ?? 0 },
                    { label: "H", val: mimCountdown?.hoursRemaining ?? 0 },
                    { label: "M", val: mimCountdown?.minutesRemaining ?? 0 },
                    { label: "S", val: mimCountdown?.secondsRemaining ?? 0 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center justify-center w-14 sm:w-16 h-16 sm:h-20 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md"
                    >
                      <span className="text-xl sm:text-2xl font-black text-white">
                        {isMounted ? padZero(item.val) : "--"}
                      </span>
                      <span className="text-[10px] text-amber-300 font-bold">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href="/celebrate/mim"
                    className="text-xs text-amber-300 hover:text-amber-200 underline font-medium"
                  >
                    Preview Mim&apos;s Party
                  </Link>
                  <span className="text-white/30">•</span>
                  <Link
                    href="/celebrate/shiam"
                    className="text-xs text-sky-300 hover:text-sky-200 underline font-medium"
                  >
                    Preview Shiam&apos;s Party
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </section>
  );
}
