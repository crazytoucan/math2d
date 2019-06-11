import { _intersectionDNE } from "../internal/_intersectionDNE";
import { EPSILON } from "../internal/const";
import { lineIntersectLine } from "../lineFunctions/lineIntersectLine";
import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { IRay } from "../types";

/**
 * Computes the intersection point between the two rays, if it exists.
 *
 * Finds the location at which the two rays meet. If the rays point away or "miss" each other,
 * or they are parallel, this function returns no intersection.
 *
 * The returned value is an {@link IPointIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the first ray's geometry the intersection was found,
 *      according to the ray's parameterization
 * - `t1` – where along the second ray's geometry the intersection was found,
 *      according to the ray's parameterization
 *
 * @param a the first ray to intersect
 * @param b the second ray to intersect
 * @param out
 */
export function rayIntersectRay(a: IRay, b: IRay, out = pointIntersectionResultAlloc()) {
  lineIntersectLine(a, b, out);
  return out.exists && out.t0 > -EPSILON && out.t1 > -EPSILON ? out : _intersectionDNE(out);
}
