"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { ModeToggle } from "@/components/supporting/mode-toggle";

import { SiteLogo } from "./site-logo";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Patterns", href: "/patterns" },
  { label: "Learning Paths", href: "/learning-paths" },
];

function isNavActive(href: string, pathname: string | null) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname?.startsWith(`${href}/`) === true;
}

function desktopNavClass(href: string, pathname: string | null) {
  const active = isNavActive(href, pathname);
  return `shrink-0 rounded-md px-1 py-1.5 text-[0.9375rem] font-medium no-underline transition-colors duration-200 ${
    active
      ? "text-brand"
      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
  }`;
}

function mobileNavClass(href: string, pathname: string | null) {
  const active = isNavActive(href, pathname);
  return `block rounded-md px-2 py-3 text-base font-medium no-underline transition-colors duration-200 ${
    active
      ? "bg-slate-200/80 text-brand dark:bg-slate-800/80 dark:text-brand"
      : "text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/60"
  }`;
}

/** Sits in the main column with page content — no full-bleed chrome bar. */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-slate-200/60 pb-8 dark:border-slate-700/35 sm:pb-10">
      {/* Mobile */}
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <div className="flex min-w-0 items-center gap-1">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800/60"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
          <SiteLogo />
        </div>
        <ModeToggle />
      </div>

      {menuOpen ? (
        <nav className="mt-3 border-t border-slate-200/50 pt-3 dark:border-slate-700/40 sm:hidden" aria-label="Primary mobile">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={mobileNavClass(href, pathname)}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      ) : null}

      {/* Desktop — same column as article body */}
      <div className="hidden items-start gap-6 sm:flex sm:justify-between">
        <SiteLogo />
        <div className="flex min-w-0 flex-1 items-center justify-end gap-1 md:gap-2">
          <nav
            className="flex min-w-0 flex-wrap items-center justify-end gap-x-5 gap-y-1 md:gap-x-6"
            aria-label="Primary"
          >
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={desktopNavClass(href, pathname)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
