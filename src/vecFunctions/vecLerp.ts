import { _lerp } from "../internal/_lerp";
import { Vec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Performs a linear interpolation between the two vectors. The `r` parameter is allowed to be outside `[0, 1]`.
 *
 * @param u the vector to start interpolation from
 * @param v the vector to end interpolation with
 * @param r the ratio to interpolate the two vectors, with _r_ = 0 returning the first vector `u` and _r_ = 1 returning
 *  the second vector `v`
 * @param out
 */
export function vecLerp(u: Vec, v: Vec, r: number, out = vecAlloc()) {
  return vecReset(_lerp(u.x, v.x, r), _lerp(u.y, v.y, r), out);
}
