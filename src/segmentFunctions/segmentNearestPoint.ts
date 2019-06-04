import { ISegment, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { segmentGetPointAt } from "./segmentGetPointAt";
import { segmentNearestT } from "./segmentNearestT";

export function segmentNearestPoint(segment: ISegment, point: IVec, out = vecAlloc()) {
  const t = segmentNearestT(segment, point);
  return segmentGetPointAt(segment, t, out);
}
