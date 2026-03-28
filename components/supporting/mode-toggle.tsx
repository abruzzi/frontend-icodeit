"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10 shrink-0" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex h-10 w-10 items-center justify-center rounded-lg border-none text-slate-600 transition-colors duration-200 hover:bg-slate-200/50 hover:text-brand dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-brand"
      aria-label="Toggle theme"
    >
      {theme !== "dark" ? (
        <Moon className="h-5 w-5" strokeWidth={2} />
      ) : (
        <Sun className="h-5 w-5 text-brand" strokeWidth={2} />
      )}
    </button>
  );
}
