import { toString } from "mdast-util-to-string";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import type { Root } from "mdast";
import GithubSlugger from "github-slugger";
import { visit } from "unist-util-visit";

export type TocHeadingLevel = "two";

export type TocHeading = {
  level: TocHeadingLevel;
  text: string;
  slug: string;
};

function depthToLevel(depth: number): TocHeadingLevel | null {
  if (depth === 2) return "two";
  // Only show level 2 headings in the TOC (matches your request).
  if (depth === 3) return null;
  return null;
}

/**
 * Extract headings from MDX body and generate slugs compatible with `rehype-slug`.
 *
 * We only keep depth 2 and 3 so the TOC indentation matches the production-style
 * sidebar (big sections + subsections).
 */
export function extractTocHeadings(mdxBody: string): TocHeading[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(mdxBody) as Root;
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];

  visit(tree, "heading", (node: any) => {
    const level = depthToLevel(node.depth);
    if (!level) return;

    const text = toString(node).trim();
    if (!text) return;

    headings.push({
      level,
      text,
      slug: slugger.slug(text),
    });
  });

  return headings;
}

