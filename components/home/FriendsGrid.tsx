"use client";

import React from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { FriendCard } from "@/components/friends/FriendCard";
import { Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function FriendsGrid() {
  const { allFriends, isMounted } = useCountdown();

  if (!isMounted) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-72 rounded-3xl bg-white/[0.03] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="friends" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan" icon={<Users className="w-3 h-3" />}>
              THE SEVEN FRIENDS
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sorted by next upcoming birthday
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Countdowns automatically calculate in Bangladesh Standard Time (Asia/Dhaka).
          </p>
        </div>

        <div className="text-xs text-sky-400/90 font-mono flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>7 Active Constellations</span>
        </div>
      </div>

      {/* Grid of Friends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allFriends.map((friend, idx) => (
          <FriendCard key={friend.slug} friend={friend} rank={idx + 1} />
        ))}
      </div>
    </section>
  );
}
