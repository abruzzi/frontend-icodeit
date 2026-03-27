import Link from "next/link";

import { ui } from "@/lib/ui";

export default function LearningPathsPage() {
  return (
    <main>
      <section className={ui.panel}>
        <h1 className={ui.pageTitle}>Learning paths</h1>
        <p className={ui.comingSoon}>Coming soon</p>
        <p>
          Planned: guided paths for topics like data-heavy UIs, realtime, and
          accessibility at scale. For now, browse{" "}
          <Link href="/case-studies">case studies</Link> and{" "}
          <Link href="/patterns">patterns</Link> directly.
        </p>
      </section>
    </main>
  );
}
