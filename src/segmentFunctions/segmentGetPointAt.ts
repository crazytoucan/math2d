import { ISegment } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

export function segmentGetPointAt(segment: ISegment, t: number, out = vecAlloc()) {
  return vecReset(segment.x0 * (1 - t) + segment.x1 * t, segment.y0 * (1 - t) + segment.y1 * t, out);
}
