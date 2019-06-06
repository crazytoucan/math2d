import { IVec } from "../types";

/**
 * Computes the squared straight-line length (i.e. square of the Euclidean norm) of the given vector.
 *
 * Equivalent to `v.x² + v.y²`.
 *
 * @param v the vector whose squared length should be measured
 */
export function vecGetLengthSq(v: IVec) {
  return v.x * v.x + v.y * v.y;
}
