import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

import { Highlight } from "@/components/mdx/Highlight";
import { CourseBoardAnnotateSection } from "@/components/courses/course-board-annotate-section";
import { CourseCornerstoneBoard } from "@/components/courses/course-cornerstone-board";
import { CourseCurriculumCloud } from "@/components/courses/course-curriculum-cloud";
import { CourseHero } from "@/components/courses/course-hero";
import { CoursePricing } from "@/components/courses/course-pricing";
import { CourseScrollReveal } from "@/components/courses/course-scroll-reveal";
import { CourseTestimonials } from "@/components/courses/course-testimonials";
import { CourseVideoIntro } from "@/components/courses/course-video-intro";
import {
  fsdeCurriculumCloudLabels,
  fsdeFeaturedTestimonial,
  fsdeMarqueeTestimonials,
} from "@/lib/courses/fsde-landing-data";
import { ui } from "@/lib/ui";

/** Hero card — copy from `hero.mdx`, compiled in the page. */
export function FsdeCourseHero({ heroIntro }: { heroIntro: ReactNode }) {
  return <CourseHero heroIntro={heroIntro} />;
}

function FsdeCurriculumCoversWalkAwayProse() {
  return (
    <div className="space-y-5 text-pretty text-slate-600 dark:text-slate-400">
      <p className="m-0 leading-relaxed">
        You&apos;ll walk away with{" "}
        <Highlight variant="underline3">
          confidence to design scalable frontend systems
        </Highlight>{" "}
        instead of patching features together — and a clear framework for data modeling, fetching, mutation, and rendering
        so you can name trade-offs instead of guessing.
      </p>
      <p className="m-0 leading-relaxed">
        The thread is hands-on:{" "}
        <Highlight variant="underline2">
          patterns you&apos;ll actually use at work
        </Highlight>
        , wired through a capstone board you can show in a portfolio or interview. 
        The topic cloud below is the quick visual index for those same themes.
      </p>
      <p className="m-0 leading-relaxed">
        By the end you should have the mindset of a senior engineer
        when choosing structure, APIs, and UX —{" "}
        <Highlight variant="underline3">
          making trade-offs wisely
        </Highlight>{" "}
        instead of hoping the next refactor fixes everything.
      </p>
    </div>
  );
}

export function FsdeCourseCurriculumCloudSection() {
  return (
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
        <FsdeCurriculumCoversWalkAwayProse />
      </div>
    </CourseScrollReveal>
  );
}

export function FsdeCourseVideoSection({
  muxPlaybackId,
  youtubeVideoId,
}: {
  muxPlaybackId: string;
  youtubeVideoId: string | null;
}) {
  return (
    <CourseScrollReveal className={ui.courseSectionY}>
      <CourseVideoIntro
        muxPlaybackId={muxPlaybackId}
        youtubeVideoId={youtubeVideoId}
      />
    </CourseScrollReveal>
  );
}

export function FsdeCourseTestimonialsSection() {
  return (
    <CourseScrollReveal className={ui.courseSectionY}>
      <CourseTestimonials
        featured={fsdeFeaturedTestimonial}
        marqueeItems={fsdeMarqueeTestimonials}
      />
    </CourseScrollReveal>
  );
}

export function FsdeCoursePricingSection() {
  return (
    <CourseScrollReveal className={ui.courseSectionY}>
      <CoursePricing />
    </CourseScrollReveal>
  );
}

export function FsdeCourseCornerstoneSection() {
  return (
    <CourseScrollReveal className={ui.courseSectionY}>
      <CourseCornerstoneBoard />
    </CourseScrollReveal>
  );
}

export function FsdeCourseBoardAnnotateSection() {
  return (
    <CourseScrollReveal
      id="course-board-map"
      className={ui.courseSectionY}
    >
      <CourseBoardAnnotateSection />
    </CourseScrollReveal>
  );
}

/**
 * Long-form “Inside the course” body — wrap markdown + embedded components (grid, storyline, FAQ).
 */
export function FsdeCourseDetailsSection({ children }: { children: ReactNode }) {
  return (
    <CourseScrollReveal className={`${ui.courseSectionY} pb-8`}>
      <div className="space-y-4">
        <p className={ui.courseEyebrow}>Details</p>
        <h2 className={ui.courseSectionTitle} id="course-details">
          Inside the course
        </h2>
      </div>
      <article
        className={`${ui.proseArticle} mt-8 border-t border-slate-200/80 pt-10 dark:border-slate-600/40 sm:pt-12`}
      >
        {children}
      </article>
    </CourseScrollReveal>
  );
}

export type FsdeCourseMdxContext = {
  heroIntro: ReactNode;
  muxPlaybackId: string;
  youtubeVideoId: string | null;
};

/**
 * MDX component map for `content/courses/frontend-system-design-essentials/index.mdx`.
 * Reorder or insert raw MDX between tags to change section flow or add separators.
 */
export function buildFsdeCourseMdxComponents(
  ctx: FsdeCourseMdxContext,
): MDXComponents {
  return {
    FsdeCourseHero: () => <FsdeCourseHero heroIntro={ctx.heroIntro} />,
    FsdeCourseCurriculumCloudSection,
    FsdeCourseVideoSection: () => (
      <FsdeCourseVideoSection
        muxPlaybackId={ctx.muxPlaybackId}
        youtubeVideoId={ctx.youtubeVideoId}
      />
    ),
    FsdeCourseTestimonialsSection,
    FsdeCoursePricingSection,
    FsdeCourseCornerstoneSection,
    FsdeCourseBoardAnnotateSection,
    FsdeCourseDetailsSection,
  };
}
