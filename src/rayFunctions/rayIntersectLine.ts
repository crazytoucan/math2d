import { _intersectionSwapTs } from "../internal/_intersectionSwapTs";
import { lineIntersectRay } from "../lineFunctions/lineIntersectRay";
import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { ILine, IRay } from "../types";

/**
 * Computes the intersection point between the given ray and line, if it exists.
 *
 * Finds the location at which the ray and line meet. If the ray starts on one side of the line and points away from it,
 * or they are parallel, this function returns no intersection.
 * If the ray and line are the same (i.e. they are parallel and coincide with one another),
 * this function returns the ray's initial point.
 *
 * The returned value is an {@link IPointIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the ray's geometry the intersection was found,
 *      according to the ray's parameterization
 * - `t1` – where along the line's geometry the intersection was found,
 *      according to the line's parameterization
 *
 * Almost equivalent to {@link lineIntersectRay}, except the returned intersection reverses its _t0_ and _t1_.
 *
 * @param ray the ray to intersect
 * @param line the line to intersect
 * @param out
 * @see {@link rayIntersectPolyline}
 * @see {@link rayIntersectRay}
 * @see {@link rayIntersectSegment}
 */
export function rayIntersectLine(ray: IRay, line: ILine, out = pointIntersectionResultAlloc()) {
  return _intersectionSwapTs(lineIntersectRay(line, ray, out));
}
