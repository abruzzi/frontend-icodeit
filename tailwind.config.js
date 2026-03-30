/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
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
        /** Named palette: `text-palette-magenta`, `bg-palette-azure`, etc. */
        palette: siteColors.palette,
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
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addBase, theme }) => {
      const palette = theme("colors.palette");
      if (!palette || typeof palette !== "object") return;
      const root = {};
      for (const [name, value] of Object.entries(palette)) {
        if (typeof value === "string") {
          root[`--palette-${name}`] = value;
        }
      }
      if (Object.keys(root).length > 0) {
        addBase({ ":root": root });
      }
    }),
  ],
};
