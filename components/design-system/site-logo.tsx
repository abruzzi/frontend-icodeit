"use client";

import Link from "next/link";

import { routes } from "@/lib/routes";

/** Text mark — drop in `/public/logo-brand.png` + `/public/logo-dark.png` later to match main site images. */
export function SiteLogo() {
  return (
    <Link
      href={routes.home}
      className="font-heading whitespace-nowrap text-base font-extrabold tracking-tighter text-brand no-underline transition-opacity duration-200 hover:opacity-80 sm:text-lg"
    >
      I Code It
    </Link>
  );
}
