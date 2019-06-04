import { ILine, IVec } from "../types";

export function lineClosestSignedDistanceToPoint(line: ILine, point: IVec) {
  return (point.y - line.y0) * line.dirX - (point.x - line.x0) * line.dirY;
}
