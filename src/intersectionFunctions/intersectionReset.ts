import { intersectionAlloc } from "./intersectionAlloc";

/**
 * Construct a new intersection given `exists`, `x`, `y`, `t0`, and `t1` values.
 * @param exists
 * @param x
 * @param y
 * @param t0
 * @param t1
 * @param out
 */
export function intersectionReset(
  exists: boolean,
  x: number,
  y: number,
  t0: number,
  t1: number,
  out = intersectionAlloc(),
) {
  out.exists = exists;
  out.x = x;
  out.y = y;
  out.t0 = t0;
  out.t1 = t1;
  return out;
}
