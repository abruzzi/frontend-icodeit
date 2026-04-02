/**
 * Small helpers for course MDX files. Hero vs body are separate files (`hero.mdx` + `index.mdx`);
 * no HTML-comment split.
 */

/** First ATX markdown H1 in a slice (e.g. `hero.mdx` body for metadata). */
export function firstMarkdownH1(source: string): string | undefined {
  const m = source.trim().match(/^#\s+(.+)$/m);
  const t = m?.[1]?.trim();
  return t || undefined;
}
