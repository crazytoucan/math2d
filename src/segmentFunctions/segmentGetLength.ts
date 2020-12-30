import { Segment } from "../types";

/**
 * Computes the length of the line segment
 *
 * This is simply `√((x1 - x0)² + (y1 - y0)²)`.
 *
 * @param segment segment to measure
 */
export function segmentGetLength(segment: Segment) {
  const dx = segment.x1 - segment.x0;
  const dy = segment.y1 - segment.y0;
  return Math.sqrt(dx * dx + dy * dy);
}
