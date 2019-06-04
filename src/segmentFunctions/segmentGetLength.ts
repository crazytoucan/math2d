import { ISegment } from "../types";

export function segmentGetLength(segment: ISegment) {
  const dx = segment.x1 - segment.x0;
  const dy = segment.y1 - segment.y0;
  return Math.sqrt(dx * dx + dy * dy);
}
