import { _intersectionAlloc } from "../internal/dataClasses";
import { IIntersection } from "../types";

/**
 * Creates a new Intersection object in memory, with all values initialized to `false` and `NaN`.
 * This is useful to hold the result of vectormath function calls in performance
 * critical workflows.
 */
export function intersectionAlloc() {
  return _intersectionAlloc();
}

/**
 * Copies the values from the given intersection into a new intersection object.
 * @param intersection
 * @param out
 */
export function intersectionClone(intersection: IIntersection, out = intersectionAlloc()) {
  return intersectionReset(intersection.exists, intersection.x, intersection.y, intersection.t0, intersection.t1, out);
}

/**
 * Constuct a new intersection given `exists`, `x`, `y`, `t0`, and `t1` values.
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
