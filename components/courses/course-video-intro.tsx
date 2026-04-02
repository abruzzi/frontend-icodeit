"use client";

import { motion } from "framer-motion";

import { ui } from "@/lib/ui";

type Props = {
  videoId: string | null;
};

export function CourseVideoIntro({ videoId }: Props) {
  return (
    <div className="space-y-8" id="course-video">
      <h2 className={ui.courseSectionTitle} id="course-video-heading">
        Video intro
      </h2>
      <p className="max-w-2xl text-pretty text-slate-600 dark:text-slate-400">
        A short walkthrough of how the course is structured, how the capstone
        board app ties modules together, and how to get the most from the
        material.
      </p>

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-900/5 shadow-diffuse dark:border-slate-600/50 dark:bg-slate-950/40"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ type: "spring", stiffness: 140, damping: 24 }}
      >
        <div className="aspect-video w-full">
          {videoId ? (
            <iframe
              title="Course introduction video"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-100 to-slate-200/80 px-6 text-center dark:from-slate-800 dark:to-slate-900">
              <p className="max-w-md text-base font-medium text-slate-700 dark:text-slate-200">
                Intro video will appear here. Set{" "}
                <code className="rounded-md bg-white/80 px-2 py-0.5 font-mono text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                  NEXT_PUBLIC_COURSE_INTRO_VIDEO_ID
                </code>{" "}
                to your YouTube video ID.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
