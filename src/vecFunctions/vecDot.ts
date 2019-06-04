import { IVec } from "../types";

/**
 * Computes the dot product of the two vectors, i.e. `a.x * b.x + a.y * b.y`.
 *
 * @param a
 * @param b
 */
export function vecDot(a: IVec, b: IVec) {
  return a.x * b.x + a.y * b.y;
}
