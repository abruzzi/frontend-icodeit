/**
 * Marketing copy and placeholders for the Frontend System Design Essentials landing.
 * Replace testimonial entries when you have real quotes; set video id via env.
 */

export type CourseTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

/** YouTube video ID for the intro embed (optional). */
export function getCourseIntroVideoId(): string | null {
  const id = process.env.NEXT_PUBLIC_COURSE_INTRO_VIDEO_ID?.trim();
  return id && id.length > 0 ? id : null;
}

/** Placeholder quotes — swap for real testimonials when ready. */
export const fsdeTestimonials: CourseTestimonial[] = [
  {
    id: "t1",
    quote:
      "Finally a course that connects the UI to the system around it — data, caching, and trade-offs in one thread.",
    name: "Placeholder A",
    role: "Senior frontend engineer",
  },
  {
    id: "t2",
    quote:
      "The board capstone made pagination and optimistic UI click in a way blog posts never did for me.",
    name: "Placeholder B",
    role: "Full-stack developer",
  },
  {
    id: "t3",
    quote:
      "Clear framework for interviews: I could explain *why* I’d choose cursor pagination or SSE over guessing buzzwords.",
    name: "Placeholder C",
    role: "Staff engineer",
  },
  {
    id: "t4",
    quote:
      "Worth it for the cross-functional modules alone — security, a11y, and failure modes in one place.",
    name: "Placeholder D",
    role: "Engineering lead",
  },
];
