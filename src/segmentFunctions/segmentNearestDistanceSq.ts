import { EPSILON_SQ } from "../internal/const";
import { ISegment, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecCross } from "../vecFunctions/vecCross";
import { vecDot } from "../vecFunctions/vecDot";
import { vecGetLengthSq } from "../vecFunctions/vecGetLengthSq";
import { vecReset } from "../vecFunctions/vecReset";

const TMP0 = vecAlloc();
const TMP1 = vecAlloc();

/**
 * Computes the closest distance squared that a segment comes to a given reference point.
 *
 *  If you care about the actual closest point or its parameterization, prefer
 * {@link segmentNearestPoint} or {@link segmentNearestT}.
 *
 * @param segment segment to inspect
 * @param point point to measure squared distance to
 * @param out
 * @see {@link ISegment}
 * @see {@link segmentNearestDistance}
 */
export function segmentNearestDistanceSq(segment: ISegment, point: IVec) {
  const segRelative = vecReset(segment.x1 - segment.x0, segment.y1 - segment.y0, TMP0);
  const pointRelative = vecReset(point.x - segment.x0, point.y - segment.y0, TMP1);

  const segLengthSq = vecGetLengthSq(segRelative);
  if (segLengthSq < EPSILON_SQ) {
    return vecGetLengthSq(pointRelative);
  }

  const dot = vecDot(pointRelative, segRelative);
  if (dot < 0) {
    return vecGetLengthSq(pointRelative);
  } else if (dot > segLengthSq) {
    return vecGetLengthSq(vecReset(point.x - segment.x1, point.y - segment.y1, TMP0));
  } else {
    const perp = vecCross(segRelative, pointRelative);
    return (perp * perp) / segLengthSq;
  }
}
