import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { segmentIntersectSegment } from "../segmentFunctions/segmentIntersectSegment";
import { IIntersection, IPolyline, ISegment } from "../types";

/**
 * Computes all locations at which a polyline crosses a given line segment.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the polyline's geometry
 * according to the {@link IPolyline} parameterization:
 * values of _t0_ will fall between 0 and the polyline's total length, inclusive, and the
 * point corresponding to a given value _t0_ is defined by traveling an absolute distance _t0_
 * along the polyline's geometry.
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would visit those locations if one traveled from the polyline's start to its end
 * along its segment geometry.
 *
 * @param poly
 * @param segment
 * @see {@link IIntersection}
 * @see {@link IPolyline}
 * @see {@link lineIntersectPolylineIterator}
 * @see {@link polylineIntersectLineIterator}
 * @see {@link polylineIntersectRayIterator}
 */
export function polylineIntersectSegmentIterator(poly: IPolyline, segment: ISegment): IterableIterator<IIntersection> {
  return _polylineIntersectIteratorHelper(poly, segment, segmentIntersectSegment).values();
}
