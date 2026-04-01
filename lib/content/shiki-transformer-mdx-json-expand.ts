import type { ShikiTransformer } from "shiki";

/** Class added to `<pre class="shiki">` when fence meta requests an expanded JSON block (see `MdxPre`). */
export const MDX_JSON_EXPANDED_CLASS = "mdx-json-expanded";

/**
 * Opt in to an expanded JSON / JSONC block (no collapsible wrapper) via fence meta, e.g.
 * ` ```json expanded ` or ` ```jsonc show `.
 * Words: expanded, expand, open, inline, show — optional override: collapsed, collapse, fold.
 */
export function shikiTransformerMdxJsonExpand(): ShikiTransformer {
  return {
    name: "icodeit:mdx-json-expand",
    pre(node) {
      const lang = this.options.lang;
      if (lang !== "json" && lang !== "jsonc") return;

      const raw = this.options.meta?.__raw?.trim() ?? "";
      if (!raw) return;

      const expand = /\b(expanded|expand|open|inline|show)\b/i.test(raw);
      const forceCollapse = /\b(collapsed|collapse|fold|folded)\b/i.test(raw);

      if (expand && !forceCollapse) {
        this.addClassToHast(node, MDX_JSON_EXPANDED_CLASS);
      }
    },
  };
}
