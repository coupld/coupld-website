"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { value: "2,400+", label: "already waiting" },
  { value: "3", label: "cities at launch" },
  { value: "Free", label: "forever on beta" },
];

export default function WaitingList() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // TODO: call Loops API here
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(255,107,71,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="blob w-[500px] h-[350px] bg-coral/8 top-[-60px] right-[-80px]" />
      <div className="blob w-[400px] h-[300px] bg-amber/6 bottom-[-40px] left-[-60px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-coral font-inter mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
          Early access — limited spots
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-playfair text-[clamp(2.6rem,6.5vw,5rem)] font-bold text-[#F5F0EB] leading-[1.05] mb-5"
        >
          Be the first to{" "}
          <span className="text-coral italic glow-coral-text">find love.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="font-inter text-[rgba(245,240,235,0.6)] text-lg mb-10 max-w-md mx-auto leading-relaxed"
        >
          Join the waitlist and get priority access when Coupld launches in your city.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-8 mb-10 flex-wrap"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="font-playfair text-2xl font-bold text-coral">{s.value}</span>
              <span className="font-inter text-xs text-[rgba(245,240,235,0.45)] tracking-wide uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-3xl p-8 glow-coral"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 py-4"
              >
                {/* Pulsing heart */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg
                    width="52"
                    height="48"
                    viewBox="0 0 40 38"
                    style={{ filter: "drop-shadow(0 0 14px rgba(255,107,71,0.7))" }}
                  >
                    <path
                      d="M20 36C20 36 2 23 2 11.5C2 6 6 2 11.5 2C14.8 2 17.8 3.8 20 6.6C22.2 3.8 25.2 2 28.5 2C34 2 38 6 38 11.5C38 23 20 36 20 36Z"
                      fill="#FF6B47"
                      stroke="rgba(255,107,71,0.3)"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
                <p className="font-playfair text-2xl font-bold text-[#F5F0EB]">
                  You&apos;re on the list!
                </p>
                <p className="font-inter text-[rgba(245,240,235,0.55)] text-sm max-w-xs">
                  We&apos;ll email you the moment Coupld opens in your city. Keep an eye on your inbox.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="your@email.com"
                      className="w-full glass rounded-2xl px-5 py-3.5 font-inter text-[#F5F0EB] text-base placeholder:text-[rgba(245,240,235,0.3)] bg-transparent border border-white/10 focus:border-coral/50 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(255,107,71,0.45)" }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-coral to-amber text-white font-semibold font-inter px-7 py-3.5 rounded-2xl text-base shadow-lg whitespace-nowrap flex-shrink-0"
                  >
                    Join Waitlist
                  </motion.button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-inter text-sm text-coral/80 text-left px-1"
                  >
                    {error}
                  </motion.p>
                )}

                <p className="font-inter text-xs text-[rgba(245,240,235,0.3)] text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
