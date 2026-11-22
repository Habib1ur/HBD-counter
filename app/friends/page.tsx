"use client";

import React, { useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { FriendCard } from "@/components/friends/FriendCard";
import { Badge } from "@/components/ui/Badge";
import { Users, Search, ArrowUpDown, Sparkles } from "lucide-react";
import { FriendWithCountdown } from "@/types/friend";

export default function FriendsPage() {
  const { allFriends, isMounted } = useCountdown();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<"upcoming" | "calendar" | "name">("upcoming");

  if (!isMounted) {
    return (
      <div className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-64 rounded-3xl bg-white/[0.04] animate-pulse" />
      </div>
    );
  }

  // Filter friends based on query
  const filtered = allFriends.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.traits.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort friends based on selected mode
  const sorted = [...filtered].sort((a, b) => {
    if (sortMode === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortMode === "calendar") {
      // Calendar month/day order
      if (a.birthdayMonth !== b.birthdayMonth) {
        return a.birthdayMonth - b.birthdayMonth;
      }
      return a.birthdayDay - b.birthdayDay;
    }
    // upcoming is default from allFriends
    return 0;
  });

  return (
    <div className="pt-32 sm:pt-40 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <Badge variant="cyan" icon={<Users className="w-3.5 h-3.5" />}>
          THE INNER CIRCLE
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3">
          Seven Constellations
        </h1>
        <p className="text-base text-slate-300 mt-2 font-light">
          Explore the personalities, milestones, and countdowns for all seven friends.
        </p>
      </div>

      {/* SEARCH AND CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.04] dark:bg-white/[0.02] border border-white/[0.1] backdrop-blur-xl mb-10 shadow-glass-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, trait, or vibe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.06] dark:bg-black/30 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
          />
        </div>

        {/* Sorting Dropdown / Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">Sort:</span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-white/[0.06] dark:bg-black/30 border border-white/10 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-400"
          >
            <option value="upcoming" className="bg-slate-900 text-white">Next Upcoming</option>
            <option value="calendar" className="bg-slate-900 text-white">Calendar Order (Jan - Dec)</option>
            <option value="name" className="bg-slate-900 text-white">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Grid of Friends */}
      {sorted.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-white/[0.02] border border-white/5 text-slate-400">
          No friend found matching &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((friend, idx) => (
            <FriendCard key={friend.slug} friend={friend} rank={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
