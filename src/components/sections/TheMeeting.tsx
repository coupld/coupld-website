"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Navigation, Star, Sparkles, Calendar, Check } from "lucide-react";
import RetroGrid from "@/components/magic/RetroGrid";

// ── Date Ideas mini-carousel ─────────────────────────────────────────────────
const venues = [
  {
    name: "Kiln Rooftop Bar",
    type: "Cocktails",
    dist: "0.8 km",
    imgId: "5910792",
  },
  {
    name: "The Coffee Collective",
    type: "Coffee",
    dist: "0.3 km",
    imgId: "5086619",
  },
  {
    name: "Chapter One Books",
    type: "Book Café",
    dist: "1.2 km",
    imgId: "7156283",
  },
];

function DateIdeasCard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % venues.length), 3200);
    return () => clearInterval(t);
  }, []);

  const venue = venues[current];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-coral/15 flex items-center justify-center">
          <MapPin size={13} className="text-coral" />
        </div>
        <span className="text-sm font-semibold text-[#F5F0EB] font-inter">Date Ideas</span>
        <span className="ml-auto text-[10px] text-[rgba(245,240,235,0.35)] font-inter border border-white/10 rounded-full px-2 py-0.5">
          AI suggested
        </span>
      </div>

      <div className="relative h-[76px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 absolute inset-0"
          >
            <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex-shrink-0 border border-white/8">
              <Image
                src={`https://images.pexels.com/photos/${venue.imgId}/pexels-photo-${venue.imgId}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80`}
                alt={venue.name}
                width={68}
                height={68}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#F5F0EB] text-sm font-inter truncate">{venue.name}</div>
              <div className="text-[11px] text-[rgba(245,240,235,0.45)] font-inter mt-0.5">{venue.type}</div>
              <div className="text-[11px] text-coral font-inter mt-1 flex items-center gap-1">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <MapPin size={10} />
                </motion.div>
                {venue.dist} away
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-4 justify-center">
        {venues.map((_, i) => (
          <motion.div
            key={i}
            className="h-1 rounded-full"
            animate={{
              width: current === i ? 20 : 6,
              background: current === i ? "#FF6B47" : "rgba(255,255,255,0.18)",
            }}
            transition={{ duration: 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Location Sync mini-map ───────────────────────────────────────────────────
function LocationSyncCard() {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-coral/15 flex items-center justify-center">
          <Navigation size={13} className="text-coral" />
        </div>
        <span className="text-sm font-semibold text-[#F5F0EB] font-inter">Location Sync</span>
        <motion.span
          className="ml-auto text-[10px] font-inter flex items-center gap-1.5"
          style={{ color: "#4ade80" }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full inline-block bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          Live
        </motion.span>
      </div>

      {/* Map area */}
      <div className="relative h-[80px] rounded-xl overflow-hidden border border-white/7 bg-[#0D0E1A]/70">
        {/* Grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        {/* Path lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="18%" y1="50%" x2="48%" y2="50%"
            stroke="rgba(255,107,71,0.4)" strokeWidth="1.5" strokeDasharray="3 2"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="82%" y1="50%" x2="52%" y2="50%"
            stroke="rgba(255,179,71,0.4)" strokeWidth="1.5" strokeDasharray="3 2"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* You pin */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-coral/40 z-10"
          style={{ background: "#FF6B47" }}
          animate={{ left: ["15%", "43%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        {/* Match pin */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-amber/40 z-10"
          style={{ background: "#FFB347" }}
          animate={{ left: ["81%", "53%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        {/* Meeting point */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            className="w-5 h-5 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </div>
      </div>

      <div className="flex justify-between mt-3.5 px-1">
        <div className="text-[10px] text-[rgba(245,240,235,0.5)] font-inter">
          <span className="text-coral font-semibold">You</span> · 8 min away
        </div>
        <div className="text-[10px] text-[rgba(245,240,235,0.5)] font-inter">
          <span className="text-amber font-semibold">Sophie</span> · 6 min away
        </div>
      </div>
    </div>
  );
}

// ── Post-Date Coach star rating ──────────────────────────────────────────────
function PostDateCoachCard() {
  const [stars, setStars] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fillStars = () => {
      setStars(0);
      setShowFeedback(false);
      let count = 0;
      const t = setInterval(() => {
        count += 1;
        setStars(count);
        if (count >= 5) {
          clearInterval(t);
          setTimeout(() => setShowFeedback(true), 450);
        }
      }, 280);
      return t;
    };

    const initTimer = setTimeout(() => fillStars(), 600);
    const loopTimer = setInterval(() => fillStars(), 6500);

    return () => {
      clearTimeout(initTimer);
      clearInterval(loopTimer);
    };
  }, []);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-coral/15 flex items-center justify-center">
          <Star size={13} className="text-coral" />
        </div>
        <span className="text-sm font-semibold text-[#F5F0EB] font-inter">Post-Date Coach</span>
      </div>

      <p className="text-[11px] text-[rgba(245,240,235,0.45)] font-inter mb-3">
        How was your date with Sophie?
      </p>

      <div className="flex gap-1.5 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            className="w-7 h-7"
            animate={{ scale: stars >= i ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 0.28, delay: stars >= i ? (i - 1) * 0.05 : 0 }}
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={stars >= i ? "#FFB347" : "rgba(255,255,255,0.08)"}
              stroke={stars >= i ? "#FFB347" : "rgba(255,255,255,0.14)"}
              strokeWidth="1.5"
            />
          </motion.svg>
        ))}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="bg-coral/10 border border-coral/20 rounded-xl px-3.5 py-3 flex items-start gap-2.5"
          >
            <Sparkles size={13} className="text-coral flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-[rgba(245,240,235,0.8)] font-inter leading-relaxed">
              Great chemistry — 4/5 signals strong. Cupid suggests: propose a second date within 48 hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function TheMeeting() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#13141F]">
      <RetroGrid />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-[#F5F0EB] mb-4"
          >
            Make your move.{" "}
            <span className="text-coral italic">We&apos;ll handle the rest.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-inter text-[rgba(245,240,235,0.6)] text-lg max-w-xl mx-auto"
          >
            Coupld coordinates the whole real-world transition — venue ideas, location sync, date check-in — so you walk in already at ease.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left: Feature mini-demos */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <DateIdeasCard />
            <LocationSyncCard />
            <PostDateCoachCard />
          </motion.div>

          {/* Right: Photo + overlays */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            {/* Main photo */}
            <div className="relative h-[520px] rounded-3xl overflow-hidden border border-white/8 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
              <Image
                src="https://images.pexels.com/photos/6699447/pexels-photo-6699447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=600"
                alt="Couple enjoying a date"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13141F]/80 via-transparent to-transparent" />
            </div>

            {/* Date confirmed card — top right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-6 right-[-10px] glass-strong rounded-2xl p-4 w-[170px] border border-white/12 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-coral/20 rounded-lg flex items-center justify-center">
                  <Calendar size={13} className="text-coral" />
                </div>
                <span className="text-[11px] font-semibold text-[#F5F0EB] font-inter">Date Confirmed</span>
              </div>
              <div className="text-[11px] text-[rgba(245,240,235,0.7)] font-inter">Tonight · 7:30 PM</div>
              <div className="text-[10px] text-[rgba(245,240,235,0.4)] font-inter mt-0.5">Kiln Restaurant, CBD</div>
              <div className="mt-3 h-1 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-coral rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.9, ease: "easeOut" }}
                />
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <Check size={9} className="text-coral" />
                <span className="text-[9px] text-coral font-inter">Both confirmed</span>
              </div>
            </motion.div>

            {/* 3x stat — bottom center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-strong rounded-2xl px-8 py-5 text-center border border-white/12 shadow-xl"
              style={{ minWidth: 200 }}
            >
              <motion.div
                className="font-playfair text-[3rem] font-bold text-coral leading-none"
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                3x
              </motion.div>
              <div className="font-inter text-[rgba(245,240,235,0.6)] text-xs mt-1.5 leading-snug">
                more first dates happen on Coupld
              </div>
            </motion.div>

            {/* Venue suggestion bubble — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 }}
              className="absolute bottom-[155px] left-[-14px] glass rounded-xl px-3.5 py-2.5 border border-white/10 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={11} className="text-amber flex-shrink-0" />
                <div>
                  <div className="text-[10px] font-semibold text-amber font-inter">AI Pick</div>
                  <div className="text-[10px] text-[rgba(245,240,235,0.65)] font-inter">Kiln · 4.9 stars · 0.8km</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
