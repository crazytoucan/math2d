import { IVec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Copies the values from the given vector into a new vector.
 *
 * @param vec
 * @param out
 */
export function vecClone(vec: IVec, out = vecAlloc()) {
  return vecReset(vec.x, vec.y, out);
}
