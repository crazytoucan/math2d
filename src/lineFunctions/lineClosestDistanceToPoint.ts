import { ILine, IVec } from "../types";
import { lineClosestSignedDistanceToPoint } from "./lineClosestSignedDistanceToPoint";

export function lineClosestDistanceToPoint(line: ILine, point: IVec) {
  return Math.abs(lineClosestSignedDistanceToPoint(line, point));
}
