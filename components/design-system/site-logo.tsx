"use client";

import Link from "next/link";

/** Text mark — drop in `/public/logo-brand.png` + `/public/logo-dark.png` later to match main site images. */
export function SiteLogo() {
  return (
    <Link
      href="/"
      className="whitespace-nowrap text-lg font-bold tracking-tight text-brand no-underline transition-opacity duration-200 hover:opacity-80"
    >
      I Code It
    </Link>
  );
}
