import { ILine, IVec } from "../types";

export function _dotPerp(line: ILine, point: IVec) {
  return line.dirX * (point.y - line.y0) - line.dirY * (point.x - line.x0);
}
