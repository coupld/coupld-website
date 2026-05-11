"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote: "Coupld helped me say the thing I couldn't type. We had coffee last Sunday. We're seeing each other again this weekend.",
    name: "Arjun M.",
    location: "Melbourne",
    imgSrc: "https://images.pexels.com/photos/4255642/pexels-photo-4255642.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80",
  },
  {
    quote: "Cupid suggested I ask about her photography. That one question opened everything up.",
    name: "Ryan K.",
    location: "Sydney",
    imgSrc: "https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80",
  },
  {
    quote: "I sent her a virtual coffee through Coupld at 8am. She said it was the sweetest thing. We met that evening.",
    name: "Jake T.",
    location: "New York",
    imgSrc: "https://images.pexels.com/photos/966067/pexels-photo-966067.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80",
  },
  {
    quote: "Finally, a dating app that actually wants me to go on dates. Every other app felt like it wanted me to stay single.",
    name: "Sophie L.",
    location: "Los Angeles",
    imgSrc: "https://images.pexels.com/photos/10038422/pexels-photo-10038422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80",
  },
  {
    quote: "The post-date coaching is genuinely insightful. I understood what I was doing wrong and what was actually working.",
    name: "Liam C.",
    location: "San Francisco",
    imgSrc: "https://images.pexels.com/photos/977374/pexels-photo-977374.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80",
  },
  {
    quote: "Cupid kept the conversation alive when I had no idea what to say. Now we're planning a second date.",
    name: "Emma R.",
    location: "London",
    imgSrc: "https://images.pexels.com/photos/3936894/pexels-photo-3936894.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=80&w=80",
  },
];

const doubled = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="blob w-[400px] h-[300px] bg-coral/5 top-0 left-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="text-center mb-12 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-[#F5F0EB]"
          >
            Real connections. Real dates.
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          >
            {doubled.map((t, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 w-[300px] flex-shrink-0 flex flex-col justify-between gap-4"
              >
                <p className="font-inter text-sm text-[rgba(245,240,235,0.75)] leading-relaxed italic">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-coral/20 flex-shrink-0">
                    <Image
                      src={t.imgSrc}
                      alt={t.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#F5F0EB] font-inter">{t.name}</div>
                    <div className="text-xs text-[rgba(245,240,235,0.4)] font-inter">{t.location}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} viewBox="0 0 12 12" fill="#FFB347" className="w-2.5 h-2.5">
                        <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12 3.75 7.5 0 4.5h4.5z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
