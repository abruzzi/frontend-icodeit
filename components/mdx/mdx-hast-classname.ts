/**
 * Shiki's `codeToHast` sets HAST `class` (not `className`). `hast-util-to-jsx-runtime`
 * forwards that as React's `class` prop, while remark fences use `className`. Pre/code
 * components must read both or Shiki blocks never match `pre.shiki` styling.
 */
export function mdxHastClassString(
  props: { className?: unknown; class?: unknown } | null | undefined,
): string {
  if (!props) return "";
  const parts: string[] = [];
  for (const c of [props.className, props.class]) {
    if (typeof c === "string" && c) parts.push(c);
    else if (Array.isArray(c))
      parts.push(...c.filter(Boolean).map((x) => String(x)));
  }
  return parts.join(" ");
}
