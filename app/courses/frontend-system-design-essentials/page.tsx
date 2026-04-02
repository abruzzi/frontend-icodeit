import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";

import { mdxComponents } from "@/components/mdx/mdx-components";
import { buildFsdeCourseMdxComponents } from "@/lib/courses/fsde-course-mdx";
import {
  getCourseIntroMuxPlaybackId,
  getCourseIntroVideoId,
} from "@/lib/courses/fsde-landing-data";
import { firstMarkdownH1 } from "@/lib/courses/course-page-mdx";
import { renderMdx } from "@/lib/content/mdx";
import { ui } from "@/lib/ui";

const courseLandingHeroMdxComponents: MDXComponents = {
  ...mdxComponents,
  h1: ({ className, ...props }) => (
    <h1
      {...props}
      className={["mt-2 sm:mt-3", ui.courseDisplayTitle, className]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      {...props}
      className={[
        "mt-6 max-w-3xl text-pretty sm:mt-7 md:mt-8",
        ui.courseLead,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
};

const COURSE_DIR = path.join(
  process.cwd(),
  "content",
  "courses",
  "frontend-system-design-essentials",
);

const COURSE_MDX_PATH = path.join(COURSE_DIR, "index.mdx");
const COURSE_HERO_MDX_PATH = path.join(COURSE_DIR, "hero.mdx");

export async function generateMetadata(): Promise<Metadata> {
  const raw = fs.readFileSync(COURSE_MDX_PATH, "utf8");
  const { data } = matter(raw);
  const heroRaw = fs.existsSync(COURSE_HERO_MDX_PATH)
    ? fs.readFileSync(COURSE_HERO_MDX_PATH, "utf8")
    : "";
  const { content: heroBody } = matter(heroRaw);
  const title =
    firstMarkdownH1(heroBody) ??
    (typeof data.title === "string" ? data.title : null) ??
    "Frontend System Design Essentials";
  const description =
    typeof data.description === "string"
      ? data.description
      : typeof data.summary === "string"
        ? data.summary
        : "Practical frontend system design — framework, capstone board app, and production-ready patterns.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function FrontendSystemDesignEssentialsPage() {
  const raw = fs.readFileSync(COURSE_MDX_PATH, "utf8");
  const { data, content } = matter(raw);

  const heroRaw = fs.existsSync(COURSE_HERO_MDX_PATH)
    ? fs.readFileSync(COURSE_HERO_MDX_PATH, "utf8")
    : "";
  const { content: heroBody } = matter(heroRaw);
  const heroSource = heroBody.trim();

  const heroIntro =
    heroSource.length > 0
      ? await renderMdx(heroSource, courseLandingHeroMdxComponents)
      : await renderMdx(
          `# ${typeof data.title === "string" ? data.title : "Course"}\n\n${
            typeof data.description === "string"
              ? data.description
              : typeof data.summary === "string"
                ? data.summary
                : "Details below."
          }`,
          courseLandingHeroMdxComponents,
        );

  const muxPlaybackId = getCourseIntroMuxPlaybackId();
  const youtubeVideoId = getCourseIntroVideoId();

  const mergedComponents: MDXComponents = {
    ...mdxComponents,
    ...buildFsdeCourseMdxComponents({
      heroIntro,
      muxPlaybackId,
      youtubeVideoId,
    }),
  };

  const page = await renderMdx(content.trim(), mergedComponents);

  return <>{page}</>;
}
