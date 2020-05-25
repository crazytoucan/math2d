import { IBox } from "../types";

/**
 * Determines whether two boxes overlap.
 *
 * This function checks whether the two boxes intersect, as areas. Both boxes are treated as closed
 * regions, so e.g. this function will return true if the boxes share only a single edge.
 *
 * The similar function {@link boxIntersection} can compute the overlap region.
 *
 * @param a first box to check for overlap
 * @param b second box to check for overlap
 */
export function boxIntersectsBox(a: IBox, b: IBox) {
  return a.minX <= b.maxX && a.minY <= b.maxY && a.maxX >= b.minX && a.maxY >= b.minY;
}
