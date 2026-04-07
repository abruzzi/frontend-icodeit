import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AboutHero } from "@/components/about/about-hero";
import { CourseScrollReveal } from "@/components/courses/course-scroll-reveal";
import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";

const ICODEIT_MAIN = "https://www.icodeit.com.au";

const EXTERNAL = {
  leanpub: "https://leanpub.com/u/juntao",
  youtube: "https://www.youtube.com/@icodeit.juntao",
  thinkificCourse:
    "https://icodeit.thinkific.com/courses/frontend-system-design-essentials",
  thoughtworks: "https://www.thoughtworks.com/profiles/j/juntao-qiu",
  martinFowler: {
    dataFetch: "https://martinfowler.com/articles/data-fetch-spa.html",
    modularReact: "https://martinfowler.com/articles/modularizing-react-apps.html",
    codemods: "https://martinfowler.com/articles/codemods-api-refactoring.html",
  },
  reactAntiPatterns:
    "https://www.packtpub.com/en-us/product/react-anti-patterns-9781805123972?type=print",
  tddReact: "https://link.springer.com/book/10.1007/978-1-4842-6972-5",
} as const;

const MAIN_HUBS = [
  {
    title: "Posts",
    description: "Articles on patterns, interviews, and frontend craft.",
    href: `${ICODEIT_MAIN}/posts`,
  },
  {
    title: "Tutorials",
    description: "Step-by-step guides and deeper dives.",
    href: `${ICODEIT_MAIN}/tutorials`,
  },
  {
    title: "Books",
    description: "FSD Essentials, React Anti-Patterns, TDD with React & TypeScript, and more.",
    href: `${ICODEIT_MAIN}/books`,
  },
  {
    title: "Courses",
    description: "Structured learning paths alongside the free material.",
    href: `${ICODEIT_MAIN}/courses`,
  },
] as const;

const FOWLER_ARTICLES = [
  {
    href: EXTERNAL.martinFowler.dataFetch,
    title: "Data Fetching Patterns in Single-Page Applications",
    blurb: "Async state, parallel fetching, fallbacks, prefetching — with trade-offs spelled out.",
  },
  {
    href: EXTERNAL.martinFowler.modularReact,
    title: "Modularizing React Applications with Established UI Patterns",
    blurb: "Layering and proven UI architecture applied to real React codebases.",
  },
  {
    href: EXTERNAL.martinFowler.codemods,
    title: "Refactoring with Codemods to Automate API Changes",
    blurb: "Large-scale API migrations with jscodeshift and disciplined refactors.",
  },
] as const;

const cardSurface =
  "group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white/95 to-slate-50/90 p-5 shadow-sm shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.03] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-palette-azure/35 hover:shadow-md dark:border-slate-600/55 dark:from-slate-900/80 dark:to-slate-950/90 dark:shadow-none dark:ring-white/[0.04] dark:hover:border-palette-azure/40";

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`font-medium text-brand underline-offset-2 hover:underline ${className}`}
    >
      {children}
    </a>
  );
}

export const metadata: Metadata = {
  title: "About",
  description:
    "Juntao Qiu — software engineer, author, and educator. Thoughtworks and Atlassian alum; now a solo builder focused on frontend system design and scalable apps in the AI era.",
  openGraph: {
    title: "About Juntao Qiu",
    description:
      "Background, writing, books, and teaching — frontend system design, React, and scalable UIs.",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <CourseScrollReveal id="about-story" className={ui.courseSectionY}>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:items-start">
          <div>
            <p className={ui.courseEyebrow}>Story</p>
            <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
              From consulting to product to solo work
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-slate-600 dark:text-slate-400">
              A short arc of where I&apos;ve built software — and what stayed
              constant across teams and stacks.
            </p>
          </div>
          <div className="space-y-6 text-pretty text-slate-700 dark:text-slate-200">
            <p>
              I have worked as a professional software engineer since{" "}
              <strong className="font-semibold text-slate-900 dark:text-slate-50">
                2008
              </strong>
              . For many years I was at{" "}
              <ExternalLink href={EXTERNAL.thoughtworks}>
                Thoughtworks
              </ExternalLink>
              , where consulting meant shipping across many clients and
              constraints — REA, Domino&apos;s, NAB, MYOB, Huawei, and others.
              Different domains, same lesson: features only stay healthy inside
              a coherent model of data, UI, and change.
            </p>
            <p>
              From{" "}
              <strong className="font-semibold text-slate-900 dark:text-slate-50">
                2023
              </strong>{" "}
              until recently I worked at{" "}
              <strong className="font-semibold text-slate-900 dark:text-slate-50">
                Atlassian
              </strong>
              . I&apos;m now a{" "}
              <strong className="font-semibold text-slate-900 dark:text-slate-50">
                solo builder
              </strong>
              , focused on frontend system design and scalable applications in
              the AI era.
            </p>
          </div>
        </div>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <p className={ui.courseEyebrow}>Focus</p>
        <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
          What I optimize for
        </h2>
        <p className="mt-5 max-w-3xl text-pretty text-slate-600 dark:text-slate-300">
          Clean frontend architecture, performance users feel, and patterns for
          fetching, caching, mutation, and realtime updates that survive product
          growth — including when AI-assisted workflows touch your UI, data
          layer, and review process. I write and teach so more people can name
          trade-offs with confidence, not just ship the next screen.
        </p>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <div className="space-y-10">
          <div>
            <p className={ui.courseEyebrow}>I Code It hub</p>
            <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
              More work on the main site
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-slate-600 dark:text-slate-400">
              Longer articles, tutorials, book pages, and course listings live on{" "}
              <ExternalLink href={`${ICODEIT_MAIN}/`}>icodeit.com.au</ExternalLink>{" "}
              — this frontend subsite is where deep case studies and patterns
              ship next to the course.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {MAIN_HUBS.map((hub) => (
              <li key={hub.href}>
                <a
                  href={hub.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cardSurface}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                      {hub.title}
                    </span>
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-palette-azure"
                      aria-hidden
                    />
                  </span>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {hub.description}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <div className="space-y-10">
          <div>
            <p className={ui.courseEyebrow}>Long-form</p>
            <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
              Writing on martinfowler.com
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-slate-600 dark:text-slate-400">
              In-depth pieces hosted on{" "}
              <ExternalLink href="https://martinfowler.com/">
                Martin Fowler&apos;s site
              </ExternalLink>
              :
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {FOWLER_ARTICLES.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cardSurface}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-heading text-base font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-50">
                      {a.title}
                    </span>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-slate-400 group-hover:text-palette-azure"
                      aria-hidden
                    />
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {a.blurb}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <div className="space-y-10">
          <div>
            <p className={ui.courseEyebrow}>Books</p>
            <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
              Publishers &amp; languages
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className={cardSurface}>
              <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                English (trad)
              </h3>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                <li>
                  <ExternalLink href={EXTERNAL.reactAntiPatterns}>
                    React Anti-Patterns
                  </ExternalLink>{" "}
                  <span className="text-slate-500 dark:text-slate-500">
                    (Packt, 2024)
                  </span>
                </li>
                <li>
                  <ExternalLink href={EXTERNAL.tddReact}>
                    Test-Driven Development with React
                  </ExternalLink>{" "}
                  <span className="text-slate-500 dark:text-slate-500">
                    (Apress, 2021)
                  </span>
                </li>
              </ul>
            </div>
            <div className={cardSurface}>
              <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Leanpub &amp; digital
              </h3>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                More titles on maintainable React, frontend system design, and
                data fetching —{" "}
                <ExternalLink href={EXTERNAL.leanpub}>Leanpub catalog</ExternalLink>
                .
              </p>
            </div>
            <div className={cardSurface}>
              <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Chinese
              </h3>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Posts &amp; Telecom Press (人民邮电出版社)
              </p>
              <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-200">
                <li>
                  《JavaScript核心概念及实践》
                  <span className="text-slate-500"> (2013)</span>
                </li>
                <li>
                  《轻量级Web应用开发》
                  <span className="text-slate-500"> (2015)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50/95 to-white/90 p-8 shadow-sm dark:border-slate-600/50 dark:from-slate-900/70 dark:to-slate-950/90 sm:p-10 md:p-12">
          <p className={ui.courseEyebrow}>Video &amp; course</p>
          <h2 className={`mt-3 max-w-2xl ${ui.courseSectionTitle}`}>
            Learn in public — then go deep
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-slate-600 dark:text-slate-300">
            On{" "}
            <ExternalLink href={EXTERNAL.youtube}>
              YouTube (@icodeit.juntao)
            </ExternalLink>{" "}
            —{" "}
            <strong className="font-semibold text-slate-900 dark:text-slate-50">
              11k+ subscribers
            </strong>{" "}
            — I share refactoring, clean code, and frontend technique in
            shorter form. For a guided path with projects and a capstone, start
            from{" "}
            <ExternalLink href={EXTERNAL.thinkificCourse}>
              Frontend System Design Essentials
            </ExternalLink>{" "}
            on Thinkific or the{" "}
            <Link
              href={routes.courseFrontendSystemDesignEssentials}
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              course overview on this site
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={EXTERNAL.youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              YouTube
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={EXTERNAL.thinkificCourse}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/90 px-6 py-3 text-sm font-semibold text-slate-800 dark:border-slate-500/80 dark:text-slate-100"
            >
              Enroll on Thinkific
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </CourseScrollReveal>

      <CourseScrollReveal className={`${ui.courseSectionY} pb-8`}>
        <p className={ui.courseEyebrow}>This subsite</p>
        <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
          Case studies &amp; patterns
        </h2>
        <p className="mt-5 max-w-3xl text-pretty text-slate-600 dark:text-slate-300">
          Runnable walkthroughs for how senior frontend engineers think about
          data, APIs, performance, and production concerns — browse{" "}
          <Link className={ui.ctaLink} href={routes.caseStudiesIndex}>
            case studies
          </Link>
          ,{" "}
          <Link className={ui.ctaLink} href={routes.patternsIndex}>
            patterns
          </Link>
          , and{" "}
          <Link className={ui.ctaLink} href={routes.learningPaths}>
            learning paths
          </Link>{" "}
          as the roadmap grows.
        </p>
      </CourseScrollReveal>
    </>
  );
}
