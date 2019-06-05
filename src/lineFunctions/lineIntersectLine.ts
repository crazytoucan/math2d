import { _dot } from "../internal/_dot";
import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lineTransformByOrtho } from "../internal/_lineTransformByOrtho";
import { EPSILON } from "../internal/const";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { intersectionReset } from "../intersectionFunctions/intersectionReset";
import { mat2x3Alloc } from "../mat2x3Functions/mat2x3Alloc";
import { mat2x3Reset } from "../mat2x3Functions/mat2x3Reset";
import { ILine } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { lineAlloc } from "./lineAlloc";
import { lineGetPointAt } from "./lineGetPointAt";

const TMP0 = mat2x3Alloc();
const TMP1 = lineAlloc();
const TMP2 = vecAlloc();

/**
 * Computes the intersection point between the two given lines, if it exists.
 *
 * Finds the location at which the first and second line meet. If the lines are parallel and not overlapping,
 * this function returns no intersection. If the lines are completely overlapping,
 * this function returns the first line's initial point.
 *
 * The returned value is an {@link IIntersection} object which will have have the
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
 * @see {@link lineIntersectPolylineIterator}
 * @see {@link lineIntersectRay}
 * @see {@link lineIntersectSegment}
 */
export function lineIntersectLine(a: ILine, b: ILine, out = intersectionAlloc()) {
  const transform = mat2x3Reset(a.dirX, -a.dirY, a.dirY, a.dirX, -a.x0, -a.y0, TMP0);
  const localB = _lineTransformByOrtho(b, transform, TMP1);
  const isParallel = Math.abs(localB.dirY) < EPSILON;

  if (isParallel && Math.abs(localB.y0) < EPSILON) {
    return intersectionReset(true, a.x0, a.y0, 0, -localB.x0 * localB.dirX, out);
  } else if (isParallel) {
    return _intersectionDNE(out);
  } else {
    const t0 = localB.x0 - (localB.dirX / localB.dirY) * localB.y0;
    const intersectionPoint = lineGetPointAt(a, t0, TMP2);
    const t1 = _dot(b, intersectionPoint);
    return intersectionReset(true, intersectionPoint.x, intersectionPoint.y, t0, t1, out);
  }
}
