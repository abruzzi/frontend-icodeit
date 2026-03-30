import Link from "next/link";

import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";

export default function HomePage() {
  return (
    <>
      <section className={ui.hero} aria-labelledby="home-hero-heading">
        <h1 id="home-hero-heading" className={ui.pageTitle}>
          Frontend at scale
        </h1>
        <p>
          For practicing frontend engineers leveling up on real product-shaped
          problems—boards, feeds, chat, search, media-heavy pages, and collaboration
          surfaces.
        </p>
        <p>
          Case studies walk the full path from requirements to trade-offs;
          patterns spell out what breaks in production and how to harden it.
        </p>
        <p>
          Where it helps, topics use interactive pages you can explore—not only
          prose—and stay practical for your own projects. The same ideas show up
          often: pagination, normalized caches, optimistic updates, debouncing,
          virtualization, and more.
        </p>
      </section>

      <section className={ui.grid}>
        <article className={ui.panel}>
          <h2 className={ui.sectionTitle}>Case studies</h2>
          <p>
            End-to-end scenarios with a CCDAO-style lens: constraints, UI structure,
            data, APIs, and optimization for scale, reliability, and accessibility.
          </p>
          <Link className={ui.ctaLink} href={routes.caseStudiesIndex}>
            Explore case studies
          </Link>
        </article>
        <article className={ui.panel}>
          <h2 className={ui.sectionTitle}>Patterns</h2>
          <p>
            Reusable blocks—criteria, failure modes, testing hooks—for needs that
            show up in many apps (pagination, normalization, optimistic UI, etc.).
          </p>
          <Link className={ui.ctaLink} href={routes.patternsIndex}>
            Explore patterns
          </Link>
        </article>
      </section>
    </>
  );
}
