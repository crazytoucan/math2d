import { IVec } from "../types";

/**
 * Computes the straight-line (Euclidean) distance between the two points
 *
 * @param u the first point
 * @param v the second point, to which distance should be measured from the first
 * __see {@link vecDistanceSq}
 * __see {@link vecGetLength}
 */
export function vecDistance(u: IVec, v: IVec) {
  const dx = v.x - u.x;
  const dy = v.y - u.y;
  return Math.sqrt(dx * dx + dy * dy);
}
