import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554"
        }
      },
      boxShadow: {
        soft: "0 20px 60px -28px rgba(37, 99, 235, 0.24)",
        panel: "0 18px 50px -30px rgba(15, 23, 42, 0.26)"
      },
      backgroundImage: {
        "page-glow": "radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 34%), radial-gradient(circle at top right, rgba(96, 165, 250, 0.12), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;