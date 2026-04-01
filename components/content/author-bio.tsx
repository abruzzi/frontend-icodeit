import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { routes } from "@/lib/routes";

const MAIN_SITE = "https://www.icodeit.com.au/";

type AuthorBioProps = {
  className?: string;
};

export function AuthorBio({ className = "" }: AuthorBioProps) {
  return (
    <section
      className={[
        "not-prose my-14 sm:my-16",
        "p-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="About the author"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-6">
          <div className="size-32 shrink-0 overflow-hidden rounded-3xl sm:size-36">
            <Image
              src="/assets/juntao.qiu.avatar.webp"
              alt="Juntao Qiu"
              width={288}
              height={288}
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Hey — I’m Juntao
            </p>
            <p className="mt-1 text-base font-semibold leading-snug text-slate-900 dark:text-slate-50 sm:text-lg">
              Engineer, Educator, Creator.
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Helping developers design and build software — with intention.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              I break complexity into structure, then guide the building process so it stays practical and grounded — even when AI is involved.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={MAIN_SITE}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-900/[0.05] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-600/45 dark:bg-slate-900/35 dark:text-slate-100 dark:shadow-none dark:hover:bg-slate-900/45 dark:focus-visible:ring-offset-slate-900"
          >
            Visit icodeit.com.au
            <ArrowUpRight
              className="cta-icon-breathe h-4 w-4 shrink-0 text-palette-azure"
              strokeWidth={2.25}
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

