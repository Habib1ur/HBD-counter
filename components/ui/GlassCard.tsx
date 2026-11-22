"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "subtle" | "medium" | "strong" | "spotlight";
  glowColor?: string;
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = "medium",
      glowColor,
      className = "",
      children,
      interactive = false,
      ...motionProps
    },
    ref
  ) => {
    // Glass styling intensities according to design system
    const variantStyles = {
      subtle:
        "bg-white/[0.03] dark:bg-[#101b32]/40 backdrop-blur-md border border-white/[0.08] dark:border-white/[0.08] shadow-glass-sm",
      medium:
        "bg-white/[0.06] dark:bg-[#0c1427]/60 backdrop-blur-xl border border-white/[0.12] dark:border-white/[0.12] shadow-glass",
      strong:
        "bg-white/[0.1] dark:bg-[#0e172e]/80 backdrop-blur-2xl border border-white/[0.18] dark:border-white/[0.18] shadow-glass-lg",
      spotlight:
        "bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-white/[0.02] dark:from-[#132244]/80 dark:via-[#0c1427]/90 dark:to-[#080d1a]/95 backdrop-blur-3xl border border-blue-500/30 dark:border-blue-400/30 shadow-[0_16px_48px_rgba(30,58,138,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]",
    };

    return (
      <motion.div
        ref={ref}
        className={`relative overflow-hidden rounded-3xl transition-colors duration-300 ${variantStyles[variant]} ${
          interactive ? "hover:border-white/30 dark:hover:border-blue-400/40" : ""
        } ${className}`}
        style={
          glowColor
            ? ({
                "--glow-color": glowColor,
              } as any)
            : undefined
        }
        {...motionProps}
      >
        {/* Subtle top inner reflection line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
