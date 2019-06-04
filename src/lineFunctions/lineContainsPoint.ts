import { EPSILON } from "../internal/parameters";
import { ILine, IVec } from "../types";
import { lineClosestDistanceToPoint } from "./lineClosestDistanceToPoint";

export function lineContainsPoint(line: ILine, point: IVec) {
  return lineClosestDistanceToPoint(line, point) < EPSILON;
}
