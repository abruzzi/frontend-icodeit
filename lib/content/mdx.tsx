import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { transformerMetaHighlight } from "@shikijs/transformers";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Root as HastRoot } from "hast";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { createHighlighter } from "shiki";
import { visit } from "unist-util-visit";

import type { MDXComponents } from "mdx/types";

import { mdxComponents } from "@/components/mdx/mdx-components";
import { shikiTransformerMdxJsonExpand } from "@/lib/content/shiki-transformer-mdx-json-expand";

/** Same as icodeit-next `lib/rehype-pretty-code.ts` (rehype-pretty-code + shikiji there). */
const SHIKI_THEMES = {
  light: "solarized-light",
  dark: "github-dark-dimmed",
} as const;

/** `undefined` entries in `children` make `unist-util-visit` throw (`'children' in undefined`). */
function stripInvalidHastChildren(tree: HastRoot) {
  visit(tree, (node) => {
    if (node == null || typeof node !== "object") return;
    if (!("children" in node) || !Array.isArray(node.children)) return;
    const ch = node.children;
    const next = ch.filter((c) => c != null && typeof c === "object") as typeof ch;
    if (next.length !== ch.length) {
      (node as { children: typeof ch }).children = next;
    }
  });
}

const SHIKI_LANGS = [
  "bash",
  "css",
  "html",
  "javascript",
  "json",
  "jsonc",
  "jsx",
  "markdown",
  "md",
  "mdx",
  "shell",
  "text",
  "tsx",
  "typescript",
  "yaml",
] as const;

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

async function getShikiHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [SHIKI_THEMES.light, SHIKI_THEMES.dark],
      langs: [...SHIKI_LANGS],
    });
  }
  return highlighterPromise;
}

/**
 * Shiki dual themes (match icodeit-next): solarized-light / github-dark-dimmed.
 * Pass the factory to `rehypePlugins` as `rehypeShikiIcodeitPlugin`, not `rehypeShikiIcodeitPlugin()` — unified must call the factory on freeze and register the returned transformer.
 */
function rehypeShikiIcodeitPlugin() {
  let run: ReturnType<typeof rehypeShikiFromHighlighter> | null = null;

  /**
   * Single-argument transformer so `trough` never appends `done` (would make `fnExpectsCallback` true
   * when only `tree` is passed to the inner pipeline step). Always return the same `tree` reference
   * after awaiting Shiki — the inner plugin mutates in place; its Promise must be awaited.
   */
  return async (tree: HastRoot) => {
    if (!tree || tree.type !== "root") {
      return tree;
    }

    stripInvalidHastChildren(tree);

    if (!run) {
      const highlighter = await getShikiHighlighter();
      run = rehypeShikiFromHighlighter(highlighter, {
        themes: {
          light: SHIKI_THEMES.light,
          dark: SHIKI_THEMES.dark,
        },
        /** So MDX `pre` can detect `json` / `jsonc` fences for collapsible UI. */
        addLanguageClass: true,
        /** Fence meta ` ```ts {1,3-5}` → highlighted lines (see Shiki docs). */
        transformers: [
          transformerMetaHighlight(),
          shikiTransformerMdxJsonExpand(),
        ],
        onError: (e) => {
          console.error("[rehype-shiki]", e);
        },
      } as Parameters<typeof rehypeShikiFromHighlighter>[1]);
    }

    const maybePromise = (run as (t: HastRoot) => void | Promise<void>)(tree);
    if (maybePromise && typeof (maybePromise as Promise<void>).then === "function") {
      await maybePromise;
    }

    stripInvalidHastChildren(tree);
    return tree;
  };
}

export async function renderMdx(
  source: string,
  componentOverrides?: MDXComponents,
) {
  const components =
    componentOverrides == null
      ? mdxComponents
      : { ...mdxComponents, ...componentOverrides };

  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append" }],
          rehypeShikiIcodeitPlugin as import("unified").Pluggable,
        ],
      },
    },
  });

  return content;
}
