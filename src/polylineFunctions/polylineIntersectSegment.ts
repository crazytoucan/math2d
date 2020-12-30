import { _polylineIntersectHelper } from "../internal/_polylineIntersectHelper";
import { segmentIntersectSegment } from "../segmentFunctions/segmentIntersectSegment";
import { IPolyline, ISegment } from "../types";

/**
 * Computes all locations at which a polyline crosses a given line segment.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the polyline's geometry
 * according to the {@link IPolyline} parameterization:
 * values of _t0_ are between 0 and the polyline's vertex count minus 1, and smooth values of _t0_ therein
 * signify linear interpolation between adjacent vertices along the polyline's geometry.
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would visit those locations if one were to travel from the polyline's start to its end
 * along its segments.
 *
 * Almost equivalent to {@link segmentIntersectPolyline}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the polyline's geometry.
 *
 * @param poly
 * @param segment
 * __see {@link IIntersectionResult}
 * __see {@link IPolyline}
 * __see {@link segmentIntersectPolyline}
 * __see {@link polylineIntersectRay}
 */
export function polylineIntersectSegment(poly: IPolyline, segment: ISegment) {
  return _polylineIntersectHelper(poly, segment, segmentIntersectSegment);
}
