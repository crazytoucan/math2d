import { Vec } from "../types";

/**
 * Computes the straight-line length (i.e. Euclidean norm) of the given vector.
 *
 * Equivalent to `√(v.x² + v.y²)`.
 *
 * @param v the vector whose length should be measured
 */
export function vecGetLength(v: Vec) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
