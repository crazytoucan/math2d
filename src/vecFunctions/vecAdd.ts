import { Vec } from "../types";
import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Computes the result of adding the two given vectors.
 *
 * @param a
 * @param b
 * @param out
 */
export function vecAdd(a: Vec, b: Vec, out = vecAlloc()) {
  return vecReset(a.x + b.x, a.y + b.y, out);
}
