# Course landing pages: reference (Joy of React & Epic React)

This document captures **how two well-known paid React courses structure their marketing / landing pages**, so we can reuse patterns (information architecture, section types, and component ideas) when building course pages in this repo—without copying copy, branding, or proprietary assets.

**Sources (reviewed for page structure and section flow):**

- [The Joy of React](https://www.joyofreact.com/) (Josh W. Comeau)
- [Epic React](https://www.epicreact.dev/) (Kent C. Dodds)

---

## Shared patterns (both sites)

Both pages behave as **long-form sales landings** with a clear spine:

1. **Hero** — headline, subhead, primary CTA (“Enroll” / “Get started”), instructor identity up front.
2. **Problem → empathy** — acknowledge difficulty, tutorial fatigue, or complexity of the ecosystem.
3. **Promise / philosophy** — what makes *this* course different (not passive video dumps; emphasis on understanding vs memorizing).
4. **Social proof** — logos, quotes, named roles/companies, sometimes a dedicated reviews/testimonials area.
5. **Curriculum** — modular breakdown (often numbered modules or named workshops), each with a short pitch and bullet topics.
6. **Projects / capstone** — concrete things the learner builds; screenshots or feature callouts.
7. **Bonuses / tiers** (where applicable) — extra modules, bundles, team licenses.
8. **Instructor bio** — credentials, experience, why trust this voice.
9. **FAQ** — objections: up-to-date?, right for me?, time, refunds, TypeScript?, community, certificates, etc.
10. **Footer / legal** — terms, privacy, contact.

**Navigation / conversion mechanics (implicit in structure):**

- Repeated **CTAs** after high-intent sections (curriculum, pricing).
- Content is **scannable**: headings, short paragraphs, lists, and visual breaks between dense text.
- **Progressive disclosure** for long curriculum (Joy uses rich module sections; Epic lists workshops with lesson counts).

---

## The Joy of React — structure notes

**URL:** [https://www.joyofreact.com/](https://www.joyofreact.com/)

| Section (approx. order) | Role |
| --- | --- |
| Hero | Product name, one-line value prop, interactive/brand visuals, instructor, enroll CTA |
| “Learning React is hard” | Problem framing; relatability |
| What the course *is* | Interactive, exercises, projects, games; contrast with passive courses |
| Trusted by / quotes | Logo strip + pull quotes from recognizable practitioners |
| **The Curriculum** | **Module 1–6** blocks: each has title, narrative, bullets, emphasis on depth |
| Capstone projects | Separate project blocks (e.g. game, component deep-dive, MDX blog) with visuals |
| Bonus features | Add-on modules for higher tiers (e.g. layout animations, job kit) |
| Team licenses | B2B angle, discount |
| Test squad / more quotes | Volume of social proof, varied experience levels |
| Instructor section | Story + bullet credentials |
| FAQ | Long, specific (updates, audience, depth vs beginner, TS, PPP, teams, refunds, time, community, certificates) |
| Footer | Links, copyright |

**Distinctive angles useful for our docs:**

- Heavy emphasis on **mental model** and **why**, not only **how**.
- **Module granularity** is explicit (numbered, named, with outcome statements).
- **Projects are first-class sections**, not a footnote after the syllabus.
- **FAQ depth** matches real purchase objections (regional pricing, upgrades, gifting, invoices).

---

## Epic React — structure notes

**URL:** [https://www.epicreact.dev/](https://www.epicreact.dev/)

| Section (approx. order) | Role |
| --- | --- |
| Hero | React 19 positioning, “code-focused workshops,” instructor, star social proof snippet |
| Paradigm shifts / feature list | New APIs and concepts as bullets; “before/after” framing (messy → clean) |
| Learning philosophy | Mastery of basics, incremental complexity, active practice |
| What you get | Workshop count, lesson count, TypeScript, hands-on positioning |
| Workshop list | Named workshops with **section + lesson counts** and one-line descriptions |
| Platform / UX pitch | Progress tracking, playgrounds, tests/diffs, community—reduces friction to practice |
| Why learning “sticks” | Active learning + real-world context (simulated team, PM/coworker framing) |
| Testimonials | Short quotes interleaved with CTAs |
| Pricing / tiers | “Epic React Pro,” guarantee, feature checklist |
| Free preview CTA | Lower commitment entry (“Get Started with React” preview) |
| FAQ | Accordion-style topics: frameworks covered, access length, refunds, PPP, teams, upgrades, etc. |
| Footer | Learn / contact / legal |

**Distinctive angles useful for our docs:**

- **Version story** (e.g. React 19) as the hook—timely, concrete.
- **Workshop-style curriculum** presented as a **table of contents** with measurable scope (sections × lessons).
- Explicit **product mechanics**: how the platform supports practice (not just curriculum topics).
- **Pricing block** with bullet “includes” mirroring the curriculum.

---

## How this maps to our repo (implementation hints)

These are **design/content-structure** targets, not a mandate to clone either site.

| Reference pattern | Possible implementation here |
| --- | --- |
| Hero + CTA rail | `CourseHero`, sticky `CourseCtaCard` beside or below header; align with `ui.section` / `ui.pageTitle` |
| Curriculum scanability | `CourseCurriculum` (accordion or cards); keep bullets in MDX or frontmatter-driven data |
| Capstone spotlight | `CourseCapstoneSpotlight` linking to board case study / routes |
| FAQ | `CourseFaq` (details/summary or accordion) to match long Joy/Epic-style FAQ |
| On-page navigation | Reuse `ArticleToc` + `extractTocHeadings` pattern from case study/pattern pages |
| MDX vs React | Narrative + `<Callout>` stay in MDX; repeated layout blocks as components registered in `components/mdx/mdx-components.tsx` |

**Related internal docs:** [`docs/content-architecture.md`](./content-architecture.md) (MDX components and content linking).

---

## Changelog

- **2026-04-02** — Initial capture from public landing-page structure of Joy of React and Epic React.
