"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const words = ["Your", "last", "first", "date."];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Heart cursor follower */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
        animate={{ opacity: cursorVisible ? 1 : 0, scale: cursorVisible ? 1 : 0.4 }}
        transition={{ duration: 0.2 }}
      >
        <motion.svg
          width="40" height="38" viewBox="0 0 40 38"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 10px rgba(255,107,71,0.7))" }}
        >
          <path
            d="M20 36C20 36 2 23 2 11.5C2 6 6 2 11.5 2C14.8 2 17.8 3.8 20 6.6C22.2 3.8 25.2 2 28.5 2C34 2 38 6 38 11.5C38 23 20 36 20 36Z"
            fill="#FF6B47"
            stroke="rgba(255,107,71,0.3)"
            strokeWidth="1"
          />
        </motion.svg>
      </motion.div>

      <section
        ref={ref}
        className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
        style={{ cursor: cursorVisible ? "none" : undefined }}
        onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
      >
        <motion.div className="absolute inset-0 w-full h-full" style={{ y: videoY }}>
          <video
            className="absolute inset-0 w-full h-full object-cover scale-110"
            src="https://videos.pexels.com/video-files/10071576/10071576-hd_2048_1080_25fps.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E1A]/70 via-[#0D0E1A]/30 to-[#0D0E1A]" />
          <div className="blob w-[500px] h-[500px] bg-coral/10 top-[20%] left-[10%] animate-blob-pulse" />
          <div className="blob w-[400px] h-[400px] bg-amber/8 top-[40%] right-[15%] animate-blob-pulse" style={{ animationDelay: "3s" }} />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ y: textY, opacity }}
        >
          <h1 className="font-playfair text-[clamp(3rem,9vw,7rem)] leading-[1.05] font-bold text-[#F5F0EB] mb-6">
            {words.map((word, i) => (
              <motion.span
                key={word + i}
                className={`inline-block mr-[0.25em] ${word === "date." ? "text-coral glow-coral-text" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="font-inter text-[clamp(1rem,2.5vw,1.3rem)] text-[rgba(245,240,235,0.7)] max-w-xl mx-auto mb-10 leading-relaxed"
          >
            The app built for after. Deep matching, an AI coach at every step, and billing that stops when you find someone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <motion.a
              href="#waitlist"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,107,71,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-coral to-amber text-white font-semibold font-inter px-8 py-3.5 rounded-full text-base shadow-lg"
            >
              Join the Beta
            </motion.a>
            <motion.a
              href="#how"
              whileHover={{ scale: 1.03 }}
              className="glass rounded-full px-8 py-3.5 text-base font-inter font-medium text-[#F5F0EB] border border-white/10 hover:border-coral/30 transition-all"
            >
              See how it works
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs text-[rgba(245,240,235,0.4)] font-inter tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-coral rounded-full" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
