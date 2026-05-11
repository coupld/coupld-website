"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BeamNodeProps {
  label: string;
  imgSrc?: string;
  isCenter?: boolean;
}

function BeamNode({ label, imgSrc, isCenter }: BeamNodeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={
          isCenter
            ? {
                boxShadow: [
                  "0 0 20px rgba(255,107,71,0.4)",
                  "0 0 55px rgba(255,107,71,0.75)",
                  "0 0 20px rgba(255,107,71,0.4)",
                ],
              }
            : {}
        }
        transition={isCenter ? { duration: 2.5, repeat: Infinity } : {}}
        className={`
          ${isCenter ? "w-20 h-20 bg-gradient-to-br from-coral to-amber" : "w-14 h-14 glass"}
          rounded-full flex items-center justify-center overflow-hidden border border-white/10 shadow-xl
        `}
      >
        {isCenter ? (
          <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        ) : imgSrc ? (
          <Image
            src={imgSrc}
            alt={label}
            width={56}
            height={56}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        ) : null}
      </motion.div>
      <span className="text-xs text-[rgba(245,240,235,0.6)] font-inter">{label}</span>
    </div>
  );
}

// Cupid icon — a simple spark/bolt shape
function NudgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9">
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        fill="white"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AnimatedBeam() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 120 });

  useEffect(() => {
    const update = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDims({ w: rect.width || 600, h: rect.height || 120 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const leftX = dims.w * 0.15;
  const centerX = dims.w * 0.5;
  const rightX = dims.w * 0.85;
  const midY = dims.h * 0.5;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between px-6 relative z-10">
        <BeamNode
          label="You"
          imgSrc="https://images.pexels.com/photos/4255642/pexels-photo-4255642.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80"
        />
        {/* Center AI node */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,107,71,0.4)",
                "0 0 55px rgba(255,107,71,0.75)",
                "0 0 20px rgba(255,107,71,0.4)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-br from-coral to-amber rounded-full flex items-center justify-center border border-white/10 shadow-xl"
          >
            <NudgeIcon />
          </motion.div>
          <span className="text-xs text-[rgba(245,240,235,0.6)] font-inter">Cupid</span>
        </div>
        <BeamNode
          label="Match"
          imgSrc="https://images.pexels.com/photos/10038422/pexels-photo-10038422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80"
        />
      </div>

      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="beam-grad-l" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B47" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF6B47" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFB347" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="beam-grad-r" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFB347" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF6B47" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF6B47" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={leftX} y1={midY} x2={centerX} y2={midY} stroke="rgba(255,107,71,0.15)" strokeWidth="1.5" />
        <line x1={centerX} y1={midY} x2={rightX} y2={midY} stroke="rgba(255,107,71,0.15)" strokeWidth="1.5" />
        <line
          className="beam-line"
          x1={leftX} y1={midY} x2={centerX} y2={midY}
          stroke="url(#beam-grad-l)" strokeWidth="2.5" strokeLinecap="round"
        />
        <line
          className="beam-line"
          x1={centerX} y1={midY} x2={rightX} y2={midY}
          stroke="url(#beam-grad-r)" strokeWidth="2.5" strokeLinecap="round"
          style={{ animationDelay: "1.25s" }}
        />
      </svg>
    </div>
  );
}
