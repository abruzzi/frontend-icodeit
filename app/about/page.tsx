import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AboutHero } from "@/components/about/about-hero";
import { CourseScrollReveal } from "@/components/courses/course-scroll-reveal";
import {
  fsdeFeaturedTestimonial,
  fsdeMarqueeTestimonials,
} from "@/lib/courses/fsde-landing-data";
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
    description:
      "Longer essays and interviews — the stuff I’d put in a letter to a friend who builds UIs.",
    href: `${ICODEIT_MAIN}/posts`,
  },
  {
    title: "Tutorials",
    description: "Hands-on walkthroughs when you want steps, not slogans.",
    href: `${ICODEIT_MAIN}/tutorials`,
  },
  {
    title: "Books",
    description:
      "FSD Essentials, React Anti-Patterns, TDD with React & TypeScript, and more.",
    href: `${ICODEIT_MAIN}/books`,
  },
  {
    title: "Courses",
    description: "Structured paths when you’re ready to go deeper than a single post.",
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

const BELIEFS = [
  {
    title: "Concrete, step by step",
    body: "I learn and teach through runnable examples and small iterations — something you can run, change, and break — not big-bang theory. Each pass should make the next step easier.",
  },
  {
    title: "Explorable, with a clear “why”",
    body: "I’m investing in interactive, explorable formats — learning you move through, not only read. Along the way I always want the purpose visible: why tests, why normalization, why a boundary — so nothing feels like empty ritual.",
  },
  {
    title: "Maps and patterns that last",
    body: "Principles and patterns outlast any one language or framework. I care about keeping a mental map in mind — where you are, what’s next — instead of a pile of disconnected tricks.",
  },
] as const;

const HATS = [
  {
    title: "Educator",
    subtitle: "Courses · YouTube · writing",
    body: "I unpack frontend system design the way I wish someone had done for me — with runnable examples and honest trade-offs.",
  },
  {
    title: "Engineer",
    subtitle: "React · data · performance",
    body: "Shipping UIs that stay coherent when APIs, teams, and requirements move underneath you.",
  },
  {
    title: "Solo builder",
    subtitle: "I Code It",
    body: "Building curriculum, tools, and this site — so the teaching and the product stay in sync.",
  },
] as const;

const EXPERIENCE_ROWS = [
  {
    org: "Thoughtworks",
    detail:
      "Consultant — delivery across REA, Domino’s, NAB, MYOB, Huawei, and more. Same lesson everywhere: the UI fails when the mental model and the data model disagree.",
    period: "2012 - 2023",
  },
  {
    org: "Atlassian",
    detail:
      "Product engineering at scale — depth after years of consulting context switches.",
    period: "2023 – recently",
  },
  {
    org: "I Code It",
    detail:
      "Solo — frontend system design, teaching, and tools for the AI-shaped era.",
    period: "Now",
  },
] as const;

const FOCUS_POINTS = [
  "A reusable framework for frontend work — how you slice data, APIs, rendering, and production concerns — so the next feature isn’t a blank page. That includes the messy middle: normalization, fetching, caching, pagination, realtime, performance users feel, and basics like security and accessibility when they matter.",
  "A thinking mindset for trade-offs — what to optimize, what to defer, and how to say it out loud — so interviews and real roadmaps feel less like guesswork.",
  "Grounding in fundamentals and patterns that outlast the hype cycle — so you’re not treating every new stack drop as a full reset. The tools change fast; the underlying questions change more slowly.",
] as const;

const TRUST_LINKS = [
  { label: "Thoughtworks", href: EXTERNAL.thoughtworks },
  { label: "martinfowler.com", href: "https://martinfowler.com/" },
  { label: "Packt", href: EXTERNAL.reactAntiPatterns },
  { label: "Apress", href: EXTERNAL.tddReact },
] as const;

const cardSurface =
  "group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white/95 to-slate-50/90 p-5 shadow-sm shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.03] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-palette-azure/35 hover:shadow-md dark:border-slate-600/55 dark:from-slate-900/80 dark:to-slate-950/90 dark:shadow-none dark:ring-white/[0.04] dark:hover:border-palette-azure/40";

const voiceCards = fsdeMarqueeTestimonials.slice(0, 3);

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
    "Juntao — Engineer, Educator, Creator. Helping developers design and build software by breaking complexity into structure, with intention — even when AI is involved.",
  openGraph: {
    title: "About Juntao Qiu",
    description:
      "Engineer, Educator, Creator. Helping developers design and build software — structure, intention, and practical frontend depth on I Code It.",
    type: "profile",
  },
};

export default function AboutPage() {
  const featured = fsdeFeaturedTestimonial;

  return (
    <>
      <AboutHero />

      {/* Light “logo row” — text trust strip (swap for logo marks when you have assets) */}
      <CourseScrollReveal className="border-y border-slate-200/80 py-10 dark:border-slate-700/50">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Also published &amp; cited across
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
          {TRUST_LINKS.map((t) => (
            <li key={t.href}>
              <ExternalLink
                href={t.href}
                className="text-slate-600 decoration-slate-400/60 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                {t.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </CourseScrollReveal>

      {/* <CourseScrollReveal id="about-quote" className={ui.courseSectionY}>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="font-serif text-2xl font-medium leading-snug tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl md:text-[1.65rem] md:leading-snug lg:text-4xl lg:leading-tight">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            {featured.avatarSrc ? (
              <Image
                src={featured.avatarSrc}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover ring-2 ring-slate-200/80 dark:ring-slate-600/80"
              />
            ) : null}
            <div className="text-center sm:text-left">
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                {featured.name}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {featured.role}
              </p>
            </div>
          </figcaption>
        </figure>
      </CourseScrollReveal> */}

      <CourseScrollReveal className={ui.courseSectionY}>
        <p className={ui.courseEyebrow}>Hats</p>
        <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
          How I show up day to day
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-lg text-slate-600 dark:text-slate-400">
          One person — a few modes. Same thread: make complex frontend work feel
          legible.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {HATS.map((h) => (
            <li
              key={h.title}
              className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-sm dark:border-slate-600/55 dark:bg-slate-900/70"
            >
              <div className="h-1.5 bg-gradient-to-r from-palette-azure to-palette-magenta opacity-90" />
              <div className="p-5 sm:p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-slate-50">
                  {h.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-palette-azure dark:text-palette-azure">
                  {h.subtitle}
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  {h.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CourseScrollReveal>

      <CourseScrollReveal id="about-story" className={ui.courseSectionY}>
        <p className={ui.courseEyebrow}>Experience</p>
        <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
          Where I&apos;ve built
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-lg text-slate-600 dark:text-slate-400">
          A thin résumé strip — the story lives in the teaching. Swap in exact
          dates anytime you want them on the record.
        </p>
        <div className="mt-10 divide-y divide-slate-200/90 dark:divide-slate-600/60">
          {EXPERIENCE_ROWS.map((row) => (
            <div
              key={row.org}
              className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[minmax(0,10rem)_1fr_auto] sm:items-start sm:gap-6"
            >
              <p className="font-heading text-base font-bold text-slate-900 dark:text-slate-50">
                {row.org}
              </p>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {row.detail}
              </p>
              <p className="shrink-0 text-sm font-medium tabular-nums text-slate-500 dark:text-slate-400 sm:text-right">
                {row.period}
              </p>
            </div>
          ))}
        </div>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <p className={ui.courseEyebrow}>Voices</p>
        <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
          What people say in the wild
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-lg text-slate-600 dark:text-slate-400">
          Short notes from YouTube and the course — the kind of feedback that
          keeps me recording.
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:items-stretch">
          {voiceCards.map((v) => (
            <li key={v.id} className={`${cardSurface} min-h-0`}>
              <p className="min-h-0 flex-1 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                &ldquo;{v.quote}&rdquo;
              </p>
              <div className="mt-6 shrink-0 border-t border-slate-200/80 pt-4 dark:border-slate-600/50">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {v.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {v.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/90 p-8 dark:border-slate-600/50 dark:bg-slate-900/40 sm:p-10 lg:p-12">
          <p className={ui.courseEyebrow}>Philosophy</p>
          <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
            Why work with my material?
          </h2>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Values
              </h3>
              <ul className="mt-5 space-y-5">
                {BELIEFS.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-palette-azure/15 text-palette-azure dark:bg-palette-azure/25">
                      <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                    </span>
                    <div>
                      <p className="font-heading font-bold text-slate-900 dark:text-slate-50">
                        {b.title}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        {b.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                What you get
              </h3>
              <ul className="mt-5 space-y-4">
                {FOCUS_POINTS.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-palette-magenta/80"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CourseScrollReveal>

      <CourseScrollReveal className={ui.courseSectionY}>
        <div className="space-y-10">
          <div>
            <p className={ui.courseEyebrow}>I Code It hub</p>
            <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
              More on the main site
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              <ExternalLink href={`${ICODEIT_MAIN}/`}>icodeit.com.au</ExternalLink>{" "}
              is still home for posts, tutorials, books, and course listings.
              This frontend subsite is the workshop next door — case studies and
              patterns where the demos need room to breathe.
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
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Room to stretch out — whole arguments, not just takeaway bullets.
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
              In print &amp; digital
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-slate-600 dark:text-slate-400">
              English-language titles I point people to first — plus everything
              on Leanpub.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className={cardSurface}>
              <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Traditional publishers
              </h3>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                <li>
                  <ExternalLink href={EXTERNAL.reactAntiPatterns}>
                    React Anti-Patterns
                  </ExternalLink>{" "}
                  <span className="text-slate-500">(Packt, 2024)</span>
                </li>
                <li>
                  <ExternalLink href={EXTERNAL.tddReact}>
                    Test-Driven Development with React
                  </ExternalLink>{" "}
                  <span className="text-slate-500">(Apress, 2021)</span>
                </li>
              </ul>
            </div>
            <div className={cardSurface}>
              <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Leanpub &amp; self-published
              </h3>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Maintainable React, frontend system design, advanced data
                fetching — browse the full{" "}
                <ExternalLink href={EXTERNAL.leanpub}>Leanpub catalog</ExternalLink>
                .
              </p>
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
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            On{" "}
            <ExternalLink href={EXTERNAL.youtube}>
              YouTube (@icodeit.juntao)
            </ExternalLink>{" "}
            —{" "}
            <strong className="font-semibold text-slate-900 dark:text-slate-50">
              11k+ subscribers
            </strong>{" "}
            — I share refactoring, clean code, and frontend technique in shorter
            form. For a guided path with projects and a capstone, start from{" "}
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

      <CourseScrollReveal className={`${ui.courseSectionY} pb-10`}>
        <p className={ui.courseEyebrow}>This subsite</p>
        <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
          Case studies &amp; patterns
        </h2>
        <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-slate-600 dark:text-slate-300">
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
        <p className="mt-6 max-w-3xl text-pretty text-lg text-slate-600 dark:text-slate-400">
          Thanks for stopping by — if something here helped you ship calmer
          code, that&apos;s the whole point.
        </p>
      </CourseScrollReveal>
    </>
  );
}
