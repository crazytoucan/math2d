import { EPSILON_SQ } from "../internal/const";
import { Vec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Normalizes the vector to be length 1. If the given vector is the zero-vector, this method
 * returns `(NaN, NaN)`.
 *
 * @param vec the vector to normalize
 * @param out
 */
export function vecNormalize(vec: Vec, out = vecAlloc()) {
  const lenSq = vec.x * vec.x + vec.y * vec.y;
  if (lenSq < EPSILON_SQ) {
    return vecReset(NaN, NaN, out);
  } else {
    const lenInverse = 1 / Math.sqrt(lenSq);
    return vecReset(lenInverse * vec.x, lenInverse * vec.y, out);
  }
}
