import { ISegment, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { segmentNearestT } from "./segmentNearestT";
import { segmentPointAt } from "./segmentPointAt";

export function segmentNearestPoint(segment: ISegment, point: IVec, out = vecAlloc()) {
  const t = segmentNearestT(segment, point);
  return segmentPointAt(segment, t, out);
}
