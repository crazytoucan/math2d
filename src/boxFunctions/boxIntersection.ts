import { IBox } from "../types";
import { boxAlloc } from "./boxAlloc";
import { boxReset } from "./boxReset";

/**
 * Computes the area intersection of the two box regions.
 *
 * Given two boxes, this function computes the region where they overlap.
 * If the two boxes do not overlap,
 * the returned value will be an empty box, i.e. with `maxX < minX` or `maxY < minY`.
 *
 * The similar function {@link boxIntersectsBox} will check whether two
 * boxes intersect, without actually computing that intersection region.
 *
 * @param a first box to compute intersection for
 * @param b second box to compute intersection for
 * @param out
 * @see {@link boxUnion}
 */
export function boxIntersection(a: IBox, b: IBox, out = boxAlloc()) {
  return boxReset(
    Math.max(a.minX, b.minX),
    Math.max(a.minY, b.minY),
    Math.min(a.maxX, b.maxX),
    Math.min(a.maxY, b.maxY),
    out,
  );
}
