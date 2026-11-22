"use client";

import React, { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

interface CelebrationEffectsProps {
  autoLaunch?: boolean;
  colors?: string[];
}

export function fireCelebrationConfetti(customColors?: string[]) {
  const colors = customColors || [
    "#3B82F6", // Primary blue
    "#22D3EE", // Cyan
    "#38BDF8", // Sky blue
    "#A855F7", // Violet
    "#F59E0B", // Gold
    "#EC4899", // Rose
    "#10B981", // Mint
  ];

  // Side cannons
  confetti({
    particleCount: 75,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.75 },
    colors,
  });

  confetti({
    particleCount: 75,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.75 },
    colors,
  });

  // Center burst
  setTimeout(() => {
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });
  }, 250);
}

export function CelebrationEffects({
  autoLaunch = true,
  colors,
}: CelebrationEffectsProps) {
  const launch = useCallback(() => {
    fireCelebrationConfetti(colors);
  }, [colors]);

  useEffect(() => {
    if (autoLaunch) {
      launch();
      const interval = setInterval(launch, 7000);
      return () => clearInterval(interval);
    }
  }, [autoLaunch, launch]);

  // Floating decorative balloons
  const balloons = [
    { color: "#3B82F6", delay: 0, left: "6%", size: 68 },
    { color: "#22D3EE", delay: 1.8, left: "18%", size: 54 },
    { color: "#A855F7", delay: 0.8, left: "78%", size: 62 },
    { color: "#F59E0B", delay: 2.4, left: "88%", size: 72 },
    { color: "#EC4899", delay: 1.2, left: "42%", size: 50 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Floating balloons */}
      {balloons.map((b, idx) => (
        <motion.div
          key={idx}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-30vh",
            opacity: [0, 0.85, 0.85, 0],
            x: ["0px", `${idx % 2 === 0 ? 30 : -30}px`, "0px"],
          }}
          transition={{
            duration: 16 + idx * 2.5,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
          style={{ left: b.left }}
          className="absolute"
        >
          <div className="relative flex flex-col items-center">
            {/* Balloon Body */}
            <div
              className="rounded-full shadow-lg relative flex items-center justify-center"
              style={{
                width: b.size,
                height: b.size * 1.22,
                background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45), ${b.color} 65%, #080D1A 100%)`,
                boxShadow: `0 10px 25px ${b.color}40`,
              }}
            >
              {/* Highlight gleam */}
              <div className="absolute top-[18%] left-[24%] w-3 h-5 rounded-full bg-white/40 blur-[1px] rotate-[-25deg]" />
            </div>

            {/* Balloon knot */}
            <div
              className="w-2.5 h-2 -mt-0.5 rounded-sm"
              style={{ backgroundColor: b.color }}
            />

            {/* Balloon string */}
            <svg width="20" height="75" viewBox="0 0 20 75" fill="none" className="opacity-40">
              <path
                d="M10 0 C 15 20, 5 45, 10 75"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
