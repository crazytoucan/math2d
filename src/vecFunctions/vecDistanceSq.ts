import { Vec } from "../types";

/**
 * Computes the squared straight-line (i.e. Euclidean) distance between the two points
 *
 * @param u the first point
 * @param v the second point to which squared distance should be measured
 * __see {@link vecDistance}
 * __see {@link vecGetLengthSq}
 */
export function vecDistanceSq(u: Vec, v: Vec) {
  const dx = v.x - u.x;
  const dy = v.y - u.y;
  return dx * dx + dy * dy;
}
