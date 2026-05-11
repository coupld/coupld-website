"use client";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section id="download" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,107,71,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="blob w-[600px] h-[400px] bg-amber/8 top-[-50px] left-[-100px]" />
      <div className="blob w-[500px] h-[350px] bg-coral/6 bottom-[-50px] right-[-80px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-coral font-inter mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
          Available on iOS & Android
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-playfair text-[clamp(2.8rem,7vw,5.5rem)] font-bold text-[#F5F0EB] leading-[1.05] mb-6"
        >
          The app you{" "}
          <span className="text-coral italic glow-coral-text">won&apos;t delete.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-inter text-[rgba(245,240,235,0.6)] text-lg mb-12 max-w-md mx-auto"
        >
          Join the beta in the UK, Australia and the US. Deep matching, an AI coach, and billing that stops the moment you find someone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-3xl p-10 glow-coral"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.a
              href="#"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 glass rounded-2xl px-6 py-4 border border-white/10 hover:border-coral/30 transition-all"
            >
              <svg className="w-7 h-7 text-[#F5F0EB]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04l-.08.23zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-[rgba(245,240,235,0.5)] font-inter">Download on the</div>
                <div className="text-sm font-semibold text-[#F5F0EB] font-inter">App Store</div>
              </div>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 glass rounded-2xl px-6 py-4 border border-white/10 hover:border-coral/30 transition-all"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76c.3.16.64.21.98.14l11.79-6.82-2.6-2.6-10.17 9.28z" fill="#EA4335" />
                <path d="M21.54 10.37l-3.14-1.82-2.93 2.93 2.93 2.93 3.17-1.84c.9-.52.9-1.68-.03-2.2z" fill="#FBBC04" />
                <path d="M2.16.24C1.76.45 1.5.88 1.5 1.43v21.14c0 .55.26.98.66 1.19l.08.04 11.83-11.83-.08-.08L2.16.24z" fill="#4285F4" />
                <path d="M16.03 12l-2.97-2.97L3.18.24c-.34-.07-.68-.02-.98.14L13.06 12l2.97-2.97z" fill="#34A853" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-[rgba(245,240,235,0.5)] font-inter">Get it on</div>
                <div className="text-sm font-semibold text-[#F5F0EB] font-inter">Google Play</div>
              </div>
            </motion.a>
          </div>

          {/* QR placeholder */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 glass rounded-xl flex items-center justify-center border border-white/10">
              <div className="grid grid-cols-3 gap-1 p-2 opacity-50">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-sm ${[0, 2, 6, 8].includes(i) ? "bg-coral" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
            <span className="text-xs text-[rgba(245,240,235,0.35)] font-inter">Scan to download</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-xs text-[rgba(245,240,235,0.3)] font-inter"
        >
          coupld.com · Get Coupld. Stay Coupld.
        </motion.p>
      </div>
    </section>
  );
}
