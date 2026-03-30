import siteColorsJson from "../site-colors.json";

/** Accent colors for diagrams, data viz, callouts—shared by Tailwind, TS, and `:root` CSS variables. */
export type SitePalette = {
  magenta: string;
  azure: string;
  tangerine: string;
  gold: string;
  jade: string;
};

/** Single source for marketing / diagram hex values. Tailwind reads the same file via `tailwind.config.js`. */
export type SiteColors = {
  brand: string;
  brandSecondary: string;
  brandDanger: string;
  palette: SitePalette;
};

export const siteColors = siteColorsJson as SiteColors;

/** CSS custom property names (set on `:root` by Tailwind plugin)—use in inline styles or raw CSS. */
export const paletteCssVar = {
  magenta: "--palette-magenta",
  azure: "--palette-azure",
  tangerine: "--palette-tangerine",
  gold: "--palette-gold",
  jade: "--palette-jade",
} as const satisfies Record<keyof SitePalette, string>;

export type PaletteName = keyof SitePalette;
