import { Segment } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Retrives the ending endpoint (_t_ = 1) of the segment, as a vector.
 *
 * @param segment segment to inspect
 * @param out
 */
export function segmentGetEndpoint1(segment: Segment, out = vecAlloc()) {
  return vecReset(segment.x1, segment.y1, out);
}
