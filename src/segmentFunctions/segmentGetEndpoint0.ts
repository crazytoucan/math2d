import { ISegment } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

export function segmentGetEndpoint0(segment: ISegment, out = vecAlloc()) {
  return vecReset(segment.x0, segment.y0, out);
}
