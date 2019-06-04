import { _intersectionSwapTs } from "../internal/_intersectionSwapTs";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineIntersectRay } from "../lineFunctions/lineIntersectRay";
import { ILine, IRay } from "../types";

export function rayIntersectLine(ray: IRay, line: ILine, out = intersectionAlloc()) {
  return _intersectionSwapTs(lineIntersectRay(line, ray, out));
}
