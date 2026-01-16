"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

/**
 * Renders a full-viewport decorative animated background composed of soft animated gradients, a subtle grid, retro scanlines, and vignette overlays.
 *
 * The component returns `null` until it is mounted to avoid server-side rendering hydration mismatches.
 *
 * @returns The background JSX element when mounted, or `null` before mounting.
 */
export function HybridBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 bg-white dark:bg-black transition-colors duration-300">
      {/* Layer 1: Modern Aura (Soft animated gradients) */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#6DC3BB]/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -30, 30, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#5459AC]/10 dark:bg-[#5459AC]/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#F2AEBB]/10 dark:bg-[#F2AEBB]/20 blur-[80px]"
        />
      </div>

      {/* Layer 2: Digital Circuit / Grid */}
      <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]">
        <svg
          className="w-full h-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                className="stroke-black dark:stroke-white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Layer 3: Retro Scanlines Overlay */}
      <div
        className="absolute inset-0 z-20 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 50%, #000 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Vignette / Fade Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50 dark:from-black dark:via-transparent dark:to-black/50 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}