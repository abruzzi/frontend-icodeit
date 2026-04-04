"use client";

import { Check, Copy } from "lucide-react";
import {
  type ReactElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { mdxHastClassString } from "./mdx-hast-classname";

const LINE_HEIGHT_EM = 1.65;
const CODE_FONT_REM = 0.875;

function findCodeElement(node: unknown): ReactElement | null {
  if (!node || typeof node !== "object") return null;
  const props = (node as ReactElement).props as
    | { children?: unknown }
    | undefined;
  if (!props?.children) return null;
  const { children } = props;
  if (Array.isArray(children)) {
    for (const c of children) {
      if (c && typeof c === "object" && (c as ReactElement).type === "code") {
        return c as ReactElement;
      }
    }
  }
  if (
    children &&
    typeof children === "object" &&
    (children as ReactElement).type === "code"
  ) {
    return children as ReactElement;
  }
  return null;
}

function languageIdFromFenceClass(className: unknown): string {
  if (typeof className !== "string") return "code";
  const m = className.match(/\blanguage-([\w-]+)\b/);
  return m?.[1] ?? "code";
}

const LANG_LABEL: Record<string, string> = {
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  jsonc: "JSONC",
  jsx: "JSX",
  markdown: "Markdown",
  md: "Markdown",
  mdx: "MDX",
  shell: "Shell",
  text: "Text",
  ts: "TypeScript",
  tsx: "TSX",
  typescript: "TypeScript",
  yaml: "YAML",
  yml: "YAML",
};

function formatLangLabel(id: string): string {
  return LANG_LABEL[id] ?? id.replace(/-/g, " ").toUpperCase();
}

type ShikiCodeBlockShellProps = {
  children: ReactElement<React.ComponentProps<"pre">>;
  /** When true, top border/radius connect to a parent `<summary>` (collapsible JSON). */
  nestedInDetails?: boolean;
};

/**
 * Toolbar (language + copy), line-number gutter, and scroll container for Shiki `<pre>`.
 */
export function ShikiCodeBlockShell({
  children,
  nestedInDetails = false,
}: ShikiCodeBlockShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const codeEl = findCodeElement(children);
  const langId = languageIdFromFenceClass(
    mdxHastClassString(
      codeEl?.props as { className?: unknown; class?: unknown },
    ),
  );
  const label = formatLangLabel(langId);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pre = root.querySelector("pre.shiki");
    if (!pre) return;
    const n = pre.querySelectorAll(":scope > code .line").length;
    setLineCount(n);
  }, [children]);

  const copy = useCallback(async () => {
    const pre = rootRef.current?.querySelector("pre.shiki");
    const text = pre?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  const shellRound = nestedInDetails
    ? "rounded-b-xl rounded-t-none border-t-0"
    : "rounded-xl";

  const headerRound = nestedInDetails ? "rounded-t-none" : "rounded-t-xl";

  return (
    <div
      ref={rootRef}
      className={`shiki-code-root not-prose bg-transparent ${
        nestedInDetails
          ? "border-0"
          : "border border-slate-200/70 dark:border-slate-600/45"
      } ${shellRound}`}
    >
      <div
        className={`flex items-center justify-between gap-3 border-b border-slate-200/60 bg-transparent px-3 py-2 dark:border-slate-600/40 ${headerRound}`}
      >
        <span className="notranslate rounded-md bg-white/55 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wide text-slate-700 shadow-sm shadow-slate-900/[0.06] backdrop-blur-sm dark:bg-slate-900/35 dark:text-slate-200 dark:shadow-none">
          {label}
        </span>
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-200/50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/45 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-slate-100"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="size-4 text-palette-jade" strokeWidth={2.25} />
          ) : (
            <Copy className="size-4" strokeWidth={2} />
          )}
        </button>
      </div>
      <div className="flex min-w-0">
        <div
          className="shiki-line-gutter shrink-0 select-none border-r border-slate-200/55 bg-transparent py-4 pl-3 pr-2 text-right font-mono text-[0.75rem] leading-[1.65] text-slate-400 tabular-nums dark:border-slate-600/35 dark:text-slate-500"
          style={{ fontSize: `${CODE_FONT_REM}rem`, lineHeight: LINE_HEIGHT_EM }}
          aria-hidden
        >
          {lineCount > 0
            ? Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  style={{
                    minHeight: `${LINE_HEIGHT_EM}em`,
                    lineHeight: LINE_HEIGHT_EM,
                  }}
                >
                  {i + 1}
                </div>
              ))
            : null}
        </div>
        <div className="min-w-0 flex-1 overflow-x-auto">{children}</div>
      </div>
    </div>
  );
}
