"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function VideoScrub() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Blur crystallisation: 40px → 0px as user scrolls into the section
  const blurPx = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const filterStyle = useMotionTemplate`blur(${blurPx}px)`;

  // Letter-spacing compression
  const ls = useTransform(scrollYProgress, [0, 0.4], [28, 0]);
  const letterSpacingStyle = useMotionTemplate`${ls}px`;

  // Opacity: emerge then fade out on exit
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.72, 1.0],
    [0, 1, 1, 0]
  );

  // Gentle scale-up on exit
  const scale = useTransform(scrollYProgress, [0.65, 1.0], [1, 1.22]);

  // "Closer." line fades in slightly later for a stagger feel
  const closerOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const closerBlur = useTransform(scrollYProgress, [0.15, 0.45], [30, 0]);
  const closerFilter = useMotionTemplate`blur(${closerBlur}px)`;

  // Progress bar
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    // 220vh — enough scroll distance without feeling endless
    <div ref={containerRef} className="relative h-[220vh]">
      {/* Sticky viewport — no overflow:hidden here, that's the sticky killer */}
      <div className="sticky top-0 h-screen">
        {/* ── Background video — autoplays, loops, stays in frame ── */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/8915056/8915056-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E1A]/65 via-[#0D0E1A]/25 to-[#0D0E1A]/65" />

        {/* ── "Bringing You Closer" — blur-crystallisation effect ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-6 select-none">
            {/* "Bringing You" line */}
            <motion.div
              style={{
                opacity,
                scale,
                filter: filterStyle,
                letterSpacing: letterSpacingStyle,
              }}
              className="font-playfair font-bold leading-none text-[#F5F0EB]
                         text-[clamp(3rem,10vw,8.5rem)]"
            >
              Bringing You
            </motion.div>

            {/* "Closer." line — staggered entry */}
            <motion.div
              style={{
                opacity: closerOpacity,
                scale,
                filter: closerFilter,
                letterSpacing: letterSpacingStyle,
              }}
              className="font-playfair font-bold italic leading-none text-coral
                         text-[clamp(3rem,10vw,8.5rem)]"
            >
              Closer.
            </motion.div>
          </div>
        </div>

        {/* Section pill */}
        <motion.div
          style={{ opacity }}
          className="absolute top-8 left-1/2 -translate-x-1/2"
        >
          <span className="font-inter text-[11px] font-semibold tracking-widest uppercase glass rounded-full px-4 py-1.5 text-coral">
            The Transition
          </span>
        </motion.div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-coral to-amber rounded-full origin-left"
            style={{ scaleX }}
          />
        </div>
      </div>
    </div>
  );
}
