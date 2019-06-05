import { ILine } from "../types";
import { lineAlloc } from "./lineAlloc";
import { lineReset } from "./lineReset";

/**
 * Copies the values from the given line into a new line.
 *
 * @param line the source line from which values should be copied
 * @param out
 */
export function lineClone(line: ILine, out = lineAlloc()) {
  return lineReset(line.x0, line.y0, line.dirX, line.dirY, out);
}
