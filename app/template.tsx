"use client";

import { motion } from "framer-motion";

import { ui } from "@/lib/ui";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className={ui.pageStack}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      {children}
    </motion.div>
  );
}
