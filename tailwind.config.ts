import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4ECE0",
        "cream-light": "#FAF6EE",
        sage: "#3F5648",
        terracotta: "#C97B5A",
        charcoal: "#1F1F1F",
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
