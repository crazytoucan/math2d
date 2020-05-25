import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lookAt } from "../internal/_lookAt";
import { EPSILON } from "../internal/const";
import { lineIntersectSegment } from "../lineFunctions/lineIntersectSegment";
import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
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
 * The returned value is an {@link IPointIntersectionResult} object which will have have the
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
 * @see {@link IPointIntersectionResult}
 * @see {@link ISegment}
 * @see {@link segmentIntersectLine}
 * @see {@link segmentIntersectPolylineIterator}
 * @see {@link segmentIntersectRay}
 */
export function segmentIntersectSegment(a: ISegment, b: ISegment, out = pointIntersectionResultAlloc()) {
  const aLine = _lookAt(a.x0, a.y0, a.x1, a.y1);
  lineIntersectSegment(aLine, b, out);
  const segmentLength = segmentGetLength(a);
  if (out.exists && out.t0 > -EPSILON && out.t0 < segmentLength + EPSILON) {
    out.t0 /= segmentLength;
    return out;
  } else {
    return _intersectionDNE(out);
  }
}
