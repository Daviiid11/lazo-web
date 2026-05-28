import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4ECE0",
        "cream-light": "#FAF6EE",
        sage: "#3F5648",
        "sage-dark": "#324438",
        terracotta: "#C97B5A",
        "terracotta-dark": "#B26849",
        charcoal: "#1F1F1F",
        "charcoal-700": "#3A3A3A",
        "charcoal-500": "#6B6B6B",
        "charcoal-300": "#B3B3B3",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter2: "-0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
