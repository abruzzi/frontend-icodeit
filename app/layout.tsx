import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { Fira_Code, Inter, JetBrains_Mono } from "next/font/google";

import { SiteHeader } from "@/components/design-system/site-header";
import { SiteHeroBackground } from "@/components/design-system/site-hero-background";
import { SiteFooter } from "@/components/design-system/site-footer";
import { ui } from "@/lib/ui";

import { Providers } from "./providers";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://frontend.icodeit.com.au";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Frontend at scale — patterns & case studies",
    template: "%s • Frontend at scale",
  },
  description:
    "Practical CCDAO walkthroughs for frontend developers building large, scalable web applications.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Frontend at scale — patterns & case studies",
    description:
      "Practical CCDAO walkthroughs for frontend developers building large, scalable web applications.",
    siteName: "Frontend at scale",
    images: [{ url: "/assets/juntao.qiu.avatar.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend at scale — patterns & case studies",
    description:
      "Practical CCDAO walkthroughs for frontend developers building large, scalable web applications.",
    images: ["/assets/juntao.qiu.avatar.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
      className={`${inter.variable} ${GeistSans.variable} ${jetbrainsMono.variable} ${firaCode.variable}`}
    >
      <body
        className={`min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-100 via-slate-150 to-slate-100 bg-no-repeat text-slate-900 antialiased dark:bg-slate-900 dark:bg-none dark:text-slate-50 ${inter.className}`}
      >
        <Providers>
          <SiteHeroBackground />
          <main className={`${ui.mainShell} relative z-10`}>
            <SiteHeader />
            {children}
          </main>
          <SiteFooter />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
