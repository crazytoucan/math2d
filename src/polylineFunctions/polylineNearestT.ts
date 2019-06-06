import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentGetPointAt } from "../segmentFunctions/segmentGetPointAt";
import { segmentNearestT } from "../segmentFunctions/segmentNearestT";
import { IPolyline, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecDistanceSq } from "../vecFunctions/vecDistanceSq";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegment } from "./polylineGetSegment";

const TMP0 = segmentAlloc();
const TMP1 = vecAlloc();

/**
 * Computes the closest location the polyline comes to a given reference point.
 *
 * The returned value _t_ is defined according to the {@link IPolyline} parameterization:
 * values of _t0_ are between 0 and the polyline's vertex count minus 1, and smooth values of T
 * signify linear interpolation between the two adjacent vertices along the polyline's geometry.
 *
 * If you only care about the actual closest _point_ and not its parameterization, prefer
 * {@link polylineNearestPoint}.
 *
 * @param poly the polyline to inspect
 * @param point the point to measure distance to
 * @param out
 * @see {@link IPolyline}
 * @see {@link polylineNearestPoint}
 * @see {@link segmentNearestT}
 */
export function polylineNearestT(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningT = NaN;

  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const segment = polylineGetSegment(poly, i, TMP0);
    const segmentT = segmentNearestT(segment, point);

    const closestPointOnSegment = segmentGetPointAt(segment, segmentT, TMP1);
    const distanceSq = vecDistanceSq(point, closestPointOnSegment);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningT = i + segmentT;
    }
  }

  return winningT;
}
