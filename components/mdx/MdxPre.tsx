import {
  Children,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from "react";

import { ChevronRight } from "lucide-react";

import { MDX_JSON_EXPANDED_CLASS } from "@/lib/content/shiki-transformer-mdx-json-expand";

import { mdxHastClassString } from "./mdx-hast-classname";
import { ShikiCodeBlockShell } from "./ShikiCodeBlockShell";

function findCodeElement(children: ReactNode): ReactElement | null {
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;
    if (child.type === "code") return child;
  }
  return null;
}

function isJsonLanguageClass(className: unknown): boolean {
  if (typeof className !== "string") return false;
  return /\blanguage-jsonc?\b/.test(className);
}

function isShikiPre(className: unknown): boolean {
  if (typeof className !== "string") return false;
  return /\bshiki\b/.test(className);
}

/** Set by `shikiTransformerMdxJsonExpand` when fence meta includes `expanded`, `show`, etc. */
function isJsonExpandedPre(className: unknown): boolean {
  if (typeof className !== "string") return false;
  return new RegExp(`\\b${MDX_JSON_EXPANDED_CLASS}\\b`).test(className);
}

function renderPre(
  props: ComponentPropsWithoutRef<"pre">,
): ReactElement<React.ComponentProps<"pre">> {
  const { children, className, ...rest } = props;
  return (
    <pre className={className} {...rest}>
      {children}
    </pre>
  );
}

/**
 * Shiki blocks: toolbar, line numbers, copy. JSON / JSONC: `<details>` by default; add fence meta
 * `expanded`, `expand`, `open`, `inline`, or `show` to render expanded (see `shikiTransformerMdxJsonExpand`).
 */
type MdxPreProps = ComponentPropsWithoutRef<"pre"> & { class?: string };

export function MdxPre(props: MdxPreProps) {
  const { children, className, class: classHast, ...rest } = props;
  const preClass = mdxHastClassString({ className, class: classHast });
  const codeEl = findCodeElement(children);
  const codeClass = mdxHastClassString(
    codeEl?.props as { className?: unknown; class?: unknown },
  );
  const isShiki = isShikiPre(preClass);

  if (!isShiki) {
    return (
      <pre className={preClass || undefined} {...rest}>
        {children}
      </pre>
    );
  }

  const preEl = renderPre({
    children,
    className: preClass || undefined,
    ...rest,
  });
  const isJsonFence = codeEl != null && isJsonLanguageClass(codeClass);
  const collapse = isJsonFence && !isJsonExpandedPre(preClass);

  if (collapse) {
    return (
      <details className="group/mdxjson mdx-json-details overflow-hidden rounded-xl border border-slate-200/90 dark:border-slate-600/55">
        <summary className="flex cursor-pointer list-none items-center gap-2.5 border-b border-transparent bg-transparent px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-200/35 focus-visible:ring-2 focus-visible:ring-brand/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/30 dark:focus-visible:ring-offset-slate-900 group-open/mdxjson:border-slate-200/60 dark:group-open/mdxjson:border-slate-600/40 [&::-webkit-details-marker]:hidden">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center text-palette-magenta transition-transform duration-200 group-open/mdxjson:rotate-90"
            aria-hidden
          >
            <ChevronRight size={14} strokeWidth={2.25} />
          </span>
          <span className="notranslate rounded-md bg-white/55 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wide text-slate-700 shadow-sm shadow-slate-900/[0.06] backdrop-blur-sm dark:bg-slate-900/35 dark:text-slate-200 dark:shadow-none">
            {/\blanguage-jsonc\b/.test(codeClass)
              ? "JSONC"
              : "JSON"}
          </span>
          <span>Show full JSON</span>
        </summary>
        <ShikiCodeBlockShell nestedInDetails>{preEl}</ShikiCodeBlockShell>
      </details>
    );
  }

  return <ShikiCodeBlockShell>{preEl}</ShikiCodeBlockShell>;
}
