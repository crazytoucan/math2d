import { IVec } from "../types";

/**
 * Computes the Manhattan distance between the two points.
 *
 * Equivalent to `|v.x - u.x| + |v.y - u.y|`.
 *
 * @param u the first point
 * @param v the point to measure manhattan distance to from the first point
 * @see {@link vecGetManhattanLength}
 */
export function vecManhattanDistance(u: IVec, v: IVec) {
  return Math.abs(v.x - u.x) + Math.abs(v.y - u.y);
}
