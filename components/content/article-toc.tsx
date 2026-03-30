"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { TocHeading } from "@/lib/content/toc-headings";

type Props = {
  headings: TocHeading[];
  /** Current doc path, e.g. `/case-studies/board-application` (no hash). */
  documentPath: string;
};

const headingsFilter = (h: TocHeading): h is TocHeading => Boolean(h.text && h.slug);

const ACTIVE_TOP_OFFSET = 120;
const EXPAND_DELAY_MS = 500;
const COLLAPSE_DELAY_MS = 220;

/**
 * “On this page” rail + labels (similar feel to icodeit-next), but positioned
 * as a right-side floating panel so it never shrinks the prose column.
 */
export function ArticleToc({ headings, documentPath }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const list = useMemo(() => headings.filter(headingsFilter), [headings]);

  useEffect(() => {
    if (list.length === 0) return;

    const updateActive = () => {
      let current: string | null = null;
      for (const h of list) {
        const el = document.getElementById(h.slug);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= ACTIVE_TOP_OFFSET) current = h.slug;
      }
      setActiveSlug(current ?? list[0].slug);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [list]);

  const clearExpandTimeout = () => {
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }
  };
  const clearCollapseTimeout = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCollapseTimeout();
    expandTimeoutRef.current = setTimeout(() => setIsExpanded(true), EXPAND_DELAY_MS);
  };
  const handleMouseLeave = () => {
    clearExpandTimeout();
    collapseTimeoutRef.current = setTimeout(() => setIsExpanded(false), COLLAPSE_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      clearExpandTimeout();
      clearCollapseTimeout();
    };
  }, []);

  if (list.length === 0) return null;

  const hashHref = (slug: string) => `${documentPath}#${slug}`;

  return (
    <nav
      className={[
        // Only show on desktop where we have a right gutter.
        // `max-w-4xl` = 56rem => half is 28rem; place the TOC just after the centered prose.
        "hidden xl:block xl:fixed xl:top-24 xl:left-[calc(50%+28rem+0.75rem)] xl:right-auto",
        "z-30 pointer-events-auto max-h-[calc(100dvh-6.5rem)] overflow-y-auto py-2",
      ].join(" ")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="On this page"
    >
      <div className="flex items-stretch overflow-hidden transition-all duration-200 ease-out">
        <div className="flex shrink-0 flex-col justify-center py-3 pl-0.5">
          {list.map((heading) => {
            const isActive = activeSlug === heading.slug;
            return (
              <a
                key={heading.slug}
                href={hashHref(heading.slug)}
                className="group/rail flex items-center gap-2 py-1"
                title={heading.text}
              >
                <span
                  className={[
                    "h-1 shrink-0 rounded-full transition-all duration-200",
                    isExpanded ? "w-2.5" : "w-4",
                    isActive
                      ? "w-5 bg-brand opacity-100"
                      : "bg-slate-300 opacity-70 group-hover/rail:opacity-100 dark:bg-slate-600",
                  ].join(" ")}
                />
              </a>
            );
          })}
        </div>

        <div
          className={[
            "min-w-[9.5rem] max-w-[10.5rem] transition-opacity duration-200",
            isExpanded
              ? "py-3 pl-3 pr-3 opacity-100"
              : "pointer-events-none py-0 pl-0 pr-0 opacity-0",
          ].join(" ")}
        >
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand">
            On this page
          </h3>
          <div className="flex flex-col gap-0.5">
            {list.map((heading) => {
              const isActive = activeSlug === heading.slug;
              return (
                <a
                  key={heading.slug}
                  href={hashHref(heading.slug)}
                  className={[
                    "-mx-1 rounded border-l-2 px-1 py-0.5 pl-2.5 text-xs font-light transition-colors duration-200",
                    heading.level === "two" ? "pl-3" : "",
                    isActive
                      ? "border-brand text-slate-900 dark:text-slate-100"
                      : "border-transparent text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-300",
                  ].join(" ")}
                  data-level={heading.level}
                >
                  {heading.text}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

