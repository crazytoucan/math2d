import { IPolyline } from "../types";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

export function polylineSegmentIndexAt(poly: IPolyline, d: number) {
  if (d < 0) {
    return -1;
  }

  const numSegments = polylineGetNumSegments(poly);
  let traversed = 0;
  let idx = 0;
  while (idx < numSegments && traversed < d) {
    traversed += polylineGetSegmentLength(poly, idx);
    ++idx;
  }

  return idx;
}
