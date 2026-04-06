import { Children, type ReactElement, type ReactNode, isValidElement } from "react";

import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

import { highlightCodeForRestfulPanel } from "@/lib/content/shiki-icodeit-highlighter";

/** Soft tinted pills — readable on light panel and in dark mode. */
const METHOD_STYLES: Record<string, { pill: string }> = {
  GET: {
    pill:
      "border border-emerald-500/45 bg-emerald-500/[0.12] text-emerald-900 shadow-sm shadow-emerald-900/[0.04] dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-100 dark:shadow-none",
  },
  POST: {
    pill:
      "border border-sky-500/45 bg-sky-500/[0.12] text-sky-900 shadow-sm shadow-sky-900/[0.04] dark:border-sky-400/40 dark:bg-sky-500/15 dark:text-sky-100 dark:shadow-none",
  },
  PUT: {
    pill:
      "border border-amber-500/45 bg-amber-500/[0.12] text-amber-950 shadow-sm shadow-amber-900/[0.04] dark:border-amber-400/40 dark:bg-amber-500/15 dark:text-amber-100 dark:shadow-none",
  },
  PATCH: {
    pill:
      "border border-violet-500/45 bg-violet-500/[0.12] text-violet-900 shadow-sm shadow-violet-900/[0.04] dark:border-violet-400/40 dark:bg-violet-500/15 dark:text-violet-100 dark:shadow-none",
  },
  DELETE: {
    pill:
      "border border-rose-500/45 bg-rose-500/[0.12] text-rose-900 shadow-sm shadow-rose-900/[0.04] dark:border-rose-400/40 dark:bg-rose-500/15 dark:text-rose-100 dark:shadow-none",
  },
  HEAD: {
    pill:
      "border border-slate-400/50 bg-slate-500/[0.1] text-slate-800 shadow-sm dark:border-slate-500/45 dark:bg-slate-500/15 dark:text-slate-100 dark:shadow-none",
  },
  OPTIONS: {
    pill:
      "border border-slate-400/50 bg-slate-500/[0.1] text-slate-800 shadow-sm dark:border-slate-500/45 dark:bg-slate-500/15 dark:text-slate-100 dark:shadow-none",
  },
};

const DEFAULT_METHOD_STYLE = {
  pill:
    "border border-slate-400/50 bg-slate-500/[0.1] text-slate-800 shadow-sm dark:border-slate-500/45 dark:bg-slate-500/15 dark:text-slate-100 dark:shadow-none",
};

const ENDPOINT_RE =
  /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(\S.*)$/i;

function parseEndpoint(endpoint: string): { method: string; path: string } {
  const trimmed = endpoint.trim();
  const m = trimmed.match(ENDPOINT_RE);
  if (!m) {
    return { method: "GET", path: trimmed || "/" };
  }
  return { method: m[1].toUpperCase(), path: m[2].trim() };
}

function collectText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(collectText).join("");
  }
  if (isValidElement(node)) {
    return collectText(node.props.children);
  }
  return "";
}

function classNameString(props: { className?: unknown; class?: unknown }): string {
  const a = props.className;
  const b = props.class;
  return [typeof a === "string" ? a : "", typeof b === "string" ? b : ""].join(" ");
}

/** Prefer `<pre>` / `language-*` `<code>` so we skip summary labels from collapsible JSON. */
function extractFenceSource(node: ReactNode): string | null {
  for (const c of Children.toArray(node)) {
    if (!isValidElement(c)) continue;
    const el = c as ReactElement<{ children?: ReactNode; className?: unknown; class?: unknown }>;

    if (el.type === "pre") {
      return collectText(el.props.children).trim();
    }
    if (el.type === "code") {
      const cn = classNameString(el.props);
      if (/\blanguage-[\w-]+\b/.test(cn)) {
        return collectText(el.props.children).trim();
      }
    }
    const inner = extractFenceSource(el.props.children);
    if (inner) return inner;
  }
  return null;
}

function detectFenceLang(node: ReactNode): "json" | "jsonc" {
  for (const c of Children.toArray(node)) {
    if (!isValidElement(c)) continue;
    const el = c as ReactElement<{ children?: ReactNode; className?: unknown; class?: unknown }>;
    const cn = classNameString(el.props);
    if (/\blanguage-jsonc\b/.test(cn)) return "jsonc";
    if (/\blanguage-json\b/.test(cn)) return "json";
    const inner = detectFenceLang(el.props.children);
    if (inner === "jsonc") return "jsonc";
  }
  return "json";
}

function formatJsonBlock(raw: string): { ok: true; text: string } | { ok: false; text: string; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: true, text: "" };
  }
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    return { ok: true, text: JSON.stringify(parsed, null, 2) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    return { ok: false, text: trimmed, error: msg };
  }
}

function PathWithParams({ path }: { path: string }) {
  const parts = path.split(/(:[a-zA-Z_][a-zA-Z0-9_]*)/g);
  return (
    <span className="break-all font-mono text-[0.8125rem] leading-snug text-slate-800 dark:text-slate-100 sm:text-sm">
      {parts.map((seg, i) =>
        seg.startsWith(":") ? (
          <span
            key={i}
            className="mx-px rounded-md bg-rose-500/15 px-1.5 py-0.5 font-medium text-rose-800 ring-1 ring-rose-400/35 dark:bg-rose-500/25 dark:text-pink-200 dark:ring-rose-400/30"
          >
            {seg}
          </span>
        ) : (
          <span key={i}>{seg}</span>
        ),
      )}
    </span>
  );
}

function statusReasonPhrase(code: number): string {
  const map: Record<number, string> = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
  };
  return map[code] ?? "";
}

/** Wrapper for Shiki `codeToHtml` output — same transparency idea as prose fences. */
function RestfulHighlightedHtml({ html }: { html: string }) {
  return (
    <div
      className="mdx-restful-endpoint max-h-[min(28rem,55vh)] overflow-auto rounded-xl border border-slate-200/90 bg-transparent dark:border-slate-600/50 [&_pre.shiki]:m-0 [&_pre.shiki]:min-h-0 [&_pre.shiki]:rounded-none [&_pre.shiki]:border-0 [&_pre.shiki]:bg-transparent [&_pre.shiki]:p-3.5 sm:[&_pre.shiki]:p-4 [&_pre.shiki]:text-[0.8125rem] [&_pre.shiki]:leading-relaxed"
      // Trusted: produced by our Shiki highlighter from MDX/author JSON only.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

type RestfulProps = {
  endpoint: string;
  children?: ReactNode;
  /** One line under the path (optional). */
  description?: string;
  className?: string;
};

/**
 * API reference-style block for MDX: method + path header, then optional
 * `<Request>` / `<Response>` sections.
 *
 * Put JSON in an **indented** fenced block under `<Request>` / `<Response>` (e.g. `json show`).
 * Nested fences are not reliably highlighted by the MDX rehype pass; these components re-run Shiki
 * server-side on the extracted source so tokens always render.
 */
export function Restful({
  endpoint,
  children,
  description,
  className = "",
}: RestfulProps) {
  const { method, path } = parseEndpoint(endpoint);
  const ms = METHOD_STYLES[method] ?? DEFAULT_METHOD_STYLE;

  return (
    <section
      className={[
        "mdx-restful-endpoint not-prose my-8 rounded-2xl border border-slate-200/90 bg-white/60 shadow-sm shadow-slate-900/[0.04] backdrop-blur-sm dark:border-slate-600/50 dark:bg-slate-900/35 dark:shadow-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`HTTP ${method} ${path}`}
    >
      <div className="border-b border-slate-200/80 px-4 py-3.5 dark:border-slate-600/45 sm:px-5 sm:py-4">
        <div className="flex flex-wrap items-center gap-2.5 gap-y-2">
          <span
            className={[
              "inline-flex shrink-0 items-center rounded-md px-2.5 py-0.5 font-mono text-[0.7rem] font-bold uppercase tracking-wider",
              ms.pill,
            ].join(" ")}
          >
            {method}
          </span>
          <PathWithParams path={path} />
        </div>
        {description ? (
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {description}
          </p>
        ) : null}
      </div>
      {children ? (
        <div className="divide-y divide-slate-200/80 dark:divide-slate-600/45">{children}</div>
      ) : null}
    </section>
  );
}

type RestfulRequestProps = {
  children?: ReactNode;
  label?: string;
  json?: unknown;
};

export async function RestfulRequest({
  children,
  label = "Request",
  json,
}: RestfulRequestProps) {
  let source = "";
  let lang: "json" | "jsonc" = "json";

  if (json !== undefined) {
    source = JSON.stringify(json, null, 2);
  } else {
    const fromFence = extractFenceSource(children);
    source = (fromFence ?? collectText(children)).trim();
    lang = detectFenceLang(children);
  }

  if (!source) return null;

  let html: string;
  if (lang === "jsonc") {
    html = await highlightCodeForRestfulPanel(source, "jsonc");
  } else {
    const formatted = formatJsonBlock(source);
    if (!formatted.ok) {
      return (
        <div className="px-4 py-4 sm:px-5 sm:py-5">
          <div className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <ArrowUpFromLine className="size-3.5 shrink-0 opacity-90" aria-hidden />
            <span>{label}</span>
          </div>
          <JsonParseErrorPanel error={formatted.error} raw={formatted.text} />
        </div>
      );
    }
    html = await highlightCodeForRestfulPanel(formatted.text, "json");
  }

  return (
    <div className="px-4 py-4 sm:px-5 sm:py-5">
      <div className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <ArrowUpFromLine className="size-3.5 shrink-0 opacity-90" aria-hidden />
        <span>{label}</span>
      </div>
      <RestfulHighlightedHtml html={html} />
    </div>
  );
}

type RestfulResponseProps = {
  children?: ReactNode;
  label?: string;
  status?: number;
  statusText?: string;
  json?: unknown;
};

export async function RestfulResponse({
  children,
  label = "Response",
  status = 200,
  statusText,
  json,
}: RestfulResponseProps) {
  let source = "";
  let lang: "json" | "jsonc" = "json";

  if (json !== undefined) {
    source = JSON.stringify(json, null, 2);
  } else {
    const fromFence = extractFenceSource(children);
    source = (fromFence ?? collectText(children)).trim();
    lang = detectFenceLang(children);
  }

  const phrase = statusText ?? statusReasonPhrase(status);
  const statusLine = phrase ? `${status} ${phrase}` : String(status);

  const statusStyles =
    status >= 200 && status < 300
      ? "text-emerald-700 dark:text-emerald-400"
      : status >= 400 && status < 500
        ? "text-amber-700 dark:text-amber-400"
        : status >= 500
          ? "text-rose-700 dark:text-rose-400"
          : "text-slate-500 dark:text-slate-400";

  const header = (
    <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <ArrowDownToLine className="size-3.5 shrink-0 opacity-90" aria-hidden />
        <span>{label}</span>
      </div>
      <span
        className={[
          "font-mono text-[0.75rem] font-semibold tabular-nums tracking-tight",
          statusStyles,
        ].join(" ")}
      >
        {statusLine}
      </span>
    </div>
  );

  if (!source) {
    return (
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        {header}
        <p className="text-sm italic text-slate-500 dark:text-slate-500">No body</p>
      </div>
    );
  }

  let html: string;
  if (lang === "jsonc") {
    html = await highlightCodeForRestfulPanel(source, "jsonc");
  } else {
    const formatted = formatJsonBlock(source);
    if (!formatted.ok) {
      return (
        <div className="px-4 py-4 sm:px-5 sm:py-5">
          {header}
          <JsonParseErrorPanel error={formatted.error} raw={formatted.text} />
        </div>
      );
    }
    html = await highlightCodeForRestfulPanel(formatted.text, "json");
  }

  return (
    <div className="px-4 py-4 sm:px-5 sm:py-5">
      {header}
      <RestfulHighlightedHtml html={html} />
    </div>
  );
}

function JsonParseErrorPanel({ error, raw }: { error: string; raw: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
        Could not parse JSON — {error}
      </p>
      <pre className="max-h-[min(24rem,50vh)] overflow-auto rounded-xl border border-slate-200/90 bg-slate-50/80 p-3.5 font-mono text-[0.75rem] leading-relaxed text-slate-800 dark:border-slate-600/50 dark:bg-slate-950/30 dark:text-slate-200">
        {raw}
      </pre>
    </div>
  );
}
