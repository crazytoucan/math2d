import { _intersectionDNE } from "../internal/_intersectionDNE";
import { EPSILON } from "../internal/const";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineIntersectLine } from "../lineFunctions/lineIntersectLine";
import { IRay } from "../types";

export function rayIntersectRay(a: IRay, b: IRay, out = intersectionAlloc()) {
  lineIntersectLine(a, b, out);
  return out.exists && out.t0 > -EPSILON && out.t1 > -EPSILON ? out : _intersectionDNE(out);
}
