/** @type {import('tailwindcss').Config} */
const siteColors = require("./site-colors.json");

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Hex values: `site-colors.json` (also imported in TS for SVG/canvas). */
        brand: siteColors.brand,
        brandSecondary: siteColors.brandSecondary,
        brandDanger: siteColors.brandDanger,
        slate: {
          150: "#e8edf3",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: [
          "var(--font-geist-sans)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "monospace",
        ],
      },
      boxShadow: {
        diffuse:
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
