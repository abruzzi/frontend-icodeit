/** Shared layout / surface classes (Tailwind). Tweak here to reskin the site. */
export const ui = {
  shell: "mx-auto max-w-[1080px] px-6 py-6",
  nav: "mb-6 flex flex-wrap gap-2",
  navLink:
    "rounded-md px-3 py-1.5 text-sm font-medium text-neutral-700 no-underline hover:bg-slate-200/60 hover:text-neutral-900",
  panel:
    "mb-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-200/40",
  panelProse:
    "prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline",
  grid: "grid gap-4 sm:grid-cols-2",
  pageTitle: "mb-6 text-3xl font-bold tracking-tight text-neutral-900",
  comingSoon: "text-lg font-semibold text-neutral-500",
  explainerCard:
    "my-4 rounded-lg border border-slate-200 bg-slate-50/90 p-4 shadow-sm",
  table: "w-full border-collapse text-left text-sm",
  th: "border border-slate-200 bg-white px-3 py-2 font-semibold text-neutral-800",
  td: "border border-slate-200 px-3 py-2 align-top text-neutral-700",
  ctaLink:
    "mt-3 inline-block font-semibold text-blue-700 no-underline hover:text-blue-900 hover:underline",
} as const;
