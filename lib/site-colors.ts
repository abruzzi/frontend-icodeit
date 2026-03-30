import siteColorsJson from "../site-colors.json";

/** Single source for marketing / diagram hex values. Tailwind reads the same file via `tailwind.config.js`. */
export type SiteColors = {
  brand: string;
  brandSecondary: string;
  brandDanger: string;
};

export const siteColors = siteColorsJson as SiteColors;


/*

#ff0855 
#0090ff
#ff8000
#f4c70f
#00b209

*/

