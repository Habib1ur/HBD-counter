"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Deep Navy/Black Base Vignette */}
      <div className="absolute inset-0 bg-[#080D1A] dark:bg-[#080D1A] bg-opacity-95" />

      {/* Layer 1: Ambient Royal Blue & Navy Base Radial Glow */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120vw] h-[70vh] rounded-[100%] bg-gradient-to-b from-blue-900/30 via-indigo-950/20 to-transparent blur-[140px]" />

      {/* Layer 2: Animated Electric Blue Orb */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: ["-5%", "8%", "-4%"],
                y: ["0%", "12%", "2%"],
                scale: [1, 1.15, 0.95],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] -left-[15%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-blue-600/25 via-blue-700/15 to-transparent blur-[130px]"
      />

      {/* Layer 3: Animated Cyan / Sky Blue Aurora Wave */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: ["10%", "-8%", "6%"],
                y: ["-5%", "15%", "-2%"],
                scale: [1.1, 0.9, 1.05],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-bl from-cyan-500/20 via-sky-600/15 to-transparent blur-[140px]"
      />

      {/* Layer 4: Deep Violet / Indigo Subtle Secondary Accent */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: ["-8%", "5%", "-2%"],
                y: ["10%", "-10%", "5%"],
                scale: [0.95, 1.1, 1],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-indigo-600/18 via-purple-900/12 to-transparent blur-[150px]"
      />

      {/* Layer 5: Subtle Horizontal Light Streak */}
      <div className="absolute top-[38%] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent blur-[1px]" />

      {/* Soft Vignette Overlay to frame viewport elegantly */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#080D1A]/80 pointer-events-none" />
    </div>
  );
}
