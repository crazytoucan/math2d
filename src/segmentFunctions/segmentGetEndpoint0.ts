import { Segment } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Retrieves the starting endpoint (_t_ = 0) of the segment, as a vector.
 *
 * @param segment segment to inspect
 * @param out
 */
export function segmentGetEndpoint0(segment: Segment, out = vecAlloc()) {
  return vecReset(segment.x0, segment.y0, out);
}
