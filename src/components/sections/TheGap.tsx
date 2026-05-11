"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const chatMessages = [
  { from: "match", text: "Hey! Your photos from Patagonia look incredible", time: "2:14 PM" },
  { from: "nudge", text: "Sophie loves hiking. Ask about her next adventure — suggested by Cupid" },
  { from: "you",   text: "Thanks! That trip changed everything. Where's your next big adventure?", time: "2:16 PM" },
  { from: "match", text: "Actually planning New Zealand next month!", time: "2:17 PM" },
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-1 px-4 py-3 glass rounded-2xl rounded-bl-sm w-fit">
      {[0, 0.2, 0.4].map((delay) => (
        <motion.div
          key={delay}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, delay, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-[rgba(245,240,235,0.5)]"
        />
      ))}
    </div>
  );
}

export default function TheGap() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const showNext = (index: number) => {
      if (index >= chatMessages.length) return;
      setShowTyping(true);
      timeout = setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages(index + 1);
        timeout = setTimeout(() => showNext(index + 1), 800);
      }, 1100);
    };
    timeout = setTimeout(() => showNext(0), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="how" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/28828935/12488199_1920_1080_50fps.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[#0D0E1A]/60" />
      </div>

      <div className="blob w-[600px] h-[400px] bg-coral/5 -top-20 -left-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Feature copy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-playfair text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-bold text-[#F5F0EB] mb-6">
            Meet your{" "}
            <span className="text-coral italic">Cupid.</span>
          </h2>
          <p className="font-inter text-[rgba(245,240,235,0.65)] text-lg leading-relaxed mb-10 max-w-md">
            Cupid sits inside every conversation and surfaces the right suggestion at exactly the right moment. Not a chatbot. A contextual guide that knows when to speak and when to step back.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { label: "AI-crafted icebreakers", desc: "Cupid reads both profiles and suggests the perfect opener, tailored to your shared interests." },
              { label: "Contextual nudges, every stage", desc: "From first message to first date, Cupid guides you with quiet suggestions — never overwhelming, always useful." },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-start gap-4 glass rounded-xl px-5 py-4">
                <div className="w-2 h-2 rounded-full bg-coral mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[#F5F0EB] font-inter">{label}</div>
                  <div className="text-xs text-[rgba(245,240,235,0.5)] font-inter mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Chat UI */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-3xl p-6 max-w-sm mx-auto w-full"
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/8 mb-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-coral/30">
              <Image
                src="https://images.pexels.com/photos/10038422/pexels-photo-10038422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80"
                alt="Sophie"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#F5F0EB] font-inter">Sophie, 24</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs text-[rgba(245,240,235,0.45)]">Active now</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2.5 min-h-[220px]">
            {chatMessages.slice(0, visibleMessages).map((msg, i) => {
              if (msg.from === "nudge") {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 bg-coral/15 border border-coral/25 rounded-xl px-3 py-2 mx-1"
                  >
                    <Sparkles size={12} className="text-coral flex-shrink-0" />
                    <span className="text-xs font-inter text-coral">{msg.text}</span>
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${msg.from === "you" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-inter ${
                      msg.from === "you"
                        ? "bg-gradient-to-br from-coral to-amber text-white rounded-br-sm"
                        : "glass text-[#F5F0EB] rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                    {msg.time && (
                      <div className="text-[10px] opacity-60 mt-0.5 text-right">{msg.time}</div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {showTyping && visibleMessages < chatMessages.length && chatMessages[visibleMessages].from !== "nudge" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <TypingIndicator />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
