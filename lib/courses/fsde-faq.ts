export type CourseFaqItem = {
  question: string;
  answer: string;
};

/** FAQ entries for the Frontend System Design Essentials course details (MDX). */
export const fsdeFaqItems: readonly CourseFaqItem[] = [
  {
    question: "What learning style should I expect?",
    answer:
      "A mix of pre-recorded videos, coding assignments, quizzes, and written guides. Each module has hands-on exercises, not just theory.",
  },
  {
    question: "How is this different from free YouTube content?",
    answer:
      "YouTube is great for bite-sized tips. This course is a structured system that takes you from feature-building to system design — with projects, exercises, and a full learning path.",
  },
  {
    question: "I have a frontend system design interview coming up. Will this help?",
    answer:
      "Yes. The first module gives you a structure for reasoning and communicating trade-offs. If you’re short on time, you can focus on modules you’re least confident about: data modeling, pagination, caching, performance, or realtime.",
  },
  {
    question: "What if I’m not sure I’ll like it?",
    answer:
      "No worries — the course comes with a 100% money-back guarantee if you don’t find it valuable after the first two modules. In addition, you can always try the free Frontend System Design Essentials videos on YouTube — they cover many of the ideas in a shorter format so you can see the teaching style before you enroll.",
  },
  {
    question: "What’s the time commitment?",
    answer:
      "About 7 hours of core material, plus extra time for coding challenges and the capstone project. Learn at your own pace.",
  },
] as const;
