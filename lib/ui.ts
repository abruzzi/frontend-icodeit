/** Subtle surfaces — for home marketing cards only. */
const PANEL_SURFACE =
  "rounded-2xl border border-slate-200/90 bg-white/80 p-6 text-slate-800 shadow-sm shadow-slate-900/[0.04] dark:border-slate-700/45 dark:bg-slate-800/35 dark:shadow-none sm:p-7 leading-relaxed transition-[box-shadow,border-color,background-color] duration-200 hover:border-slate-300 dark:hover:border-slate-600/55 dark:hover:bg-slate-800/50 hover:shadow-md hover:shadow-slate-900/[0.07] dark:hover:shadow-black/25";

/** Shared typography for MDX (no card wrapper). */
const PROSE_ARTICLE =
  "prose prose-slate max-w-none prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-extrabold prose-headings:tracking-tighter prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-h2:mt-14 prose-h2:mb-3 prose-h3:mt-10 prose-p:mb-7 prose-p:leading-relaxed prose-a:text-brand prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-code:font-mono min-w-0";

/** Layout + surfaces. */
export const ui = {
  mainShell:
    "mx-auto flex w-full min-w-0 max-w-[720px] flex-col gap-16 px-4 pb-28 pt-6 font-sans text-lg leading-relaxed text-slate-800 sm:gap-20 sm:px-6 sm:pt-8 md:gap-24 dark:text-slate-50",
  /** Intro / hero copy on the page canvas — not a card. */
  hero: "space-y-6 text-pretty",
  panel: `${PANEL_SURFACE} space-y-5`,
  /** MDX article body without panel chrome. */
  proseArticle: PROSE_ARTICLE,
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
  cardTitle:
    "font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50",
  comingSoon: "text-lg font-semibold text-slate-500 dark:text-slate-400",
  explainerCard:
    "my-6 rounded-2xl border border-slate-200/80 bg-slate-100/50 p-5 dark:border-slate-700/45 dark:bg-slate-800/35 sm:p-6",
  table: "w-full border-collapse text-left text-sm",
  th: "border-b border-slate-200/90 px-3 py-2.5 font-semibold text-slate-800 dark:border-slate-600/80 dark:text-slate-100",
  td: "border-b border-slate-100/90 px-3 py-2.5 align-top text-slate-700 dark:border-slate-700/80 dark:text-slate-300",
  ctaLink:
    "inline-block text-base font-medium text-brand no-underline transition-opacity duration-200 hover:opacity-80",
  relatedListLink:
    "text-base font-medium text-slate-700 no-underline transition-colors duration-200 hover:text-brand dark:text-slate-300 dark:hover:text-brand",
} as const;
