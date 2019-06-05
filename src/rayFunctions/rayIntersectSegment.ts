import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lookAt } from "../internal/_lookAt";
import { EPSILON } from "../internal/const";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineAlloc } from "../lineFunctions/lineAlloc";
import { lineIntersectLine } from "../lineFunctions/lineIntersectLine";
import { segmentGetLength } from "../segmentFunctions/segmentGetLength";
import { IRay, ISegment } from "../types";

const TMP0 = lineAlloc();

/**
 * Computes the intersection point between the ray and the segment, if it exists.
 *
 * Finds the location at which the ray and segment meet. If the ray "misses" the segment,
 * this function returns no intersection. For edge cases where the ray completely overlaps the segment,
 * or starts within the segment, this function returns the _first_ point that the intersection occurs,
 * according to the ray's parameterization.
 *
 * The returned value is an {@link IIntersection} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the ray's geometry the intersection was found,
 *      according to the segment's parameterization
 * - `t1` – where along the segment's geometry the intersection was found,
 *      according to the ray's parameterization
 *
 * Almost equivalent to {@link segmentIntersectRay}, except the _t0_ and _t1_ values are reversed.
 *
 * @param ray the ray to intersect
 * @param segment the segment to intersect
 * @param out
 */
export function rayIntersectSegment(ray: IRay, segment: ISegment, out = intersectionAlloc()) {
  const segmentRay = _lookAt(segment.x0, segment.y0, segment.x1, segment.y1, TMP0);
  lineIntersectLine(ray, segmentRay, out);
  const segmentLength = segmentGetLength(segment);
  if (out.exists && out.t0 > -EPSILON && out.t1 > -EPSILON && out.t1 < segmentLength + EPSILON) {
    out.t1 /= segmentLength;
    return out;
  } else {
    return _intersectionDNE(out);
  }
}
