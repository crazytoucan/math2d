import { ISegment } from "../types";
import { segmentAlloc } from "./segmentAlloc";
import { segmentReset } from "./segmentReset";

export function segmentReverse(segment: ISegment, out = segmentAlloc()) {
  return segmentReset(segment.x1, segment.y1, segment.x0, segment.y0, out);
}
