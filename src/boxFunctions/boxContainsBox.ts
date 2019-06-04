import { IBox } from "../types";

/**
 * Determines whether the second box is completely enclosed in the first.
 *
 * Returns true if the second box is contained in the first.
 * Each box is treated as a closed area, so e.g. the two boxes may share
 * an edge and the containment check would still pass.
 *
 * @param a
 * @param b
 */
export function boxContainsBox(a: IBox, b: IBox) {
  return b.minX >= a.minX && b.minY >= a.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
}
