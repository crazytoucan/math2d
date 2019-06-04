import { EPSILON } from "../internal/const";
import { ILine, IVec } from "../types";
import { lineClosestSignedDistanceToPoint } from "./lineClosestSignedDistanceToPoint";

export function lineSide(line: ILine, point: IVec) {
  const d = lineClosestSignedDistanceToPoint(line, point);
  return Math.abs(d) < EPSILON ? 0 : Math.sign(d);
}
