import { IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Computes the perp of the given vector, as defined by `vecPerp(a, b) = (-b, a)`.
 * This is equivalent to a counter-clockwise rotation in the standard plane.
 *
 * @param vec the vector whose perp should be calculated
 * @param out
 */
export function vecPerp(vec: IVec, out = vecAlloc()) {
  return vecReset(-vec.y, vec.x, out);
}
