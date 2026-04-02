import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";

import { CourseHero } from "@/components/courses/course-hero";
import { CourseCornerstoneBoard } from "@/components/courses/course-cornerstone-board";
import { CourseCurriculumCloud } from "@/components/courses/course-curriculum-cloud";
import { CoursePricing } from "@/components/courses/course-pricing";
import { CourseScrollReveal } from "@/components/courses/course-scroll-reveal";
import { CourseTestimonials } from "@/components/courses/course-testimonials";
import { CourseVideoIntro } from "@/components/courses/course-video-intro";
import { mdxComponents } from "@/components/mdx/mdx-components";
import {
  fsdeCurriculumCloudLabels,
  fsdeFeaturedTestimonial,
  fsdeMarqueeTestimonials,
  getCourseIntroVideoId,
} from "@/lib/courses/fsde-landing-data";
import {
  courseHeroTitleFromMdx,
  splitCoursePageMdx,
} from "@/lib/courses/course-page-mdx";
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

export async function generateMetadata(): Promise<Metadata> {
  const raw = fs.readFileSync(COURSE_MDX_PATH, "utf8");
  const { data, content } = matter(raw);
  const { heroSource } = splitCoursePageMdx(content.trim());
  const title =
    courseHeroTitleFromMdx(heroSource) ??
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
  const { heroSource, detailsSource } = splitCoursePageMdx(content.trim());

  const heroIntro =
    heroSource.trim().length > 0
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

  const mdx =
    detailsSource.trim().length > 0
      ? await renderMdx(detailsSource)
      : await renderMdx(content.trim());

  const videoId = getCourseIntroVideoId();

  return (
    <>
      <CourseHero heroIntro={heroIntro} />

      <CourseScrollReveal id="course-map" className={ui.courseSectionY}>
        <div className="space-y-8">
          <div>
            <p className={ui.courseEyebrow}>Curriculum</p>
            <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
              What the course covers
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-slate-600 dark:text-slate-400">
              A tight set of core themes — the centre reads loudest; edges soften
              so the band stays easy to scan.
            </p>
          </div>
          <CourseCurriculumCloud labels={fsdeCurriculumCloudLabels} />
        </div>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <CourseVideoIntro videoId={videoId} />
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <CourseTestimonials
          featured={fsdeFeaturedTestimonial}
          marqueeItems={fsdeMarqueeTestimonials}
        />
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <CoursePricing />
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <CourseCornerstoneBoard />
      </CourseScrollReveal>

      <CourseScrollReveal className={`${ui.courseSectionY} pb-8`}>
        <div className="space-y-4">
          <p className={ui.courseEyebrow}>Details</p>
          <h2 className={ui.courseSectionTitle} id="course-details">
            Inside the course
          </h2>
        </div>
        <article className={`${ui.proseArticle} mt-8 border-t border-slate-200/80 pt-10 dark:border-slate-600/40 sm:pt-12`}>
          {mdx}
        </article>
      </CourseScrollReveal>
    </>
  );
}
