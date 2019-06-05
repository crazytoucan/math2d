import { _lerp } from "../internal/_lerp";
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
  return vecReset(_lerp(a.x, b.x, r), _lerp(a.y, b.y, r), out);
}
