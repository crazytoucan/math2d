import { IntersectionResult } from "../types";

export function _intersectionSwapTs(out: IntersectionResult) {
  const tmp = out.t0;
  out.t0 = out.t1;
  out.t1 = tmp;
  return out;
}
