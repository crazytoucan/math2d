import { _intersectionSwapTs } from "../internal/_intersectionSwapTs";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { rayIntersectSegment } from "../rayFunctions/rayIntersectSegment";
import { IRay, ISegment } from "../types";

export function segmentIntersectRay(segment: ISegment, ray: IRay, out = intersectionAlloc()) {
  return _intersectionSwapTs(rayIntersectSegment(ray, segment, out));
}
