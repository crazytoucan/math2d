import { Segment } from "../types";
import { segmentAlloc } from "./segmentAlloc";
import { segmentReset } from "./segmentReset";

/**
 * Computes the reverse of the segment, i.e. swapping its starting vertex and ending vertex.
 *
 * @param segment the segment to reverse
 * @param out
 */
export function segmentReverse(segment: Segment, out = segmentAlloc()) {
  return segmentReset(segment.x1, segment.y1, segment.x0, segment.y0, out);
}
