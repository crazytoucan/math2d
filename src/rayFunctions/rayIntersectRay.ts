import { EPSILON } from "../internal/const";
import { _dot } from "../internal/_dot";
import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _rayTransformByOrtho } from "../internal/_rayTransformByOrtho";
import { mat2dReset } from "../mat2dFunctions/mat2dReset";
import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { pointIntersectionResultReset } from "../pointIntersectionResultFunctions/pointIntersectionResultReset";
import { IRay } from "../types";
import { rayGetPointAt } from "./rayGetPointAt";

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
  // Transform ray `b` by the same matrix that maps `a` to the x- basis.
  // We then compute the intersection (with the x-axis) in the transformed space.
  // This transform is equivalent to "translate by (-a.x0, -a.y0) then rotate by -a.angle".
  const transform = mat2dReset(
    a.dirX,
    -a.dirY,
    a.dirY,
    a.dirX,
    -a.x0 * a.dirX - a.y0 * a.dirY,
    a.x0 * a.dirY - a.y0 * a.dirX,
  );

  const localB = _rayTransformByOrtho(b, transform);
  const isParallel = Math.abs(localB.dirY) < EPSILON;

  if (isParallel && Math.abs(localB.y0) >= EPSILON) {
    return _intersectionDNE(out);
  }

  if (isParallel) {
    pointIntersectionResultReset(true, a.x0, a.y0, 0, -localB.x0 * localB.dirX, out);
  } else {
    const t0 = localB.x0 - (localB.dirX / localB.dirY) * localB.y0;
    const intersectionPoint = rayGetPointAt(a, t0);
    const t1 = _dot(b, intersectionPoint);
    pointIntersectionResultReset(true, intersectionPoint.x, intersectionPoint.y, t0, t1, out);
  }

  return out.t0 >= 0 && out.t1 >= 0 ? out : _intersectionDNE(out);
}
