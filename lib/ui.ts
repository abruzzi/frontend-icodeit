/** Subtle surfaces — for home marketing cards only. */
const PANEL_SURFACE =
  "rounded-2xl border border-slate-200/90 bg-white/80 p-6 text-slate-800 shadow-sm shadow-slate-900/[0.04] sm:p-7 leading-relaxed transition-[box-shadow,border-color,background-color] duration-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/[0.07] dark:border-slate-600/50 dark:bg-slate-800/60 dark:text-slate-200 dark:shadow-none dark:hover:border-slate-500/80 dark:hover:bg-slate-800/90 dark:hover:shadow-lg dark:hover:shadow-black/35";

/** Shared typography for MDX (no card wrapper). */
const PROSE_ARTICLE =
  "prose prose-slate max-w-none prose-lg dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-heading prose-headings:font-extrabold prose-headings:tracking-tighter prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-h2:mt-14 prose-h2:mb-3 prose-h2:text-palette-azure dark:prose-h2:text-palette-azure prose-h3:mt-10 prose-p:mb-7 prose-p:leading-relaxed prose-a:text-brand prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-code:font-mono min-w-0";

/** Layout + surfaces. */
export const ui = {
  /** Matches production `frontend.icodeit.com.au` — single column within ~56rem. */
  mainShell:
    "mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-16 px-4 pb-28 pt-6 font-sans text-lg leading-relaxed text-slate-800 sm:gap-20 sm:px-6 sm:pt-8 md:gap-24 dark:text-slate-50",
  /**
   * Vertical rhythm between top-level page blocks (hero vs cards, title vs grid, etc.).
   * Applied on `app/template.tsx` because fragments collapse into one flex child under `main`.
   */
  pageStack:
    "flex min-w-0 flex-col gap-12 sm:gap-16 md:gap-20",
  /** Intro / hero copy on the page canvas — not a card. */
  hero: "space-y-6 text-pretty",
  panel: `${PANEL_SURFACE} space-y-5`,
  /** MDX article body without panel chrome. */
  proseArticle: PROSE_ARTICLE,
  /** Detail page: MDX block after intro — top rule + spacing so prose reads as a distinct section.
   *  Do not use `[&_h2:first-of-type]` — it hits nested `h2`s (e.g. demos in MDX), not just the first section heading. */
  proseArticleBody: `${PROSE_ARTICLE} mt-2 border-t border-slate-200/80 pt-10 dark:border-slate-600/40 sm:pt-12`,
  /** Panel + prose — use only when content should read as a card. */
  panelProse: `${PANEL_SURFACE} ${PROSE_ARTICLE}`,
  /** Flat block: title stack, related links, list entries (no border/shadow). */
  section: "space-y-5 min-w-0",
  /** Case study / pattern index grid — roomy, no cards. */
  indexGrid: "grid gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14",
  grid: "grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-12",
  pageTitle:
    "font-heading text-3xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50 sm:text-4xl",
  sectionTitle:
    "font-heading text-xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50",
  /** Inline labels next to body copy (detail intros, index meta lines). */
  inlineLabel:
    "font-semibold text-slate-900 dark:text-slate-100",
  cardTitle:
    "font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50",
  /** Roadmap pill on index cards (non-published content). */
  statusBadge:
    "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider",
  statusBadgeComingNext:
    "bg-amber-100 text-amber-950 dark:bg-amber-950/70 dark:text-amber-100",
  statusBadgeInProgress:
    "bg-slate-200 text-slate-800 dark:bg-slate-600/80 dark:text-slate-100",
  statusBadgePlanning:
    "bg-violet-100 text-violet-950 dark:bg-violet-950/60 dark:text-violet-100",
  comingSoon: "text-lg font-semibold text-slate-500 dark:text-slate-400",
  /** Shared chrome for interactive case-study blocks in MDX (padding applied per component). */
  caseStudyDemoShell:
    "not-prose my-8 rounded-2xl border border-slate-200/90 bg-white/90 shadow-sm dark:border-slate-600/50 dark:bg-slate-900/55",
  explainerCard:
    "my-6 rounded-2xl border border-slate-200/80 bg-slate-100/50 p-5 text-slate-800 sm:p-6 dark:border-slate-600/50 dark:bg-slate-900/55 dark:text-slate-200",
  table: "w-full border-collapse text-left text-sm",
  th: "border-b border-slate-200/90 bg-slate-100/80 px-3 py-2.5 font-semibold text-slate-800 dark:border-slate-500/50 dark:bg-slate-800/90 dark:text-slate-100",
  td: "border-b border-slate-200/70 px-3 py-2.5 align-top text-slate-700 dark:border-slate-600/50 dark:text-slate-200",
  ctaLink:
    "inline-block text-base font-medium text-brand no-underline transition-opacity duration-200 hover:opacity-80",
  /** Internal nav links in related lists — brand + dotted underline + icon in markup. */
  relatedListLink:
    "group inline-flex max-w-full items-center gap-1.5 text-base font-medium text-brand underline decoration-dotted decoration-brand/50 underline-offset-[5px] transition-colors hover:decoration-brand dark:text-brand dark:decoration-brand/60 dark:hover:decoration-brand",
} as const;
