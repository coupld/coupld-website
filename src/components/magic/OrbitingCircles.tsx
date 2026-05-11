"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Coffee, Music, Heart, Mic, Moon, Gift, Star } from "lucide-react";

const gifts = [
  { Icon: Coffee,  label: "Coffee",     radius: 90,  duration: 13, offset: 0   },
  { Icon: Heart,   label: "Flowers",    radius: 90,  duration: 13, offset: 90  },
  { Icon: Music,   label: "Playlist",   radius: 90,  duration: 13, offset: 180 },
  { Icon: Star,    label: "Surprise",   radius: 90,  duration: 13, offset: 270 },
  { Icon: Moon,    label: "Good Night", radius: 140, duration: 21, offset: 45  },
  { Icon: Mic,     label: "Voice Note", radius: 140, duration: 21, offset: 165 },
  { Icon: Gift,    label: "Gift",       radius: 140, duration: 21, offset: 285 },
];

export default function OrbitingCircles() {
  return (
    <div className="relative w-[320px] h-[320px] mx-auto">
      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[180px] h-[180px] rounded-full border border-white/8" />
        <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5" />
      </div>

      {/* Center card — match avatar */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="glass-strong rounded-2xl p-3 flex flex-col items-center gap-1.5 w-[90px]"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-coral/30">
            <Image
              src="https://images.pexels.com/photos/10038422/pexels-photo-10038422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80"
              alt="Your match"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-[10px] text-[rgba(245,240,235,0.7)] font-inter">Your Match</span>
        </motion.div>
      </div>

      {/* Orbiting tokens */}
      {gifts.map(({ Icon, label, radius, duration, offset }) => (
        <motion.div
          key={label}
          className="absolute"
          style={{ left: "50%", top: "50%", marginLeft: -22, marginTop: -22 }}
          animate={{ rotate: [offset, offset + 360] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            style={{ transform: `translateX(${radius}px)` }}
            animate={{ rotate: [-offset, -(offset + 360)] }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className="w-11 h-11 glass rounded-full flex items-center justify-center cursor-pointer group relative"
            whileHover={{ scale: 1.3 }}
          >
            <Icon size={16} className="text-coral" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-[#1A1B2E] border border-white/10 rounded-full px-2 py-1 text-[#F5F0EB] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {label}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
