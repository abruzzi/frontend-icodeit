"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

/**
 * Fade/slide-in when the section enters the viewport — use for course landing blocks.
 */
export function CourseScrollReveal({
  children,
  className,
  ...motionProps
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.9 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
