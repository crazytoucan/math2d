import { _dot } from "../internal/_dot";
import { ILine, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

export function lineProjectPoint(line: ILine, point: IVec, out = vecAlloc()) {
  const t = _dot(line, point);
  return vecReset(line.x0 + t * line.dirX, line.y0 + t * line.dirY, out);
}
