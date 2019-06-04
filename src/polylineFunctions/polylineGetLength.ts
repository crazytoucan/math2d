import { IPolyline } from "../types";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

export function polylineGetLength(poly: IPolyline) {
  const numSegments = polylineGetNumSegments(poly);
  let length = 0;
  for (let i = 0; i < numSegments; i++) {
    length += polylineGetSegmentLength(poly, i);
  }

  return length;
}
