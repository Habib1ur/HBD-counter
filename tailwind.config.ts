import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3B82F6",
          electric: "#2563EB",
          royal: "#1D4ED8",
          sky: "#38BDF8",
          cyan: "#22D3EE",
          light: "#BFDBFE",
          navy: "#080D1A",
          secondaryNavy: "#101B32",
        },
        surface: {
          glass: "rgba(255, 255, 255, 0.07)",
          glassHover: "rgba(255, 255, 255, 0.12)",
          glassBorder: "rgba(255, 255, 255, 0.14)",
          glassBorderHover: "rgba(255, 255, 255, 0.28)",
          glassLight: "rgba(255, 255, 255, 0.75)",
          glassBorderLight: "rgba(0, 0, 0, 0.08)",
        },
        accent: {
          violet: "#A855F7",
          pink: "#EC4899",
          mint: "#10B981",
          gold: "#F59E0B",
          rose: "#F43F5E",
          emerald: "#34D399",
          amber: "#FBBF24",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        "glass-lg": "0 12px 48px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.18)",
        "neon-blue": "0 0 25px rgba(59, 130, 246, 0.45)",
        "neon-cyan": "0 0 25px rgba(34, 211, 238, 0.45)",
        "neon-glow": "0 0 35px rgba(56, 189, 248, 0.35)",
      },
      animation: {
        "aurora-slow": "aurora 20s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        spinSlow: "spin 25s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate(0%, 0%) scale(1) rotate(0deg)" },
          "50%": { transform: "translate(-5%, 5%) scale(1.1) rotate(3deg)" },
          "100%": { transform: "translate(5%, -4%) scale(1.05) rotate(-3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
