import { ILine } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

export function lineGetPointAt(line: ILine, t: number, out = vecAlloc()) {
  return vecReset(line.x0 + t * line.dirX, line.y0 + t * line.dirY, out);
}
