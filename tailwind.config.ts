import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0a0a1a",
        primary: "#00ffff",
        secondary: "#ff00ff",
        accent: "#ffffff",
      },
      fontFamily: {
        sans: ['"Exo 2"', "sans-serif"],
        mono: ['"Space Grotesk"', "monospace"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #ff00ff",
            opacity: "0.8",
          },
          "50%": {
            boxShadow:
              "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #ff00ff",
            opacity: "1",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

