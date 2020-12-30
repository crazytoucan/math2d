import { Vec } from "../types";

/**
 * Computes the dot product of the two vectors, i.e. `u.x * v.x + u.y * v.y`.
 *
 * @param u the first vector
 * @param v the vector to dot with the first
 */
export function vecDot(u: Vec, v: Vec) {
  return u.x * v.x + u.y * v.y;
}
