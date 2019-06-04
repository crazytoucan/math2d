import { _dotPerp } from "../internal/_dotPerp";
import { ILine, IVec } from "../types";

export function lineClosestSignedDistanceToPoint(line: ILine, point: IVec) {
  return _dotPerp(line, point);
}
