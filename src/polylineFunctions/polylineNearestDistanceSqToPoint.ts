import { nearestPointResultAlloc } from "../nearestPointResultFunctions/nearestPointResultAlloc";
import { nearestPointResultReset } from "../nearestPointResultFunctions/nearestPointResultReset";
import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentNearestDistanceSqToPoint } from "../segmentFunctions/segmentNearestDistanceSqToPoint";
import { Polyline, Vec } from "../types";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegment } from "./polylineGetSegment";


/**
 * Finds the closest the polyline comes to a given reference point.
 *
 * The returned value _t_ is defined according to the {@link IPolyline} parameterization:
 * values of _t0_ are between 0 and the polyline's vertex count minus 1, and smooth values of T
 * signify linear interpolation between the two adjacent vertices along the polyline's geometry.
 *
 * This function returns the squared euclidean distance in the `distanceValue` field of the result.
 *
 * @param poly the polyline to inspect
 * @param point the point to measure distance to
 * @param out
 * __see {@link IPolyline}
 * __see {@link INearestPointResult}
 */
export function polylineNearestDistanceSqToPoint(poly: Polyline, point: Vec, out = nearestPointResultAlloc()) {
  const tmp0 = segmentAlloc();
  const tmp1 = nearestPointResultAlloc();

  const winner = nearestPointResultReset(NaN, NaN, NaN, Infinity, out);
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const segment = polylineGetSegment(poly, i, tmp0);
    const segmentNearest = segmentNearestDistanceSqToPoint(segment, point, tmp1);
    if (segmentNearest.distanceValue < winner.distanceValue) {
      nearestPointResultReset(
        segmentNearest.x,
        segmentNearest.y,
        i + segmentNearest.t,
        segmentNearest.distanceValue,
        winner,
      );
    }
  }

  return winner;
}
