import { _dotPerp } from "../internal/_dotPerp";
import { EPSILON } from "../internal/const";
import { ILine, IVec } from "../types";

export function lineContainsPoint(line: ILine, point: IVec) {
  return Math.abs(_dotPerp(line, point)) < EPSILON;
}
