import { IPolyline } from "../types";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

/**
 * Computes the segment index at which a given distance falls along the polyline,
 * parameterized according to absolute distance _t_ along its geometry.
 *
 * @param poly
 * @param t
 */
export function polylineSegmentIndexAt(poly: IPolyline, t: number) {
  if (t < 0) {
    return -1;
  }

  const numSegments = polylineGetNumSegments(poly);
  let traversed = 0;
  let idx = 0;
  while (idx < numSegments && traversed < t) {
    traversed += polylineGetSegmentLength(poly, idx);
    ++idx;
  }

  return idx;
}
