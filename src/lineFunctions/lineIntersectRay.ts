import { _intersectionDNE } from "../internal/_intersectionDNE";
import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { ILine, IRay } from "../types";
import { lineIntersectLine } from "./lineIntersectLine";

/**
 * Computes the intersection point between the given line and ray, if it exists.
 *
 * Finds the location at which the line and ray meet. If the ray starts on one side of the line and points away from it,
 * or they are parallel, this function returns no intersection.
 * If the ray and line are the same (i.e. they are parallel and coincide with one another),
 * this function returns the line's initial point.
 *
 * The returned value is an {@link IPointIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the line's geometry the intersection was found,
 *      according to the line's parameterization
 * - `t1` – where along the ray's geometry the intersection was found,
 *      according to the ray's parameterization
 *
 * Almost equivalent to {@link rayIntersectLine}, except the returned intersection reverses its _t0_ and _t1_.
 *
 * @param line the line to intersect
 * @param ray the ray to find intersection with
 * @param out
 * @see {@link lineIntersectLine}
 * @see {@link lineIntersectPolyline}
 * @see {@link lineIntersectSegment}
 */
export function lineIntersectRay(line: ILine, ray: IRay, out = pointIntersectionResultAlloc()) {
  lineIntersectLine(line, ray);
  return !out.exists || out.t1 < 0 ? _intersectionDNE(out) : out;
}
