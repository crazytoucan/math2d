import { _clamp } from "../internal/_clamp";
import { EPSILON_SQ } from "../internal/const";
import { ISegment, IVec } from "../types";

/**
 * Computes the closest location _t_ that a segment comes to a given reference point.
 *
 * The returned value _t_ is defined according to the {@link ISegment}'s parameterization:
 * linear interpolation between its endpoints,
 * where _t_ = 0 represents its starting vertex and _t_ = 1 its ending vertex.
 * Smooth values of _t_ within that range will move along the segment, so for example
 * _t_ = 0.5 is its midpoint.
 *
 * If you only care about the actual closest _point_ and not its parameterization, prefer
 * {@link segmentNearestPoint}.
 *
 * @param segment segment to inspect
 * @param point point to measure distance to
 * @param out
 * @see {@link ISegment}
 * @see {@link segmentNearestPoint}
 * @see {@link polylineNearestT}
 * @see {@link polygonNearestPerimeterT}
 */
export function segmentNearestT(segment: ISegment, point: IVec) {
  const dSegX = segment.x1 - segment.x0;
  const dSegY = segment.y1 - segment.y0;
  const segLengthSq = dSegX * dSegX + dSegY * dSegY;
  if (segLengthSq < EPSILON_SQ) {
    return 0;
  }

  const dot = (point.x - segment.x0) * dSegX + (point.y - segment.y0) * dSegY;
  return _clamp(dot / segLengthSq, 0, 1);
}
