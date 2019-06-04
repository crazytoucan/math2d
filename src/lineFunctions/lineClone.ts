import { ILine } from "../types";
import { lineAlloc } from "./lineAlloc";
import { lineReset } from "./lineReset";

export function lineClone(line: ILine, out = lineAlloc()) {
  return lineReset(line.x0, line.y0, line.dirX, line.dirY, out);
}
