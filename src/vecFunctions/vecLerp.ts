import { IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Performs a linear interpolation between the two vectors. The `r` parameter is allowed to be outside `[0, 1]`.
 *
 * @param a
 * @param b
 * @param r
 * @param out
 */
export function vecLerp(a: IVec, b: IVec, r: number, out = vecAlloc()) {
  return vecReset(a.x * (1 - r) + b.x * r, a.y * (1 - r) + b.y * r, out);
}
