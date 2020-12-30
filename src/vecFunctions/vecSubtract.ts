import { Vec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Computes `u - v`, i.e. subtracting the second vector from the first.
 *
 * @param u the first vector
 * @param v the second vector
 * @param out
 * __see {@link vecAdd}
 * __see {@link vecScale}
 * __see {@link vecTransformBy}
 */
export function vecSubtract(u: Vec, v: Vec, out = vecAlloc()) {
  return vecReset(u.x - v.x, u.y - v.y, out);
}
