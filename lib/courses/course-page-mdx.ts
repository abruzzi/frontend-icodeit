/** Body split: everything before this HTML comment is compiled for the landing hero (H1 + lead). */
export const COURSE_PAGE_DETAILS_MARKER = "<!-- course:details -->";

export function splitCoursePageMdx(body: string): {
  heroSource: string;
  detailsSource: string;
} {
  const idx = body.indexOf(COURSE_PAGE_DETAILS_MARKER);
  if (idx === -1) {
    return { heroSource: "", detailsSource: body.trim() };
  }
  return {
    heroSource: body.slice(0, idx).trim(),
    detailsSource: body.slice(idx + COURSE_PAGE_DETAILS_MARKER.length).trim(),
  };
}

/** First markdown H1 in the hero slice (for metadata). */
export function courseHeroTitleFromMdx(heroSource: string): string | undefined {
  const m = heroSource.match(/^#\s+(.+)$/m);
  const t = m?.[1]?.trim();
  return t || undefined;
}
