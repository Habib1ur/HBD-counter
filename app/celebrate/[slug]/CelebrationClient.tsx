"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, PartyPopper, Heart, Send, ArrowLeft, Cake, Volume2, Users } from "lucide-react";
import { Friend } from "@/types/friend";
import { formatDayMonth } from "@/lib/timezone";
import { CelebrationEffects, fireCelebrationConfetti } from "@/components/effects/CelebrationEffects";
import { BirthdayCake } from "@/components/birthday/BirthdayCake";
import { Badge } from "@/components/ui/Badge";
import { saveWish } from "@/lib/storage";

interface CelebrationClientProps {
  primaryFriend: Friend;
  secondaryFriend?: Friend;
  isDouble?: boolean;
}

export function CelebrationClient({
  primaryFriend,
  secondaryFriend,
  isDouble: initialDouble = false,
}: CelebrationClientProps) {
  const [doubleMode, setDoubleMode] = useState(
    initialDouble || (primaryFriend.isDoubleBirthday && !!secondaryFriend)
  );
  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");
  const [wishSent, setWishSent] = useState(false);

  const activeFriend = primaryFriend;
  const partner = secondaryFriend;

  const handleConfettiBurst = () => {
    fireCelebrationConfetti([
      activeFriend.profileAccent,
      partner?.profileAccent || "#38BDF8",
      "#22D3EE",
      "#F59E0B",
      "#EC4899",
      "#10B981",
    ]);
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) return;

    saveWish({
      friendSlug: activeFriend.slug,
      authorName: wishName.trim(),
      message: wishText.trim(),
    });

    setWishSent(true);
    setWishText("");
    fireCelebrationConfetti();
  };

  return (
    <div className="relative pt-32 sm:pt-36 pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Live celebratory confetti & balloons */}
      <CelebrationEffects
        autoLaunch={true}
        colors={[
          activeFriend.profileAccent,
          partner?.profileAccent || "#38BDF8",
          "#22D3EE",
          "#F59E0B",
          "#EC4899",
        ]}
      />

      {/* Ambient Pulsing Lighting Orbs */}
      <div
        className="pointer-events-none fixed top-10 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full blur-[170px] opacity-35 animate-pulse-slow"
        style={{
          background: doubleMode
            ? "radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, rgba(56, 189, 248, 0.4) 50%, rgba(37, 99, 235, 0.2) 100%)"
            : `radial-gradient(circle, ${activeFriend.profileAccent}70 0%, rgba(34, 211, 238, 0.3) 60%, transparent 100%)`,
        }}
      />

      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8 relative z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orbit Home</span>
        </Link>

        {/* Double Birthday Mode Switcher for Mim / Shiam */}
        {partner && (
          <button
            onClick={() => setDoubleMode(!doubleMode)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.14] text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all"
          >
            {doubleMode ? "Show Single Spotlight" : "✨ Switch to Double Birthday Mode (Mim & Shiam)"}
          </button>
        )}
      </div>

      {/* MAIN CELEBRATION HERO */}
      <div className="relative text-center flex flex-col items-center z-10 mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 border border-pink-500/40 backdrop-blur-xl mb-4 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
        >
          <PartyPopper className="w-4 h-4 text-pink-400 animate-bounce" />
          <span className="text-xs font-bold uppercase tracking-widest text-pink-200">
            {doubleMode ? "NOVEMBER 8 • DOUBLE CELEBRATION" : "OFFICIAL BIRTHDAY CELEBRATION"}
          </span>
        </motion.div>

        {doubleMode && partner ? (
          <div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
              TWO BIRTHDAYS. <br />
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-sky-300 bg-clip-text text-transparent">
                ONE BIG CELEBRATION.
              </span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light">
              Celebrating Mim and Shiam together on this legendary November 8th. Double the laughter, double the magic!
            </p>

            {/* Dual Profile Badges */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.05] border border-amber-400/30">
                <Image
                  src={activeFriend.avatar}
                  alt={activeFriend.name}
                  width={44}
                  height={44}
                  className="rounded-full border border-amber-400"
                />
                <div className="text-left">
                  <div className="text-sm font-bold text-white">{activeFriend.name}</div>
                  <div className="text-[10px] text-amber-300 font-mono">8 November</div>
                </div>
              </div>

              <span className="text-xl font-black text-slate-500">&amp;</span>

              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.05] border border-sky-400/30">
                <Image
                  src={partner.avatar}
                  alt={partner.name}
                  width={44}
                  height={44}
                  className="rounded-full border border-sky-400"
                />
                <div className="text-left">
                  <div className="text-sm font-bold text-white">{partner.name}</div>
                  <div className="text-[10px] text-sky-300 font-mono">8 November</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
              HAPPY BIRTHDAY,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${activeFriend.profileAccent}, #38BDF8, #F8FAFC)`,
                }}
              >
                {activeFriend.name.toUpperCase()}!
              </span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200 font-light max-w-xl mx-auto">
              Today is your day. The universe aligns to celebrate your story, your laughter, and the milestones ahead.
            </p>

            <div className="mt-4 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{formatDayMonth(activeFriend.birthdayDay, activeFriend.birthdayMonth)}</span>
              <span className="text-white/30">•</span>
              <span>Asia/Dhaka</span>
            </div>
          </div>
        )}
      </div>

      {/* INTERACTIVE BIRTHDAY CAKE */}
      <div className="relative z-10 my-8 flex flex-col items-center">
        <BirthdayCake
          friendName={activeFriend.name}
          accentColor={activeFriend.profileAccent}
          secondaryColor={partner?.profileAccent || "#22D3EE"}
          isDouble={doubleMode}
        />

        {/* Confetti Cannon Trigger */}
        <div className="mt-4">
          <button
            onClick={handleConfettiBurst}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Fire Confetti Burst!</span>
          </button>
        </div>
      </div>

      {/* PERSONALIZED WISH & WISH SUBMISSION BOX */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Personalized Message Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.05] dark:bg-[#0c1427]/80 backdrop-blur-2xl border border-white/[0.12] shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Personalized Dedication</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              From the Circle to {doubleMode ? "Mim & Shiam" : activeFriend.name}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans italic">
              &ldquo;{activeFriend.personalizedGreeting}&rdquo;
            </p>
            {doubleMode && partner && (
              <p className="text-sm text-slate-300 leading-relaxed font-sans italic mt-3 pt-3 border-t border-white/10">
                &ldquo;{partner.personalizedGreeting}&rdquo;
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/[0.08]">
            <span>Friends Universe Orbit</span>
            <Link
              href={`/friends/${activeFriend.slug}`}
              className="text-sky-400 hover:underline font-medium"
            >
              View Full Profile →
            </Link>
          </div>
        </div>

        {/* Instant Wish Sender */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.05] dark:bg-[#0c1427]/80 backdrop-blur-2xl border border-white/[0.12] shadow-glass">
          <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Send a Live Wish</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Leave a note on {activeFriend.name}&apos;s birthday board.
          </p>

          {wishSent ? (
            <div className="p-6 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
              ✨ Wish posted! It has been saved to the universal memory board.
              <button
                onClick={() => setWishSent(false)}
                className="block mx-auto mt-3 text-xs underline font-semibold text-white"
              >
                Send another wish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendWish} className="flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Nafi, Habib, Shaira)"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder={`Write your birthday wish for ${activeFriend.name}...`}
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs tracking-wide shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Birthday Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
