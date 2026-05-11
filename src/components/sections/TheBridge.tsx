"use client";
import { motion } from "framer-motion";
import { MessageCircle, Waves, Zap } from "lucide-react";
import AnimatedBeam from "@/components/magic/AnimatedBeam";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  {
    Icon: MessageCircle,
    title: "AI Icebreakers",
    desc: "Cupid analyses both profiles and crafts the ideal first message. Specific, genuine, never copy-paste.",
  },
  {
    Icon: Waves,
    title: "Always in Your Corner",
    desc: "No message after 24 hours? Cupid nudges you with the right words at the right moment. No one gets left on read.",
  },
  {
    Icon: Zap,
    title: "Fades When You're Ready",
    desc: "Once the chemistry is real, Cupid steps back. What happens next is entirely yours.",
  },
];

export default function TheBridge() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="blob w-[700px] h-[500px] bg-amber/5 top-0 right-[-200px]" />
      <div className="blob w-[400px] h-[400px] bg-coral/5 bottom-0 left-[-100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-playfair text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-bold text-[#F5F0EB] text-center mb-4 max-w-2xl mx-auto"
        >
          The only app rooting for{" "}
          <span className="text-coral italic">your relationship.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-inter text-[rgba(245,240,235,0.6)] text-center text-lg max-w-xl mx-auto mb-16"
        >
          Every other app's business model depends on you staying single. Ours doesn't. Coupld is built to get you out of it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <AnimatedBeam />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ Icon, title, desc }, i) => (
            <GlassCard key={title} delay={i * 0.1} className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-coral/15 flex items-center justify-center">
                <Icon size={20} className="text-coral" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-[#F5F0EB]">{title}</h3>
              <p className="font-inter text-sm text-[rgba(245,240,235,0.6)] leading-relaxed">{desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
