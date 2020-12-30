import { vecAlloc } from "./vecAlloc";

/**
 * Construct a new vector given an `x` and `y` value.
 *
 * @param x x-coordinate of the vector
 * @param y y-coordinate of the vector
 * @param out
 * __see {@link IVec}
 * __see {@link vecAlloc}
 * __see {@link vecClone}
 */
export function vecReset(x: number, y: number, out = vecAlloc()) {
  out.x = x;
  out.y = y;
  return out;
}
