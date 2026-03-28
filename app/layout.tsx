import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter, JetBrains_Mono } from "next/font/google";

import { SiteHeader } from "@/components/design-system/site-header";
import { ui } from "@/lib/ui";

import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${GeistSans.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className={`min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-100 via-slate-150 to-slate-100 bg-no-repeat text-slate-900 antialiased dark:bg-slate-900 dark:bg-none dark:text-slate-50 ${inter.className}`}
      >
        <Providers>
          <main className={ui.mainShell}>
            <SiteHeader />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
