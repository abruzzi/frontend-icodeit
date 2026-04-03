import { Linkedin, Twitter } from "lucide-react";

/** X handle embedded in prefilled share text (no @ in env — we add it). */
const SHARE_AUTHOR_X_HANDLE = "JuntaoQiu";

type Props = {
  lastEdited?: string;
  shareUrl: string;
  shareTitle: string;
};

function formatLastEdited(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-AU", { dateStyle: "medium" }).format(d);
}

/**
 * Under the intro blurb: last-edited + icon-only share links (no rule above; keep spacing tight).
 */
export function ArticleShareFooter({ lastEdited, shareUrl, shareTitle }: Props) {
  const encodedUrl = encodeURIComponent(shareUrl);
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const xTweetText = `I'm reading “${shareTitle}” by @${SHARE_AUTHOR_X_HANDLE} ${shareUrl}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xTweetText)}`;

  return (
    <div
      className={[
        "mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4",
        lastEdited ? "sm:justify-between" : "sm:justify-end",
      ].join(" ")}
    >
      {lastEdited ? (
        <p className="m-0 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-600 dark:text-slate-300">
            Last edited
          </span>{" "}
          <time dateTime={lastEdited}>{formatLastEdited(lastEdited)}</time>
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-1">
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex size-9 items-center justify-center rounded-md text-slate-500 no-underline transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
        >
          <Linkedin className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={2} aria-hidden />
        </a>
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (suggested post includes title, link, and author mention)"
          className="inline-flex size-9 items-center justify-center rounded-md text-slate-500 no-underline transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
        >
          <Twitter className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={2} aria-hidden />
        </a>
      </div>
    </div>
  );
}
