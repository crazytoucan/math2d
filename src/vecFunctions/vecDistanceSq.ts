import { IVec } from "../types";

/**
 * Computes the squared straight-line (i.e. Euclidean) distance between the two vectors, interpreted as points in the plane.
 * @param a
 * @param b
 */
export function vecDistanceSq(a: IVec, b: IVec) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}
