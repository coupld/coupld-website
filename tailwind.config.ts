import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: "#FF6B47",
        amber: "#FFB347",
        "bg-deep": "#0D0E1A",
        "bg-surface": "#13141F",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 30s linear infinite",
        "spin-reverse": "spin-reverse 25s linear infinite",
        ticker: "ticker 30s linear infinite",
        "blob-pulse": "blob-pulse 8s ease-in-out infinite",
      },
      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blob-pulse": {
          "0%, 100%": { transform: "scale(1) translate(0, 0)" },
          "33%": { transform: "scale(1.1) translate(20px, -20px)" },
          "66%": { transform: "scale(0.95) translate(-10px, 15px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
