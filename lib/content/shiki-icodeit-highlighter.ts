import { createHighlighter } from "shiki";

/** Aligned with `lib/content/mdx.tsx` rehype-shiki pipeline. */
export const SHIKI_THEMES = {
  light: "solarized-light",
  dark: "github-dark-dimmed",
} as const;

export const SHIKI_LANGS = [
  "bash",
  "css",
  "html",
  "javascript",
  "js",
  "json",
  "jsonc",
  "jsx",
  "markdown",
  "md",
  "mdx",
  "shell",
  "text",
  "ts",
  "tsx",
  "typescript",
  "yaml",
] as const;

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

/** Single highlighter for MDX rehype + Restful API panels. */
export async function getIcodeitShikiHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [SHIKI_THEMES.light, SHIKI_THEMES.dark],
      langs: [...SHIKI_LANGS],
    });
  }
  return highlighterPromise;
}

/**
 * Syntax-highlight a fence body for `<Request>` / `<Response>` when MDX nested markdown
 * did not run rehype-shiki (plain `pre` only).
 */
export async function highlightCodeForRestfulPanel(
  code: string,
  lang: "json" | "jsonc" = "json",
): Promise<string> {
  const h = await getIcodeitShikiHighlighter();
  return h.codeToHtml(code.trim(), {
    lang,
    themes: {
      light: SHIKI_THEMES.light,
      dark: SHIKI_THEMES.dark,
    },
  });
}
