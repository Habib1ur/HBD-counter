"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "gold" | "rose" | "emerald" | "violet" | "live";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "default",
  className = "",
  icon,
}: BadgeProps) {
  const variants = {
    default: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    gold: "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    rose: "bg-pink-500/10 text-pink-300 border-pink-500/30",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    violet: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    live: "bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border backdrop-blur-md ${variants[variant]} ${className}`}
    >
      {variant === "live" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
        </span>
      )}
      {icon && <span className="text-current">{icon}</span>}
      {children}
    </span>
  );
}
