import { _lerp } from "../internal/_lerp";
import { EPSILON_SQ } from "../internal/const";
import { nearestPointResultAlloc } from "../nearestPointResultFunctions/nearestPointResultAlloc";
import { nearestPointResultReset } from "../nearestPointResultFunctions/nearestPointResultReset";
import { ISegment, IVec } from "../types";
import { vecCross } from "../vecFunctions/vecCross";
import { vecDot } from "../vecFunctions/vecDot";
import { vecGetLengthSq } from "../vecFunctions/vecGetLengthSq";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Finds the closest the segment comes to a given reference point.
 *
 * This function returns the squared euclidean distance in the `distanceValue` field of the result.
 *
 * @param segment segment to inspect
 * @param point point to measure squared distance to
 * @param out
 * @see {@link ISegment}
 * @see {@link INearestPointResult}
 */
export function segmentNearestDistanceSqToPoint(segment: ISegment, point: IVec, out = nearestPointResultAlloc()) {
  const segVector = vecReset(segment.x1 - segment.x0, segment.y1 - segment.y0);
  const pointVector = vecReset(point.x - segment.x0, point.y - segment.y0);

  const segLengthSq = vecGetLengthSq(segVector);
  if (segLengthSq < EPSILON_SQ) {
    return nearestPointResultReset(segment.x0, segment.y0, 0, vecGetLengthSq(pointVector), out);
  }

  const dot = vecDot(pointVector, segVector);
  if (dot < 0) {
    return nearestPointResultReset(segment.x0, segment.y0, 0, vecGetLengthSq(pointVector), out);
  } else if (dot > segLengthSq) {
    const dx = point.x - segment.x1;
    const dy = point.y - segment.y1;
    return nearestPointResultReset(segment.x1, segment.y1, 1, dx * dx + dy * dy, out);
  } else {
    const perp = vecCross(segVector, pointVector);
    const distanceSq = (perp * perp) / segLengthSq;
    const t = dot / segLengthSq;

    return nearestPointResultReset(
      _lerp(segment.x0, segment.x1, t),
      _lerp(segment.y0, segment.y1, t),
      t,
      distanceSq,
      out,
    );
  }
}
