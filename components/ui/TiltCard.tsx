"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees, default 8
  spotlightColor?: string;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  spotlightColor = "rgba(59, 130, 246, 0.15)",
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  // Smooth spring physics for rotation
  const rotateX = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      setCoords({ x: clientX, y: clientY });

      // Calculate tilt angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((clientY - centerY) / centerY) * -maxTilt;
      const rotY = ((clientX - centerX) / centerX) * maxTilt;

      rotateX.set(rotX);
      rotateY.set(rotY);
    },
    [maxTilt, rotateX, rotateY, shouldReduceMotion]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full h-full"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative overflow-hidden rounded-3xl transition-shadow duration-300 ${className}`}
      >
        {/* Dynamic cursor radial highlight inside card */}
        {isHovered && !shouldReduceMotion && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 60%)`,
            }}
          />
        )}

        {/* Dynamic glossy specular reflection bar */}
        {isHovered && !shouldReduceMotion && (
          <div
            className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-30 transition-opacity duration-300"
            style={{
              background: `linear-gradient(${
                115 + (coords.x / 100) * 10
              }deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
        )}

        {/* Dynamic border glow highlight */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-3xl border transition-all duration-300 z-30 ${
            isHovered
              ? "border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              : "border-white/[0.1] dark:border-white/[0.08]"
          }`}
        />

        <div className="relative z-0 h-full">{children}</div>
      </motion.div>
    </div>
  );
}
