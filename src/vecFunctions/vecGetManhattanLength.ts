import { IVec } from "../types";

/**
 * Computes the Manhattan length of the given vector, i.e. `|x| + |y|`.
 *
 * @param vec
 */
export function vecGetManhattanLength(vec: IVec) {
  return Math.abs(vec.x) + Math.abs(vec.y);
}
