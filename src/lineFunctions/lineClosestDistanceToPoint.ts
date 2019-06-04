import { _dotPerp } from "../internal/_dotPerp";
import { ILine, IVec } from "../types";

export function lineClosestDistanceToPoint(line: ILine, point: IVec) {
  return Math.abs(_dotPerp(line, point));
}
