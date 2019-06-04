import { _intersectionSwap } from "../internal/internalFunctions";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineIntersectRay } from "../lineFunctions/lineIntersectRay";
import { ILine, IRay } from "../types";

export function rayIntersectLine(ray: IRay, line: ILine, out = intersectionAlloc()) {
  return _intersectionSwap(lineIntersectRay(line, ray, out));
}
