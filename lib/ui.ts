/** Surfaces without box borders — separation via background + soft shadow only. */
const PANEL_SURFACE =
  "rounded-2xl bg-white/90 p-6 text-slate-700 shadow-sm shadow-slate-900/5 dark:bg-slate-900/60 dark:text-slate-300 dark:shadow-black/20 sm:p-8 leading-relaxed";

/** Layout + surfaces (no card borders / rings). */
export const ui = {
  mainShell:
    "mx-auto flex w-full max-w-full flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 md:max-w-3xl lg:max-w-4xl",
  panel: `${PANEL_SURFACE} space-y-4`,
  panelProse: `${PANEL_SURFACE} prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-p:leading-relaxed prose-a:text-brand prose-a:font-medium prose-a:no-underline hover:prose-a:underline`,
  grid: "grid gap-6 sm:grid-cols-2 sm:gap-8",
  pageTitle:
    "text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50",
  sectionTitle:
    "text-xl font-semibold text-slate-900 dark:text-slate-50",
  cardTitle:
    "text-lg font-semibold text-slate-900 dark:text-slate-50",
  comingSoon: "text-lg font-semibold text-slate-500 dark:text-slate-400",
  explainerCard:
    "my-4 rounded-2xl bg-slate-100/80 p-5 dark:bg-slate-900/50 sm:p-6",
  table: "w-full border-collapse text-left text-sm",
  th: "border-b border-slate-200/90 px-3 py-2.5 font-semibold text-slate-800 dark:border-slate-600/80 dark:text-slate-100",
  td: "border-b border-slate-100/90 px-3 py-2.5 align-top text-slate-700 dark:border-slate-800/80 dark:text-slate-300",
  ctaLink:
    "inline-block text-base font-medium text-brand no-underline transition-opacity duration-200 hover:opacity-80",
  relatedListLink:
    "text-base font-medium text-slate-700 no-underline transition-colors duration-200 hover:text-brand dark:text-slate-300 dark:hover:text-brand",
} as const;
