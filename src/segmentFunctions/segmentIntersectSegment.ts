import { EPSILON } from "../internal/const";
import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lookAt } from "../internal/_lookAt";
import { intersectionResultAlloc } from "../intersectionResultFunctions/intersectionResultAlloc";
import { rayIntersectSegment } from "../rayFunctions/rayIntersectSegment";
import { ISegment } from "../types";
import { segmentGetLength } from "./segmentGetLength";

/**
 * Computes the intersection point between the two line segments, if it exists.
 *
 * Finds the location at which the two segments meet. If the two segments "miss" each other,
 * this function returns no intersection. If the two segments overlap along an entire interval
 * (i.e. they are parallel and lie partly on top of each other), this function returns the first
 * point they have in common, according to the first segment's parameterization.
 *
 * The returned value is an {@link IIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the first segment's geometry the intersection was found,
 *      according to the first segment's parameterization
 * - `t1` – where along the second segment's geometry the intersection was found,
 *      according to the second segment's parameterization
 *
 * @param a the first segment to intersect
 * @param b the second segment to find intersections with
 * @param out
 * __see {@link IIntersectionResult}
 * __see {@link ISegment}
 * __see {@link segmentIntersectPolyline}
 * __see {@link segmentIntersectRay}
 */
export function segmentIntersectSegment(a: ISegment, b: ISegment, out = intersectionResultAlloc()) {
  const aRay = _lookAt(a.x0, a.y0, a.x1, a.y1);
  rayIntersectSegment(aRay, b, out);
  const segmentLength = segmentGetLength(a);
  if (out.exists && out.t0 > -EPSILON && out.t0 < segmentLength + EPSILON) {
    out.t0 /= segmentLength;
    return out;
  } else {
    return _intersectionDNE(out);
  }
}
