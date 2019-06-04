import { ISegment } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

export function segmentGetEndpoint1(segment: ISegment, out = vecAlloc()) {
  return vecReset(segment.x1, segment.y1, out);
}
