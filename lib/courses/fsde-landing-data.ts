import soyaAvatarImg from "../../content/courses/frontend-system-design-essentials/soya.webp";

/**
 * Marketing copy and placeholders for the Frontend System Design Essentials landing.
 * Replace testimonial entries when you have real quotes; set video id via env.
 *
 * Topic cloud chips (`CourseCurriculumCloud`) use {@link fsdeCurriculumCloudLabels};
 * `mindmap.md` stays a fuller outline for your own planning, not the cloud source.
 */

export type CourseTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Optional face for the large featured treatment */
  avatarSrc?: string;
};

/**
 * Public Mux playback ID for the FSDE intro video.
 * Override with `NEXT_PUBLIC_COURSE_INTRO_MUX_PLAYBACK_ID` (e.g. staging).
 */
export const fsdeIntroMuxPlaybackIdDefault =
  "JeaB4qJyW01QDfWperiGVNXdhVuaL8cxF8mfFtv8tC1g";

/** Mux playback ID for the intro (env overrides the baked-in default). */
export function getCourseIntroMuxPlaybackId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_COURSE_INTRO_MUX_PLAYBACK_ID?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : fsdeIntroMuxPlaybackIdDefault;
}

/** YouTube video ID for the intro embed (optional; used only if Mux id is cleared). */
export function getCourseIntroVideoId(): string | null {
  const id = process.env.NEXT_PUBLIC_COURSE_INTRO_VIDEO_ID?.trim();
  return id && id.length > 0 ? id : null;
}

/**
 * Learner voices: course review + YouTube praise for Frontend System Design
 * Essentials topics. Copy lives only here at runtime — no JSON import.
 * When refreshing: export comments, pick quotes, edit this array; raw dumps
 * belong in `channel_comments*.json` (gitignored), not in the bundle.
 */
/** Full course review — shown as the large quote under the marquee (not repeated in the strip). */
export const fsdeFeaturedTestimonial: CourseTestimonial = {
  id: "soya-course",
  quote:
    "Thank you so much, Juntao, for the course — it helped me a lot in my frontend career. It has been really valuable and changed my perspective when I code. I love how you explain every topic. I completed it recently and I am planning to go through it all once again.",
  name: "Soya",
  role: "Course learner",
  avatarSrc: soyaAvatarImg.src,
};

/** Shorter voices for the scrolling strip only. */
export const fsdeMarqueeTestimonials: CourseTestimonial[] = [
  {
    id: "yt-sachin-normalization",
    quote:
      "Finally someone spoke about normalisation in the frontend — thank you so much.",
    name: "Sachin Y.",
    role: "YouTube · Normalization explained",
  },
  {
    id: "yt-realtime-headache",
    quote:
      "I was making real-time apps the hard way — REST, socket events, state management — you just solved my headache.",
    name: "hmm8991",
    role: "YouTube · Real-time updates",
  },
  {
    id: "yt-raunak-series",
    quote:
      "Keep up the good work, Juntao. Really enjoying your frontend system design series.",
    name: "Raunak R.",
    role: "YouTube · Normalization explained",
  },
  {
    id: "yt-normalization-approach",
    quote:
      "I have been using nested structured data until now, but I have come to see that flat, normalized data is a better approach. Applying normalization to frontend data management feels fresh and makes the structure easier to work with.",
    name: "Gyeongseok",
    role: "YouTube · Normalization explained",
  },
  {
    id: "yt-optimistic-share",
    quote:
      "I sent this to one of my friends who is learning frontend. Great help. I was explaining optimistic updates to him yesterday but I am not really a good teacher — I hope this helps him out.",
    name: "dev_nvK",
    role: "YouTube · Optimistic updates",
  },
  {
    id: "yt-PhiromKhim-it5tx",
    quote:
      "I have 2 years of experience in frontend development but still didn't know half of what you have shown including other videos. I appreciate your contents!!",
    name: "PhiromKhim-it5tx",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-AkshitKumar-m7u",
    quote:
      "I got this same question in my Interview and was able to answer because of you. Thanks for the help",
    name: "AkshitKumar-m7u",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-waqifhosain5713",
    quote: "One of the best channel for frontend system design <3 <3",
    name: "waqifhosain5713",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-abhinavvishwakarma6810",
    quote: "Well explained the concept of preload, prefetch",
    name: "abhinavvishwakarma6810",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-tenaciousbali",
    quote:
      "Please keep continuing teaching like this. I've seen so many system design videos but none of them had the clarity of the mind-map you gave. kudos!!!",
    name: "tenaciousbali",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-fyyyii",
    quote:
      "Dude nice, please keep going this is nice work. It helps me refresh on practices and you provide the material in a refreshing way. SERIOUSLY NICE",
    name: "fyyyii",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-q01dHaCkEr",
    quote:
      "Thanks for this, I really liked the way you broke this down. The use of the mindmap was very helpful, too.",
    name: "q01dHaCkEr",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-divyanshusrivastava5986-1",
    quote:
      "As a front-end developer, great video highlights almost all points to be kept in mind while designing a system. Hats off",
    name: "divyanshusrivastava5986",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-juj1988",
    quote:
      "Excellent discussion. No one talks about normalisations in front end",
    name: "juj1988",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-divyanshusrivastava5986-2",
    quote:
      "Explanation is great, use cases and examples make this videos exceptional. Thank you, and pls continue <3",
    name: "divyanshusrivastava5986",
    role: "YouTube · Course comments",
  },
  {
    id: "yt-trilochansaho3866",
    quote: "one of the great learning video with clean examples.... Love it",
    name: "trilochansaho3866",
    role: "YouTube · Course comments",
  },
];

/** Curated labels for the landing topic cloud (order = display order). */
export const fsdeCurriculumCloudLabels: readonly string[] = [
  "State management",
  "Domain-driven design",
  "Data Persistence",
  "Real-time updates",
  "State sync mechanism",
  "Optimistic updates",
  "Accessibility",
  "Observability",
  "Infrastructure",
  "CI/CD",
  "Security",
  "Error handling",
  "Caching + prefetching",
  "Pagination",
  "Request optimisation",
  "Perceived performance",
  "Code split",
  "Rendering strategies",
  "Test-Driven Development",
  "Lazy loading",
];
