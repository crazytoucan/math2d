import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentGetPointAt } from "../segmentFunctions/segmentGetPointAt";
import { segmentNearestT } from "../segmentFunctions/segmentNearestT";
import { IPolyline, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecDistanceSq } from "../vecFunctions/vecDistanceSq";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegment } from "./polylineGetSegment";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

const TMP0 = segmentAlloc();
const TMP1 = vecAlloc();

/**
 * Computes the closest location at which the polyline comes to a given reference point.
 *
 * The returned value _t_ is defined according to the {@link IPolyline} parameterization:
 * values of _t_ will fall between 0 and the polyline's total length, inclusive, and the
 * point corresponding to a given value _t_ is defined by traveling an absolute distance _t_
 * along the polyline's geometry.
 *
 * @param poly
 * @param point
 * @param out
 * @see {@link IPolyline}
 */
export function polylineNearestT(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningD = NaN;

  let traversed = 0;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const segment = polylineGetSegment(poly, i, TMP0);
    const segmentT = segmentNearestT(segment, point);
    const segmentLength = polylineGetSegmentLength(poly, i);

    const closestPointOnSegment = segmentGetPointAt(segment, segmentT, TMP1);
    const distanceSq = vecDistanceSq(point, closestPointOnSegment);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningD = traversed + segmentT * segmentLength;
    }

    traversed += segmentLength;
  }

  return winningD;
}
