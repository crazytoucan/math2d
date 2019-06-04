import { vecAlloc } from "./vecAlloc";
import { vecReset } from "./vecReset";

/**
 * Returns the 2d origin vector, `(0, 0)`.
 *
 * @param out
 */
export function vecOrigin(out = vecAlloc()) {
  return vecReset(0, 0, out);
}
