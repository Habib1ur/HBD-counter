"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Sparkles, PartyPopper } from "lucide-react";
import { FriendWithCountdown } from "@/types/friend";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { padZero } from "@/lib/date-utils";

interface FriendCardProps {
  friend: FriendWithCountdown;
  rank?: number;
}

export function FriendCard({ friend, rank }: FriendCardProps) {
  const isToday = friend.isToday;

  return (
    <TiltCard
      maxTilt={8}
      spotlightColor={`${friend.profileAccent}25`}
      className="bg-white/[0.05] dark:bg-[#0c1427]/75 backdrop-blur-2xl border border-white/[0.12] dark:border-white/[0.1] shadow-glass hover:shadow-glass-lg p-6 flex flex-col justify-between h-full group"
    >
      <div>
        {/* Top Badges & Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isToday ? (
              <Badge variant="live" icon={<PartyPopper className="w-3 h-3" />}>
                Birthday Today!
              </Badge>
            ) : (
              <span className="text-[11px] font-mono font-medium text-slate-400">
                {friend.daysRemaining === 0 ? "Under 24 hours" : `In ${friend.daysRemaining} days`}
              </span>
            )}

            {friend.isDoubleBirthday && (
              <Badge variant="gold">
                Double Birthday
              </Badge>
            )}
          </div>

          {rank !== undefined && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400">
              #{rank}
            </span>
          )}
        </div>

        {/* Avatar and Basic Details */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="relative w-14 h-14 rounded-2xl p-[2px] shadow-sm shrink-0 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${friend.profileAccent}, #3B82F6)`,
            }}
          >
            <Image
              src={friend.avatar}
              alt={friend.name}
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-[14px] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-xl font-bold text-white tracking-tight truncate group-hover:text-sky-300 transition-colors">
              {friend.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{friend.formattedBirthday}</span>
            </div>
            {friend.nickname && (
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block truncate">
                {friend.nickname}
              </span>
            )}
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300/90 leading-relaxed font-sans line-clamp-2 mb-4">
          {friend.shortDescription}
        </p>

        {/* Countdown Box */}
        <div className="p-3 rounded-xl bg-white/[0.03] dark:bg-black/20 border border-white/[0.06] mb-4">
          {isToday ? (
            <div className="text-center py-1">
              <span className="text-xs font-bold text-pink-300 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                CELEBRATING ALL DAY!
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1 text-center font-mono">
              <div>
                <div className="text-base font-black text-white">{padZero(friend.daysRemaining)}</div>
                <div className="text-[9px] text-slate-400 uppercase">Days</div>
              </div>
              <div>
                <div className="text-base font-black text-white">{padZero(friend.hoursRemaining)}</div>
                <div className="text-[9px] text-slate-400 uppercase">Hours</div>
              </div>
              <div>
                <div className="text-base font-black text-white">{padZero(friend.minutesRemaining)}</div>
                <div className="text-[9px] text-slate-400 uppercase">Mins</div>
              </div>
              <div>
                <div className="text-base font-black text-sky-300">{padZero(friend.secondsRemaining)}</div>
                <div className="text-[9px] text-slate-400 uppercase">Secs</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <Link
          href={`/friends/${friend.slug}`}
          className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 group/btn transition-colors"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>

        <Link
          href={`/celebrate/${friend.slug}`}
          className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-sky-300 border border-blue-500/30 text-xs font-semibold tracking-wide transition-all shadow-[0_0_12px_rgba(59,130,246,0.2)] hover:scale-105"
        >
          Celebrate
        </Link>
      </div>
    </TiltCard>
  );
}
