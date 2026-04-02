export type CurriculumStoryModule = {
  title: string;
  paragraphs: readonly string[];
};

/**
 * Narrative curriculum for the course details — first-person flow, no outline bullets.
 * Rendered by `CourseCurriculumStoryline`.
 */
export const fsdeCurriculumStorylineModules: readonly CurriculumStoryModule[] = [
  {
    title: "Starting your learning journey",
    paragraphs: [
      "We open with the map: what “frontend system design” means here, how the board capstone threads through every topic, and how to move through the material without drowning in theory. You’ll wire up the starter repo, render a first slice of real UI from a small API, and see where the sharp edges usually appear when teams try to scale a frontend without a system.",
      "Along the way I call out the pitfalls I see most often — over‑coupling UI to one data shape, hiding complexity in components instead of boundaries, and mistaking busywork for design. By the end of this stretch you should know how the rest of the journey fits together and what “good enough to ship and defend” looks like for you.",
    ],
  },
  {
    title: "Modeling and managing application data",
    paragraphs: [
      "Once the shell is moving, we slow down and ask how data should live in the client. A menu item that carries half the database in one object is a familiar pain — we walk a case study into something flatter, easier to reason about, and safer to change when product adds another dimension.",
      "Normalization isn’t a buzzword here; it’s the moment the board stops lying to you. We refactor in steps, break things on purpose, and patch the defects that fall out — because that’s how you learn what the model actually guarantees. Store shape and selector strategy sit next to each other: you pick trade‑offs knowing what they cost at render time and when the server disagrees.",
    ],
  },
  {
    title: "Fetching data efficiently",
    paragraphs: [
      "With a clearer model, fetching stops being “call the API when the component mounts.” We look at how fast user input and navigation create overlapping requests — cancellation, debouncing, throttling — and when each is the honest answer. Pagination shows up in more than one shape: offset, cursor, infinite scroll — and you’ll land one of those paths in the board so the column stays fast when the list grows.",
      "Caching is the quiet layer that either saves you or surprises you at 3am. We connect strategy to what users actually do on the page, then tighten the story so the next module — when data changes under you — doesn’t feel like a reset.",
    ],
  },
  {
    title: "Mutating and synchronizing data",
    paragraphs: [
      "Reads are only half the board. Deletes, assignments, and moves need a story too: what the UI assumes, what it shows while the network is in flight, and what happens when the answer is slower or different than you hoped. We implement flows that feel decisive without pretending the server is always instant.",
      "Then the world gets wider: other people’s changes, or the server’s, need to show up without a full reload. We compare polling, SSE, and WebSockets in plain terms — where each shines and where each becomes noise. Optimistic updates get the same treatment: the joy when they work, the discipline when they don’t, and rollback that doesn’t strand the user.",
    ],
  },
  {
    title: "Optimizing performance",
    paragraphs: [
      "Performance is partly mechanics and partly perception. We choose rendering strategies with intent — what belongs in the client, what can stream, and what shouldn’t re‑render because a parent sneezed. You’ll see SSR in a concrete slice, then shift to what users feel: skeletons in the board, prefetch when intent is obvious, and lazy loading when the cost of loading everything up front is simply too high.",
      "The thread closes with measurement that matches reality — not vanity metrics — so you can say what improved and why, before we widen the lens to everything that isn’t pure runtime speed.",
    ],
  },
  {
    title: "Preparing for production",
    paragraphs: [
      "Shipping means HTTP caches, tests, and security showing up in the same conversation as features. We touch caching headers and invalidation just deeply enough to reason with backends. Testing splits into fast feedback near logic and heavier paths that protect the flows users rely on — including the board paths you’ve already built.",
      "Security and accessibility sit here as engineering choices: XSS, CSP, sanitization, inclusive patterns, and error boundaries that fail without humiliating the user. It’s the bridge between “works on my machine” and “works when things go wrong in production.”",
    ],
  },
  {
    title: "Building the capstone project",
    paragraphs: [
      "The board comes back as a whole system. Structure stays maintainable when folders match boundaries, not vibes. We refactor with the next feature in mind — editing flows, lazy boundaries for heavier pieces, and drag‑and‑drop that doesn’t lock out keyboard users.",
      "This is where the earlier modules stop feeling like separate chapters and start reading as one product you could walk someone through in a review or interview — trade‑offs named, scars visible, room left for the next increment.",
    ],
  },
  {
    title: "Continuing your growth",
    paragraphs: [
      "We pull the narrative tight: the pillars you’ve been using all along, named in one place so you can reuse the frame on the next problem. The tooling landscape keeps shifting — including how AI fits into design and implementation — so we talk about what stays constant (clarity, contracts, empathy for the user and the next maintainer) even when the stack churns.",
      "If you want to go deeper afterward, the thread continues in longer-form material and the community around it — but the arc here is complete: from first API slice to a capstone you can explain end to end.",
    ],
  },
] as const;
