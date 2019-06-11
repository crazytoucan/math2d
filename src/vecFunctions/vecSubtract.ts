import { IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Computes `u - v`, i.e. subtracting the second vector from the first.
 *
 * @param u the first vector
 * @param v the second vector
 * @param out
 * @see {@link vecAdd}
 * @see {@link vecScale}
 * @see {@link vecTransformBy}
 */
export function vecSubtract(u: IVec, v: IVec, out = vecAlloc()) {
  return vecReset(u.x - v.x, u.y - v.y, out);
}
