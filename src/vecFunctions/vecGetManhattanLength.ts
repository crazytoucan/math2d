import { IVec } from "../types";

/**
 * Computes the Manhattan length of the given vector, i.e. `|v.x| + |v.y|`.
 *
 * @param v the vector whose Manhattan length should be measured
 * @see {@link vecManhattanDistance}
 */
export function vecGetManhattanLength(v: IVec) {
  return Math.abs(v.x) + Math.abs(v.y);
}
