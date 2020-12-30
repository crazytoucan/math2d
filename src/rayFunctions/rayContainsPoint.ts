import { EPSILON } from "../internal/const";
import { _dot } from "../internal/_dot";
import { _dotPerp } from "../internal/_dotPerp";
import { IRay, IVec } from "../types";

/**
 * Determines if the point is on the ray
 *
 * This function tests whether the point lies along the ray's geometry,
 * using allowed error _ε_ = 1e-8. The point must lie on the positive side
 *  of the ray (_t_ >= 0).
 *
 * @param ray the ray to inspect
 * @param vec point to be checked
 * __see {@link lineContainsPoint}
 * __see {@link lineWhichSide}
 */
export function rayContainsPoint(ray: IRay, vec: IVec) {
  const t = _dot(ray, vec);
  if (t < -EPSILON) {
    return false;
  }

  return Math.abs(_dotPerp(ray, vec)) < EPSILON;
}
