import { IVec } from "../types";

/**
 * Computes the straight-line (Euclidean) distance between the two vectors, interpreted as points in the plane.
 *
 * @param a
 * @param b
 */
export function vecDistance(a: IVec, b: IVec) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
