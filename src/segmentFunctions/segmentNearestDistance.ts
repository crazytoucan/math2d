import { ISegment, IVec } from "../types";
import { segmentNearestDistanceSq } from "./segmentNearestDistanceSq";

/**
 * Computes the closest distance that a segment comes to a given reference point.
 *
 *  If you care about the actual closest point or its parameterization, prefer
 * {@link segmentNearestPoint} or {@link segmentNearestT}.
 *
 * @param segment segment to inspect
 * @param point point to measure squared distance to
 * @param out
 * @see {@link ISegment}
 * @see {@link segmentNearestDistanceSq}
 */
export function segmentNearestDistance(segment: ISegment, point: IVec) {
  return Math.sqrt(segmentNearestDistanceSq(segment, point));
}
