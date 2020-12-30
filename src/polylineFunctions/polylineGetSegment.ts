import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentReset } from "../segmentFunctions/segmentReset";
import { Polyline } from "../types";

/**
 * Returns a polyline's segment by given index, starting at 0.
 *
 * @param poly
 * @param index
 * @param out
 */
export function polylineGetSegment(poly: Polyline, index: number, out = segmentAlloc()) {
  const l = 2 * index;
  return segmentReset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
}
