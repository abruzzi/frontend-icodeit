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

/** Case studies live in `content/case-studies/<slug>/index.mdx` (folder per slug). */
function listCaseStudySlugs(): string[] {
  const directory = getCollectionDir("case-studies");
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .filter((entry) =>
      fs.existsSync(path.join(directory, entry.name, "index.mdx")),
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function readMdxFilesFlat(collection: Collection): string[] {
  const directory = getCollectionDir(collection);
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));
}

function parseCaseStudyEntry(slug: string): ContentEntry<CaseStudyFrontmatter> {
  const fullPath = path.join(
    getCollectionDir("case-studies"),
    slug,
    "index.mdx",
  );
  const source = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(source);

  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
  };
}

function parsePatternEntry(fileName: string): ContentEntry<PatternFrontmatter> {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(getCollectionDir("patterns"), fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(source);

  return {
    slug,
    frontmatter: data as PatternFrontmatter,
  };
}

export function getCaseStudies(): ContentEntry<CaseStudyFrontmatter>[] {
  return listCaseStudySlugs().map(parseCaseStudyEntry);
}

export function getPatterns(): ContentEntry<PatternFrontmatter>[] {
  return readMdxFilesFlat("patterns").map(parsePatternEntry);
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
  if (collection === "case-studies") {
    const folderPath = path.join(
      getCollectionDir("case-studies"),
      slug,
      "index.mdx",
    );
    if (!fs.existsSync(folderPath)) {
      return null;
    }
    const raw = fs.readFileSync(folderPath, "utf8");
    const { data, content } = matter(raw);
    return { source: content, frontmatter: data as ContentFrontmatter };
  }

  const fullPath = path.join(getCollectionDir(collection), `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { source: content, frontmatter: data as ContentFrontmatter };
}
