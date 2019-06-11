import { _intersectionSwapTs } from "../internal/_intersectionSwapTs";
import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { rayIntersectSegment } from "../rayFunctions/rayIntersectSegment";
import { IRay, ISegment } from "../types";

/**
 * Computes the intersection point between the ray and the segment, if it exists.
 *
 * Finds the location at which the ray and segment meet. If the ray "misses" the segment,
 * this function returns no intersection. For edge cases where the ray completely overlaps the segment,
 * or starts within the segment, this function returns the _first_ point that the intersection occurs,
 * according to the segment's parameterization.
 *
 * The returned value is an {@link IPointIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the segment's geometry the intersection was found,
 *      according to the segment's parameterization
 * - `t1` – where along the ray's geometry the intersection was found,
 *      according to the ray's parameterization
 *
 * Almost equivalent to {@link rayIntersectSegment}, except the _t0_ and _t1_ values are reversed.
 *
 * @param segment the segment to intersect
 * @param ray the ray to find intersection with
 * @param out
 * @see {@link IPointIntersectionResult}
 * @see {@link ISegment}
 * @see {@link segmentIntersectLine}
 * @see {@link segmentIntersectPolylineIterator}
 * @see {@link segmentIntersectSegment}
 */
export function segmentIntersectRay(segment: ISegment, ray: IRay, out = pointIntersectionResultAlloc()) {
  return _intersectionSwapTs(rayIntersectSegment(ray, segment, out));
}
