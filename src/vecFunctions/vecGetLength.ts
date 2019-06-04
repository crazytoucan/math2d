import { IVec } from "../types";

/**
 * Computes the straight-line length (i.e. Euclidean norm) of the given vector.
 *
 * @param vec
 */
export function vecGetLength(vec: IVec) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}
