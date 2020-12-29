import { EPSILON } from "../internal/const";
import { _dot } from "../internal/_dot";
import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lineTransformByOrtho } from "../internal/_lineTransformByOrtho";
import { mat2dReset } from "../mat2dFunctions/mat2dReset";
import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { pointIntersectionResultReset } from "../pointIntersectionResultFunctions/pointIntersectionResultReset";
import { ILine } from "../types";
import { lineGetPointAt } from "./lineGetPointAt";

/**
 * Computes the intersection point between the two given lines, if it exists.
 *
 * Finds the location at which the first and second line meet. If the lines are parallel and not overlapping,
 * this function returns no intersection. If the lines are completely overlapping,
 * this function returns the first line's initial point.
 *
 * The returned value is an {@link IPointIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the first line's geometry the intersection was found,
 *      according to the first line's parameterization
 * - `t1` – where along the second line's geometry the intersection was found,
 *      according to the second line's parameterization
 *
 * @param a the first line to intersect
 * @param b the second line to find intersection with
 * @param out
 * @see {@link lineIntersectPolyline}
 * @see {@link lineIntersectRay}
 * @see {@link lineIntersectSegment}
 */
export function lineIntersectLine(a: ILine, b: ILine, out = pointIntersectionResultAlloc()) {
  // [dirX -dirY dirY dirX 0 0 ] [1 0 0 1 -x0 -y0]  = [ -x0 * dirX - y0 * dirY  / [x0 * dirY - y0 * dirX]
  const transform = mat2dReset(
    a.dirX,
    -a.dirY,
    a.dirY,
    a.dirX,
    -a.x0 * a.dirX - a.y0 * a.dirY,
    a.x0 * a.dirY - a.y0 * a.dirX,
  );

  const localB = _lineTransformByOrtho(b, transform);
  const isParallel = Math.abs(localB.dirY) < EPSILON;

  if (isParallel && Math.abs(localB.y0) < EPSILON) {
    return pointIntersectionResultReset(true, a.x0, a.y0, 0, -localB.x0 * localB.dirX, out);
  } else if (isParallel) {
    return _intersectionDNE(out);
  } else {
    const t0 = localB.x0 - (localB.dirX / localB.dirY) * localB.y0;
    const intersectionPoint = lineGetPointAt(a, t0);
    const t1 = _dot(b, intersectionPoint);
    return pointIntersectionResultReset(true, intersectionPoint.x, intersectionPoint.y, t0, t1, out);
  }
}
