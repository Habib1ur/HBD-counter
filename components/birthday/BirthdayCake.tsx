"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Wind, RotateCcw } from "lucide-react";
import { fireCelebrationConfetti } from "@/components/effects/CelebrationEffects";

interface BirthdayCakeProps {
  friendName?: string;
  accentColor?: string;
  secondaryColor?: string;
  isDouble?: boolean;
}

export function BirthdayCake({
  friendName = "Friend",
  accentColor = "#3B82F6",
  secondaryColor = "#22D3EE",
  isDouble = false,
}: BirthdayCakeProps) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wished, setWished] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setWished(true);
    fireCelebrationConfetti([accentColor, secondaryColor, "#F59E0B", "#EC4899", "#38BDF8"]);
  };

  const handleRelight = () => {
    setCandlesLit(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
      {/* Ambient Radial Under-Cake Glow */}
      <div
        className="absolute w-72 h-36 rounded-full blur-[70px] pointer-events-none opacity-40 transition-colors duration-500"
        style={{
          backgroundColor: candlesLit ? accentColor : "rgba(30, 58, 138, 0.2)",
        }}
      />

      {/* Cake Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* CANDLES ROW */}
        <div className="relative flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] z-20">
          {(isDouble ? [0, 1, 2, 3] : [0, 1, 2]).map((idx) => (
            <div
              key={idx}
              onClick={handleBlowCandles}
              className="relative flex flex-col items-center cursor-pointer group"
              title={candlesLit ? "Click to blow candle!" : "Candle is blown out"}
            >
              {/* Flame or Smoke */}
              <div className="h-8 flex items-center justify-center relative">
                <AnimatePresence>
                  {candlesLit ? (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [1, 1.15, 0.95, 1.1, 1],
                        rotate: [-2, 3, -3, 2, 0],
                        y: [0, -1.5, 0, -1, 0],
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        duration: 0.9 + (idx % 3) * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Outer Flame Glow */}
                      <div className="w-4 h-6 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-amber-500 via-yellow-400 to-white shadow-[0_0_14px_rgba(251,191,36,0.9)]" />
                      {/* Inner Core */}
                      <div className="absolute w-1.5 h-3 bottom-0.5 rounded-full bg-white blur-[0.5px]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="smoke"
                      initial={{ opacity: 0.9, y: 0, scale: 0.6 }}
                      animate={{
                        opacity: [0.8, 0.4, 0],
                        y: -28,
                        x: [0, idx % 2 === 0 ? 8 : -8, 0],
                        scale: 1.6,
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      className="w-2.5 h-2.5 rounded-full bg-slate-400/50 blur-[2px]"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-slate-700 dark:bg-slate-300" />

              {/* Candle Body */}
              <div
                className="w-3 sm:w-3.5 h-12 rounded-t-sm shadow-md relative overflow-hidden"
                style={{
                  background: `repeating-linear-gradient(45deg, #FFF, #FFF 4px, ${
                    idx % 2 === 0 ? accentColor : secondaryColor
                  } 4px, ${idx % 2 === 0 ? accentColor : secondaryColor} 8px)`,
                }}
              >
                {/* Candle sheen */}
                <div className="absolute inset-y-0 left-0 w-1 bg-white/40" />
              </div>
            </div>
          ))}
        </div>

        {/* TOP TIER */}
        <div className="relative w-44 sm:w-52 h-16 rounded-2xl bg-gradient-to-b from-blue-400/90 via-blue-600/90 to-blue-800/90 border border-white/30 backdrop-blur-xl shadow-glass flex items-center justify-center overflow-hidden z-10">
          {/* Frosting Drips */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/70 rounded-b-xl shadow-sm flex justify-around">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="w-3 h-3 bg-white/80 rounded-full -mt-0.5"
                style={{ transform: `scaleY(${1 + (i % 3) * 0.4})` }}
              />
            ))}
          </div>

          {/* Decorative Sparkles & Label */}
          <div className="text-center mt-2">
            <span className="text-xs font-bold tracking-widest uppercase text-white/95 drop-shadow">
              {isDouble ? "MIM & SHIAM" : friendName}
            </span>
          </div>

          {/* Glossy top reflection */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        {/* BOTTOM TIER */}
        <div className="relative -mt-3 w-64 sm:w-72 h-20 rounded-2xl bg-gradient-to-b from-indigo-500/90 via-blue-700/95 to-slate-900/95 border border-white/20 backdrop-blur-2xl shadow-glass-lg flex items-center justify-center overflow-hidden">
          {/* Frosting Drips Bottom */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-2xl shadow flex justify-around">
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 bg-white/90 rounded-full -mt-0.5"
                style={{ transform: `scaleY(${1 + (i % 2) * 0.5})` }}
              />
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-xs font-semibold text-sky-200 tracking-wider">
              {candlesLit ? "MAKE A SECRET WISH" : "WISH SENT TO THE UNIVERSE!"}
            </span>
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          </div>

          {/* Side pearl trim */}
          <div className="pointer-events-none absolute bottom-1 inset-x-4 flex justify-between opacity-50">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
            ))}
          </div>
        </div>

        {/* GLOSSY CAKE STAND / PEDESTAL */}
        <div className="relative -mt-1 w-72 sm:w-80 h-3 rounded-full bg-gradient-to-r from-white/10 via-white/40 to-white/10 border-t border-white/40 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.5)]" />
        <div className="w-20 h-4 bg-gradient-to-b from-white/20 to-white/5 rounded-b-lg border-x border-b border-white/15" />
      </div>

      {/* INTERACTIVE CONTROLS */}
      <div className="mt-6 flex items-center gap-3">
        {candlesLit ? (
          <button
            onClick={handleBlowCandles}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95"
          >
            <Wind className="w-4 h-4" />
            Blow Out Candles
          </button>
        ) : (
          <button
            onClick={handleRelight}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-sky-300 border border-blue-500/40 text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Relight Candles
          </button>
        )}
      </div>

      {wished && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-amber-300/90 mt-2 font-medium"
        >
          ✨ May every wish whispered into the cosmos come true!
        </motion.p>
      )}
    </div>
  );
}
