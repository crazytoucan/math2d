import { IVec } from "../types";

/**
 * Computes the squared straight-line length (i.e. square of the Euclidean norm) of the given vector.
 *
 * @param vec
 */
export function vecGetLengthSq(vec: IVec) {
  return vec.x * vec.x + vec.y * vec.y;
}
