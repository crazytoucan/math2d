import { vecAlloc } from "./vecAlloc";

/**
 * Construct a new vector given an `x` and `y` value.
 *
 * @param x
 * @param y
 * @param out
 */
export function vecReset(x: number, y: number, out = vecAlloc()) {
  out.x = x;
  out.y = y;
  return out;
}
