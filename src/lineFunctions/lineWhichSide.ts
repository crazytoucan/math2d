import { _dotPerp } from "../internal/_dotPerp";
import { EPSILON } from "../internal/const";
import { ILine, IVec } from "../types";

export function lineWhichSide(line: ILine, point: IVec) {
  const d = _dotPerp(line, point);
  return Math.abs(d) < EPSILON ? 0 : Math.sign(d);
}
