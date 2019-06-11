import { IPointIntersectionResult } from "../types";

export function _intersectionDNE(out: IPointIntersectionResult) {
  out.exists = false;
  out.x = out.y = out.t0 = out.t1 = NaN;
  return out;
}
