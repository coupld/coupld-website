"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Coffee, Music, Flower2, Mic, Check, Sparkles } from "lucide-react";

const gifts = [
  {
    Icon: Coffee,
    name: "Virtual Coffee",
    desc: "Start their morning right",
    color: "#FFB347",
    bg: "rgba(255,179,71,0.12)",
    border: "rgba(255,179,71,0.35)",
    msg: "Good morning ☕ Thinking of you.",
    reply: "This made my whole morning! 😊",
  },
  {
    Icon: Music,
    name: "Playlist",
    desc: "Songs that remind you of them",
    color: "#FF6B47",
    bg: "rgba(255,107,71,0.12)",
    border: "rgba(255,107,71,0.35)",
    msg: "Made you a playlist. Hope it fits your vibe.",
    reply: "Ok wait these songs are perfect ✨",
  },
  {
    Icon: Flower2,
    name: "Digital Flowers",
    desc: "Because why wait?",
    color: "#FF8FA3",
    bg: "rgba(255,143,163,0.12)",
    border: "rgba(255,143,163,0.35)",
    msg: "Because you deserve nice things. 🌸",
    reply: "Okay that's genuinely sweet 🌸",
  },
  {
    Icon: Mic,
    name: "Voice Note",
    desc: "Let them hear you first",
    color: "#C084FC",
    bg: "rgba(192,132,252,0.12)",
    border: "rgba(192,132,252,0.35)",
    msg: "Recorded this for you. Hit play 🎤",
    reply: "Listened to it three times already 🥹",
  },
];

const floatingHearts = [
  { left: "-18%", top: "18%", delay: 0 },
  { left: "112%", top: "12%", delay: 0.8 },
  { left: "-22%", top: "62%", delay: 1.5 },
  { left: "114%", top: "58%", delay: 0.4 },
  { left: "5%", top: "-8%", delay: 1.1 },
  { left: "90%", top: "-6%", delay: 1.9 },
];

export default function TheGift() {
  const [active, setActive] = useState(0);
  const [delivered, setDelivered] = useState(false);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    setTimeout(() => setDelivered(true), 900);
    setTimeout(() => setShowReply(true), 1900);

    const interval = setInterval(() => {
      setDelivered(false);
      setShowReply(false);
      setActive((prev) => (prev + 1) % gifts.length);
      setTimeout(() => setDelivered(true), 900);
      setTimeout(() => setShowReply(true), 1900);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const gift = gifts[active];
  const GiftIcon = gift.Icon;

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-amber/8 top-[-100px] right-[-100px]" />
      <div className="blob w-[400px] h-[300px] bg-coral/6 bottom-0 left-[-50px]" />

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
            Send something{" "}
            <span className="text-amber italic">thoughtful.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-inter text-[rgba(245,240,235,0.6)] text-lg max-w-lg mx-auto"
          >
            Cupid suggests the right gift at the right moment. A virtual coffee, a curated playlist, a gesture that says{" "}
            <em className="text-amber not-italic">&quot;I&apos;m thinking of you.&quot;</em>
          </motion.p>
        </div>

        {/* Main: gift picker + phone mockup */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* Gift selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-3 w-full lg:w-[300px]"
          >
            {gifts.map(({ Icon, name, desc, color, bg, border }, i) => (
              <motion.button
                key={name}
                onClick={() => {
                  setDelivered(false);
                  setShowReply(false);
                  setActive(i);
                  setTimeout(() => setDelivered(true), 900);
                  setTimeout(() => setShowReply(true), 1900);
                }}
                animate={{
                  background: active === i ? bg : "rgba(255,255,255,0.03)",
                  borderColor: active === i ? border : "rgba(255,255,255,0.07)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 rounded-2xl p-4 border text-left transition-all relative"
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  animate={{ background: active === i ? `${color}22` : "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    animate={active === i ? { rotate: [0, -12, 12, 0], scale: [1, 1.25, 1] } : {}}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  >
                    <Icon
                      size={18}
                      style={{ color: active === i ? color : "rgba(245,240,235,0.4)" }}
                    />
                  </motion.div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#F5F0EB] font-inter text-sm">{name}</div>
                  <div className="text-xs text-[rgba(245,240,235,0.45)] font-inter mt-0.5">{desc}</div>
                </div>

                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, x: 8 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.7, x: 8 }}
                      className="flex-shrink-0 text-[10px] font-inter font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${color}20`, color }}
                    >
                      Sending
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 grid grid-cols-3 gap-3"
            >
              {[
                { value: "2,400+", label: "sent today" },
                { value: "87%", label: "get a reply" },
                { value: "3.2x", label: "more dates" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center glass rounded-xl py-3">
                  <div className="font-playfair text-base font-bold text-amber">{value}</div>
                  <div className="text-[9px] text-[rgba(245,240,235,0.4)] font-inter mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-shrink-0 relative"
          >
            {/* Floating hearts */}
            {floatingHearts.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: pos.left, top: pos.top }}
                animate={{ y: [0, -18, 0], opacity: [0.15, 0.55, 0.15], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2.8 + i * 0.4, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill={gift.color}>
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                </svg>
              </motion.div>
            ))}

            {/* Glow behind phone */}
            <motion.div
              className="absolute inset-[-30px] rounded-[50px] pointer-events-none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ background: `radial-gradient(ellipse at center, ${gift.color}18 0%, transparent 70%)` }}
            />

            {/* Phone frame */}
            <div
              className="relative w-[260px] rounded-[38px] p-[10px] shadow-[0_0_80px_rgba(0,0,0,0.7)]"
              style={{ background: "linear-gradient(145deg, #2a2b3e, #1a1b2e)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {/* Dynamic island */}
              <div className="w-20 h-5 bg-[#0D0E1A] rounded-full mx-auto mb-2 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1a1b2e]" />
                <div className="w-4 h-4 rounded-full bg-[#1a1b2e] border border-white/5" />
              </div>

              {/* Screen */}
              <div className="bg-[#0D0E1A] rounded-[30px] overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center px-5 pt-3 pb-1">
                  <span className="text-[10px] text-[rgba(245,240,235,0.45)] font-inter font-medium">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-[2px] items-end h-3">
                      {[2, 3, 4, 3].map((h, i) => (
                        <div key={i} className="w-0.5 rounded-sm bg-[rgba(245,240,235,0.4)]" style={{ height: h * 3 }} />
                      ))}
                    </div>
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[rgba(245,240,235,0.4)]">
                      <path d="M1.022 6.757C5.33 2.448 11.155 0 17.019 0c5.862 0 11.687 2.448 15.996 6.757l-2.122 2.122C27.035 5.022 22.157 3 17.019 3c-5.14 0-10.017 2.022-13.875 5.879L1.022 6.757z" />
                    </svg>
                    <div className="w-6 h-3 rounded-sm bg-[rgba(245,240,235,0.4)] relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-green-400 w-[70%]" />
                    </div>
                  </div>
                </div>

                {/* Chat header */}
                <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-coral/25 flex-shrink-0">
                    <Image
                      src="https://images.pexels.com/photos/10038422/pexels-photo-10038422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80"
                      alt="Sophie"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold text-[#F5F0EB] font-inter">Sophie</div>
                    <div className="text-[9px] text-coral font-inter flex items-center gap-1">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-coral inline-block"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      Active now
                    </div>
                  </div>
                  <Sparkles size={14} className="text-amber opacity-60" />
                </div>

                {/* Messages */}
                <div className="px-3 py-4 space-y-3 min-h-[230px] flex flex-col justify-start">
                  {/* Gift bubble */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`gift-${active}`}
                      initial={{ opacity: 0, x: 30, scale: 0.88 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.92 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="flex justify-end"
                    >
                      <div
                        className="rounded-2xl rounded-tr-[4px] px-3.5 py-2.5 max-w-[82%]"
                        style={{
                          background: `linear-gradient(135deg, ${gift.color}28, ${gift.color}14)`,
                          border: `1px solid ${gift.color}28`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <GiftIcon size={11} style={{ color: gift.color }} />
                          <span
                            className="text-[10px] font-semibold font-inter"
                            style={{ color: gift.color }}
                          >
                            {gift.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-[rgba(245,240,235,0.8)] font-inter leading-snug">
                          {gift.msg}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Delivered tick */}
                  <AnimatePresence>
                    {delivered && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex justify-end items-center gap-1 pr-1"
                      >
                        <Check size={9} style={{ color: gift.color }} />
                        <span className="text-[9px] text-[rgba(245,240,235,0.3)] font-inter">Delivered</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sophie's reply */}
                  <AnimatePresence>
                    {showReply && (
                      <motion.div
                        key={`reply-${active}`}
                        initial={{ opacity: 0, x: -22, scale: 0.88 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-end gap-2"
                      >
                        <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                          <Image
                            src="https://images.pexels.com/photos/10038422/pexels-photo-10038422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=40&w=40"
                            alt="Sophie"
                            width={20}
                            height={20}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="bg-white/8 rounded-2xl rounded-tl-[4px] px-3.5 py-2.5 max-w-[75%] border border-white/6">
                          <p className="text-[10px] text-[rgba(245,240,235,0.85)] font-inter leading-snug">
                            {gift.reply}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input area */}
                <div className="px-3 pb-5">
                  <div className="bg-white/5 rounded-full px-4 py-2.5 flex items-center gap-2 border border-white/7">
                    <span className="text-[10px] text-[rgba(245,240,235,0.2)] font-inter flex-1">
                      Send a gift or message...
                    </span>
                    <motion.div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: gift.color }}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={10} className="text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
