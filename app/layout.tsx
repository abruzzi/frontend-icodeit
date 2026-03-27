import type { Metadata } from "next";
import Link from "next/link";

import { ui } from "@/lib/ui";

import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend at scale — patterns & case studies",
  description:
    "Practical CCDAO walkthroughs for frontend developers building large, scalable web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={ui.shell}>
          <nav className={ui.nav} aria-label="Primary">
            <Link className={ui.navLink} href="/">
              Home
            </Link>
            <Link className={ui.navLink} href="/case-studies">
              Case Studies
            </Link>
            <Link className={ui.navLink} href="/patterns">
              Patterns
            </Link>
            <Link className={ui.navLink} href="/learning-paths">
              Learning Paths
            </Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
