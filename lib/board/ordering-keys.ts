/**
 * Helpers for board ordering demos: LexoRank-style string keys (see {@link lexoRankBetween})
 * and sparse integers.
 */

import { LexoRank } from "@dalet-oss/lexorank";

/** `count` evenly spaced LexoRank strings from middle toward max (typical starter list). */
export function initialLexoRankKeys(count: number): string[] {
  const mid = LexoRank.middle();
  return mid.multipleBetween(LexoRank.max(), count).map((r) => r.toString());
}

/** Comparator for LexoRank strings (matches Jira-style lexicographic order). */
export function compareLexoRankKeys(a: string, b: string): number {
  return LexoRank.parse(a).compareTo(LexoRank.parse(b));
}

/** New key strictly between two LexoRanks (`left < right`). */
export function lexoRankBetween(left: string, right: string): string {
  return LexoRank.parse(left).between(LexoRank.parse(right)).toString();
}

/** New key after `last` (append at end of sorted list). */
export function lexoRankAfter(last: string): string {
  return LexoRank.parse(last).genNext().toString();
}

/** New key before `first` (insert at start). */
export function lexoRankBeforeFirst(first: string): string {
  return LexoRank.min().between(LexoRank.parse(first)).toString();
}

/** Fallback when no neighbours exist (should be rare in the demo). */
export function lexoRankMiddle(): string {
  return LexoRank.middle().toString();
}

/** Integer strictly between `lo` and `hi`, or `null` if none exists. */
export function intMidpointExclusive(lo: number, hi: number): number | null {
  if (hi <= lo + 1) {
    return null;
  }
  const mid = lo + Math.floor((hi - lo) / 2);
  if (mid <= lo || mid >= hi) {
    return null;
  }
  return mid;
}

/** Next rank after the last item when using fixed steps (sparse baseline). */
export function intSparseAfterLast(last: number, step: number): number {
  return last + step;
}

/** `count` evenly spaced ranks starting at `start`, stepping by `step` (typical post-rebalance slice). */
export function evenlySpacedRanks(count: number, start: number, step: number): number[] {
  return Array.from({ length: count }, (_, i) => start + i * step);
}
