import { IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Scales both coordinates of this vector by a given scalar.
 *
 * @param v the vector to scale
 * @param scalar the value by which the vector's components should be scaled
 * @param out
 * @see {@link vecAdd}
 * @see {@link vecTransformByAff}
 */
export function vecScale(v: IVec, scalar: number, out = vecAlloc()) {
  return vecReset(v.x * scalar, v.y * scalar, out);
}
