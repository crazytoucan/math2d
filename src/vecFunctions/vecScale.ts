import { IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Scales both coordinates of this vector by the given scalar.
 *
 * @param vec
 * @param scalar
 * @param out
 */
export function vecScale(vec: IVec, scalar: number, out = vecAlloc()) {
  return vecReset(vec.x * scalar, vec.y * scalar, out);
}
