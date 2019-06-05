import { ISegment } from "../types";

/**
 * Computes the squared length of the line segment
 *
 * This is simply `(x1 - x0)² + (y1 - y0)²`.
 *
 * @param segment segment to measure
 * @see {@link segmentGetLength}
 * @see {@link vecDistanceSq}
 */
export function segmentGetLengthSq(segment: ISegment) {
  const dx = segment.x1 - segment.x0;
  const dy = segment.y1 - segment.y0;
  return dx * dx + dy * dy;
}
