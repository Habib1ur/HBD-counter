"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <div className={`w-10 h-10 rounded-full border border-white/10 bg-white/5 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.07] hover:bg-white/[0.12] dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-white/[0.14] text-slate-200 transition-colors duration-200 shadow-glass-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-sky-400" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-amber-400" />
      </motion.div>
    </motion.button>
  );
}
