import { IPointIntersectionResult } from "../types";

export function _intersectionSwapTs(out: IPointIntersectionResult) {
  const tmp = out.t0;
  out.t0 = out.t1;
  out.t1 = tmp;
  return out;
}
