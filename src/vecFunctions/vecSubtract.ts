import { IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Subtracts vector `b` from vector `a`.
 *
 * @param a
 * @param b
 * @param out
 */
export function vecSubtract(a: IVec, b: IVec, out = vecAlloc()) {
  return vecReset(a.x - b.x, a.y - b.y, out);
}
