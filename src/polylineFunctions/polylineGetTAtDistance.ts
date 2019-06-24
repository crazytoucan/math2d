import { IPolyline } from "../types";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetNumVertices } from "./polylineGetNumVertices";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

export function polylineGetTAtDistance(poly: IPolyline, d: number) {
  if (d < 0) {
    return 0;
  }

  const numSegments = polylineGetNumSegments(poly);
  for (let i = 0; i < numSegments; i++) {
    const segmentLength = polylineGetSegmentLength(poly, i);
    if (d <= segmentLength) {
      return i + d / segmentLength;
    }

    d -= segmentLength;
  }

  return polylineGetNumVertices(poly);
}
