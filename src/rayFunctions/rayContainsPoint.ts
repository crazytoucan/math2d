import { EPSILON } from "../internal/const";
import { _dot } from "../internal/_dot";
import { _dotPerp } from "../internal/_dotPerp";
import { Ray, Vec } from "../types";

/**
 * Determines if the point is on the ray
 *
 * This function tests whether the point lies along the ray's geometry,
 * using allowed error _ε_ = 1e-8. The point must lie on the positive side
 *  of the ray (_t_ >= 0).
 *
 * @param ray the ray to inspect
 * @param vec point to be checked
 */
export function rayContainsPoint(ray: Ray, vec: Vec) {
  const t = _dot(ray, vec);
  if (t < -EPSILON) {
    return false;
  }

  return Math.abs(_dotPerp(ray, vec)) < EPSILON;
}
