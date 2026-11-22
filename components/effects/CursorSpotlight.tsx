"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CursorSpotlight() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring interpolation
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.2 });

  useEffect(() => {
    // Check if touch device or screen width < 768px
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    setIsTouchDevice(isTouch);

    if (isTouch || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, shouldReduceMotion]);

  if (isTouchDevice || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
        style={{
          left: springX,
          top: springY,
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(37, 99, 235, 0.08) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
