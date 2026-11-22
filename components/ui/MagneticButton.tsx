"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "glass" | "glow" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  magneticPull?: number; // 0 to 1, default 0.35
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  magneticPull = 0.3,
  disabled,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * magneticPull, y: middleY * magneticPull });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-medium rounded-xl gap-1.5",
    md: "px-6 py-3 text-sm font-semibold rounded-2xl gap-2",
    lg: "px-8 py-4 text-base font-semibold rounded-2xl gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] border border-blue-400/30",
    secondary:
      "bg-white/10 dark:bg-slate-800/60 text-slate-100 hover:bg-white/15 dark:hover:bg-slate-700/70 border border-white/15 shadow-sm",
    glass:
      "bg-white/[0.08] dark:bg-white/[0.05] text-slate-100 hover:bg-white/[0.14] dark:hover:bg-white/[0.1] border border-white/[0.14] backdrop-blur-xl shadow-glass-sm",
    glow:
      "bg-blue-600/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/25 shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]",
    outline:
      "bg-transparent text-slate-200 border border-white/20 hover:border-white/40 hover:bg-white/5",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      whileTap={{ scale: 0.96 }}
      disabled={disabled}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none font-sans transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...(props as any)}
    >
      {/* Light sheen shine on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      </span>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
