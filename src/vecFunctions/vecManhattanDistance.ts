import { IVec } from "../types";

/**
 * Computes the Manhattan distance between the two vectors, interpreted as points in the plane.
 * Equivalent to `|b.x - a.x| + |b.y - a.y|`.
 *
 * @param a
 * @param b
 */
export function vecManhattanDistance(a: IVec, b: IVec) {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}
