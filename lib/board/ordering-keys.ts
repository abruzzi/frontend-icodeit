/**
 * Tiny helpers for board ordering demos (lex keys + sparse integers).
 * Lex keys use the fractional-indexing scheme so prefix cases (e.g. `a0` vs `a1`)
 * stay well-defined. The Lex demo maps those starter keys to labels `a`…`e` in the UI.
 */

import { generateKeyBetween } from "fractional-indexing";

/**
 * Comparator for fractional-index keys — must match the library’s use of JavaScript
 * string order (`<` / `>`), not `localeCompare` (which can reorder e.g. `a000EV` vs `a000El`).
 */
export function compareFractionalIndexKeys(a: string, b: string): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

/**
 * New key strictly between two valid fractional-index keys (`lower < upper`).
 */
export function lexRankBetween(lower: string, upper: string): string {
  return generateKeyBetween(lower, upper);
}

/** New key after `last` (append at end of sorted list). */
export function lexRankAfter(last: string): string {
  return generateKeyBetween(last, null);
}

/** New key before `first` (insert at start). */
export function lexRankBeforeFirst(first: string): string {
  return generateKeyBetween(null, first);
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
