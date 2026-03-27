import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteHeader } from "@/components/design-system/site-header";
import { ui } from "@/lib/ui";

import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-150 bg-no-repeat text-slate-900 subpixel-antialiased dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800 dark:text-slate-50 ${inter.className}`}
      >
        <Providers>
          <SiteHeader />
          <main className={ui.mainShell}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
