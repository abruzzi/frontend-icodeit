import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type {
  CaseStudyFrontmatter,
  ContentEntry,
  ContentFrontmatter,
  PatternFrontmatter,
} from "./types";

type Collection = "case-studies" | "patterns";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getCollectionDir(collection: Collection): string {
  return path.join(CONTENT_DIR, collection);
}

function readMdxFiles(collection: Collection): string[] {
  const directory = getCollectionDir(collection);
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));
}

function parseEntry<T extends ContentFrontmatter>(
  collection: Collection,
  fileName: string,
): ContentEntry<T> {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(getCollectionDir(collection), fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(source);

  return {
    slug,
    frontmatter: data as T,
  };
}

export function getCaseStudies(): ContentEntry<CaseStudyFrontmatter>[] {
  return readMdxFiles("case-studies").map((file) =>
    parseEntry<CaseStudyFrontmatter>("case-studies", file),
  );
}

export function getPatterns(): ContentEntry<PatternFrontmatter>[] {
  return readMdxFiles("patterns").map((file) =>
    parseEntry<PatternFrontmatter>("patterns", file),
  );
}

export {
  filterPublishedCaseStudyRefs,
  filterPublishedPatternRefs,
  sortByPublishStatusThenTitle,
} from "./publish";
export { isPublishedContent, type ContentStatus } from "./types";

export function getEntrySource(
  collection: Collection,
  slug: string,
): { source: string; frontmatter: ContentFrontmatter } | null {
  const fullPath = path.join(getCollectionDir(collection), `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { source: content, frontmatter: data as ContentFrontmatter };
}
