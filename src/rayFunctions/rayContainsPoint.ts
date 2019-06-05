import { _dot } from "../internal/_dot";
import { _dotPerp } from "../internal/_dotPerp";
import { EPSILON } from "../internal/const";
import { IRay, IVec } from "../types";

/**
 * Determines if the point is on the ray
 *
 * This function tests whether the point lies along the ray's geometry,
 * using allowed error _ε_ = 1e-8. The point must lie on the positive side
 *  of the ray (_t_ > 0).
 *
 * @param ray the ray to inspect
 * @param point point to check whether it's on the ray
 * @see {@link lineContainsPoint}
 */
export function rayContainsPoint(ray: IRay, point: IVec) {
  const t = _dot(ray, point);
  if (t < -EPSILON) {
    return false;
  }

  return Math.abs(_dotPerp(ray, point)) < EPSILON;
}
