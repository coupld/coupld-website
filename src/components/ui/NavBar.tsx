"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong py-3 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-amber flex items-center justify-center text-white font-bold text-sm shadow-lg font-playfair">
            C
          </span>
          <span className="font-playfair text-lg font-semibold text-[#F5F0EB] group-hover:text-coral transition-colors duration-200">
            Coupld
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[rgba(245,240,235,0.65)] font-inter">
          {["How it Works", "The Gift", "Stories"].map((l) => (
            <a
              key={l}
              href="#"
              className="hover:text-[#F5F0EB] transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#waitlist"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="glass rounded-full px-5 py-2 text-sm font-semibold text-coral border border-coral/30 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
        >
          Get the App
        </motion.a>
      </div>
    </motion.nav>
  );
}
