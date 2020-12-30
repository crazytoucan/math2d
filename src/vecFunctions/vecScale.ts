import { Vec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Scales both coordinates of this vector by a given scalar.
 *
 * @param v the vector to scale
 * @param scalar the value by which the vector's components should be scaled
 * @param out
 */
export function vecScale(v: Vec, scalar: number, out = vecAlloc()) {
  return vecReset(v.x * scalar, v.y * scalar, out);
}
