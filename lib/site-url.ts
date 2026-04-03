/** Matches `app/layout.tsx` / `sitemap.ts` for absolute links (OG, share, etc.). */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://frontend.icodeit.com.au";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
