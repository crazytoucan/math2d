import { ISegment } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Gets a point along the line segment, parameterized according to linear interpolation
 * between its endpoints.
 *
 * A segment is parameterized according to linear interpolation between its endpoints,
 * where _t_ = 0 represents its starting vertex and _t_ = 1 its ending vertex.
 * Smooth values of _t_ within that range will move along the segment, so for example
 * _t_ = 0.5 is its midpoint.
 *
 * This function does allow for _t_ values outside the range `[0, 1]`, which will return
 * points in the same direction as the segment but outside in either direction.
 *
 * @param segment the segment to inspect
 * @param t linear ratio along the segment to return
 * @param out
 * __see {@link ISegment}
 * __see {@link vecLerp}
 */
export function segmentGetPointAtT(segment: ISegment, t: number, out = vecAlloc()) {
  return vecReset(segment.x0 * (1 - t) + segment.x1 * t, segment.y0 * (1 - t) + segment.y1 * t, out);
}
