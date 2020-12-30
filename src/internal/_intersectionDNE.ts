import { IntersectionResult } from "../types";

export function _intersectionDNE(out: IntersectionResult) {
  out.exists = false;
  out.x = out.y = out.t0 = out.t1 = NaN;
  return out;
}
