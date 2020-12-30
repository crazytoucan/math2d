import { IPolyline } from "../types";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetNumVertices } from "./polylineGetNumVertices";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

/**
 * Computes the parametric value _t_ along the polyline corresponding to a distance _d_.
 *
 * This function can be used along with {@link polylineGetPointAt} to find the actual
 * (x, y) point corresponding to a distance traveled _d_ along the polyline.
 *
 * @param poly the polyline to inspect
 * @param d distance along the polyline to travel
 * __see {@link IPolyline}
 * __see {@link polylineGetDistanceAtT}
 */
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
