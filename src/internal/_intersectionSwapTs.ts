import { IIntersection } from "../types";

export function _intersectionSwapTs(out: IIntersection) {
  const tmp = out.t0;
  out.t0 = out.t1;
  out.t1 = tmp;
  return out;
}
