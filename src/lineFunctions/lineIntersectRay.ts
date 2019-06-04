import { _intersectionDNE } from "../internal/internalFunctions";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { ILine, IRay } from "../types";
import { lineIntersectLine } from "./lineIntersectLine";

export function lineIntersectRay(line: ILine, ray: IRay, out = intersectionAlloc()) {
  lineIntersectLine(line, ray);
  return !out.exists || out.t1 < 0 ? _intersectionDNE(out) : out;
}
