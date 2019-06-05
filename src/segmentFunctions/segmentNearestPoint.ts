import { ISegment, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { segmentGetPointAt } from "./segmentGetPointAt";
import { segmentNearestT } from "./segmentNearestT";

/**
 * Finds the nearest point that a segment comes to a given reference point.
 *
 * Returns the closest point that a segment comes to the given point, which may be one of
 * the segment's endpoints.
 *
 * @param segment segment to inspect
 * @param point point to measure distance to
 * @param out
 * @see {@link segmentNearestT}
 * @see {@link polylineNearestPoint}
 */
export function segmentNearestPoint(segment: ISegment, point: IVec, out = vecAlloc()) {
  const t = segmentNearestT(segment, point);
  return segmentGetPointAt(segment, t, out);
}
