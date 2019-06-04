import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentReset } from "../segmentFunctions/segmentReset";
import { IPolyline } from "../types";

export function polylineGetSegment(poly: IPolyline, index: number, out = segmentAlloc()) {
  const l = 2 * index;
  return segmentReset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
}
