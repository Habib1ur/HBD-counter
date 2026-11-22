"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Users, Clock, Globe } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useBangladeshTime } from "@/hooks/useBangladeshTime";

export function Hero() {
  const { timeInfo, isMounted } = useBangladeshTime();

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/15 via-cyan-500/10 to-indigo-600/15 blur-[120px] pointer-events-none" />

      {/* EYEBROW BADGE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-blue-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] mb-6 sm:mb-8"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spinSlow" />
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
          YOUR LITTLE WORLD OF CELEBRATIONS
        </span>
      </motion.div>

      {/* MAIN HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.08] drop-shadow-md"
      >
        Some people make every year{" "}
        <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
          worth celebrating.
        </span>
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="mt-6 text-base sm:text-xl text-slate-300/90 max-w-2xl font-light tracking-wide leading-relaxed"
      >
        Seven friends. Seven birthdays. Infinite memories.
      </motion.p>

      {/* LIVE BANGLADESH CLOCK BADGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.04] dark:bg-white/[0.03] border border-white/[0.1] backdrop-blur-2xl shadow-glass"
      >
        <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono text-white text-sm font-semibold tracking-wider">
            {isMounted && timeInfo ? timeInfo.formattedTime : "--:--:--"}
          </span>
        </div>

        <div className="hidden sm:block w-px h-4 bg-white/20" />

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>{isMounted && timeInfo ? timeInfo.formattedDate : "Loading date..."}</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 font-mono">
            Asia/Dhaka (UTC+6)
          </span>
        </div>
      </motion.div>

      {/* HERO CALL-TO-ACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a href="#spotlight">
          <MagneticButton variant="primary" size="lg">
            <span>Explore Next Birthday</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </MagneticButton>
        </a>

        <Link href="/friends">
          <MagneticButton variant="glass" size="lg">
            <Users className="w-4 h-4 text-sky-400" />
            <span>Meet All 7 Friends</span>
          </MagneticButton>
        </Link>
      </motion.div>
    </section>
  );
}
