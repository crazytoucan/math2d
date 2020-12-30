import { IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Computes the result of adding the two given vectors.
 *
 * @param a
 * @param b
 * @param out
 * __see {@link vecSubtract}
 * __see {@link vecScale}
 */
export function vecAdd(a: IVec, b: IVec, out = vecAlloc()) {
  return vecReset(a.x + b.x, a.y + b.y, out);
}
