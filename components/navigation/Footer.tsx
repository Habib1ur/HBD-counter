"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Globe, ArrowUpRight } from "lucide-react";
import { FRIENDS_DATA } from "@/data/friends";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.08] bg-[#050811]/90 backdrop-blur-2xl text-slate-400">
      {/* Top subtle highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center p-[1px]">
                <div className="w-full h-full rounded-full bg-[#080D1A] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-white tracking-wider text-base">
                FRIENDS UNIVERSE
              </span>
            </div>
            <p className="text-sm text-slate-300/80 max-w-md leading-relaxed font-sans">
              Seven Friends. Seven Birthdays. Infinite Memories. A dedicated digital orbit celebrating the milestones, laughter, and unbreakable bonds of Habib, Nafi, Shaira, Neha, Mahi, Mim, and Shiam.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mt-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Timezone Engine: Asia/Dhaka (BST, UTC+06:00)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Universe Navigation
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Home Orbit
              </Link>
              <Link href="/friends" className="hover:text-sky-400 transition-colors">
                All 7 Friends
              </Link>
              <Link href="/calendar" className="hover:text-sky-400 transition-colors">
                Annual Birthday Calendar
              </Link>
              <Link href="/#wishes" className="hover:text-sky-400 transition-colors">
                Wishes & Memories Wall
              </Link>
            </div>
          </div>

          {/* Friend Quick Profiles */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              The Seven
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {FRIENDS_DATA.map((friend) => (
                <Link
                  key={friend.slug}
                  href={`/friends/${friend.slug}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.08] transition-colors"
                >
                  <span>{friend.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Friends Universe. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for our lifelong circle of seven.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
