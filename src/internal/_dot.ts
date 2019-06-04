import { ILine, IVec } from "../types";

export function _dot(line: ILine, point: IVec) {
  return line.dirX * (point.x - line.x0) + line.dirY * (point.y - line.y0);
}
