"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Users, Home, Menu, X, Clock, PartyPopper } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useBangladeshTime } from "@/hooks/useBangladeshTime";
import { useBirthdayMode } from "@/hooks/useBirthdayMode";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { timeInfo, isMounted } = useBangladeshTime();
  const { celebrationState } = useBirthdayMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Friends", href: "/friends", icon: Users },
    { label: "Calendar", href: "/calendar", icon: Calendar },
  ];

  // If any friend is celebrating today, add quick celebration link
  const isCelebrating = celebrationState?.isAnyBirthdayToday;
  const celebratingFriend = celebrationState?.celebratingFriends[0];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`relative flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#080D1A]/80 dark:bg-[#080D1A]/85 backdrop-blur-2xl border-white/[0.14] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-white/[0.05] dark:bg-white/[0.04] backdrop-blur-xl border-white/[0.1] shadow-glass"
          }`}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg py-1"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_22px_rgba(34,211,238,0.7)] transition-all duration-300">
              <div className="w-full h-full rounded-full bg-[#080D1A] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-wider bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                FRIENDS UNIVERSE
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-slate-400 font-medium">
                Seven Birthdays • Infinite Memories
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.04] dark:bg-white/[0.03] border border-white/[0.08] p-1 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none ${
                    isActive
                      ? "text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/80 to-cyan-600/80 border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* LIVE CELEBRATION BADGE IF ACTIVE */}
            {isCelebrating && celebratingFriend && (
              <Link
                href={`/celebrate/${celebratingFriend.slug}`}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 text-pink-300 border border-pink-500/40 animate-pulse shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform"
              >
                <PartyPopper className="w-3.5 h-3.5" />
                <span>Celebrate {celebratingFriend.name}!</span>
              </Link>
            )}
          </div>

          {/* RIGHT CONTROLS: BANGLADESH CLOCK + THEME */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Bangladesh Clock Pill */}
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs backdrop-blur-md shadow-glass-sm"
              title="Current time in Asia/Dhaka (Bangladesh Standard Time, UTC+6)"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono font-medium text-slate-200">
                {isMounted && timeInfo ? timeInfo.formattedTime : "--:--:--"}
              </span>
              <span className="text-[10px] uppercase font-bold text-sky-400/90 tracking-wider">
                Dhaka
              </span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.07] border border-white/[0.12] text-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE SLIDE-DOWN DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-7xl mx-auto px-4 mt-2"
          >
            <div className="rounded-3xl p-4 bg-[#080D1A]/95 backdrop-blur-2xl border border-white/[0.14] shadow-2xl flex flex-col gap-2">
              {/* Dhaka time for mobile */}
              <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Bangladesh (UTC+6)</span>
                </div>
                <span className="font-mono font-bold text-sky-300">
                  {isMounted && timeInfo ? timeInfo.formattedTime : "--:--:--"}
                </span>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-white border border-blue-400/30"
                        : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-sky-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {isCelebrating && celebratingFriend && (
                <Link
                  href={`/celebrate/${celebratingFriend.slug}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold bg-gradient-to-r from-pink-500/25 to-purple-500/25 text-pink-300 border border-pink-500/40"
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>Celebrate {celebratingFriend.name}&apos;s Birthday!</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
