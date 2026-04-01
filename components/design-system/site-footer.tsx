import Link from "next/link";
import {
  Github,
  Linkedin,
  Rss,
  Twitter,
  Youtube,
  ArrowUpRight,
} from "lucide-react";

import { routes } from "@/lib/routes";

const MAIN_SITE = "https://www.icodeit.com.au/";
const SUBSTACK = "https://juntao.substack.com/";
const YOUTUBE = "https://www.youtube.com/@icodeit.juntao";
const GITHUB = "https://github.com/abruzzi";
const LINKEDIN = "https://www.linkedin.com/in/juntaoqiu/";
const X = "https://x.com/JuntaoQiu";

const FOOTER_LINKS = {
  explore: [
    { label: "Case studies", href: routes.caseStudiesIndex },
    { label: "Patterns", href: routes.patternsIndex },
    { label: "Learning paths", href: routes.learningPaths },
  ],
  products: [
    { label: "Course (WIP)", href: routes.courseFrontendSystemDesignEssentials },
    { label: "Books", href: `${MAIN_SITE}books`, external: true },
    { label: "Tutorials", href: `${MAIN_SITE}tutorials`, external: true },
    { label: "Posts", href: `${MAIN_SITE}posts`, external: true },
    { label: "Main site", href: MAIN_SITE, external: true },
  ],
  general: [
    { label: "RSS (coming soon)", href: "#", disabled: true },
    { label: "Contact (coming soon)", href: "#", disabled: true },
  ],
} as const;

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
};

function FooterLinkItem({ link }: { link: FooterLink }) {
  const cls =
    "inline-flex w-fit items-center gap-1.5 text-sm text-slate-300 no-underline transition-colors hover:text-slate-50";

  if (link.disabled) {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 text-sm text-slate-500">
        {link.label}
      </span>
    );
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={cls}
      >
        {link.label}
        <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-20 w-full bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-4xl px-4 pb-14 pt-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.35fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="size-16 overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element -- static local asset */}
                <img
                  src="/assets/juntao.qiu.avatar.webp"
                  alt="Juntao Qiu"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold text-slate-50">
                  Juntao Qiu
                </p>
                <p className="mt-0.5 text-sm text-slate-400">
                  Engineer, Educator, Creator
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-slate-300">
              Helping developers design and build software by breaking complexity
              into structure — and guiding the building process with intention,
              even when AI is involved.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SUBSTACK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-50 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/14"
              >
                Subscribe
                <ArrowUpRight className="cta-icon-breathe h-4 w-4 text-palette-azure" aria-hidden />
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-50"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={X}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-50"
                  aria-label="X"
                >
                  <Twitter className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={YOUTUBE}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-50"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-50"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500"
                  aria-label="RSS (coming soon)"
                >
                  <Rss className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>
          </div>

          <FooterColumn title="Explore" links={FOOTER_LINKS.explore} />
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-1">
            <FooterColumn title="Products" links={FOOTER_LINKS.products} />
            <FooterColumn title="General" links={FOOTER_LINKS.general} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} I Code It</p>
          <p className="text-slate-600">
            Built with Next.js • Patterns & case studies
          </p>
        </div>
      </div>
    </footer>
  );
}

