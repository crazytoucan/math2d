import { Box } from "../types";

/**
 * Determines whether this box represents an empty area.
 *
 * A box is considered empty if its `maxX` is less than or equal to its `minX` or
 * its `maxY` is less than or equal to its `minY`.
 *
 * This function handles `Infinity`, `-Infinity`, and `NaN` values:
 * - Any box that contains a NaN edge is considered empty
 * - Edges with non-finite values are compared according to normal mathematical rules, so e.g. the
 *    [-∞, +∞]×[-∞, +∞] box is NOT empty, but the [+∞, -∞]×[-1, 1] box IS empty.
 *
 * @param box
 */
export function boxIsEmpty(box: Box) {
  // Remark: prefer this comparison over distributing the ! to handle NaNs.
  return !(box.maxX > box.minX && box.maxY > box.minY);
}
