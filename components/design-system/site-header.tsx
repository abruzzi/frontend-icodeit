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
  return `shrink-0 rounded-md px-1 py-2 text-base font-medium no-underline transition-colors duration-200 ${
    active
      ? "text-brand dark:text-brand"
      : "text-slate-600 hover:text-brand dark:text-slate-400 dark:hover:text-brand"
  }`;
}

function mobileNavClass(href: string, pathname: string | null) {
  const active = isNavActive(href, pathname);
  return `block rounded-md px-2 py-3 text-base font-medium no-underline transition-colors duration-200 ${
    active
      ? "bg-slate-200/80 text-brand dark:bg-slate-800 dark:text-brand"
      : "text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
  }`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-50/90 backdrop-blur-md dark:bg-slate-950/90">
      <div className="mx-auto max-w-full px-4 sm:px-6 md:max-w-3xl lg:max-w-4xl">
        {/* Mobile: logo row + full-width menu below */}
        <div className="flex h-12 items-center justify-between sm:hidden">
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800"
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
          <nav
            className="pb-3 pt-1 sm:hidden"
            aria-label="Primary mobile"
          >
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

        {/* Desktop: logo + flexible nav + toggle — middle column gets remaining width so links stay on one row */}
        <div className="hidden min-h-14 items-center gap-3 sm:grid sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 md:gap-6">
          <div className="flex items-center justify-self-start">
            <SiteLogo />
          </div>
          <nav
            className="flex min-w-0 flex-nowrap items-center justify-center gap-3 md:gap-5 lg:gap-6"
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
          <div className="flex justify-self-end">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
