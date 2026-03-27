import Link from "next/link";

import { ui } from "@/lib/ui";

export default function HomePage() {
  return (
    <>
      <section className={ui.panel}>
        <h1 className={ui.pageTitle}>Frontend at scale</h1>
        <p>
          This site is for practicing frontend engineers who want to level up on
          real product-shaped problems: boards, feeds, chat, search, media-heavy
          pages, and collaboration surfaces.
        </p>
        <p>
          Case studies walk through requirements, structure, data, APIs, and
          trade-offs the way you would on a growing team. Patterns spell out what
          often breaks in production and how to harden it.
        </p>
      </section>

      <section className={ui.grid}>
        <article className={ui.panel}>
          <h2 className={ui.sectionTitle}>Case studies</h2>
          <p>
            End-to-end scenarios with the same CCDAO lens you would use in design
            reviews: collect constraints, structure the UI, model data, shape APIs,
            and optimize for scale, reliability, and accessibility.
          </p>
          <Link className={ui.ctaLink} href="/case-studies">
            Explore case studies
          </Link>
        </article>
        <article className={ui.panel}>
          <h2 className={ui.sectionTitle}>Patterns</h2>
          <p>
            Reusable building blocks with decision criteria, failure modes, and
            testing ideas so you can adopt or adapt them in your own codebase.
          </p>
          <Link className={ui.ctaLink} href="/patterns">
            Explore patterns
          </Link>
        </article>
      </section>
    </>
  );
}
