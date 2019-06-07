import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentNearestDistanceSq } from "../segmentFunctions/segmentNearestDistanceSq";
import { IPolyline, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecDistanceSq } from "../vecFunctions/vecDistanceSq";
import { vecReset } from "../vecFunctions/vecReset";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegment } from "./polylineGetSegment";

const TMP0 = vecAlloc();
const TMP1 = segmentAlloc();

/**
 * Computes the closest distance squared that a polyline comes to a given reference point.
 *
 *  If you care about the actual closest point or its parameterization, prefer
 * {@link polylineNearestPoint} or {@link polylineNearestT}.
 *
 * @param segment segment to inspect
 * @param point point to measure squared distance to
 * @param out
 * @see {@link IPolyline}
 * @see {@link polylineNearestDistance}
 */
export function polylineNearestDistanceSq(poly: IPolyline, point: IVec) {
  if (poly.length === 0) {
    return NaN;
  }

  if (poly.length === 2) {
    return vecDistanceSq(point, vecReset(poly[0], poly[1], TMP0));
  }

  let winner = Infinity;
  const numSegments = polylineGetNumSegments(poly);
  for (let i = 0; i < numSegments; i++) {
    const segment = polylineGetSegment(poly, i, TMP1);
    winner = Math.min(winner, segmentNearestDistanceSq(segment, point));
  }

  return winner;
}
